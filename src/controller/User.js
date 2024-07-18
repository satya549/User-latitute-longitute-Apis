import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../model/User.js";
const secretKey = "secretkey";

export async function CreateUser(req, res) {
  try {
    const { name, email, password, address, latitude, longitude } = req.body;

    if (!name || !email || !password || !address || !latitude || !longitude) {
      throw new Error("Please provide all required fields.");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("Email address already exist");

    const hashedPassword = bcrypt.hashSync(password);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      address,
      latitude,
      longitude,
      status: "active",
    });

    const token = jwt.sign({ email: newUser.email }, "secretkey", {
      expiresIn: "1h",
    });

    res.status(200).json({
      status_code: 200,
      message: "User created successfully.",
      data: {
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        latitude: newUser.latitude,
        longitude: newUser.longitude,
        status: newUser.status,
        register_at: newUser.createdAt,
        token,
      },
    });
  } catch (error) {
    res.json({
      status_code: 400,
      message: error.message,
    });
  }
}

export async function changeUserStatus(req, res) {
  try {
    await UserModel.updateMany({}, [
      {
        $set: {
          status: {
            $cond: {
              if: { $eq: ["$status", "active"] },
              then: "inactive",
              else: "active",
            },
          },
        },
      },
    ]);
  } catch (error) {
    console.log(error);
    return res.json({
      status_code: 400,
      message: error.message,
    });
  }
}

export async function listUser(req, res) {
  const weekNumber = req.query.week_number?.split(",") || [];
  try {
    const [users] = await UserModel.aggregate([
      {
        $set: {
          dayOfWeek: {
            $mod: [{ $subtract: [{ $dayOfWeek: "$createdAt" }, 1] }, 6],
          },
        },
      },
      { $match: { dayOfWeek: { $in: weekNumber?.map((num) => Number(num)) } } },
      {
        $set: {
          dayOfWeekName: {
            $switch: {
              branches: [
                { case: { $eq: ["$dayOfWeek", 0] }, then: "Sunday" },
                { case: { $eq: ["$dayOfWeek", 1] }, then: "Monday" },
                { case: { $eq: ["$dayOfWeek", 2] }, then: "Tuesday" },
                { case: { $eq: ["$dayOfWeek", 3] }, then: "Wednesday" },
                { case: { $eq: ["$dayOfWeek", 4] }, then: "Thursday" },
                { case: { $eq: ["$dayOfWeek", 5] }, then: "Friday" },
                { case: { $eq: ["$dayOfWeek", 6] }, then: "Saturday" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: "$dayOfWeekName",
          users: {
            $push: {
              name: "$name",
              email: "$email",
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          data: {
            $push: {
              k: "$_id",
              v: "$users",
            },
          },
        },
      },
      {
        $project: {
          _id: false,
          data: {
            $arrayToObject: "$data",
          },
        },
      },
    ]);
    return res.json({
      status_code: "200",
      message: "Request successfully.",
      data: users.data,
    });
  } catch (error) {
    return res.json({
      status_code: 400,
      message: error.message,
    });
  }
}

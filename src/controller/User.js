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
          status: {},
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

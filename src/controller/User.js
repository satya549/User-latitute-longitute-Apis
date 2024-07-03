import UserModel from "../model/User.js";

export async function CreateUser(req, res) {
  try {
    const { name, email, password, address, latitude, longitude } = req.body;

    if (!name || !email || !password || !address || !latitude || !longitude) {
      throw new Error("Please provide all required fields.");
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("Email address already exist");

    const newUser = await UserModel.create({
      name,
      email,
      password,
      address,
      latitude,
      longitude,
      status: "active",
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
      },
    });
  } catch (error) {
    res.json({
      status_code: 400,
      message: error.message,
    });
  }
}
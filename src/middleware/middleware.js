import jwt from "jsonwebtoken";

const secretKey = "secretkey";

export const tokenValidator = (req, res, next) => {
  const token = req.headers["authorization"];
  try {
    if (!token) throw new Error("Token is required in header");
    const authToken = token.split(" ");

    const decoded = jwt.verify(authToken[1], secretKey);

    next();
  } catch (error) {
    return res.json({
        status_code: 401,
        success: false,
        message: error.message,
      });
  }
};

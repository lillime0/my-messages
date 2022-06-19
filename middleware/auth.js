import jwt from "jsonwebtoken";
import CustomAPIError from "../errors/custom-error.js";
// import User from "../models/User.js";

const auth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization && !authorization.startsWith("Bearer ")) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
  const token = authorization.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new CustomAPIError("Not authorized to access this route", 401);
  }
};
export default auth;

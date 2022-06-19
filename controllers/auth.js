import User from "../models/User.js";
import CustomAPIError from "../errors/custom-error.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError("Incorrect email", 401);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError("Incorrect password", 401);
  }
  const token = user.createToken();
  // user.password = undefined;
  res.status(200).json({
    user: { name: user.name, email: user.email },
    token
  });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new CustomAPIError("Email already in use", 400);
  }
  const user = await User.create({ name, email, password });
  const token = user.createToken();
  res.status(201).json({ token });
};

export const updateUser = async (req, res) => {
  const {
    user: { userId },
    body: { name, email, password }
  } = req;
  if (!name || !email || !password) {
    throw new CustomAPIError("Please provide all values", 400);
  }
  const user = await User.findOneAndUpdate(
    { _id: userId },
    { name, email, password },
    {
      new: true,
      runValidators: true
    }
  );
  const token = user.createToken();

  res.status(200).json({
    user: { name: user.name, email: user.email },
    token
  });
};

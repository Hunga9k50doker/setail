import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
const secret = "secret";
export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(404).json({ error: "User name or password is incorrect" });
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) return res.status(400).json({ message: "User name or password is incorrect" });
    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, secret, { expiresIn: "1h" });
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hasedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      username,
      password: hasedPassword,
      name: username,
    });
    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" });
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

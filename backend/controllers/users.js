import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import User from "../models/user.js";
import mongoose from "mongoose";
const secret = "setail";
export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) return res.status(404).send("User name or password is incorrect");
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) return res.status(400).json({ message: "User name or password is incorrect" });
    const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, secret, { expiresIn: "1h" });
    return res.status(200).json({ result: existingUser, token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const verifyUser = async (req, res) => {
  const { id, username, email, password, name, avatar } = req.body;
  try {
    const existingUser = await User.findOne({ id });
    if (existingUser) {
      const token = jwt.sign({ username: existingUser.username, id: existingUser._id }, secret, { expiresIn: "1h" });
      return res.status(200).json({ result: existingUser, token });
    } else {
      const hasedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        id,
        email,
        username,
        password: hasedPassword,
        name,
        avatar: avatar ?? "",
        role: 0,
      });
      const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" });
      return res.status(200).json({ result, token });
    }
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, img } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    const hasedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      id: uniqid(),
      email,
      username,
      password: hasedPassword,
      name: username,
      avatar: img ?? "",
      role: 0,
    });
    const token = jwt.sign({ username: result.username, id: result._id }, secret, { expiresIn: "1h" });
    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, name, _id } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
    const updatedProfile = { username, email, name, _id };
    const updatedResult = await User.findByIdAndUpdate(_id, updatedProfile, { new: true });
    return res.status(200).json({ result: updatedResult, token });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const updatePassword = async (req, res) => {
  const { password, newpassword, _id } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const existingUser = await User.findById(_id);
    if (!token) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) return res.status(400).json({ message: "Password is incorrect" });
    const hasedPassword = await bcrypt.hash(newpassword, 12);
    const result = await User.findByIdAndUpdate(
      _id,
      {
        password: hasedPassword,
      },
      { new: true }
    );
    return res.status(200).json({ result, token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

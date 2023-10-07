import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import uniqid from "uniqid";
import User from "../models/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.SECRET;

export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser)
      return res.status(404).send("User name or password is incorrect");
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword)
      return res
        .status(400)
        .json({ message: "User name or password is incorrect" });
    const token = jwt.sign(
      { username: existingUser.username, id: existingUser._id },
      secret,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { username: existingUser.username, id: existingUser._id, token },
      secret,
      { expiresIn: "7d" }
    );
    res.cookie("jwt", token, {
      maxAge: 1000 * 5 * 60, // 5m
      httpOnly: true, // Restrict cookie access to HTTP only
      path: "/", // Set the cookie for all paths
    });
    return res.status(200).json({ result: existingUser, token, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const verifyUser = async (req, res) => {
  const { id, username, email, password, name, avatar } = req.body;
  let token, refreshToken, result;
  try {
    result = await User.findOne({ id }).select("-password");
    if (!result) {
      const hasedPassword = await bcrypt.hash(password, 12);
      result = await User.create({
        id,
        email,
        username,
        password: hasedPassword,
        name,
        avatar: avatar ?? "",
        role: 0,
      });
    }

    token = jwt.sign({ username: result.username, id: result._id }, secret, {
      expiresIn: "5m",
    });
    refreshToken = jwt.sign(
      { username: result.username, id: result._id, token },
      secret,
      { expiresIn: "7d" }
    );
    result.password = undefined;
    return res.status(200).json({ result, token, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, img } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    const hasedPassword = await bcrypt.hash(password, 8);
    const result = await User.create({
      id: uniqid(),
      email,
      username,
      password: hasedPassword,
      name: username,
      avatar: img ?? "",
      role: 0,
    });
    const token = jwt.sign(
      { username: result.username, id: result._id },
      secret,
      { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
      { username: existingUser.username, id: existingUser._id, token },
      secret,
      { expiresIn: "7d" }
    );

    result.password = undefined;

    return res.status(200).json({ result, token, refreshToken });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateProfile = async (req, res) => {
  const { username, email, name, _id } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No user with id: ${_id}`);
    const updatedProfile = { username, email, name, _id };
    const updatedResult = await User.findByIdAndUpdate(_id, updatedProfile, {
      new: true,
    });
    return res.status(200).json({ result: updatedResult, token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getProfile = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];

  try {
    if (!token)
      return res.status(204).json({ status: 204, message: "Unauthenticated" });
    // Verify and decode the token
    const decodedToken = jwt.verify(token, secret);
    // Retrieve the user's profile from the database
    const userProfile = await User.findById(decodedToken.id).select(
      "-password"
    );
    if (!userProfile) {
      return res
        .status(404)
        .json({ status: 204, message: "User profile not found" });
    }
    return res.status(200).json({ result: userProfile });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updatePassword = async (req, res) => {
  const { password, newpassword, _id } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  try {
    const existingUser = await User.findById(_id);
    if (!token) return res.json({ message: "Unauthenticated" });
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send(`No user with id: ${_id}`);
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword)
      return res.status(400).json({ message: "Password is incorrect" });
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
    return res.status(500).json({ message: "Something went wrong" });
  }
};

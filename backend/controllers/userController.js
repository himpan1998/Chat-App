const asyncHandler = require("express-async-handler");
const User = require("../Models/userModel");
const path = require("path");
const Upload = require("../helpers/upload");

const generateToken = require("../config/generateToken");
// https://www.youtube.com/watch?v=PvjwkJduAPE
const registerUser = asyncHandler(async (req, res) => {
  const upload = await Upload.uploadFile(req.file.path);
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all required field",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User Already Exist",
      });
    }
    const user = await User.create({
      name,
      password,
      email,
      image: upload.secure_url,
    });
    const response = {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image,
      token: generateToken(user._id),
    };
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const userLogin = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const match = await user.matchPassword(password);
    if (user && match) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = { registerUser, userLogin };

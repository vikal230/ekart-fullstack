import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";
import nodemailer from "nodemailer";


export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "user already exists!" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email!" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter Stron password!" });
    }

    let hashPassword = await bcrypt.hash(password, 10);
const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const user = await User.create({ name, email, password: hashPassword });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "Strict",
      verificationCode,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log("registration error");
    return res.status(500).json({ message: `registration error ${error}` });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user already exist" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect passwors!" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout succesful!" });
  } catch (error) {
    console.log("logout error");
    return res
      .status(500)
      .json({ message: "logout error", error: error.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ name, email });
    }

    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("Google Login error:", error);
    return res
      .status(500)
      .json({ message: "Google Login failed", error: error.message });
  }
};


export const adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      let token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      return res.status(201).json(token);
    }
    return res.status(404).send({message: "error aa gya hai!"})
  } catch (error) {
   console.log("Admin login ke ander error aa gya hai!", error)
  }
};

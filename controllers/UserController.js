import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const doc = new UserModel({
      ...req.body,
      passwordHash: password,
    });

    const user = await doc.save();
    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1d" }
    );

    console.log("User created");
    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при регистрации" });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({ message: "Неверный логин или пароль" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });

    res.json({
      ...user._doc,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка авторизации" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.json({ ...user._doc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Произошла ошибка получения данных" });
  }
};

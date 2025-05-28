import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";

import { registerValidation } from "./validations/auth.js";
import { groupCreateValidation } from "./validations/group.js";
import { getMe, login, register } from "./controllers/UserController.js";
import {
  create,
  getAll,
  getOne,
  remove,
  update,
} from "./controllers/GroupController.js";

import {
  createRev,
  getAllRev,
  removeRev,
} from "./controllers/RevController.js";
import checkAuth from "./utils/checkAuth.js";

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // ← лучше ограничить явно
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const app = express();

// ВАЖНО: сначала cors, потом всё остальное
app.use(
  cors({
    origin: "*", // или массив, если нужно
    credentials: false,
  })
);
// app.options("*", cors());
app.options("/", cors());

app.use(express.json());

const storage = multer.diskStorage({
  destination: (_, file, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("tg-scaner API");
});

app.post("/auth/register", registerValidation, register);
app.post("/auth/login", login);
app.get("/auth/me", checkAuth, getMe);

app.get("/groups", getAll);
app.get("/groups/:id", getOne);
app.post("/groups", checkAuth, groupCreateValidation, create);
app.delete("/groups/:id", checkAuth, remove);
app.patch("/groups/:id", checkAuth, groupCreateValidation, update);

app.get("/reviews", getAllRev);
app.post("/reviews", checkAuth, createRev);
app.delete("/reviews/:id", checkAuth, removeRev);

app.post("/uploads", checkAuth, upload.array("image"), async (req, res) => {
  try {
    const images = req.files;
    if (!images || images.length === 0) {
      return res.status(500).json({ message: "Ошибка при загрузке файлов" });
    }

    const urls = images.map((file) => `/uploads/${file.filename}`);
    res.json({ urls });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при загрузке файлов" });
  }
});

app.listen(process.env.PORT || 4444, (err) => {
  if (err) return console.warn(`Произошла ошибка ${err}`);
  console.log("Server Work!");
});

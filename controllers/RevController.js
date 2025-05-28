import Rev from "../models/Rev.js";

export const getAllRev = async (req, res) => {
  try {
    const reviews = await Rev.find();
    res.json(reviews);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

export const createRev = async (req, res) => {
  try {
    const doc = new Rev({
      ...req.body,
    });

    await doc.save();

    res.json({ message: "Отзыв успешно создан" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при добавлении отзыва" });
  }
};

export const removeRev = async (req, res) => {
  try {
    const removed = await Rev.findOneAndDelete({
      _id: req.params.id,
    });

    if (!removed) {
      return res.status(404).json({ message: "Отзыв не найдена" });
    }

    res.json({ message: "Отзыв успешно удален" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при удалении отзыва" });
  }
};

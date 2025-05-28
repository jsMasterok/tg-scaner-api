import Group from "../models/Group.js";

export const getAll = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).json();
  }
};

export const getOne = async (req, res) => {
  try {
    const groupId = req.params.id;

    const group = await Group.findOneAndUpdate(
      { tg_id: groupId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    res.json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Ошибка при получении группы",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new Group({
      ...req.body,
    });

    await doc.save();

    res.json({ message: "Группа успешно создана" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при добавлении группы" });
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Group.findOneAndDelete({
      tg_id: req.params.id,
    });

    if (!removed) {
      return res.status(404).json({ message: "Группа не найдена" });
    }

    res.json({ message: "Группа успешно удалена" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при удалении группы" });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await Group.updateOne(
      {
        tg_id: postId,
      },
      { $set: req.body }
    );

    res.json({ message: "Данные успешно обновлены" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Ошибка при обновлении группы" });
  }
};

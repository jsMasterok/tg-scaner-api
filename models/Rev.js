import mongoose from "mongoose";

const FakeRevSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Rev", FakeRevSchema);

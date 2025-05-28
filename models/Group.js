import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
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

const GroupSchema = new mongoose.Schema(
  {
    tg_id: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    peer_type: {
      type: String,
      required: true,
    },
    username: String,
    active_usernames: {
      type: [String],
      default: [],
    },
    title: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    image100: {
      type: String,
      required: true,
    },
    image640: {
      type: String,
      required: true,
    },
    participants_count: {
      type: Number,
      required: true,
    },
    rkn_verification: {
      type: [Object],
      default: {},
    },
    tgstat_restriction: {
      type: [String],
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    reviews: {
      type: [ReviewSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Group", GroupSchema);

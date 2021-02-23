import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  videos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
  },
  preferences: {
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
  },
  isDeleted: { type: Boolean },
  isUpdated: { type: Boolean, default: false },
});

const model = mongoose.model("Comment", CommentSchema);
export default model;

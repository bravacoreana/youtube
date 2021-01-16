import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
  videoFile: {
    type: String,
    required: "Video File URL is required",
  },

  title: {
    type: String,
    required: "Title is required",
  },

  description: String,

  views: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  },

  dislikes: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  thumbnailFile: {
    type: String,
    required: "Thumbnail File URL is required",
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const model = mongoose.model("Video", VideoSchema);

export default model;

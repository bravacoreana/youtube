import mongoose from "mongoose";

const ThumbnailSchema = new mongoose.Schema({
  thumbnailFile: {
    type: String,
    required: "Thumbnail File URL is required",
  },
});

const model = mongoose.model("Thumbnail", ThumbnailSchema);

export default model;

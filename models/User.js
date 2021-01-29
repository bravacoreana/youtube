import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  googleId: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  // likeVideo: [{ type: String }],
  // dislikeVideo: [{ type: String }],
  // likeComment: [{ type: String }],
  // dislikeComment: [{ type: String }],
  preferences: {
    comments: {
      like: [{ type: String }],
      dislike: [{ type: String }],
    },
    videos: {
      like: [{ type: String }],
      dislike: [{ type: String }],
    },
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", UserSchema);

export default model;

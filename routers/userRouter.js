import express from "express";
import routes from "../routes";
import {
  getChangePassword,
  postChangePassword,
  getEditProfile,
  postEditProfile,
  userDetail,
} from "../controllers/userController";
import { multerUploadAvatar, onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(
  routes.editProfile,
  onlyPrivate,
  multerUploadAvatar,
  postEditProfile
);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;

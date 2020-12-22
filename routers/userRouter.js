import express from "express";
import routes from "../routes";
import {
  changePassword,
  editProfile,
  logout,
  userDetail,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.logout, logout);

export default userRouter;

import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, results } from "../controllers/videoController";
import {
  getSignIn,
  getSignUp,
  githubSignIn,
  googleSignIn,
  logout,
  myProfile,
  postGithubSignIn,
  postGoogleSignIn,
  postSignIn,
  postSignUp,
} from "../controllers/userController";
import { multerUploadAvatar, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.signUp, onlyPublic, getSignUp);
globalRouter.post(
  routes.signUp,
  onlyPublic,
  multerUploadAvatar,
  postSignUp,
  postSignIn
);
globalRouter.get(routes.signIn, onlyPublic, getSignIn);
globalRouter.post(routes.signIn, onlyPublic, postSignIn);

globalRouter.get(routes.home, home);
globalRouter.get(routes.results, results);
globalRouter.get(routes.logout, logout);

globalRouter.get(routes.github, githubSignIn);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.signIn }),
  postGithubSignIn
);
globalRouter.get(routes.google, googleSignIn);
globalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.signIn }),
  postGoogleSignIn
);
globalRouter.get(routes.myProfile, myProfile);

export default globalRouter;

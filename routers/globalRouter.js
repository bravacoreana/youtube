import express from "express";
import {
  getSignIn,
  getSignUp,
  postSignIn,
  postSignUp,
} from "../controllers/userController";
import { home, results } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.results, results);

globalRouter.get(routes.signUp, getSignUp);
globalRouter.post(routes.signUp, postSignUp);
globalRouter.get(routes.signIn, getSignIn);
globalRouter.post(routes.signIn, postSignIn);

export default globalRouter;

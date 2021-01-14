import express from "express";
import routes from "../routes";
import {
  postAddComment,
  postRegisterView,
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;

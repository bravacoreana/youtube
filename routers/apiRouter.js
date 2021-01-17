import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoController";
import {
  deleteComment,
  postAddComment,
} from "../controllers/commentController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, deleteComment);

export default apiRouter;

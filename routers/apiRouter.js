import express from "express";
import routes from "../routes";
import {
  postLike,
  postLikeUndo,
  postDislike,
  postDislikeUndo,
  postRegisterView,
  getLike,
  getDislike,
} from "../controllers/videoController";
import {
  deleteComment,
  postAddComment,
} from "../controllers/commentController";
import { postAccessPermission, userInfo } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.accessPermission, postAccessPermission);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.userInfo, userInfo);
apiRouter.get(routes.like, getLike);
apiRouter.post(routes.like, postLike);
apiRouter.post(routes.likeUndo, postLikeUndo);
apiRouter.get(routes.dislike, getDislike);
apiRouter.post(routes.dislike, postDislike);
apiRouter.post(routes.dislikeUndo, postDislikeUndo);
apiRouter.post(routes.deleteComment, deleteComment);

export default apiRouter;

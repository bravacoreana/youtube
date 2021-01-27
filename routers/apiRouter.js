import express from "express";
import routes from "../routes";
import {
  postLike,
  deleteLike,
  postDislike,
  postRegisterView,
  getLike,
  getDislike,
  deleteDislike,
} from "../controllers/videoController";
import {
  deleteComment,
  postLikeComment,
  postAddComment,
  postEditComment,
  deleteLikeComment,
  postDislikeComment,
  delteDislikeComment,
  commentDetails,
} from "../controllers/commentController";
import { postAccessPermission, userInfo } from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.accessPermission, postAccessPermission);
apiRouter.post(routes.userInfo, userInfo);

apiRouter.get(routes.like, getLike);
apiRouter.post(routes.like, postLike);
apiRouter.delete(routes.like, deleteLike);
apiRouter.get(routes.dislike, getDislike);
apiRouter.post(routes.dislike, postDislike);
apiRouter.delete(routes.dislike, deleteDislike);

apiRouter.post(routes.comment, postAddComment);
apiRouter.put(routes.comment, postEditComment);
apiRouter.delete(routes.comment, deleteComment);

apiRouter.get(routes.commentDetails, commentDetails);
apiRouter.post(routes.commentLike, postLikeComment);
apiRouter.delete(routes.commentLike, deleteLikeComment);
apiRouter.post(routes.commentDislike, postDislikeComment);
apiRouter.delete(routes.commentDislike, delteDislikeComment);

export default apiRouter;

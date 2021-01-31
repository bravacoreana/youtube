import express from "express";
import routes from "../routes";
import {
  postLike,
  deleteLike,
  postDislike,
  postRegisterView,
  deleteDislike,
  getPreferences,
} from "../controllers/videoController";
import {
  deleteComment,
  postLikeComment,
  postAddComment,
  postEditComment,
  deleteLikeComment,
  postDislikeComment,
  delteDislikeComment,
  getCommentPreferences,
} from "../controllers/commentController";
import {
  deleteSubscription,
  getSubscription,
  postAccessPermission,
  postSubscription,
  userInfo,
} from "../controllers/userController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post(routes.accessPermission, postAccessPermission);
apiRouter.post(routes.userInfo, userInfo);

apiRouter.get(routes.video, getPreferences);
apiRouter.post(routes.like, postLike);
apiRouter.delete(routes.like, deleteLike);
apiRouter.post(routes.dislike, postDislike);
apiRouter.delete(routes.dislike, deleteDislike);

apiRouter.get(routes.comment, getCommentPreferences);
apiRouter.post(routes.comment, postAddComment);
apiRouter.put(routes.comment, postEditComment);
apiRouter.delete(routes.comment, deleteComment);

apiRouter.post(routes.commentLike, postLikeComment);
apiRouter.delete(routes.commentLike, deleteLikeComment);
apiRouter.post(routes.commentDislike, postDislikeComment);
apiRouter.delete(routes.commentDislike, delteDislikeComment);

apiRouter.get(routes.subscription, getSubscription);
apiRouter.post(routes.subscription, postSubscription);
apiRouter.delete(routes.subscription, deleteSubscription);

export default apiRouter;

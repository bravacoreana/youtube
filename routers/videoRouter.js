import express from "express";
import routes from "../routes";
import {
  shootVideo,
  videoDelete,
  videoDetail,
  videoEdit,
  videoUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, videoUpload);
videoRouter.get(routes.shootVideo, shootVideo);
videoRouter.get(routes.detail, videoDetail);
videoRouter.get(routes.edit, videoEdit);
videoRouter.get(routes.delete, videoDelete);

export default videoRouter;

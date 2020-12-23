import express from "express";
import routes from "../routes";
import {
  getVideoUpload,
  postVideoUpload,
  shootVideo,
  videoDelete,
  videoDetail,
  videoEdit,
} from "../controllers/videoController";
import { multerUploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getVideoUpload);
videoRouter.post(routes.upload, multerUploadVideo, postVideoUpload);
videoRouter.get(routes.shootVideo, shootVideo);
videoRouter.get(routes.detail(), videoDetail);
videoRouter.get(routes.edit, videoEdit);
videoRouter.get(routes.delete, videoDelete);

export default videoRouter;

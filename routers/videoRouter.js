import express from "express";
import routes from "../routes";
import {
  getVideoEdit,
  getVideoUpload,
  postVideoEdit,
  postVideoUpload,
  shootVideo,
  videoDelete,
  videoDetail,
} from "../controllers/videoController";
import { multerUploadVideo } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getVideoUpload);
videoRouter.post(routes.upload, multerUploadVideo, postVideoUpload);
videoRouter.get(routes.shootVideo, shootVideo);
videoRouter.get(routes.detail(), videoDetail);
videoRouter.get(routes.edit(), getVideoEdit);
videoRouter.post(routes.edit(), multerUploadVideo, postVideoEdit);
videoRouter.get(routes.delete(), videoDelete);

export default videoRouter;

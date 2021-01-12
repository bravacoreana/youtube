import express from "express";
import routes from "../routes";
import {
  getShootVideo,
  getVideoEdit,
  getVideoUpload,
  postVideoEdit,
  postVideoUpload,
  videoDelete,
  videoDetail,
} from "../controllers/videoController";
import { multerUploadVideo, onlyPrivate } from "../middlewares";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getVideoUpload);
videoRouter.post(
  routes.upload,
  onlyPrivate,
  multerUploadVideo,
  postVideoUpload
);
videoRouter.get(routes.shootVideo, onlyPrivate, getShootVideo);
videoRouter.post(
  routes.shootVideo,
  onlyPrivate,
  multerUploadVideo,
  getShootVideo
);
videoRouter.get(routes.detail(), videoDetail);
videoRouter.get(routes.edit(), onlyPrivate, getVideoEdit);
videoRouter.post(routes.edit(), onlyPrivate, multerUploadVideo, postVideoEdit);
videoRouter.get(routes.delete(), onlyPrivate, videoDelete);

export default videoRouter;

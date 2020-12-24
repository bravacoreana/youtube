import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos" });
const multerThumbnail = multer({ dest: "uploads/thumbnails" });
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "NewTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1234,
  };
  res.locals.video = {
    id: 4321,
  };
  next();
};

export const multerUploadVideo = multerVideo.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]);

export const multerUploadThumbnail = multerThumbnail.single("thumbnailFile");

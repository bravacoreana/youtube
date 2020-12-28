import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos" });
const multerThumbnail = multer({ dest: "uploads/thumbnails" });
const multerAvatar = multer({ dest: "uploads/avatars" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "NewTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (!req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const multerUploadVideo = multerVideo.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]);
export const multerUploadThumbnail = multerThumbnail.single("thumbnailFile");
export const multerUploadAvatar = multerAvatar.single("avatar");

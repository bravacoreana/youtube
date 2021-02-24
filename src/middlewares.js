import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import fetch from "node-fetch"; // fetch
import routes from "./routes";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "eu-central-1",
});

const multerVideo = multer({
  storage: multerS3({ s3, acl: "public-read", bucket: "newtubebucket/video" }),
});

const multerAvatar = multer({
  storage: multerS3({ s3, acl: "public-read", bucket: "newtubebucket/avatar" }),
});
// const multerVideo = multer({ dest: "uploads/videos" });
// const multerAvatar = multer({ dest: "uploads/avatars" });

export const multerUploadVideo = multerVideo.fields([
  { name: "videoFile", maxCount: 1 },
  { name: "thumbnailFile", maxCount: 1 },
]);
export const multerUploadAvatar = multerAvatar.single("avatar");

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

const IP_TOKEN = process.env.IPINFO_TOKEN;
export const fetchData = async (req, res, next) => {
  await fetch(`https://ipinfo.io?token=${IP_TOKEN}`)
    .then((response) => response.json())
    .then((json) => {
      res.locals.countryCode = json.country;
    });
  next();
};

import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Welcome", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Welcome", videos: [] });
  }
};

export const results = async (req, res) => {
  const {
    query: { search_query: searchQuery },
  } = req;
  const videos = await Video.find({});
  res.render("results", { pageTitle: searchQuery, searchQuery, videos });
};

export const getVideoUpload = (req, res) => {
  res.render("videoUpload", { pageTitle: "Upload Video" });
};

export const postVideoUpload = async (req, res) => {
  const {
    body: { title, description },
  } = req;
  const videoFile = req.files.videoFile[0].path;
  const thumbnailFile = req.files.thumbnailFile[0].path;

  const newVideo = await Video.create({
    videoFile,
    thumbnailFile,
    title,
    description,
  });
  res.redirect(routes.detail(newVideo.id));
  // console.log(title, description, videoTest, thumbnailTest);

  // TODO: Upload and Save video
  // res.render("videoDetail", { pageTitle: "Upload Video" });
  // res.redirect(routes.detail(123123));
};

export const shootVideo = (req, res) => {
  res.render("shootVideo", { pageTitle: "Shoot Video" });
};

export const videoDetail = (req, res) => {
  res.render("videoDetail", { pageTitle: "Video Detail" });
};

export const videoEdit = (req, res) => {
  res.render("videoEdit", { pageTitle: "Edit Video" });
};

export const videoDelete = (req, res) => {
  res.render("videoDelete", { pageTitle: "Delete Video" });
};

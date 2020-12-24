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
};

export const shootVideo = (req, res) => {
  res.render("shootVideo", { pageTitle: "Shoot Video" });
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getVideoEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoEdit", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
  }
};

export const postVideoEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  const thumbnailFile = req.files.thumbnailFile[0];
  try {
    if (thumbnailFile) {
      const thumbnailFileUrl = thumbnailFile.path;
      await Video.findByIdAndUpdate(id, {
        title,
        description,
        thumbnailFile: thumbnailFileUrl,
      });
    } else {
      await Video.findByIdAndUpdate(id, {
        title,
        description,
      });
    }
    res.redirect(routes.detail(id));
  } catch (error) {
    console.log(error);
  }
};

export const videoDelete = (req, res) => {
  res.render("videoDelete", { pageTitle: "Delete Video" });
};

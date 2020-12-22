import { videos } from "../db";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Welcome", videos });
};

export const results = (req, res) => {
  const {
    query: { search_query: searchQuery },
  } = req;
  res.render("results", { pageTitle: searchQuery, searchQuery, videos });
};

export const videoUpload = (req, res) => {
  res.render("videoUpload", { pageTitle: "Upload Video" });
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

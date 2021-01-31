import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }).populate("creator");
    res.render("home", { pageTitle: "Welcome", videos });
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "Welcome",
      videos: [],
    });
  }
};

export const results = async (req, res) => {
  const {
    query: { search_query: searchQuery },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchQuery, $options: "i" },
    }).populate("creator");
  } catch (error) {
    console.log(error);
  }
  res.render("results", { pageTitle: searchQuery, searchQuery, videos });
};

export const getVideoUpload = (req, res) => {
  res.render("videoUpload", { pageTitle: "Upload Video" });
};

export const postVideoUpload = async (req, res) => {
  const {
    body: { title, description },
    files,
  } = req;
  const videoFile = files.videoFile[0].path;
  const thumbnailFile = files.thumbnailFile[0].path;
  try {
    const newVideo = await Video.create({
      videoFile,
      thumbnailFile,
      title,
      description,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.detail(newVideo.id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getShootVideo = (req, res) => {
  res.render("shootVideo", { pageTitle: "Shoot Video" });
};

// export const postShootVideo = (req, res) => {
//   const {
//     body: { title, description },
//   } = req;
//   console.log(title, description);
// };

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  Promise.all([
    Video.findOne({ _id: id })
      .populate({ path: "creator" })
      .populate({ path: "comments" }),
    Comment.find({ videos: id }).populate({ path: "creator" }),
  ])
    .then(([video, comments]) => {
      res.render("videoDetail", { pageTitle: video.title, video, comments });
    })
    .catch((error) => {
      console.log(error);
      res.redirect(routes.home);
    });

  // try {
  //   const video = await Video.findById(id).populate("creator");
  //   // .populate("comments");
  //   res.render("videoDetail", { pageTitle: video.title, video });
  //   console.log(video.comments[0].creator);
  // } catch (error) {
  //   console.log(error);
  //   res.redirect(routes.home);
  // }
};

export const getVideoEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render("videoEdit", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    console.log(error);
  }
};

export const postVideoEdit = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
    files: { thumbnailFile },
  } = req;
  try {
    if (thumbnailFile !== undefined) {
      const thumbnailFileUrl = thumbnailFile[0].path;
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

export const videoDelete = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
      const user = await User.findById(req.user.id);
      user.videos.remove(id);
      user.save();
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const getPreferences = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    if (req.user) {
      const user = await User.findById(req.user.id);
      // if (user.likeVideo.includes(id)) res.send("like");
      // else if (user.dislikeVideo.includes(id)) res.send("dislike");
      if (user.preferences.videos.like.includes(id)) res.send("like");
      else if (user.preferences.videos.dislike.includes(id))
        res.send("dislike");
    } else res.send("false");
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const postLike = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.preferences.like += 1;
    video.save();
    const user = await User.findById(req.user.id);
    // if (!user.likeVideo.includes(id)) req.user.likeVideo.push(id);
    if (!user.preferences.videos.like.includes(id))
      user.preferences.videos.like.push(id);
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const deleteLike = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    video.preferences.like -= 1;
    video.save();
    user.preferences.videos.like.remove(id);
    // req.user.likeVideo.remove(id);
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDislike = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.preferences.dislike += 1;
    video.save();
    const user = await User.findById(req.user.id);
    // if (!user.dislikeVideo.includes(id)) req.user.dislikeVideo.push(id);
    if (!user.preferences.videos.dislike.includes(id))
      user.preferences.videos.dislike.push(id);
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const deleteDislike = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    video.preferences.dislike -= 1;
    video.save();
    // req.user.dislikeVideo.splice(id, 1);
    // req.user.dislikeVideo.remove(id);
    user.preferences.videos.dislike.remove(id);
    user.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

/* eslint-disable no-plusplus */
// import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";
import User from "../models/User";

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      videos: video,
    });
    res.json({ id: newComment.id, createdAt: newComment.createdAt });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postEditComment = async (req, res) => {
  const {
    // params: { id },
    body: { newComment, commentId },
  } = req;
  try {
    // const video = await Video.findById(id).populate("comment");
    const comment = await Comment.findById(commentId).populate("creator");
    if (comment.creator.id !== req.user.id) {
      throw Error();
    } else {
      await Comment.findByIdAndUpdate(commentId, {
        text: newComment,
      });
      // await video.comment.findByIdAndUpdate(commentId);
    }
  } catch (error) {
    // res.status(204);
    console.log("It's not working");
    console.log(error);
  } finally {
    res.end();
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
  } = req;
  try {
    const video = await Video.findById(id);
    video.comments.remove(commentId);
    video.save();
    await Comment.findOneAndRemove({ _id: commentId });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

// export const getLikeComment = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     const likeArray = [];
//     const video = await Video.findById(id).populate("comments");
//     const user = await User.findById(req.user.id);
//     for (let i = 0; i < video.comments.length; i++) {
//       const cmntId = video.comments[i].id;
//       if (user.likeComment.includes(cmntId)) {
//         likeArray.push(cmntId);
//       }
//     }
//     res.json(likeArray);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     res.end();
//   }
// };

// export const getDislikeComment = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   try {
//     const dislikeArray = [];
//     const video = await Video.findById(id).populate("comments");
//     const user = await User.findById(req.user.id);
//     for (let i = 0; i < video.comments.length; i++) {
//       const cmntId = video.comments[i].id;
//       if (user.dislikeComment.includes(cmntId)) {
//         dislikeArray.push(cmntId);
//       }
//     }
//     res.json(dislikeArray);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     res.end();
//   }
// };

export const postLikeComment = async (req, res) => {
  const {
    body: { cmntId, count },
  } = req;
  try {
    const comment = await Comment.findById(cmntId);
    const user = await User.findById(req.user.id);
    if (!user.likeComment.includes(cmntId)) {
      user.likeComment.push(cmntId);
      user.save();
      comment.preferences.like += 1;
      comment.save();
    }
    res.status(200);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const deleteLikeComment = async (req, res) => {
  const {
    body: { cmntId },
  } = req;
  try {
    const comment = await Comment.findById(cmntId);
    const user = await User.findById(req.user.id);
    comment.preferences.like -= 1;
    comment.save();
    user.likeComment.remove(cmntId);
    user.save();
    res.status(200);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const postDislikeComment = async (req, res) => {
  const {
    // params: { id },
    body: { count, cmntId },
  } = req;
  try {
    const comment = await Comment.findById(cmntId);
    const user = await User.findById(req.user.id);
    if (!user.dislikeComment.includes(cmntId)) {
      user.dislikeComment.push(cmntId);
      user.save();
      comment.preferences.dislike += 1;
      comment.save();
    }
    res.status(200);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const delteDislikeComment = async (req, res) => {
  const {
    // params: { id },
    body: { cmntId },
  } = req;
  try {
    const comment = await Comment.findById(cmntId);
    const user = await User.findById(req.user.id);
    comment.preferences.dislike -= 1;
    comment.save();
    user.dislikeComment.remove(cmntId);
    user.save();
    res.status(200);
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const commentDetails = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const like = [];
    const dislike = [];
    const video = await Video.findById(id).populate("comments");
    const user = await User.findById(req.user.id);
    for (let i = 0; i < video.comments.length; i++) {
      const cmntId = video.comments[i].id;
      if (user.likeComment.includes(cmntId)) like.push(cmntId);
      if (user.dislikeComment.includes(cmntId)) dislike.push(cmntId);
    }
    res.json({ like, dislike });
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

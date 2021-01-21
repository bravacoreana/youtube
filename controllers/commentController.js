// import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

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
    res.json({ id: newComment.id });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const editComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
  } = req;
  console.log(id, commentId, res);
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

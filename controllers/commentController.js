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

export const postEditComment = async (req, res) => {
  const {
    params: { id },
    body: { newComment, commentId },
  } = req;
  try {
    const video = await Video.findById(id).populate("comment");
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

// try {
//   // const video = await Video.findById(id);
//   const comment = await Comment.findById(commentId).populate("creator");
//   if (comment.creator.id !== req.user.id) {
//     // throw Error();
//     console.log("hhzzz");
//   } else {
//     // await Comment.findByIdAndUpdate(commentId, {
//     //   text,
//     // });
//     console.log("hh");
//   }
// } catch (error) {
//   console.log(error);
// }

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

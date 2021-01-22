// GLOBAL
const HOME = "/";
const SIGN_UP = "/signUp";
const SIGN_IN = "/signIn";
const RESULTS = "/results";
const LOG_OUT = "/logout";

// USER
const USERS = "/users";
const USER_DETAIL = "/:id";
const MY_PROFILE = "/myprofile";
const EDIT_PROFILE = "/editprofile";
const CHANGE_PASSWORD = "/changePassword";

// VIDEOS
const VIDEOS = "/videos";
const VIDEO_UPLOAD = "/upload";
const SHOOT_VIDEO = "/shootVideo";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const EDIT_COMMENT = "/:id/comment-edit";
const COMMENT_UPDATE = "/:id/comment-update";
const DELETE_COMMENT = "/:id/comment/delete";
const LIKE = "/:id/like";
const LIKE_UNDO = "/:id/undo-like";
const DISLIKE = "/:id/dislike";
const DISLIKE_UNDO = "/:id/undo-dislike";
const ACCESS_PERMISSION = "/access-permission";
const USER_INFO = "/user-info";

const routes = {
  home: HOME,
  signUp: SIGN_UP,
  signIn: SIGN_IN,
  results: RESULTS,
  logout: LOG_OUT,
  users: USERS,
  userDetail: (id) => {
    if (id) {
      return `${USERS}/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: VIDEO_UPLOAD,
  detail: (id) => {
    if (id) {
      return `${VIDEOS}/${id}`;
    }
    return VIDEO_DETAIL;
  },
  edit: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  delete: (id) => {
    if (id) {
      return `${VIDEOS}/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  // shootVideo: SHOOT_VIDEO,
  shootVideo: SHOOT_VIDEO,
  myProfile: MY_PROFILE,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  editComment: EDIT_COMMENT,
  deleteComment: DELETE_COMMENT,
  like: LIKE,
  likeUndo: LIKE_UNDO,
  dislike: DISLIKE,
  dislikeUndo: DISLIKE_UNDO,
  accessPermission: ACCESS_PERMISSION,
  userInfo: USER_INFO,
  commentUpdate: COMMENT_UPDATE,
};

export default routes;

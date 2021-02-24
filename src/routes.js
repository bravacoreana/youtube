// GLOBAL
const HOME = "/";
const SIGN_UP = "/sign-up";
const SIGN_IN = "/sign-in";
const RESULTS = "/results";
const LOG_OUT = "/logout";

// USER
const USERS = "/users";
const LIKED_VIDEO = "/liked-video";
const USER_DETAIL = "/:id";
const MY_PROFILE = "/myprofile";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

// VIDEOS
const VIDEOS = "/videos";
const VIDEO_UPLOAD = "/upload";
const SHOOT_VIDEO = "/shoot-video";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// GITHUB
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// GOOGLE
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const VIDEO = "/:id/video";
const LIKE = "/:id/like";
const DISLIKE = "/:id/dislike";
const SUBSCRIPTION = "/:id/subscription";
const COMMENT = "/:id/comment";
const COMMENT_LIKE = "/:id/comment-like";
const COMMENT_DISLIKE = "/:id/comment-dislike";
const COMMENT_DETAILS = "/:id/comment-details";

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
  likedVideo: LIKED_VIDEO,
  shootVideo: SHOOT_VIDEO,
  myProfile: MY_PROFILE,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  google: GOOGLE,
  googleCallback: GOOGLE_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW,
  comment: COMMENT,
  like: LIKE,
  dislike: DISLIKE,
  accessPermission: ACCESS_PERMISSION,
  userInfo: USER_INFO,
  commentLike: COMMENT_LIKE,
  commentDislike: COMMENT_DISLIKE,
  commentDetails: COMMENT_DETAILS,
  video: VIDEO,
  subscription: SUBSCRIPTION,
};

export default routes;

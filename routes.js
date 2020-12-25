// GLOBAL
const HOME = "/";
const SIGN_UP = "/signUp";
const SIGN_IN = "/signIn";
const RESULTS = "/results";
const LOG_OUT = "/logout";

// USER
const USER = "/user";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/:id/edit";
const CHANGE_PASSWORD = "/:id/changePassword";

// VIDEOS
const VIDEO = "/video";
const VIDEO_UPLOAD = "/upload";
const SHOOT_VIDEO = "/shootVideo";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

const routes = {
  home: HOME,
  signUp: SIGN_UP,
  signIn: SIGN_IN,
  results: RESULTS,
  logout: LOG_OUT,
  user: USER,
  userDetail: (id) => {
    if (id) {
      return `${USER}/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  video: VIDEO,
  upload: VIDEO_UPLOAD,
  detail: (id) => {
    if (id) {
      return `${VIDEO}/${id}`;
    }
    return VIDEO_DETAIL;
  },
  edit: (id) => {
    if (id) {
      return `/video/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  delete: (id) => {
    if (id) {
      return `${VIDEO}/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  shootVideo: SHOOT_VIDEO,
};

export default routes;

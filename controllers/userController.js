import routes from "../routes";

export const getSignUp = (req, res) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};

export const postSignUp = (req, res) => {
  const {
    body: { avatar, name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("signUp", { pageTitle: "Sign Up" });
  }
  // TODO: Register User
  // TODO: Log User In
  res.redirect(routes.home);
};

export const getSignIn = (req, res) => {
  res.render("signIn", { pageTitle: "Sign In" });
};

export const postSignIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  res.render("logout");
};

export const user = (req, res) => {
  res.render("user");
};

export const userDetail = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail" });
};

export const editProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const changePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Chage Password" });
};

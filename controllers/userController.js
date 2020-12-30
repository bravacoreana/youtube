import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getSignUp = (req, res) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};

export const postSignUp = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  // TODO: Give Avatar Url
  if (password !== password2) {
    res.status(400);
    res.render("signUp", { pageTitle: "Sign Up" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getSignIn = (req, res) => {
  res.render("signIn", { pageTitle: "Sign In" });
};

export const postSignIn = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.signIn,
});
export const githubSignIn = passport.authenticate("github");

export const githubSignInCallback = async (
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { id, name, avatar_url: avatarUrl, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubSignIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const myProfile = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit Profile" });
};

export const postEditProfile = async (req, res) => {
  console.log(req.user.id);
  console.log(req.body);
  const {
    body: { name, email },
  } = req;
  console.log(name, email);
  // try {
  //   await User.findByIdAndUpdate(req.user.id, {
  //     name,
  //     email,
  //     avatarUrl: file ? file.path : req.user.avatarUrl,
  //   });
  //   res.redirect(routes.myProfile);
  // } catch (error) {
  //   res.redirect(routes.home);
  // }
};

export const changePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Chage Password" });
};

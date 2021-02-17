import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";

export const getSignUp = (req, res) => {
  res.render("signUp", { pageTitle: "Sign Up" });
};

export const postSignUp = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
    file,
  } = req;

  if (password !== password2) {
    res.status(400);
    res.render("signUp", { pageTitle: "Sign Up" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: file
          ? file.path
          : "https://static1.squarespace.com/static/5b47794f96d4553780daae3b/5b4911e888251bc248f72092/5b491753aa4a995f4ea81a9b/1557777464536/profile-placeholder.jpg?format=1500w",
      });
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
      user.name = name;
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

export const googleSignIn = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleSignInCallback = async (
  request,
  accessToken,
  refreshToken,
  profile,
  cb
) => {
  const {
    _json: { sub, name, picture, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = sub;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: sub,
      avatarUrl: picture,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleSignIn = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("myProfile", { pageTitle: "My Profile", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    // const user = await User.findOne({ _id: id }).populate("videos");
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
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.myProfile);
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getChangePassword = (req, res) => {
  res.render("changePassword", { pageTitle: "Change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPasswordVerify },
  } = req;
  try {
    if (newPassword !== newPasswordVerify) {
      res.status(400);
      res.redirect(routes.users + routes.changePassword);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.myProfile);
  } catch (error) {
    res.status(400);
    res.redirect(routes.users + routes.changePassword);
  }
};

export const postAccessPermission = (req, res) => {
  const { user } = req;
  user.id ? res.status(200) : res.status(204);
  res.end();
};

export const userInfo = (req, res) => {
  const { user } = req;
  if (user) {
    res.json({
      username: user.name,
      avatarUrl: user.avatarUrl,
    });
    res.status(200);
  } else {
    res.status(204);
  }
  res.end();
};

export const getSubscription = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    if (req.user) {
      const video = await Video.findById(id).populate("creator");
      const user = await User.findById(req.user.id);
      if (req.user.id === video.creator.id) res.send("none");
      else if (user.subscriptions.includes(video.creator.id)) {
        res.send("true");
      } else res.send("false");
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const postSubscription = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    const user = await User.findById(req.user.id);
    if (!user.subscriptions.includes(video.creator)) {
      const videoCreator = await User.findById(video.creator);
      videoCreator.channel.subsCount += 1;
      videoCreator.save();
      user.subscriptions.push(video.creator);
      user.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

export const deleteSubscription = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    const user = await User.findById(req.user.id);
    if (user.subscriptions.includes(video.creator)) {
      const videoCreator = await User.findById(video.creator);
      videoCreator.channel.subsCount -= 1;
      videoCreator.save();
      user.subscriptions.remove(video.creator);
      user.save();
    }
  } catch (error) {
    console.log(error);
  } finally {
    res.end();
  }
};

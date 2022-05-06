const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", {
    pageTitle: "ورود به بخش مدیریت",
    path: "/login",
    message: req.flash("success_message"), //? key
    error: req.flash("error"), //? passport
  });
};

exports.handleLogin = (req, res, next) => {
  passport.authenticate("local", {
    // successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

exports.rememberMe = (req, res) => {
  if (req.body.remember) {
    req.session.cookie.originalMaxAge = 24 * 60 * 60 * 1000; //24 Hours
  } else {
    req.session.cookie.expire = null; //
  }
  res.redirect("/dashboard");
};

exports.logOut = (req, res) => {
  req.logout();
  req.flash("success_message", "خروج موفقیت آمیز بود.");
  res.redirect("/users/login");
};

exports.register = (req, res) => {
  res.render("register", {
    pageTitle: "ثبت نام کاربر جدید",
    path: "/register",
  });
};

exports.createUser = async (req, res) => {
  const errors = [];
  try {
    await User.userValidation(req.body);
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      errors.push({
        name: "duplicate user",
        message: "کاربری با این ایمیل موجود است",
      });
      return res.render("register", {
        pageTitle: "ثبت نام کاربر جدید",
        path: "/register",
        errors,
      });
    }

    //* For hash the password, we have 2 ways
    //? First Way:
    const hash = await bcrypt.hash(password, 10);
    await User.create({ fullname, email, password: hash });
    req.flash("success_message", "ثبت نام شما موفقیت آمیز بود"); //? key,value
    res.redirect("/users/login");
    //? second Way:
    // bcrypt.genSalt(10, (err, salt) => {
    //   if (err) throw err;
    //   bcrypt.hash(password, salt, async (err, hash) => {
    //     if (err) throw err;
    //     await User.create({ fullname, email, password: hash });
    //     res.redirect("/users/login");
    //   });
    // });
    //! /////////////////////////////////////////////////////////////////
    //* For create in database, we have 2 ways
    //? First Way:
    // await User.create(req.body);
    // res.redirect("/users/login");
    //? Second Way:
    // const newUser = new User({ fullname, email, password });
    // newUser
    //   .save()
    //   .then((nUser) => {
    //     console.log(nUser);
    //     res.redirect("/users/login");
    //   })
    //   .catch((err) => {
    //     if (err) {
    //       throw err;
    //     }
    //   });
  } catch (error) {
    error.inner.forEach((err) => {
      errors.push({ name: err.type, message: err.message });
    });

    return res.render("register", {
      pageTitle: "ثبت نام کاربر جدید",
      path: "/register",
      errors,
    });
  }
};

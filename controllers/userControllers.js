const bcrypt = require("bcryptjs");

const User = require("../models/User");

exports.login = (req, res) => {
  res.render("login", {
    pageTitle: "ورود به بخش مدیریت",
    path: "/login",
    message: req.flash("success_message"),
  });
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
    req.flash("success_message", "ثبت نام شما موفقیت آمیز بود");
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

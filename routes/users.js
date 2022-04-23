const { Router } = require("express");
const Yup = require("Yup");

const router = new Router();

const schema = Yup.object().shape({
  fullname: Yup.string().min(4).max(255).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(255).required(),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), null]),
});

// @desc: login page
// route: GET /users/login
router.get("/login", (req, res) => {
  res.render("login", { pageTitle: "ورود به بخش مدیریت", path: "/login" });
});

// @desc: register page
// route: GET /users/register
router.get("/register", (req, res) => {
  res.render("register", {
    pageTitle: "ثبت نام کاربر جدید",
    path: "/register",
  });
});

// @desc: register hndle
// route: POST /users/register
router.post("/register", (req, res) => {
  //   const validator = schema.isValid(req.body);
  //   validator
  //     .then((result) => {
  //       if (result === true) {
  //         res.send("All Good");
  //       } else {
  //         res.send("Not Valid");
  //       }
  //     })
  //     .catch((error) => {
  //       res.send("Error");
  //       console.log(error);
  //     });

  schema
    .validate(req.body)
    .then((result) => {
      console.log(result);
      res.send("Is valid");
    })
    .catch((err) => {
      console.log(err);
      res.send("Not Valid");
    });
});
module.exports = router;

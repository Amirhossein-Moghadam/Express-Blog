const { Router } = require("express");

const { authenticated } = require("../middlewares/auth");

const router = new Router();

// @desc: dashboard
// @route: GET /dashboard
router.get("/", authenticated, (req, res) => {
  res.render("dashboard", {
    pageTitle: "بخش مدیریت | داشبورد",
    path: "/dashboard",
    layout: "./layouts/dashboardLayout",
    fullname: req.user.fullname,
  });
});

module.exports = router;

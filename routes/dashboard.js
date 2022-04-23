const { Router } = require("express");

const router = new Router();

// @desc: dashboard
// @route: GET /dashboard
router.get("/", (reg, res) => {
  res.render("dashboard", {
    pageTitle: "بخش مدیریت | داشبورد",
    path: "/dashboard",
    layout: "./layouts/dashboardLayout",
  });
});

module.exports = router;

const { Router } = require("express");

const router = new Router();

// @desc: blog landing page
// @route: GET /
router.get("/", (req, res) => {
  res.render("index", { pageTitle: "وبلاگ", path: "/" });
});

module.exports = router;

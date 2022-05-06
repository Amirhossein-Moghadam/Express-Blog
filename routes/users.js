const { Router } = require("express");

const userControllers = require("../controllers/userControllers");
const { authenticated } = require("../middlewares/auth");

const router = new Router();

// @desc: login page
// route: GET /users/login
router.get("/login", userControllers.login);

// @desc: login handle
// route: POST /users/login
router.post("/login", userControllers.handleLogin, userControllers.rememberMe);

// @desc: logout handle
// route: GET /users/login
router.get("/logout", authenticated, userControllers.logOut);

// @desc: register page
// route: GET /users/register
router.get("/register", userControllers.register);

// @desc: register hndle
// route: POST /users/register
router.post("/register", userControllers.createUser);

module.exports = router;

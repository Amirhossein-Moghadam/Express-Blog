const { Router } = require("express");

const userControllers = require("../controllers/userControllers");

const router = new Router();

// @desc: login page
// route: GET /users/login
router.get("/login", userControllers.login);

// @desc: register page
// route: GET /users/register
router.get("/register", userControllers.register);

// @desc: register hndle
// route: POST /users/register
router.post("/register", userControllers.createUser);

module.exports = router;

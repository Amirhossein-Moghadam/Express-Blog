const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const passport = require("passport");
const dotEnv = require("dotEnv");
const morgan = require("morgan");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blog");
const usersRoutes = require("./routes/users");
const dashboardRoutes = require("./routes/dashboard");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database Connection
connectDB();

//* Passport Configuration
require("./config/passport");

//* App
const app = express();

//* Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//* View Engine
app.use(expressLayout);
app.set("view engine", "ejs");
app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//* Body Parser
app.use(express.urlencoded({ extended: false }));

//* Session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//* Passport
app.use(passport.initialize());
app.use(passport.session());

//* Flash
app.use(flash()); //req.flash

//* Static Folders
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use("/", blogRoutes);
app.use("/users", usersRoutes);
app.use("/dashboard", dashboardRoutes);

//* 404 pagee
app.use((req, res) => {
  res.render("404", {
    pageTitle: "صفحه مورد نظر یافت نشد | 404",
    path: "/404",
  });
});

//* Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

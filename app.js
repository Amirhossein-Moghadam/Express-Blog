const path = require("path");

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotEnv");
const morgan = require("morgan");

const connectDB = require("./config/db");
const blogRoutes = require("./routes/blog");
const usersRoutes = require("./routes/users");
const dashboardRoutes = require("./routes/dashboard");

//* Load Config
dotEnv.config({ path: "./config/config.env" });

//* Database Connection
connectDB();

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

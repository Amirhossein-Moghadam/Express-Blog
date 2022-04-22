const path = require("path");

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const dotEnv = require("dotEnv");
const morgan = require("morgan");

const connectDB = require("./config/db");
const indexRoutes = require("./routes");

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
// app.set("layout", "./layouts/mainLayout");
app.set("views", "views");

//* Static Folders
app.use(express.static(path.join(__dirname, "public")));

//* Routes
app.use(indexRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

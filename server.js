const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const helmet = require("helmet");
require("ejs");
const xss = require("xss-clean");
const morgan = require("morgan");
// const rateLimit = require("express-rate-limit");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const userRoute = require("./routes/routes");
const pagesRoute = require("./routes/pages.routes");

app.set("view engine", "ejs");
app.use(cors());
//set security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Prevent XSS attacks
app.use(xss());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoute);
app.use("/", pagesRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("connection to database fail " + err.message);
  });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("message", ({ user, message }) => {
    io.emit("message", { user, message });
  });
});

const port = process.env.PORT || 4001;

http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

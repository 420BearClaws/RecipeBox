const express = require("express");
const path = require("path");
var mongoose = require("mongoose");
var session = require("express-session");

//declaring routers
const homeRouter = require("./routes/home");
const signupRouter = require("./routes/signup");
const myrecipesRouter = require("./routes/myrecipes");
const publicrecipesRouter = require("./routes/publicrecipes");
const recipesRouter = require("./routes/recipes");
const recipes2Router = require("./routes/recipes2");
const recipes3Router = require("./routes/recipes3");
const recipes4Router = require("./routes/recipes4");
const recipes5Router = require("./routes/recipes5");
const recipes6Router = require("./routes/recipes6");

const app = express();
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));

//use sessions for tracking logins
app.use(
  session({
    secret: "420BearClaws",
    resave: true,
    saveUninitialized: false
  })
);

//mongodb connection
mongoose.connect("mongodb://localhost:27017/bookworm");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

//creating a port
const debug = require("debug")("420BC:server");
const http = require("http");
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
//end create port

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//using routers
app.use("/", homeRouter);
app.use("/", myrecipesRouter);
app.use("/", publicrecipesRouter);
app.use("/", signupRouter);
app.use("/", recipesRouter);
app.use("/", recipes2Router);
app.use("/", recipes3Router);
app.use("/", recipes4Router);
app.use("/", recipes5Router);
app.use("/", recipes6Router);
module.exports = app;

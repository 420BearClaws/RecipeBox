const express = require("express");
const path = require("path");
var mongoose = require("mongoose");
var session = require("express-session");
var bodyParser = require("body-parser");
const app = express();
const Userrecipes = require("./models/userrecipes");
const moment = require("moment");
const User = require("./models/user");

console.log("Initializing Mongoose Test");

let connection_string =
  "mongodb://127.0.0.1:27017/mongoose_test_app?retryWrites=true&w=majority";

mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useNewUrlParser", true);

//Returning a Javascript Promise
mongoose
  .connect(connection_string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(error => {
    console.log("An error has occured: ", error);
  });

//declaring routers
const homeRouter = require("./routes/home");
const signupRouter = require("./routes/signup");
const myrecipesRouter = require("./routes/myrecipes");
const publicrecipesRouter = require("./routes/publicrecipes");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");
const recipesRouter = require("./routes/recipes");
const recipes2Router = require("./routes/recipes2");
const recipes3Router = require("./routes/recipes3");
const recipes4Router = require("./routes/recipes4");
const recipes5Router = require("./routes/recipes5");
const recipes6Router = require("./routes/recipes6");
const logoutRouter = require("./routes/logout");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

// make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userID;
  next();
});

//mongodb connection
mongoose.connect(
  "mongodb://127.0.0.1:27017/mongoose_test_app?retryWrites=true&w=majority"
);
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
app.use("/", loginRouter);
app.use("/", profileRouter);
app.use("/", recipesRouter);
app.use("/", recipes2Router);
app.use("/", recipes3Router);
app.use("/", recipes4Router);
app.use("/", recipes5Router);
app.use("/", recipes6Router);
app.use("/", logoutRouter);
// Glade's tinkering

// connect to the db and start the express server
let dataVar;
mongoose.connect(connection_string, (err, database) => {
  if(err) {
    return console.log(err);
  }
  dataVar = database;
  // start the express web server listening on 8080
  app.listen(8080, () => {
    console.log('listening on 8080');
  });
});
// serve the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/layout.pug');
});
// add a document to the DB collection recording the click event
app.post('/flagged', (req, res) => {
  const flag = {clickTime: new Date()};
  console.log(flag);
  console.log(dataVar);

  dataVar.collection('flags').save(flag, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('flag added to db');
    res.sendStatus(201);
  });
});
//clickins
app.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);
  console.log(dataVar);

  dataVar.collection('clicks').save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('click added to db');
    res.sendStatus(201);
  });
});

// get the click data from the database
app.get('/flags', (req, res) => {
  dataVar.collection('flags').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});
//clickins
app.get('/clicks', (req, res) => {
  dataVar.collection('clicks').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

//done tinkering
module.exports = app;

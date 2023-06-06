const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv/config");
const port = process.env.PORT || 8000;
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/mongoose");

//passport related imports
const passport = require("passport");
const passportGoogle = require("./config/passport-google-oauth2-strategy.js");
const passportGithub = require("./config/passport-github2-strategy");
const passportLocal = require("./config/passport-local-strategy");

//used for session cookie
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

//chat server setup to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);
console.log("chat server listening on port 5000");

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("./assets"));
//make uploads folder available to browser
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(expressLayouts);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");
//mongo store is used to store session cookie in db
app.use(
  session({
    name: "blueBird",
    secret: "somesecretkey",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },

    store: MongoStore.create({
      mongoUrl: db._connectionString,
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use("/", require("./routes"));
app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});

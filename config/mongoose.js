const mongoose = require("mongoose");

const DB_NAME = "Manraj-SocialMediaApp";
mongoose.connect(`${process.env.MONGO_URL}${DB_NAME}`);

const db = mongoose.connection;
mongoose.set("strictQuery", false);
db.on(
  "error",
  console.error.bind(console, "Error while connecting to mongoDB")
);

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;

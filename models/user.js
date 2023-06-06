const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const AVATAR_PATH = path.join("/uploads/users/avatars");
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      default: "personal",
      required: true,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    avatar: {
      type: String,
    }, //to implement friend request feature
    friendList: [
      {
        userid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        status: {
          // "Sent" / "Received" / "Friends"
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

let userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    // console.log('file');
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "AVATAR" + "." + file.mimetype.split("/")[1]);
  },
});

//static function
userSchema.statics.uploadedAvatar = multer({ storage: userStorage }).single(
  "avatar"
);
userSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", userSchema);

module.exports = User;

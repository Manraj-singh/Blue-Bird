const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

//tell pasport to use new google startegy
passport.use(
  new googleStrategy(
    {
      clientID: process.env.PASSPORT_google_clientID,
      clientSecret: process.env.PASSPORT_google_clientSecret,
      callbackURL: process.env.PASSPORT_google_callbackURL,
    },
    function (accessToken, refreshToken, profile, done) {
      //find the user in db
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log("error in google startegy", err);
          return;
        }

        if (user) {
          //if found ,set user as req.user
          return done(null, user);
        } else {
          //if not found create user in db and set as req.user
          User.create(
            {
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(20).toString("hex"),
            },
            function (err, user) {
              if (err) {
                console.log("error in google startegy", err);
                return;
              }
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

module.exports = passport;

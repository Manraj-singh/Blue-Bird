const passport = require('passport');
const githubStrategy = require('passport-github2').Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//tell pasport to use new google startegy
passport.use(new githubStrategy({
    clientID: "c1c46ac3230a11257591",
    clientSecret: "bb3ccd43c4db87e9a2504f7f5ebc7941e09615d0",
    callbackURL: "http://localhost:8000/users/auth/github/callback"
},
    function (accessToken, refreshToken, profile, done) {

        //find the user in db
        console.log("prof", profile);
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
            if (err) {
                console.log('error in github startegy', err); return;
            }



            if (user) {
                //if found ,set user as req.user
                return done(null, user);
            } else {
                //if not found create user in db and set as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('error in github startegy', err); return;
                    }
                    return done(null, user);
                });
            }
        })
    }

));

module.exports = passport;
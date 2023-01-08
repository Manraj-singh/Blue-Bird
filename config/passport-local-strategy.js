const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    //this is syntax whichask for unique field here email is unique
    usernameField: 'email',
    //setting this true passes req object to callback
    passReqToCallback: true
},
    //whenever localstrategy is called email and password will be passed on
    function (req, email, password, done) {
        //find a user and establish identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                req.flash('error', "Error ! user not found")
                return done(err);
            }

            if (!user || user.password != password) {
                req.flash('error', "Invalid username /Password")
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

//serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function (user, done) {
    return done(null, user.id);
})
//deserializing the user from the key cookie
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log('error in finding user:>passport');
            return done(err);
        }
        return done(null, user);
    })
});


//check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
    //if user is signed in ,then pass on requeststo next fnction ie. controller
    if (req.isAuthenticated()) {
        return next();
    }
    //ifuser is not signed in
    return res.redirect('/users/sign-in');

};

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contains current signed in user  from session cookie and we just set it to locals for the views
        res.locals.user = req.user;
    }
    next();
};


module.exports = passport;
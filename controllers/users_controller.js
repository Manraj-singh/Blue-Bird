const User = require('../models/user');


// render the sign in  /signup page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/home')
    }
    return res.render('user_sign_in');

}


// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.error.bind('error in finding user in signing up',err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){console.log('error in creating user while signing up',err); return}
                // return res.redirect('/');
                req.flash('success','you have signed up , log in to continue');
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error','user already exists, login to continue');
            return res.redirect('back');
        }

    });
}


// // sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success','Login successful')
    return res.redirect('/home');

}

module.exports.destroySession = function(req,res){
    
    req.logout(function(err) {
        if (err) { console.log('error while loggin out',err);return; }
        req.flash('success','You have logged out');
        res.redirect('/users/sign-in');
      });
}
 

    

    

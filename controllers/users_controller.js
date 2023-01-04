const User = require('../models/user');


// render the sign in  /signup page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        
        return res.redirect('/')
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
    console.log('auth',req.user.userType);
    if(req.user.userType ==='organization'){

        return res.redirect('/organization');
    }else{

        return res.redirect('/home');
    }

}

module.exports.destroySession = function(req,res){
    
    req.logout(function(err) {
        if (err) { console.log('error while loggin out',err);return; }
        req.flash('success','You have logged out');
        res.redirect('/users/sign-in');
      });
}
 

//friendship related functions

module.exports.sendFriendRequest = async function(req, res){
    try{

        // console.log("sender : " + req.user.id);
        // console.log("receiver : " + req.params.id);

        let sender = await User.findById(req.user.id);
        let receiver = await User.findById(req.params.id);


        let senderObj = {
            userid : req.params.id,
            status : "Send"
        }
        let receiverObj = {
            userid : req.user.id,
            status : "Receive"
        }

        sender.friendList.push(senderObj);
        sender.save();

        receiver.friendList.push(receiverObj);
        receiver.save();

        req.flash('success', "Friend Request Sent Successfully");
        return res.redirect('back');
        
    }
     
    catch(error){
        req.flash('error', error);
        return res.status(500).send(error);
    }
}

module.exports.acceptFriendRequest = async function(req, res){
    try{


        let acceptor = await User.findOne({_id : req.user.id});
        let requestor = await User.findOne({_id : req.params.id});

        //let's update the model

        acceptor.friendList.forEach((data) => {
            //if the request's userid and data's userid matches , make them friends 
            if(data.userid == req.params.id){
                data.status = "Friends";
            }
        });
        acceptor.save();

        requestor.friendList.forEach((data) => {
            // console.log(data);
            if(data.userid == req.user.id){
                data.status = "Friends";
            }
        });
        requestor.save();

        req.flash('success', "Friend Request Accepted Successfully");
        return res.redirect('back');
        
    }
     
    catch(error){
        req.flash('error', error);
        return res.redirect('back');
    }
}

module.exports.removeFriendRequest = async function(req, res){
    try{
    console.log(`${req.user.id} wants to remove ${req.params.id} as a friend`);

    await User.findByIdAndUpdate(req.user.id, { $pull: {friendList: {userid : req.params.id}}});
    await User.findByIdAndUpdate(req.params.id, { $pull: {friendList: {userid:req.user.id}}});
    req.flash('success', "Friend Request Removed/Cancelled Successfully");
    return res.redirect('back');   
    }
catch(error){
    req.flash('error', error);
    return res.status(500).send(error);
}
}



    

const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// Rendering profile pages
module.exports.profile = async function (req, res) {
    let user = await User.findById(req.params.id).populate('friendList')
    let allUsers = await User.find({})


    return res.render('user_profile', {
        title: 'User Profile',
        profile_user: user
    });


}


// Controlller for updating users profile
module.exports.updateProfile = async function (req, res) {


    if (req.user.id == req.params.id) {

        try {

            let user = await User.findById(req.params.id);

            User.uploadedAvatar(req, res, function (err) {
                if (err) { console.log('error while uploading avatar', err); }
                if (req.file) {

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                console.log(req.body);
                console.log(req.file);
                user.name = req.body.name
                user.email = req.body.email
                user.phone = req.body.phone
                user.gender = req.body.gender

                user.save().then(function () {
                    req.flash('success', "Profile updated successfully");
                    return res.redirect('back');
                })

            })

        } catch (err) {
            req.flash('error', err);
            console.log(err);
            return res.redirect('back');
        }


    } else {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}
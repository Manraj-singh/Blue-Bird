const Post = require('../models/posts');
const User = require('../models/user');
const Like = require('../models/like');
const Comment = require('../models/comments');
const fs = require('fs');
const path = require('path')
//creating post
module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id,
            userType:req.user.userType
        });

 
        req.flash('success','Post published');
        return res.redirect('back');
    }catch(err){
        console.log(err);
        req.flash('error','Error while creating post');
        return res.redirect('back');
    }
     
}
//below controller uploads image/video to post db
module.exports.uploadPost = function(req, res){
    try{ 

        Post.uploadedPost(req, res, async function(err){
         
            if (err) {console.error.bind('*****Multer Error: ', err)}
            if(req.file){
               
                let fileType= req.file.mimetype.split("/")[0];
                let post = {
                    content: req.body.content,
                    user: req.user._id,
                    file:Post.postPath + '/' + req.file.filename,
                    postType:fileType,

                };

                let newPost = await Post.create(post);
    
            req.flash('success', 'Post uploaded!');
            return res.redirect('back');
            }else{
                req.flash('error', 'Error while uploading');
            return res.redirect('back');
            }

            
            
        }); 

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}
     


//deletes the post of user along with associated comments
module.exports.destroy = async function(req, res){
    try{
        let post  = await Post.findById(req.params.id);
        if (post.user == req.user.id){
            //gets the path of post file and deleted is from uploads folder
            if(post.file){
                fs.unlinkSync(path.join(__dirname,'..',post.file));
            }

            //deleting likes associaled wit post and comments on post deletion
            await Like.deleteMany({likeable:post,onModel:'Post'})
            await Like.deleteMany({_id:{$in:post.comments}});
            post.remove();
            req.flash('success','Post Deleted');
            
            await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');

        }else{
            req.flash('error','you cannot delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error','error while deleting post');
        return console.error.bind('error',err);
    }
   
}
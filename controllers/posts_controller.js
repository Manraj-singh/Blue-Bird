const Post = require('../models/posts');
const Comment = require('../models/comments');

module.exports.create = function(req, res){
    try{
        Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        req.flash('success','Post published');
        return res.redirect('back');
    }catch(err){
        req.flash('error','Error while creating post');
        return res.redirect('back');
    }
     
}


module.exports.destroy = async function(req, res){
    try{
        let post  = await Post.findById(req.params.id)

        if (post.user == req.user.id){
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
        return console.log('error',err);
    }
   
}
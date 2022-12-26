const Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.create = function(req, res){
    //using callbacks
    Post.findById(req.body.post, function(err, post){

        if (post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function(err, comment){
                // handle error
                //comment is pushed to post schema
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            });
        }

    });
}


module.exports.destroy =async function(req, res){
    //using async await
    try{
        let comment = await Comment.findById(req.params.id)

    if (comment.user == req.user.id){

        let postId = comment.post;

        comment.remove();

        let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
        return res.redirect('back');
        
    }else{
            return res.redirect('back');
        }
    }catch(err){
            console.log('error',err);
        }
}
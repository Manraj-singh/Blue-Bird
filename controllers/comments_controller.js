const Comment = require('../models/comments');
const Post = require('../models/posts');
const Like = require('../models/like');

module.exports.create = function (req, res) {
    //using callbacks
    Post.findById(req.body.post, function (err, post) {

        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                // handle error
                if (err) { req.flash('error', 'Error while adding comment'); }
                //comment is pushed to post schema
                post.comments.push(comment);
                post.save();
                req.flash('success', 'Comment Added');
                res.redirect('back');
            });
        }

    });
}


module.exports.destroy = async function (req, res) {
    //using async await
    try {
        let comment = await Comment.findById(req.params.id)

        if (comment.user == req.user.id) {

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            //destroy associated like for this comment


            let test = await Like.deleteMany({ likeable: comment._id, onModel: 'Comment' })


            // await Like.deleteMany({likeable: post, onModel: 'Post'});
            // await Like.deleteMany({_id: {$in: comment.likes}});

            req.flash('success', 'Comment deleted');
            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log(err);
        req.flash('error', 'Error while deleting comment');
    }
}
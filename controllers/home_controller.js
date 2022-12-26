const User = require('../models/user');
const Posts = require('../models/posts');


module.exports.home = async function(req, res){
   
    try{
        let posts = await Posts.find({}).populate('user')
        .populate({
         path:'comments',
         populate:{
             path:'user'
         }
        });  
        return res.render('home', {
            title: "Blue Bird App",
            posts:posts
        })
        
    }catch(err){
        console.log('error',err);
    }
    
}
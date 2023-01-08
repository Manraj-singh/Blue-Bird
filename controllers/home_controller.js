const User = require('../models/user');
const Posts = require('../models/posts');
const Like = require('../models/like');


module.exports.home = async function(req, res){
   
    try{
        // populate the user of each post
        // if(req.user.userType ==='organization'){

        //     return res.redirect('/organization');
        // }
        let posts = await Posts.find({userType:'personal'})
        .sort('-createdAt')
        .populate('user')
        .populate('likes')
        .populate({
            path:'comments',
            options:{
               sort:{
                   'createdAt':-1
               }
            }
           }) .deepPopulate('comments.user comments.likes')



        //let posts = await Posts.find({}).sort('-createdAt').populate('user')
        // .populate({
        //  path:'comments',
        //  populate:{
        //      path:'user likes'
        //  },
        //  options:{
        //     sort:{
        //         'createdAt':-1
        //     }
        //  }
        // })
        // .populate({
        //     path:'likes',
        //     // populate:{
        //     //     path:'likeable',
        // //    model:'Like' 
              
        // //     }
        // })

        let users = await User.find({ _id: { $ne: req.user.id } ,userType:'personal'}).sort('-createdAt');
        
        // let usersNotfriends = users.filter((usr)=>{
        //     return usr.status
        // })


        posts.forEach(post=>{
            let likes =[] ,loves=[],sads=[],angrys=[],wows=[];
            post.likes.forEach(like => {
                switch (like.reaction) {
                    case 'Like':
                        likes.push(like.user)
                        break;
                    case 'Love':
                        loves.push(like.user)
                        break;

                    case 'Sad':
                        sads.push(like.user)
                        break;
                    case 'Angry':
                        angrys.push(like.user)
                        break;
                    case 'Wow':
                        wows.push(like.user)
                        break;
                    
                    default:
                        break;
                }
            })

            post.emojiData={
                post_id : post._id,
                like : likes,
                love:loves,
                sad : sads,
                angry : angrys,
                wow: wows
            }

            post.save()
           
        })
        let fList , sendList,receiveList,currentUser
        if(req.user){
             currentUser = await User.findById(req.user._id);
            
            let myFriendList = currentUser.friendList;
            //setting flist to be users which are friends
            fList = myFriendList.filter((ele) => {
               return ele.status == "Friends"
            });
            //filling flist to contain only userids instead of whole obj
            fList = fList.map(a => a.userid.toString());

            sendList = myFriendList.filter((ele) => {
                return ele.status == "Send"
            });

             sendList = sendList.map(a=> a.userid.toString());

        
            receiveList = myFriendList.filter((ele) => {
                return ele.status == "Receive"
            });
            receiveList = receiveList.map(a=> a.userid.toString());


        }

        //for comment likes
        posts.forEach(postEle =>{
        
            // console.log(postEle);
            postEle.comments.forEach(ele => {

                let csad = ele.likes.filter((a) => {
                    return a.reaction == "Sad"
                 });
                csad = csad.map(a=> a.user);
        
                let cwow = ele.likes.filter((a) => {
                    return a.reaction == "Wow"
                 });
                cwow = cwow.map(a=> a.user);
        
                let clove = ele.likes.filter((a) => {
                    return a.reaction == "Love"
                 });
                clove = clove.map(a=> a.user);
        
                let cangry = ele.likes.filter((a) => {
                    return a.reaction == "Angry"
                 });
                cangry = cangry.map(a=> a.user);
        
                let clike = ele.likes.filter((a) => {
                    return a.reaction == "Like"
                 });
                clike = clike.map(a=> a.user);
        
        
                   ele.commentEmojiData =  {
                    post_id : ele._id,
                    sad : csad,
                    wow: cwow,
                    love:clove,
                    like : clike,
                    angry : cangry
                    
                }
                   ele.save();
                //    console.log("print ele",ele);
                //    console.log("print ele",ele.emojiData);
                   
            });
            // postEle.save();
            
        });
        if(req.user.userType==='organization'){
            // return res.render('organization', {
            //     title: "Blue Bird App",
            //     posts:posts,
            //     currentUser:currentUser,
            //     allUsers:users,
            //     fList:fList,
            //     sendList:sendList,
            //     receivedList:receiveList
            // });
            
        }
        
        let displayInput =false;
        if(req.user.userType==='personal'){
            displayInput=true;
        }
        return res.render('home', {
            title: "Blue Bird App",
            posts:posts,
            currentUser:currentUser,
            allUsers:users,
            fList:fList,
            sendList:sendList,
            receivedList:receiveList,
            displayInput:displayInput
        });
        
    }catch(err){
        console.log('error',err);
    }
    
}
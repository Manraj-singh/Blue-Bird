const User = require('../models/user');
const Posts = require('../models/posts');


module.exports.home = async function(req, res){
   
    try{
        let posts = await Posts.find({}).sort('-createdAt').populate('user')
        .populate({
         path:'comments',
         populate:{
             path:'user'
         },
         options:{
            sort:{
                'createdAt':-1
            }
         }
        });
        let users = await User.find({ _id: { $ne: req.user.id } }).sort('-createdAt');
        console.log(users);
        // let usersNotfriends = users.filter((usr)=>{
        //     return usr.status
        // })

        let fList , sendList,receiveList,currentUser
        if(req.user){
             currentUser = await User.findById(req.user._id);
            // console.log(users);
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


        return res.render('home', {
            title: "Blue Bird App",
            posts:posts,
            currentUser:currentUser,
            allUsers:users,
            fList:fList,
            sendList:sendList,
            receivedList:receiveList
        });
        
    }catch(err){
        console.log('error',err);
    }
    
}
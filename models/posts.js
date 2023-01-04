const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FILE_PATH = path.join('/uploads/users/post');
const deepPopulate = require('mongoose-deep-populate')(mongoose)

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: false
    },
    //storing user id of logged in user
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    userType:{
        type:String,
        required:true
    },
    //this stores path of file in DB 
    file:{
        type:String
    },
    postType:{
        type:String,
        default:'text',
        required:true
    },
    // include the array of ids of all comments in this post schema itself
    comments: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]

},{
    timestamps: true
});


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',FILE_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.mimetype.split("/")[0] + '-' + uniqueSuffix+'.'+file.mimetype.split("/")[1])
    }
  })

  //static function
postSchema.statics.uploadedPost = multer({storage:storage,
    fileFilter:function(req,file,cb) {
        //checks if file type is image or video
    if(file.mimetype.split("/")[0] =='image' || file.mimetype.split("/")[0] =='video'){
        //for allowing upload of ile
        cb(null, true);
    }
    else{
        //for reject file
        cb(null,false)
        //passing a error instead of rejecting 
        // cb(new Error('I don\'t have a clue!'))
    }
}
}).single('file');
postSchema.statics.postPath = FILE_PATH;

postSchema.plugin(deepPopulate, {
    whitelist :[
        'comments.user',
        'comments.likes'
    ]
});


const Post = mongoose.model('Posts', postSchema);
module.exports = Post;
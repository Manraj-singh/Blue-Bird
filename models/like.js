const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    //this defines thr object id of liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'
    },
    reaction:{
        type: String, // Like, Love, Haha, Wow, Sad, Angry
        required:true
    },
    //this field is for defining the type of liked object since this is a dynamic referaence
    onModel:{
        type:String,
        required:true,
        //only values defind in enum can have Like
        enum:['Post','Comment']
    }
},{
    timestamps:true
})

const Like = mongoose.model('Like',LikeSchema);

module.exports = Like;
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
    //this field is for defining the typr of liked object since this is a dynamic referaence
    onModel:{
        type:String,
        required:true,
        //only values defind in enum can have Like
        enum:[]
    }
},{
    timestamps:true
})

const Like = mongoose.model('Like',LikeSchema);

module.exports = Like;
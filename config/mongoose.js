const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/SocialMediaApp');

const db = mongoose.connection;
mongoose.set('strictQuery', false);
db.on('error',console.error.bind(console,"Error while connecting to mongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports =db;
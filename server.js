const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const  MongoStore  = require('connect-mongo');
const flash = require('connect-flash')
const customMware = require('./config/middleware')


app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
// app.set('layout extractStyles', true);
// app.set('layout extractScripts', true);


console.log(db._connectionString);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store session cookie in db
app.use(session({
    name:'blueBird',
    secret:'somesecretkey',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*1000)
    },
   
    store:MongoStore.create({
        mongoUrl: db._connectionString,
        autoRemove:'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
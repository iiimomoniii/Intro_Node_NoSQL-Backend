//import express
const express = require('express');

//import DB
const mongoose = require('mongoose');

//import config 
const config = require('./config/index');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// import route from routes folder
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const companyRouter = require('./routes/company');
const staffRouter = require('./routes/staff');
const shopRouter = require('./routes/shop');

//import Handle Error
const errorHandler = require('./middleware/ErrorHandler');

//import passport
const passport = require('passport');

//protect by token
const passportJWT = require("./middleware/PassportJWT");

//protect app by helmet
const helmet = require('helmet');

//limit access req
const rateLimit = require("express-rate-limit");

//access (domain) have permission to access
var cors = require('cors')

//Connect DB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.MONGODB_User,
    pass: config.MONGODB_Pass
  };

mongoose.connect(config.MONGODB_URI,options);

//Use express
const app = express();

app.use(logger('dev'));
app.use(express.json({
    //set limit for upload image
        limit: '50mb'
     }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//init passport
app.use(passport.initialize());

//init cors
app.use(cors())

//init limit access req
app.set('trust proxy', 1);
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 sec
  max: 5 // limit each IP to 100 requests per windowMs
});
//  apply to all requests
app.use(limiter);

//init helmet
app.use(helmet());


//localhost
app.use('/', indexRouter);
//localhost/users
app.use('/users', usersRouter);
//company
app.use('/company', companyRouter);
//staff
app.use('/staff', staffRouter);
//shop
//get shop require token
app.use('/shop', [passportJWT.isLogin] , shopRouter);
//hadler error
app.use(errorHandler);

module.exports = app;

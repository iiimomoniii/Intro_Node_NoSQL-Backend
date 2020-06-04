//import express
const express = require('express');
//Use express
const app = express();

//import DB
const mongoose = require('mongoose');

//require config 
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

//Connect DB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: 'userName',
    pass: 'passWord'
  };

mongoose.connect(config.MONGODB_URI,options);

app.use(logger('dev'));
app.use(express.json({
    //set limit for upload image
        limit: '50mb'
     }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//localhost
app.use('/', indexRouter);
//localhost/users
app.use('/users', usersRouter);
//company
app.use('/company', companyRouter);
//staff
app.use('/staff', staffRouter);
//shop
app.use('/shop', shopRouter);
//hadler error
app.use(errorHandler);

module.exports = app;

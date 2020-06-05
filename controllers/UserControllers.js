const User = require("../models/user");

//use validator
const { validationResult } = require("express-validator");
//use JWT
const jwt = require("jsonwebtoken");
//import config
const config = require("../config/index");

exports.index = (req, res, next) => {
  res.status(200).json({
    datas: [
      { id: 1, name: "John" },
      { id: 2, name: "Jone" },
    ],
  });
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check email is registered
    const user = await User.findOne({ email: email }); //left email from DB, right email from req
    if (!user) {
      const error = new Error("Username is not registered");
      error.status_code = 404;
      throw error;
    } else {
      //check password from req and DB
      const isValid = await user.checkPassword(password);
      if (!isValid) {
        const error = new Error("Password is incorrect");
        error.status_code = 401;
        throw error;
      } else {
        //create token JWT
       
        const token = await jwt.sign(
          {
            //payload
            id: user._id,
            role: user.role,
          },
            //screct key
            config.JWT_SECRET,
          {
            //option (expried)
            expiresIn: "5 days",
          }
        );
        //decode expried date (timestamp)
        const expires_in = jwt.decode(token);

        res.status(200).json({
          //return token
          access_token: token,
          expires_in: expires_in.exp,
          token_type : 'Bearer'

          //return message
          // message: "Login Success",
        });
      }
    }
  } catch (error) {
    //send error to middleware/ErrorHandler
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Datas is incorrect");
      error.status_code = 422;
      error.validation = errors.array();
      throw error;
    } else {
      //check dupicate email
      const chkDupEmail = await User.findOne({ email: email }); //left email from DB, right email from req
      if (chkDupEmail) {
        const error = new Error("This email is alredy used");
        error.status_code = 400;
        throw error;
      } else {
        let user = new User();
        user.name = name;
        user.email = email;
        //send to encryptPWD
        user.password = await user.encryptPassword(password);

        await user.save();

        res.status(201).json({
          message: "Register Success",
        });
      }
    }
  } catch (error) {
    //send error to middleware/ErrorHandler
    next(error);
  }
};

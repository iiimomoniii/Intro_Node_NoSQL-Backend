const User = require('../models/user');

exports.index = (req, res, next) => {
    res.status(200).json({
      datas : [
        {id : 1, name : 'John' },
        {id : 2, name : 'Jone' }
      ]
    });
}

exports.login =  (req, res, next) => {
    res.status(200).json({message : 'Hello Login'});
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //check dupicate email
    const chkDupEmail = await User.findOne({ email : email }); //left email from DB, right email from req
    if (chkDupEmail) {
      const error = new Error('This email is alredy used');
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
        message: 'Register Success'
      });
    }
   
  } catch (error) {
    //send error to middleware/ErrorHandler
    next(error);
  }
}
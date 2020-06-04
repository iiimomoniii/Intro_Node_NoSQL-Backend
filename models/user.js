//import DB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//Model
const schema = new mongoose.Schema({
   name: { type: String, required: true, trim: true},
   email : { type: String, required : true, trim: true, unique: true, index: true },
   password : { type: String, required : true, trim: true, minlength: 3 },
   role: { type: String, default: 'member' }
},{
    collation: 'users'
});

//bcrypt password
schema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

//Create Model
//Connect Model to collection (companys) at DB
const user = mongoose.model('User', schema);

//Export Model
module.exports = user;
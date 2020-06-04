//import DB
const mongoose = require('mongoose');

//Model
const schema = new mongoose.Schema({
   name: String,
   address : {
       province: String
   }
},{
    collation: 'companies'
});

//Create Model
//Connect Model to collection (companys) at DB
const company = mongoose.model('Company', schema);

//Export Model
module.exports = company;
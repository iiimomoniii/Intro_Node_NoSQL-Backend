//import DB
const mongoose = require('mongoose');

//import Schema for join with other schema
const Schema = mongoose.Schema;

//Model
const schema = new mongoose.Schema({
    
    name: { type: String, required : true, trim : true },
    price : { type : Number},
    //Join many to one with Shop 
    //use ObjectId as FK 
    shop : { type : Schema.Types.ObjectId, ref : 'Shop' }
},{
    //open option for vat
    toJSON : { virtuals: true },
    timestamps : true,
    collation: 'menus'
});

//Add virtual Vat. 
schema.virtual('price_vat').get(function () {
    return (this.price*0.07) + this.price;
});


//Create Model
//Connect Model to collection (shop) at DB
const menu = mongoose.model('Menu', schema);

//Export Model
module.exports = menu;
//import DB
const mongoose = require("mongoose");

//Model
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, default: "nopic.png" },
    location: {
      lat: Number,
      lgn: Number,
    },
    //createdAt and updatedAt auto generate by mongoose using timestamps
    //createdAt : { type: Date, default: Date.now },
    //updatedAt : { type: Date, default: Date.now }
  },
  {
    //use virtual menus
    toJSON: { virtuals: true },
    timestamps: true,
    collation: "shops",
  }
);

//List Menus by Shop ID
schema.virtual("menus", {
  ref: "Menu", // link to model menu
  //PK of Shop
  localField: "_id", // field of shop model in this file
  //FK of Shop
  foreignField: "shop", // shop field of model
});

//Create Model
//Connect Model to collection (shop) at DB
const shop = mongoose.model("Shop", schema);

//Export Model
module.exports = shop;

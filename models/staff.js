//import DB
const mongoose = require("mongoose");

//Model
const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    salary: { type: Number },
    created: { type: Date, default: Date.now },
  },
  {
    collation: "staffs",
  }
);

//Create Model
//Connect Model to collection (staff) at DB
const staff = mongoose.model("Staff", schema);

//Export Model
module.exports = staff;

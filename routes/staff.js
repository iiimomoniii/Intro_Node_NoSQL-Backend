var express = require("express");
var router = express.Router();
const staffControllers = require("../controllers/StaffControllers");

//protect by token
const passportJWT = require("../middleware/PassportJWT");

//list staffs
//and repuire token for get data
router.get("/", [passportJWT.isLogin], staffControllers.index);

//add staff
router.post("/", staffControllers.insert);

//get by ID
router.get("/:id", staffControllers.searchById);

//remove by ID
router.delete("/:id", staffControllers.deleteById);

//update by ID
router.put("/:id", staffControllers.updateById);

module.exports = router;

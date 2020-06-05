var express = require("express");
var router = express.Router();
const CompanyControllers = require("../controllers/CompanyControllers");

router.get("/", CompanyControllers.index);

module.exports = router;

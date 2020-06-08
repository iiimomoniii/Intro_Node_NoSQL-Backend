const express = require("express");
const router = express.Router();
const CompanyControllers = require("../controllers/CompanyControllers");

const passportJWT = require('../middleware/PassportJWT');
const checkAdmin = require('../middleware/CheckAdmin');


router.get("/", [
    passportJWT.isLogin,
    checkAdmin.isAdmin
], CompanyControllers.index);


module.exports = router;

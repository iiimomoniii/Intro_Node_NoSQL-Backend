var express = require("express");
var router = express.Router();
const userControllers = require("../controllers/UserControllers");

//use validate => body,check, validationResult
const { body } = require("express-validator");

//protect by token
const passportJWT = require("../middleware/PassportJWT");

/* GET users listing. */
// http://localhost:3000/users/
router.get("/", userControllers.index);
// http://localhost:3000/users/login

router.post("/login", userControllers.login);
// http://localhost:3000/users/register
//validate name
router.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is not correct"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 3 })
      .withMessage("Password is less than 3 charactors long"),
  ],
  userControllers.register
);

// http://localhost:3000/users/login
router.get("/me", [passportJWT.isLogin], userControllers.me);

module.exports = router;

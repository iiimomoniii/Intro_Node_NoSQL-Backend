var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  ///กรณีให้หน้าเเรกที่เข้ามาไปหน้า index
  // res.render('index', { title: 'Express' });

  //กรณีให้หน้าเเรกที่เข้ามาไปหน้าอื่นๆ
  res.status(200).json({
    message: "Hello Index",
  });
});

module.exports = router;

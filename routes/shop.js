var express = require("express");
var router = express.Router();
const ShopControllers = require("../controllers/ShopControllers");

//Shop
//http:localhost:3000/shop
router.get("/", ShopControllers.index);

//Menu By Shop
//http:localhost:3000/shop/menu
router.get("/menu", ShopControllers.menu);

//List Menu By Shop ID
//http:localhost:3000/shop/:id
router.get("/:id", ShopControllers.getShopWithMenu);

//Insert Shop
//http:localhost:3000/shop/
router.post("/", ShopControllers.insert);

module.exports = router;

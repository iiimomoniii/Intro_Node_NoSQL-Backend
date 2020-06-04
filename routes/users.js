var express = require('express');
var router = express.Router();
const userControllers = require('../controllers/UserControllers');

/* GET users listing. */
// http://localhost:3000/users/
router.get('/', userControllers.index);
// http://localhost:3000/users/login
router.get('/login', userControllers.login);
// http://localhost:3000/users/register
router.post('/register', userControllers.register);


module.exports = router;

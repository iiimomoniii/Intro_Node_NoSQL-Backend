var express = require('express');
var router = express.Router();
const staffControllers = require('../controllers/StaffControllers');

//list staffs
router.get('/', staffControllers.index);

//add staff
router.post('/', staffControllers.insert);

//get by ID
router.get('/:id', staffControllers.searchById);

//remove by ID
router.delete('/:id', staffControllers.deleteById);

//update by ID
router.put('/:id', staffControllers.updateById);


module.exports = router;
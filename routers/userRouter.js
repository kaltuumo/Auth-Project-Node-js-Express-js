const express = require('express');
const { identifier } = require('../middlewares/identification');
const usercontroller = require('../controllers/userController');
const router = express.Router();

router.get('/all-users', usercontroller.getUsers);
router.get('/single-user', usercontroller.singleUser);
router.put('/update-user', identifier, usercontroller.updateUser);
router.delete('/delete-users', identifier, usercontroller.deleteUser);


module.exports = router;

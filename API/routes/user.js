const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET
router.post('/addNewUser', userController.addNewUser);

router.post('/authenticateUser', userController.authenticateUser);

router.get('/getAllRegisteredUsers', userController.getAllRegisteredUsers);


module.exports = router;

const path = require('path');

const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

// /admin/add-product => GET
router.post('/addNewUser', userController.addNewUser);


module.exports = router;

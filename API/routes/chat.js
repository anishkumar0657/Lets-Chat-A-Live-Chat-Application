const express = require('express');

const chatController = require('../controllers/chat');

const router = express.Router();


router.get('/fetchAllChats', chatController.fetchAllChats);


module.exports = router;

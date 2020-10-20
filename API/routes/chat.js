const express = require('express');

const chatController = require('../controllers/chat');

const router = express.Router();


router.get('/fetchAllChats', chatController.fetchAllChats);

router.post('/addNewMessage', chatController.addNewMessage);

router.post('/fetchChatBetweenUsers', chatController.fetchChatBetweenUsers);


module.exports = router;

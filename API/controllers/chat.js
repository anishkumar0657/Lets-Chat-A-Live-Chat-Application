//import mongoose
const mongoose = require('mongoose');

//import message model
const Message = require('../models/message');

// method to add new message
exports.addNewMessage = ((req, res, next) => {
    const message = req.body.message;
    const senderID = req.body.senderID;
    const recieverID = req.body.recieverID;
    const timeStamp = req.body.timeStamp;

    const newMessage = new Message({ message: message, senderID: senderID, recieverID: recieverID, timeStamp: timeStamp });

    newMessage.save()
        .then(result => {
            Message.find({}).then(messages => {
                res.status(201);
                res.send(messages);
            })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err)
        });
});

//method to add new message
exports.fetchAllChats = ((req, res, next) => {
    Message.find({}).then(messages => {
        res.status(200);
        res.send(messages);
    })
        .catch(err => console.log(err));
});

//method to add new message
exports.fetchChatBetweenUsers = ((req, res, next) => {
    const loggedInUserID = req.body.loggedInUserID;
    const selectedUserID = req.body.selectedUserID;

    Message.find({}).then(messages => {
        const result = [];
        messages.forEach((data) => {
            if ((data.recieverID == loggedInUserID && data.senderID == selectedUserID)
                || (data.recieverID == selectedUserID && data.senderID == loggedInUserID)) {
                data.timeStamp = data.timeStamp;
                result.push(data);
            }
        });
        res.status(200);
        res.send(result);
    })
        .catch(err => console.log(err));
});

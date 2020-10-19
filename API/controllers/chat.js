//import mongoose
const mongoose = require('mongoose');

//import message model
const Message = require('../models/message');

//method to add new message
// exports.addNewMessage = ((req, res, next) => {
//     const message = req.body.message;
//     const senderID = req.body.senderID;
//     const recieverID = req.body.recieverID;
//     const timestamp = req.body.timestamp;

//     const message = new Message({ message: message, senderID: senderID, recieverID: recieverID, timestamp: timestamp });

//     message.save()
//         .then(result => {
//             Message.find({}).then(messages => {
//                 res.status(201);
//                 res.send(messages);
//             })
//                 .catch(err => console.log(err));
//         })
//         .catch(err => {
//             console.log(err)
//         });
// });

//method to add new message
exports.fetchAllChats = ((req, res, next) => {
    Message.find({}).then(messages => {
        res.status(200);
        res.send(messages);
    })
        .catch(err => console.log(err));
});

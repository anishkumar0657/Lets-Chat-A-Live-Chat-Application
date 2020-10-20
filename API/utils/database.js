//import pusher
const pusher = require('./pusher');

const mongoose = require('mongoose');

const db = mongoose.connection;

exports.activatePusher = db.once("open", () => {
    console.log('db is connected');
    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
        console.log("change occured", change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                _id: messageDetails._id,
                message: messageDetails.message,
                senderID: messageDetails.senderID,
                recieverID: messageDetails.recieverID,
                timeStamp: messageDetails.timeStamp
            });
        }
        else {
            console.log('Error triggering pusher');
        }
    })
});
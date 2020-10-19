//import pusher
const pusher = require('./utils/pusher');

const monsgoose = require('mongoose');

const db = mongoose.connection;

db.once("open", () => {
    console.log('db is connected');
    const msgCollection = db.collection("messages");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (data) => {
        console.log("change occured", change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message
            });
        }
        else {
            console.log('Error triggering pusher');
        }
    })
});
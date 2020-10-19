const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    senderID: {
        type: String,
        required: true
    },
    recieverID: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    }
});

//export the model
module.exports = mongoose.model('message', messageSchema);
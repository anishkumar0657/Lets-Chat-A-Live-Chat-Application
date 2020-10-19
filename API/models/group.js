const mongoose = require('mongoose');

//make schema
const Schema = mongoose.Schema;

const groupSchema = Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        user: [
            {
                user: { type: Schema.Types.ObjectId, ref: 'user', required: true }
            }
        ]
    },
    messages: {
        message: [
            {
                message: { type: Schema.Types.ObjectId, ref: 'message', required: true }
            }
        ]
    }
});

//export the model
module.exports = mongoose.model('groups', groupSchema);
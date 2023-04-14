const mongoose = require('mongoose');
const Token = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400
    }

},
    { collection: "Tokens" }
);
module.exports = mongoose.model('Token', Token);


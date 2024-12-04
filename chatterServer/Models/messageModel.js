const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
        chatId: String,
        sendId: String,
        text: String
    },
    {
        timestamps: true
    }
);

const MessageModel = mongoose.model("messageSchema", messageSchema);

module.exports = MessageModel;
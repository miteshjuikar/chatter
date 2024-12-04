const MessageModel = require("../Models/messageModel");

//Create message
const createMessage = async(req, res) => {
    const { chatId, sendId, text } = req.body;

    const message = new MessageModel({
        chatId, sendId, text
    });

    try {
       const response = await message.save();
       res.status(200).json(response);
       
    } catch (error) {
        console.log(error);
        res.status(500).json(erroe);
    }
}

//getMessages
const getMessages = async(req, res) => {
    const { chatId } = req.params;
    try {
        const messages = await MessageModel.find({ chatId });
        res.status(200).json(messages);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createMessage, getMessages }
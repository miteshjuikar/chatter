const ChatModel = require("../Models/chatModel");

//Create chat
const createChat = async(req, res) => {
    const { firstId, secondId } = req.body;

    try {
        if(firstId && secondId){

            const chat = await ChatModel.findOne({
                members: { $all: [ firstId, secondId ] }
            })
            
            if(chat) return res.status(200).json(chat);
            
            const newChat = new ChatModel({
                members: [firstId, secondId],
            });
            
            const response = await newChat.save();
            
            res.status(200).json(response);
        }
    } 
    catch (error) {
        console.log(error);
    }

}

//Get user chat

const findUserChats = async(req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await ChatModel.find({
            members: { $in: [userId]}
        })
        res.status(200).json(chats);
    } 
    catch (error) {
       console.log(error);
        res.status(500).json(error);
    }
}

//Find chat
const findUserChat = async(req, res) => {
    const { firstId, secondId } = req.params;
    console.log(firstId, secondId);
    
    try {
        const chats = await ChatModel.find({
            members: { $all: [ firstId, secondId ]}
        })
        res.status(200).json(chats);
    } 
    catch (error) {
       console.log(error);
        res.status(500).json(error);
    }
}

module.exports = { createChat, findUserChats, findUserChat };
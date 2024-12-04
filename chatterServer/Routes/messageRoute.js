const express = require("express");
const { createMessage, getMessages } = require("../Controllers/messageController");

const route = express.Router();

route.post('/', createMessage);
route.get('/:chatId', getMessages);

module.exports = route;
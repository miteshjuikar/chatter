const express = require("express");
const { findUserChat, createChat, findUserChats } = require("../Controllers/chatController");

const route = express.Router();

route.post('/', createChat);
route.post('/:userId', findUserChats);
route.post('/find/:firstId/:secondId', findUserChat);

module.exports = route;
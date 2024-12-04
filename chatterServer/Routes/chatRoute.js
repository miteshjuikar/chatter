const express = require("express");
const { findUserChat, createChat, findUserChats } = require("../Controllers/chatController");

const route = express.Router();

route.post('/', createChat);
route.get('/:userId', findUserChats);
route.get('/find/:firstId/:secondId', findUserChat);

module.exports = route;
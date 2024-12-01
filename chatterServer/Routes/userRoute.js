const express = require("express");
const { userRegistration, userLogin, findUser, getUsers } = require("../Controllers/userController");

const route = express.Router();

route.post('/registration', userRegistration);
route.post('/login', userLogin);
route.get('/find/:userId', findUser);
route.get('/', getUsers);

module.exports = route;
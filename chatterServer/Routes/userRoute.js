const express = require("express");
const { userRegistration, userLogin } = require("../Controllers/userController");

const route = express.Router();

route.post('/registration', userRegistration);
route.post('/login', userLogin);

module.exports = route;
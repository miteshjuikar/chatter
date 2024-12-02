const express = require("express");
const { userRegistration, userLogin, findUser, getUsers } = require("../Controllers/userController");
const { authMiddleware } = require("../Middleware/check-auth");

const route = express.Router();

route.get('/check-auth', authMiddleware, (req,res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated user!",
        user,
    })
});
route.post('/registration', userRegistration);
route.post('/login', userLogin);
route.get('/find/:userId', findUser);
route.get('/', getUsers);

module.exports = route;
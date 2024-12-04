const express = require("express");
const cors = require("cors");
const mongoose= require("mongoose");
require('dotenv').config();
const cookieParser = require("cookie-parser");
const userRoute = require("./Routes/userRoute");
const chatRoute = require("./Routes/chatRoute");
const messageRoute = require("./Routes/messageRoute");

const app = express();
const port = process.env.PORT || 4000;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;

const url = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster1.hvniz.mongodb.net/chatter?retryWrites=true&w=majority&appName=Cluster1`;

mongoose.connect(url)
    .then(() => {console.log("MongoDb connectted successfully.")})
    .catch((err)=>{console.log("Catch error of MongoDb connection", err);
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/chat', chatRoute);
app.use('/api/messages', messageRoute);
 
app.listen(port, ()=>{console.log(`Server is running on port: ${port}`)})
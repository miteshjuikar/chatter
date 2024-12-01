const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const crypto = require('crypto');

// Encrypt data using AES-256-CBC
const encrypt = (data, secretKey) => {
    if (typeof data === 'object') {
        data = JSON.stringify(data);  // Convert object to JSON string
    }

    const iv = crypto.randomBytes(16); // Generate a random Initialization Vector (IV)
    
    const key = crypto.createHash('sha256').update(secretKey).digest(); // Generates a 32-byte key
    
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return iv.toString('hex') + encrypted; // Prepend IV to the encrypted data
};

const createToken = (_id, name, email) => {
    const secretKey = process.env.JWT_SECRET_KEY;

    // Encrypt the user info
    //const encryptedInfo = encrypt({_id, name, email}, secretKey);

const encryptedInfo = { _id, name, email };

    // Create JWT with the encrypted info
    return jwt.sign({ data: encryptedInfo }, secretKey, { expiresIn: "30m" });
};

const userRegistration = async(req,res) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email });
        
        if(user)
            return res.status(400).json({ success: false, message: "User with the given email already exist"});
    
        if(!name || !email || !password ) 
            return res.status(400).json({ success: false, message: "All field are required..."});
        
        if(!validator.isEmail(email)) 
            return res.status(400).json({ success: false, message: "Email must be valid email"});
        
        if(!validator.isStrongPassword(password))
            return res.status(400).json({ success: false, message: "Password must be strong password"});
    
        const salt = await bcrypt.genSalt(10);
    
        const hashedPassword = await bcrypt.hash(password, salt);
    
        user = new User({ name, email, password: hashedPassword });     
        await user.save().catch((err) => { return res.status(400).json({ success: false, message: err.message}); });
        
        const token = createToken(user._id, user.name, user.email);

        res.status(200).json({ success: true, message: "User registration successful", data: { name: user.name, token: token }});

    } catch (error) {
        console.log("Registration Contoller catch error: ", error);
        res.status(501).json({ success: false, message: "catch error Registration controller."});
    }
}

const userLogin = async( req, res ) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({email});
        
        if(!user)
            return res.status(400).json({ success: false, message: "User not exist, Click on signUp to register new user"});
    
        if(!email || !password ) 
            return res.status(400).json({ success: false, message: "Email and password are required..."});
        
        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword)
            return res.status(400).json({ success: false, message: "Invalid email or password"});

        const token = createToken(user._id, user.name, user.email);

        res.status(200).json({ success: true, message: "User registration successful", data: { name: user.name, token: token }});

    } catch (error) {
        console.log("Login Contoller catch error: ", error);
        res.status(501).json({ success: false, message: "catch error Registration controller."});
    }
}

const findUser = async(req, res) => {
    const userId = req.params.userId;   
    try {
        const user = await User.findById(userId);
        res.status(200).json({ success: true, message: "User is present", data: user });
    } 
    catch (error) {
        console.log("Login Contoller catch error: ", error);
        res.status(501).json({ success: false, message: "catch error find user controller."});
    }
}

const getUsers = async(req, res) => {
    const userId = req.params.userId;   
    try {
        const users = await User.find();
        res.status(200).json({ success: true, message: "All user list", data: users });
    } 
    catch (error) {
        console.log("getUsers Contoller catch error: ", error);
        res.status(501).json({ success: false, message: "catch error getUsers controller."});
    }
}

module.exports = { userRegistration, userLogin, findUser, getUsers };
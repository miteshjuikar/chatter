const jwt = require("jsonwebtoken");
const crypto = require('crypto');

// Decrypt data using AES-256-CBC
const decrypt = (encryptedData, secretKey) => {
    // Extract the IV and the encrypted message
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // First 16 bytes is IV
    const encryptedMessage = encryptedData.slice(32); // The rest is the encrypted data

    const key = crypto.createHash('sha256').update(secretKey).digest(); // Generates a 32-byte key

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted; // Returns the decrypted data (string)
};


//Auth middleware
const authMiddleware = (req,res,next) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];    
    const secretKey = process.env.JWT_SECRET_KEY;
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        });
    }
    try {
        const decodedData = jwt.verify(token, secretKey);

        // Decrypt the user info
        const decryptedInfo = decrypt(decodedData.data, secretKey);

        req.user = JSON.parse(decryptedInfo);
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        });
    }
}

module.exports = { authMiddleware }
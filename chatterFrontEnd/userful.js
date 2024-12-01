// Decrypt data using AES-256-CBC
const decrypt = (encryptedData, secretKey) => {
    const iv = Buffer.from(encryptedData.slice(0, 32), 'hex'); // Extract IV
    const encryptedText = encryptedData.slice(32); // Extract the actual encrypted data
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey, 'hex'), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
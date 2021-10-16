const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
console.log(req.headers)
    const token = req.headers['authorization'];
    console.log(token)
    if (!token) {
        return res.send({success: false,message: 'Token mavjud emas'})
    }else {
        try {
            //bu jwt ning payloadini qaytaradi
            const decoded = jwt.verify(token, 'Bearer ');
            req.user = decoded;
            next();
        } catch (e) {
            return res.status(400).send("Yoroqsiz token yuborildi")
        }
    }
}

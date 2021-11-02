const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {

    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.send({success: false,message: 'Token mavjud emas'})
    }else {
        try {
            let a=token.substring(1,token.length-1)
            //bu jwt ning payloadini qaytaradi
            const decoded = jwt.verify(a, 'Bearer ');
            req.user = decoded;
            next();
        } catch (e) {
            return res.send({success: false,message: "Yoroqsiz token yuborildi"})
        }
    }
}

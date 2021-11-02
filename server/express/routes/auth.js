const { User } = require('../objects/user');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const auther = require('../middleware/autorization')
const _ = require('lodash');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/login', async (req, res) => {
    console.log("Hi every one")
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({success: false,message: "bunday foydalanuvchi topilmadi"});

    const isCorrectPassword =await bcrypt.compare(req.body.password, user.password);
    console.log(isCorrectPassword);
    if (!isCorrectPassword)
        return res.status(400).send({success:false,message: "parolda xatolik"});

    const token = jwt.sign({ _id: user._id,role: user.role }, 'Bearer ')
    console.log(token);
    res.json(token);

})
router.post('/', async (req, res) => {
    const { error } = registerValidate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)
    let user = await User.findOne({ email: req.body.email });
    if (user)
        return res.status(201).send({success: false,message: 'bunday foydalanuvchi tarmoqda mavjud'})
    user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']))
    const salt=await bcrypt.genSalt();
    user.password=await bcrypt.hash(user.password,salt)
    await user.save();
    return res.send({success:true});
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(req);
}
function registerValidate(req) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
        role: Joi.string().min(3).max(30).required()
    });
    return schema.validate(req);
}
module.exports = router;
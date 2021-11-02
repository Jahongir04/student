const mongoose = require('mongoose');
const Joi=require('joi');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required:true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: String,
        required: true
    }

})
const User=mongoose.model('users',userSchema);

function validateUser(user){
    const schema=Joi.object({
        name: Joi.string().required().min(3).max(30),
        email: Joi.string().required().min(3).max(30),
        password: Joi.string().required().min(3).max(1024),
        role: Joi.string().required().min(3).max(1024)
    })
    return schema.validate(user);
}
exports.User=User;
exports.validate=validateUser;
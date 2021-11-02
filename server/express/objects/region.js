const mongoose = require('mongoose');
const Joi=require('joi');
const regionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        minlength: 3,
        maxlength: 30
    }
})
const Region=mongoose.model('regions',regionSchema);

function validateUser(user){
    const schema=Joi.object({
        name: Joi.string().required().min(3).max(30)
    })
    return schema.validate(user);
}
exports.Region=Region;
exports.validate=validateUser;
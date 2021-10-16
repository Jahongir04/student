const mongoose=require('mongoose')
const express=require('express');
const Joi=require('joi');
const studentSchema = new mongoose.Schema({
    name: String,
    fatherName: String,
    surname: String,
    age: Date,
    region: String,
    course: Number
})
const Student=mongoose.model('student',studentSchema);

function validateStudent(student){
    const schema=Joi.object({
        name: Joi.string().required().min(3).max(30),
        surname: Joi.string().required().min(3).max(30),
        fatherName: Joi.string().required().min(3).max(1024),
        age: Joi.date().required(),
        course: Joi.number(),
        region: Joi.string().required().min(3).max(30)
    })
    return schema.validate(student);
}
exports.Student=Student;
exports.validateStudent=validateStudent;
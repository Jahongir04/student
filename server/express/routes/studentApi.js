const { Router } = require('express');
const _ = require('lodash');
const auth=require('../middleware/autorization')
const { Student, validateStudent } = require('../objects/student')
const Joi = require('joi');
const router = Router();
router.get('/list',auth, async (req, res) => {
    let pageNumber = parseInt(req.query.pageNumber);
    let pageSize = parseInt(req.query.pageSize);
    const studentLength= await Student.find();
    const student = await Student.find().limit(pageSize).skip((pageNumber - 1) * pageSize);
    let crash = studentLength.length % pageSize;
    let totalpage = 0;
    if (crash > 0) {
        totalpage = parseInt((studentLength.length / pageSize)) + 1
    } else {
        totalpage = parseInt(studentLength.length / pageSize);
    }

    res.send({success: true,
        content: student, totalPages: totalpage
    });
})
router.get('/',async (req, res) => {
    let search = req.query.search;
    const studentLength= await Student.find({ $or: [{ name: { $regex: search } }, { surname: { $regex: search } }, { fatherName: { $regex: search } }, { region: { $regex: search } }, { surname: { $regex: search } }] });
    console.log(search);
    let pageNumber = parseInt(req.query.pageNumber);
    let pageSize = parseInt(req.query.pageSize);
    const student =  await Student.find({ $or: [{ name: { $regex: search } }, { surname: { $regex: search } }, { fatherName: { $regex: search } }, { region: { $regex: search } }, { surname: { $regex: search } }] }).limit(pageSize).skip((pageNumber - 1) * pageSize)
    let crash = parseInt(studentLength.length % pageSize);
    let totalpage = 0;
    if (crash > 0) {
        totalpage = parseInt((studentLength.length / pageSize)) + 1
    } else {
        totalpage = parseInt(studentLength.length / pageSize);
    }
    res.send({success:true, content: student, totalPages: totalpage });
}) 
router.put('/:id', async (req, res) => {
   const student=await Student.findByIdAndUpdate(req.params.id,req.body);
   res.send(student)
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findById(id);
    res.status(200).send(student);
})
router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    const student = Student.findById(req.params.id);
    if (!student)
        return res.status(203).send({success: false,message: 'student topilmadi'})
    await Student.deleteOne({ _id: req.params.id });

    res.status(200).send({success: true})
})
router.post('/', async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const student = new Student(_.pick(req.body, ['name', 'age', 'course', 'surname', 'fatherName', 'region']));
    await student.save();
    res.send(student);
})
module.exports = router;
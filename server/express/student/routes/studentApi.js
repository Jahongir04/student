const { Router } = require('express');
const _ = require('lodash');
const auth=require('../middleware/autorization')
const { Student, validateStudent } = require('../objects/student')
const Joi = require('joi');
// const {User,validate} =require('../src/user');
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

    res.send({
        content: student, totalPages: totalpage
    });
})
router.get('/',auth, async (req, res) => {
    let search = req.query.search;
    const studentLength= await Student.find({ $or: [{ name: { $regex: search } }, { surname: { $regex: search } }, { fatherName: { $regex: search } }, { region: { $regex: search } }, { surname: { $regex: search } }] });
    console.log(search);
    let pageNumber = parseInt(req.query.pageNumber);
    let pageSize = parseInt(req.query.pageSize);
    //Yoki operatorining ishlashi $ or{}
    const student =  await Student.find({ $or: [{ name: { $regex: search } }, { surname: { $regex: search } }, { fatherName: { $regex: search } }, { region: { $regex: search } }, { surname: { $regex: search } }] }).limit(pageSize).skip((pageNumber - 1) * pageSize)
    // const student=await Student.find();
    // console.log(student);
    let crash = parseInt(studentLength.length % pageSize);
    let totalpage = 0;
    if (crash > 0) {
        totalpage = parseInt((studentLength.length / pageSize)) + 1
    } else {
        totalpage = parseInt(studentLength.length / pageSize);
    }
    res.send({ content: student, totalPages: totalpage });
})
router.put('/:id', auth, async (req, res) => {
   const student=await Student.findByIdAndUpdate(req.params.id,req.body).then(data=>{
    //    console.log("It's working");
   })
   res.send(student)
})
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const student = await Student.findById(id);
    res.status(200).send(student);
})
router.delete('/:id',auth, async (req, res) => {
    const student = Student.findById(req.params.id);
    if (!student)
        return res.status(203).send('student topilmadi')
    await Student.deleteOne({ _id: req.params.id });

    res.status(200).send(true)
})
router.post('/', async (req, res) => {
    const { error } = validateStudent(req.body);
    if (error)
        return res.status(400).send(error.details[0].message)

    const student = new Student(_.pick(req.body, ['name', 'age', 'course', 'surname', 'fatherName', 'region']));
    await student.save();
    res.send(student);
})
// router.get('/page',async (req,res)=>{
    
// })


module.exports = router;
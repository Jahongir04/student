const { Region } = require('../objects/region');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');

router.post('/',async (req,res)=>{
    const student = new Region(req.body);
    await student.save();
    res.send(student);
})
router.get('/',async(req,res)=>{
    const region=await Region.find();
    res.send(region);
})
module.exports=router;
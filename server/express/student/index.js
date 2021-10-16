const express=require('express');
const app=express();
const mongoose=require('mongoose');
const studentRoute=require('./routes/studentApi')
const auth=require('./routes/auth');
mongoose.connect('mongodb://localhost/student', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongodb connection is success");
}).catch((error) => {
    console.log('mongodb connection has error like ' + error);
})
app.use(function(req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    next();
    })
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use('/api/student',studentRoute);
app.use('/api/user',auth);

const PORT=process.env.PORT||3399;
app.listen(PORT, () => console.log("Server running on port= " + PORT));

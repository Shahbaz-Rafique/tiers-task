const express=require("express");
const router=express.Router();
const multer=require("multer");
const {transporter}=require('../nodemailer/nodemailer');
const {connection}=require('../database/sql');

var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images/");
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname);
    }
})

var upload=multer({storage});

router.post('/',upload.single("profileimage"),(req,response,next)=>{
 const name=req.body.name;
 const email=req.body.email;
 const password=req.body.password;
 const file=req.file.filename;
 const mailOption={
    from:`TIERS Limited <shahbazrafique429@gmail.com>`,
    to:email,
    subject:"You has been Registered",
    html:`<p>You has been registered</p>`,
 }
 const data={
    name:name,
    email:email,
    password:password,
    profileimage:file,
 }
 connection.query('INSERT into register SET ?',data,(err,res)=>{
    if (err) throw err;
    else{
        console.log("data store");
        transporter.sendMail(mailOption,(error,info)=>{
            if (error) throw error;
            else{
                console.log("email send");
            }
         })
         response.redirect('http://localhost:3000');
    }
 })
})
module.exports=router
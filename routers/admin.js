import express from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { addAdmin, findAdmin, findAdminbyId, generateAdminForgetToken, generateAdminJwtToken, updateAdminPassword } from "../logics/admin.js";
const router = express.Router();

router.post("/signup", async (req,res)=>{
try {
const {email,password} = req.body

    if(email === "" || password === ""){
        return res.status(400).json({data:{error:"Invalid details"}})
            }
    const user = await findAdmin(email);
    if(user){
        return res.status(400).json({data:{error:"Email already Registered"}})
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const hashedUser = {...req.body,password:hashedPassword}
const newUser = await addAdmin(hashedUser)

const token = generateAdminJwtToken(newUser._id)

res.status(200).json({data:hashedUser,token:token})    
} catch (error) {
    console.log(error)
    res.status(500).json({data:error.message})
}
})

router.post("/login",async (req,res)=>{
try {
const {email,password} = req.body
    if(email === "" || password === ""){
        return res.status(400).json({data:{error:"Invalid details"}})
            }
const user = await findAdmin(email)
if(!user) {
    return res.status(400).json({data:{error:"Invalid email, New admin ! Please Signup"}})
}
const validatePass = 
await bcrypt.compare(password,user.password)
if(!validatePass){
    return res.status(400).json({data:{error:"Invalid password"}})
}
res.status(200).json({data:{message:"Successfully Logged-In"}})
} catch (error) {
    console.log(error)
    res.status(400).json({data:{error:error.message}})
}
})

router.post("/forget",async function(req,res){
   try {
    const {email} = req.body;
const user = await findAdmin(email)
if(!user){
    return res.status(404).json({data:{error:"email not registered"}})
}
const token =  generateAdminForgetToken(user._id,user.password);
const link = `http://localhost:3000/adminreset/${user._id}/${token}`

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"msouljar@gmail.com",
        pass:"yhqilsstocvicqoc",
    },
});

let mailDetails = {
    from:"msouljar@gmail.com",
    to:`${email}`,
    subject:"Reset Password Link",
    text:`${link}`
}
transporter.sendMail(mailDetails,function(err){
    if(err){
        console.log(err)
       return  res.send(err.message)
    } else{
        console.log("email sent successfully")
        res.status(200).json({data:{id:user._id,token:token,message:"email successfully sent"}})
    }
})

   } catch (error) {
    res.send(error.message);
   }    
})

router.post(`/adminreset/:id/:token`,async (req,res)=>{
    try {
        const id = req.params.id; 
        const token = req.params.token;
        
          
        const {password,confirm} = req.body
    const user = await findAdminbyId(id);
    const secret = process.env.secretkey + user.password;
    const verifyToken = jwt.verify(token,secret) 
    if(!user){
        return res.status(404).json({data:{error:"Invalid Id"}})
    }
 
if(password === "" ||  confirm === ""){
  return res.status(400).json({data:{error:"invalid details"}})  
}
if(password !== confirm) {
  return res.status(400).json({data:{error:"password doesnot match"}})  
}
const salt = await bcrypt.genSalt(10);
const newhashedPassword = await bcrypt.hash(password,salt)
// const newhashedUser = {...req.body,password:newhashedPassword}
    const result = await updateAdminPassword(id,newhashedPassword)
    
     
    
    res.status(200).json({data:{result:result,
        message:"password successfully changed"}})

    } catch (error) {
        console.log(error)
        res.status(400).json({data:{error:error.message}})
    }
})

 

export const adminRouter = router;
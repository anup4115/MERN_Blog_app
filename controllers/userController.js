import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
class userController{
    static register_user=async(req,res)=>{
        try{
            const {name, email, password} = req.body 
            if(!name || !email || !password){
                return res.status(401).json({status:false,message:"All Fields are Required"})
            }
            const existingUser=await userModel.findOne({email})
            if(existingUser){
                return res.status(401).json({status:"failed",message:"User already registered"})
            }
            const salt=await bcrypt.genSalt(10)
            const hashedPassword=await bcrypt.hash(password,salt)
            const newUser=await new userModel({name,email,password:hashedPassword}).save()
            return res.status(201).json({status:"success",message:"Registration Successful",user:{userId:newUser._id,name:newUser.name,email:newUser.email}})
        }catch(error){
            console.log(error)
        }
    }
    static login_user=async(req,res)=>{
        try{
            const {email,password} = req.body 
            if(!email || !password){
                return res.status(400).json({status:false,message:"All Fields are required"})
            }
            const existingUser=await userModel.findOne({email})
            if(!existingUser){
                return res.status(404).json({status:"failed",message:"User not found"})
            }
            const isMatch=await bcrypt.compare(password,existingUser.password)
            if(!isMatch){
                return res.status(401).json({status:"failed",message:"Invalid email or password"})
            }

            return res.status(200).send({status:"success",message:"Login Successful",user:{userId:existingUser._id,name:existingUser.name,email:existingUser.email}})
        }catch(error){
            console.log(error)
        }
    }
}
export default userController
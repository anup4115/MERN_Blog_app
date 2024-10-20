import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:[true,'Username is Required']},
    email:{type:String,required:[true,'Email is Required'],lowercase:true},
    password:{type:String,required:[true,'Password is Required']},
    blogs:[{type:mongoose.Types.ObjectId,ref:'blog'}]
},{timestamps:true})
const userModel=mongoose.model('user',userSchema)
export default userModel
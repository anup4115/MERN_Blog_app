import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,required:true},
    user:{type:mongoose.Types.ObjectId,ref:'user'}
},{timestamps:true})
const blogModel= mongoose.model('blog',blogSchema)
export default blogModel
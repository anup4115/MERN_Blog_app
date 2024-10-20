import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

class blogController{
    static create_blog=async(req,res)=>{
        try{
            const {title,description,image,userId}= req.body 
            if(!title || !description || !image || !userId){
                return res.status(401).json({status:"failed",message:"All Fields are Required"})
            }
            const existingUser=await userModel.findById(userId)
            if(!existingUser){
                return res.status(404).json({status:"failed",message:"User not found"})
            }
            const newBlog=new blogModel({title,description,image,user:userId})
            const session=await mongoose.startSession()
            session.startTransaction()
            await newBlog.save({session})
            existingUser.blogs.push(newBlog)
            await existingUser.save({session})
            await session.commitTransaction()
            await newBlog.save()
            return res.status(201).json({status:"success",message:"Blog created Successfully",blog:{blog_title:newBlog.title,blog_description:newBlog.description,blog_img:newBlog.image},user:newBlog.user})
        }catch(error){
            console.log(error)
        }
    }
    static get_all_blogs=async(req,res)=>{
        try{
            const allBlogs=await blogModel.find({})
            if(!allBlogs){
                return res.status(404).json({status:"failed",message:"No Blogs Found"})
            }
            return res.status(200).json({status:"success",Blogs_count:allBlogs.length,allBlogs})
        }catch(error){
            console.log(error)
        }
    }
    static update_blog=async(req,res)=>{
        try{
            const {id}= req.params 
            const{title,description,image} = req.body 
            const updatedblog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
            return res.status(201).json({status:"success",message:"Update Successful",updatedblog})
        }catch(error){
            console.log(error)
        }
    }
    static get_blog=async(req,res)=>{
        try{
            const {id} = req.params
            const blog=await blogModel.findById(id)
            if(!blog){
                return res.status(404).json({status:"failed",message:"Blog Not Found"})
            }
            return res.status(200).json({status:"success",Blog:blog})
        }catch(error){
            console.log(error)
        }
    }
    static delete_blog=async(req,res)=>{
        try {
            const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user");
            await blog.user.blogs.pull(blog);
            await blog.user.save();
            return res.status(200).send({success: true,message: "Blog Deleted!"});
          } catch (error) {
            console.log(error);
            return res.status(400).send({
              success: false,
              message: "Erorr WHile Deleteing BLog",
              error,
            });
          }
    }
    static get_user_blog=async(req,res)=>{
        try{
            const userBlog=await userModel.findById(req.params.id).populate("blogs")
            if(!userBlog){
                return res.status(404).json({status:"failed",message:"Blog not found"})
            }
            return res.status(200).json({status:"success",message:"User Blog(s)",userBlog})
        }catch(error){
            console.log(error)
        }
    }
}
export default blogController
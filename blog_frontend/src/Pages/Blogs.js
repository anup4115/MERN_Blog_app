import { useState,useEffect } from "react"
import BlogCard from "../components/BlogCard"

const Blogs = () => {
  const [blogs,setBlogs] = useState([])
  const getAllBlogs=async()=>{
    try{
      const myInit={
        method:"GET",
        headers:{
          'Content-Type':'application/json'
        }
      }
      const response =await fetch('http://localhost:8000/api/blogs/all-blogs',myInit)
      const data=await response.json()
      if(data.status==="success"){
        setBlogs(data.allBlogs)
      }
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAllBlogs()
  },[])
  return (
    <>
    {blogs && blogs.map((blog)=>
      <BlogCard id={blog._id} isUser={localStorage.getItem("userId")=== blog.user._id} title={blog.title} description={blog.description} image={blog.image} time={blog.createdAt} username={blog.user.name} />
    )}
    </>
  )
}

export default Blogs

import { useState,useEffect } from "react"
import BlogCard from "../components/BlogCard"
const UserBlogs = () => {
    const [blogs,setBlogs] = useState([])

    const getUserBlogs=async()=>{
        try{
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://localhost:8000/api/blogs/user-blog/${userId}`);
            const data = await response.json();
            if (data.status === "success") {
                setBlogs(data.userBlog.blogs); // Assuming userBlog has a property 'blogs'
            } else {
                setError(data.message); // Set error message
            }
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getUserBlogs()
    },[])
    console.log(blogs)
  return (
    <div>
      {blogs && blogs.length>0?(blogs.map((blog)=>
      <BlogCard id={blog._id} isUser={true} title={blog.title} description={blog.description} image={blog.image} time={blog.createdAt} username={blog.user.name} />
    )):(<h2>You have not created any blog...</h2>)}
    </div>
  )
}

export default UserBlogs

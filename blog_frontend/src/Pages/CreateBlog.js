import { Box,Button,TextField,Typography, } from "@mui/material"
import { useNavigate } from "react-router-dom"
const CreateBlog = () => {
    const navigate=useNavigate()
    const userId=localStorage.getItem('userId')
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data=new FormData(e.currentTarget)
        const actualData={
            title:data.get("title"),
            description:data.get("description"),
            image:data.get("image"),
            userId:userId
        }
        const myInit={
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(actualData)
        }
        fetch('http://localhost:8000/api/blogs/create-blog',myInit).then((res)=>{
            if(!res.ok){
                throw Error(res.statusText)
            }
            return res.json()
        }).then((data)=>{
            console.log(data)
            navigate("/myblogs");
        })
    }
  return (
    <div>
      
      <Box component="form" id="create-blog-id" onSubmit={handleSubmit} width="80%" display="flex" flexDirection="column" margin="auto" marginTop="2%" justifyContent="center" alignItems="center">
        <Typography variant="h4">Create Blog</Typography>
        <TextField label="Title" margin="normal" type="text" fullWidth required name="title" />
        <TextField label="Description" margin="normal" type="text" fullWidth required name="description" />
        <TextField label="Image URL" margin="normal" required name="image" fullWidth />
        <Button type="submit" variant="contained">Post Blog</Button>
      </Box>
    </div>
  )
}

export default CreateBlog
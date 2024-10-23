import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import {Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({title,description,image,username,time,id,isUser}) {
  const navigate=useNavigate()
  const handleEdit=()=>{
    navigate(`/blog-details/${id}`)
  }
  const handleDelete=async()=>{
    const myInit={
      method:"DELETE",
      headers:{
        'Content-Type':'application/json'
      }
    }
    const response=await fetch(`http://localhost:8000/api/blogs/delete-blog/${id}`,myInit)
    const data=await response.json()
    if(data.status==="success"){
      alert('Blog deleted')
      navigate('/myblogs')
    }
  }
  return (
    <Card sx={{ width:"40%",margin:'auto',marginTop:"2%",boxShadow:"5px 5px 10px #ccc" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
       
        title={title}
        subheader={time}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      {isUser && (
        <Box display={'flex'}>
          <IconButton sx={{marginLeft:"auto"}} onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}

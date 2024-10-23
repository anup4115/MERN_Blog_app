import { Box,TextField,Button,Typography, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
const Register = () => {
  const navigate=useNavigate()
  const [error,setError] = useState({
    status:false,
    msg:'',
    type:''
  })
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data=new FormData(e.currentTarget)
    const actualData={
      name:data.get("name"),
      email:data.get("email"),
      password:data.get("password")
    }
    if(!actualData.name || !actualData.email || !actualData.password){
      setError({status:true,msg:"All Fields are required",type:"error"})
    }
    if(actualData.password.length<6){
      setError({status:true,msg:"Password must be atleast of 6 characters",type:"error"})
      return
    }
    const myInit={
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(actualData)
    }
    fetch('http://localhost:8000/api/users/register', myInit)
  .then((res) => {
    if (!res.ok) {
      throw Error(res.statusText)
    }
    return res.json()
  })
  .then((data) => {
    if(data.status === "failed"){
      setError({status: true, msg: data.message, type: "error"});
    } else {
      setError({status: true, msg: "Registration Successful", type: "success"});
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }).catch((error)=>{
    setError({status:true,msg:error.message,type:"error"})
  })
  }
  return (
    <>
      <Box component="form" id="register-form" onSubmit={handleSubmit} maxWidth="600px" display="flex" flexDirection={"column"} justifyContent="center" margin="auto" alignItems="center" marginTop={5}>
        <Typography variant="h4">Register</Typography>
        <TextField type="text" fullWidth  required margin="normal" label="Username" name="name" />
        <TextField type="email" fullWidth required margin="normal" label="Email" name="email" />
        <TextField type="password" fullWidth required margin="normal" label="Password" name="password" />
        <Button margin="normal" variant="contained" color="secondary" type="submit">Register</Button>
        <Button sx={{marginTop:"5px"}} onClick={() => navigate("/login")}>Already have an account?</Button>
      {error.status?<Alert severity={error.type} >{error.msg}</Alert>:''}
      </Box>
    </>
  )
}

export default Register

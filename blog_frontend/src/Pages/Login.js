import { Box,TextField,Button,Typography, Alert } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {authActions} from '../redux/store'
const Login = () => {
  const [error,setError] = useState({
    status:false,
    msg:"",
    type:""
  })
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data=new FormData(e.currentTarget)
    const actualData={
      email:data.get("email"),
      password:data.get("password")
    }
    if(!actualData.email || !actualData.password){
      setError({status:true,msg:"All Fields are Required",type:"error"})
    }
    const myInit={
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(actualData)
    }
    fetch('http://localhost:8000/api/users/login',myInit).then((res)=>{
      if(!res.ok){
        throw Error(res.statusText)
      }
      return res.json()
    }).then((data)=>{
      if(data.status==="failed"){
          setError({status:true,msg:data.message,type:"error"})
      }else{
        localStorage.setItem("userId", data?.user.userId); // Store userId
        console.log("UserId:",localStorage.getItem("userId"));
        dispatch(authActions.login())
        setError({status:true,msg:"Login Successful",type:"success"})
        setTimeout(()=>{
          navigate("/")
        },3000)
          
      }
  }).catch((error) => {
    setError({ status: true, msg: error.message, type: "error" });  // Handle fetch errors
  });
  }
  return (
    <>
     <Box component="form" id="login-form" onSubmit={handleSubmit} maxWidth={600} display="flex" flexDirection="column" alignItems="center" justifyContent="center" margin="auto" marginTop={5}>
      <Typography variant="h4">Login</Typography>
      <TextField type="email" margin="normal" fullWidth required label="Email" name="email" />
      <TextField type="password" margin="normal" fullWidth required label="Password" name="password" />
      <Button variant="contained" color="secondary" type="submit" >Login</Button>
      <Button sx={{color:"black",textTransform:"none", marginTop:"5px"}} onClick={()=>navigate("/register")}>Dont have an account? Register</Button>
      {error.type?<Alert severity={error.type}>{error.msg}</Alert>:''}
     </Box>
     
    </>
  )
}

export default Login

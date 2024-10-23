import { Box,AppBar,Toolbar,Typography,Button,Tabs,Tab } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../redux/store"

const Headers = () => {
  const navigate=useNavigate()
  const isLogin=useSelector(state=>state.isLogin)
  const dispatch=useDispatch()
  console.log(isLogin)
    const [value,setValue] = useState()
    const handleLogout=()=>{
      dispatch(authActions.logout())
      alert('Logout Successful')
      navigate("/login")
    }
  return (
    <div>
      <AppBar position="static" color="secondary">
        <Toolbar>
            <Typography variant="h5" fontStyle="italic" flexGrow="1">
                BlogApp
            </Typography>
            {isLogin && (
              <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs textColor="inherit" value={value} onChange={(e,val)=>setValue(val)}>
                  <Tab sx={{color:"white",textTransform:"none"}} label="Blogs" LinkComponent={Link} to="/blogs" />
                  <Tab sx={{color:"white",textTransform:"none"}} label="My Blog(s)" LinkComponent={Link} to="/myblogs" />
                  <Tab sx={{color:"white",textTransform:"none"}} label="Create Blog" LinkComponent={Link} to="/create-blog" />
              </Tabs>
          </Box>
            )}
            {!isLogin && (<>
              <Button sx={{color:"white",textTransform:"none"}} LinkComponent={Link} to="/register" >Register</Button>
              <Button sx={{color:"white",textTransform:"none"}} LinkComponent={Link} to="/login" >Login</Button>
            </>)}
            {isLogin && (
              <Button sx={{color:"white",textTransform:"none"}} onClick={handleLogout} >Logout</Button>
            )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Headers

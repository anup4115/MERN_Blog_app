import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import connectDB from './config/db.js'
import route from './routes/userRoutes.js'
import blogroute from './routes/blogRoutes.js'
const app=express()
const port=process.env.PORT 


app.use(cors())
app.use(express.json())
app.use('/api/users',route)
app.use('/api/blogs',blogroute)
connectDB()
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`)
})
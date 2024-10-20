import express from 'express'
import userController from '../controllers/userController.js'
const router=express.Router()

router.post('/register',userController.register_user)
router.post('/login',userController.login_user)

export default router
import express from 'express'
import blogController from '../controllers/blogController.js'

const router=express.Router()

router.get('/all-blogs',blogController.get_all_blogs),
router.post('/create-blog',blogController.create_blog),
router.put('/update-blog/:id',blogController.update_blog),
router.get('/get-blog/:id',blogController.get_blog),
router.delete('/delete-blog/:id',blogController.delete_blog),
router.get('/user-blog/:id',blogController.get_user_blog)
export default router
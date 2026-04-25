import { userController } from '../controllers/userController.js'
import express from 'express'

const userRouter = express.Router()

userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.get('/logout', userController.logout)

export default userRouter
import { userController } from '../controllers/userController.js'
import express from 'express'

const userRouter = express.Router()
console.log("Är userController laddad?", userController)
userRouter.post('/signup', userController.signup)
userRouter.post('/login', userController.login)
userRouter.get('/logout', userController.logout)

export default userRouter
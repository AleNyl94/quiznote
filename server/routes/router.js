import express from 'express'
import userRouter from './userRouter.js'
import noteRouter from './noteRouter.js'

const mainRouter = express.Router()

mainRouter.use('/', userRouter)
mainRouter.use('/note', noteRouter)

export default mainRouter


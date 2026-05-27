import express from 'express'
import userRouter from './userRouter.js'
import noteRouter from './noteRouter.js'

const mainRouter = express.Router()

mainRouter.get('/me', (req, res) => {
  console.log("Session check for user in router:", req.session?.user)
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user)
  } else {
    res.status(401).json({ message: 'Not authenticated' })
  }
})

mainRouter.use('/', userRouter)
mainRouter.use('/note', noteRouter)

export default mainRouter


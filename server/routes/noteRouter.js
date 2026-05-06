import { noteController } from '../controllers/noteController.js'
import { checkAuth } from '../middleware/authenticate.js'
import express from 'express'

const noteRouter = express.Router()

noteRouter.post('/', checkAuth, noteController.create)
noteRouter.put('/:id', checkAuth, noteController.edit)
noteRouter.get('/list', checkAuth, noteController.get)
noteRouter.delete('/:id', checkAuth, noteController.delete)

export default noteRouter
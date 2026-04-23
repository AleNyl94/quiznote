import { noteController } from '../controllers/noteController.js'
import express from 'express'

const noteRouter = express.Router()

noteRouter.post('/', noteController.create)
noteRouter.put('/:id', noteController.edit)
noteRouter.get('/list', noteController.get)
noteRouter.delete('/:id', noteController.delete)

export default noteRouter
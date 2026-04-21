import { Note } from '../models/noteModel.js'
import { noteController } from '../controllers/noteController.js'
import express from 'express'

const router = express.Router()

router.post('/', noteController.create)
router.put('/:id', noteController.edit)
router.get('/', noteController.get)
router.delete('/:id', noteController.delete)


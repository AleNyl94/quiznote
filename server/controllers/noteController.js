import { Note } from '../models/noteModel.js'
import { User } from '../models/userModel.js'
import { aiService } from '../utils/aiService.js'


export const noteController = {

  /**
   * Create a new note.
   *
   * @param {*} req The request object.
   * @param {*} res The response object.
   * @param {*} next The next path.
   */
  create: async (req, res) => {
    try {
      const { title, body } = req.body

      const newNote = new Note({
        title: req.body.title,
        body: req.body.body,
        owner: req.session.user.id
      })

      const savedNote = await newNote.save()
      res.status(201).json(savedNote)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  /**
   * Gets the users notes.
   * 
   * @param {*} req The request object.
   * @param {*} res The response object.
   */
  get: async (req, res) => {
    try {
      const notes = await Note.find({ owner: req.session.user.id }).populate('owner', 'email')
      res.json(notes)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  /**
   * Updates the note.
   * 
   * @param {*} req The request object.
   * @param {*} res The response object.
   */
  edit: async (req, res) => {
    try {
      const { id } = req.params
      const note = await Note.findById(id)
      if (!note) return res.status(404).json({ message: "Note is not found"})  
      
      Object.assign(note, req.body)
      await note.save()
      res.status(200).json(note)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  /**
   * Deletes the note.
   * 
   * @param {*} req The request object.
   * @param {*} res The response object.
   * @returns 
   */
  delete: async (req, res) => {
    try {
      if (!res.locals.note) return res.status(404).json({ message: "Note not found" })

      await res.locals.note.deleteOne()
      res.status(204).end()
    } catch (err) {
      res.status(500).json({ error: err.message })
    } 
  },

  /**
   * 
   * @param {*} req The request object.
   * @param {*} res The response object.
   */     
  quiz: async (req, res) => {
    try {
    const { noteId } = req.params

    const note = await Note.findById(noteId)
    if (!note) {
      return res.status(404).json('Note not found')
    }

    if (!note.body || note.body.length < 100) {
      return res.status(400).json('Note is too short to quiz, please write more')
    }
    const quiz = await aiService.generateQuiz(note.body)
    res.json(quiz)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
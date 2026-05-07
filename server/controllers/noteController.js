import { Note } from '../models/noteModel.js'
import { aiService } from '../utils/aiService.js'

export const noteController = {

  /**
   * Create a new note.
   *
   * @param {*} req The request object.
   * @param {*} res The response object.
   * @param {*} next The next path.
   */
  create: async (req, res, next) => {
    try {
      const savedNote = await new Note(req.body).save()
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
      const notes = await Note.find({ owner: res.locals.user._id }).populate('owner', 'email')
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
      const { note } = res.locals
      if (!note) return res.status(404).json({ message: "Note not found" })
        
      Object.assign(note, req.body)

      await note.save()
      res.status(200).json(`Note ${note.title} is updated successfully`)
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
    if(!note) {
      return res.status(404).json('Note not found')
    }
    const quiz = await aiService.generateQuiz(note.body)
    res.json(quiz)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  }
}
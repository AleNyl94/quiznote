import { Note } from '../models/noteModel.js'

export const noteController = {

  /**
   * Create a new note.
   *
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  create: async (err, req, res, next) => {
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
   * @param {*} err 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  get: async (err, req, res, next) => {
    try {
      const notes = await Note.find().populate('owner', 'email')
      res.json(notes)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  /**
   * Updates the note.
   * 
   * @param {*} err 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  edit: async (err, req, res, next) => {
    try {
      const { note } = res.locals
      Object.assign(note, req.body)

      await note.save()
      res.status(204).json(`Note ${note.title} is updated successfully`)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  },

  /**
   * Deletes the note.
   * 
   * @param {*} err 
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   */
  delete: async (err, req, res, next) => {
    try {
      await res.locals.note.deleteOne()
      res.status(204).end()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}
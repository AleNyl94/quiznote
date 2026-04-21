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
      const { title, body, owner } = req.body
      const newNote = new Note({ title, body, owner})
      const savedNote = await newNote.save()
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
      const notes = await Note.find().populate('owner', 'user.email')
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
      const note = res.locals.note
      const { title, body } = req.body

      note.title = title
      note.body = body

      await note.save()
      res.status(204).json(`Note ${title} is updated successfully`)
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
      const note = await Note.findByIdAndDelete(req.params.id)
      if (!note) {
        return res.status(404).json({ error: "Note not found" });
        }
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }

}
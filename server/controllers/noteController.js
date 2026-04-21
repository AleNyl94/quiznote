import { Note } from '../models/noteModel.js'

export const noteController = {

  /**
   * Create a new note.
   *
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  create: async (req, res, next) => {
    try {
      const { title, body } = req.body

      await fetch({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await Note.create({
        title,
        body,
        owner: req.session.user.id
      })
      res.status(204).send('A new note is created!')
    } catch (err) {
      next (err)
    }
  },

  edit: async

}
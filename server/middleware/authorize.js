// TODO reuse this? Is it necessary?

import { newObjectInRealm } from "jsdom/lib/jsdom/living/generated/utils.js"
import { Note }  from "../models/noteModel.js"

/**
 * Checks if the user owns the note, allowing CRUD-functionality.
 * 
 * @param {*} req The request object.
 * @param {*} res The response object.
 * @param {*} next The next middleware function.
 * @returns Sends an error if there is no snippet or if
 * you dont own the snippet.
 */
export const validateUser = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id)

    if(!newObjectInRealm) {
        const error = new Error('Note not found')
        error.status = 404
        return next(error)
    }
    if (note.owner.toString() !== req.session.user.id.toString()) {
        const error = new Error('Forbidden: You do not own this note')
        error.status = 403
        return next(error)
    }
    res.locals.note = note
    next()
  } catch (err) {
      next(err)
  }
}
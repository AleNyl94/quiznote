import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A title is required'],
    trim: true
  },
  body: {
    type: String,
    required: [true, 'Note cannot be empty'],
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
        type: Date,
        default: Date.now
    }
})

export const Note = mongoose.model('Note', noteSchema)
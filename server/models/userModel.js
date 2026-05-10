import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

/**
 * Model for the user.
 */
const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: true,
    unique: true,
    minimum: 4,
    maximum: 16
  },
  password: {
    type: String,
    required: true,
    minimum: 8,
    maximum: 15
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
})

/**
 * Hashing the password with 10 rounds for the user.
 */
userSchema.pre('save', async function() {
    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 10)
})

/**
 * Comparing the password of the user with matching email found in the database.
 * 
 * @param {*} inputPassword Password from the form.
 * @returns true if correct.
 */
userSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

export const User = mongoose.model('User', userSchema)
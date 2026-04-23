import { User } from '../models/userModel.js'

export const userController = {

  signup: async (req, res) => {
    try {
      console.log("1. Signup startad...");
      console.log("2. Body innehåll:", req.body)
      await User.create(req.body)
      res.status(200).json('A new User is created!')
    } catch (err) {
      console.log('Error:', err.message)
      res.status(400).json({ error: err.message })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      // Error handling if user is not found, or wrong input
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Saving the session
      req.session.user = { id: user._id, username: user.username }

      req.session.save(err => {
        if (err) return res.status(500).json({ error: 'Session save failed' })
        res.json({ message: 'Logged in', user: req.session.user })
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },

  logout: async (req, res) => {
    req.session.destroy(err => {
      if (err) return res.status(500).json({ error: 'Logout failed' })
      
      res.clearCookie('quiznote-session')
      res.status(200).json({ message: 'Logged out successfully' })
    })
  }
}
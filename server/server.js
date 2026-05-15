/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */
import 'dotenv/config'
import app from './app.js'
import http from 'http'
import mongoose from 'mongoose'
// import { fileURLToPath } from 'url'

const port = process.env.PORT || 3000

// Implement database locally
const mongoURI = 'mongodb://localhost:27017/quiznote'
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error with database', err))


app.get('/api/me', (req, res) => {
  console.log("Session check for user:", req.session?.user)
  if (req.session && req.session.user) {
    res.status(200).json(req.session.user)
  } else {
    res.status(401).json({ message: 'Not authenticated' })
  }
})
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
})
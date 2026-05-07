/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */
import 'dotenv/config'
import app from './app.js'
import { Server } from 'socket.io'
import { setupSocket } from './socket.js'
import http from 'http'
import mongoose from 'mongoose'
// import { fileURLToPath } from 'url'


const port = process.env.PORT || 3000

// Implement database locally
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/quiznote'
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error with database', err))


const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
})

setupSocket(io)

app.get('/me', (req, res) => {
  if (req.session && req.session.user) {
    res.statusCode(200).json(req.session.user)
  } else {
    res.status(401).json({ message: 'Not authenticated' })
  }
})
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
})
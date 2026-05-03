/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */

import app from './app.js'
import { Server } from 'socket.io'
import { setupSocket } from './socket.js'
import http from 'http'
import mongoose from 'mongoose'
// import { fileURLToPath } from 'url'
import 'dotenv/config'

const port = process.env.PORT || 3000

// Implement database locally
const mongoURI = process.env.MONGO_URI || 'mongodb://db:27017/quiznote'
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error with database', err))


const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
})

setupSocket(io)

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
})
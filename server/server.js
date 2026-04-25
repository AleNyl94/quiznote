import app from './app.js'
import express from 'express'
import session from 'express-session'
import { Server } from 'socket.io'
import { setupSocket } from './socket.js'
import http from 'http'
import mongoose from 'mongoose'
// import { fileURLToPath } from 'url'
import mainRouter from './routes/router.js'
import 'dotenv/config'

// Initialize express, JSON
app.use(express.json())
const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
})

setupSocket(io)


// Implement database locally
const mongoURI = process.env.MONGO_URI || 'mongodb://db:27017/quiznote'
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error with database', err))

  app.use(session({
    name: 'sessionID',
    // todo lägg till denna!! secret: process.env.SECRET_ENV,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax'
    }
}))
try {
// The modules directory name
  // const directoryFullName = (fileURLToPath(import.meta.url))
  app.use((req, res, next) => {
  next()
})
  app.use('/', mainRouter)
} catch (err) {
  console.error("Could not initiate routes", err)
  }
  // Error handler
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong in the server')
    next()
})

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`);
})
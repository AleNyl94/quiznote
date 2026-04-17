import express from 'express'
import ollama from 'ollama'
import websockets from 'websockets'
import { setupSocket } from './socket.js'

// Initialize express, JSON
try {
const app = express()
app.use(express.json)


// TODO implement the database logic here 

// The modules directory name
const directoryFullName = (fileURLToPath(import.meta.url))

// Setting up the router
app.use('/', router)
} catch (err) {
  // Error handler
  app.use((err, req, res, next) => {
    console.error(err)

    if(err.status === 404) {
      res
        .status(404)
        .sendFile(join(directoryFullName, 'views', 'errors'))
      return
    }
  })
}
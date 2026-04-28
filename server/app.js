import express from 'express'
import { dirname, join } from 'path'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello world');
})

export default app
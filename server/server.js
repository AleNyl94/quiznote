/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */
import 'dotenv/config'
import app from './app.js'
import mongoose from 'mongoose'

const port = process.env.PORT || 3000

const mongoURI = 'mongodb://localhost:27017/Quiznote'
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error with database', err))

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://localhost:${port}`);
})
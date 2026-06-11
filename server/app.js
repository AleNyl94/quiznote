/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */

import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import mainRouter from './routes/router.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: [ process.NODE_ENV = 'production', 'http://localhost:5173', 'https://quiznote-ashen.vercel.app'],
  credentials: true
}))


app.use(express.json())
app.use(session({
    name: 'sessionID',
    secret: process.env.SECRET_ENV || 'test-secret-fallback',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}))

app.use('/api', mainRouter)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong in the server')
    next()
})

export default app
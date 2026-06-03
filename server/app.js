/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */

import express from 'express'
import session from 'express-session'
import mainRouter from './routes/router.js'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'https://quiznote.vercel.app'],
  credentials: true
}))


app.use(express.json())
app.use(session({
    name: 'sessionID',
    secret: process.env.SECRET_ENV || 'test-secret-fallback',
    resave: false,
    saveUninitialized: false,
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
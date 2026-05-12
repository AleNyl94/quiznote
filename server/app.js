/**
 * @author Alexander Nylander
 * @version 1.0.0
 * 
 */

import express from 'express'
import session from 'express-session'
import mainRouter from './routes/router.js'

const app = express()

app.use(express.json())
app.use(session({
    name: 'sessionID',
    secret: process.env.SECRET_ENV || 'test-secret-fallback',
    resave: false,
    saveUninitialized: false,
    cookie:{ secure: false }
}))
app.use('/api', mainRouter)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong in the server')
    next()
})

export default app
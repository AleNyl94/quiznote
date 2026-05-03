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
    // todo lägg till denna!! secret: process.env.SECRET_ENV,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax'
    }
}))
app.use('/', mainRouter)

app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send('Something went wrong in the server')
    next()
})

export default app
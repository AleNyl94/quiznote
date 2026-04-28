import request from 'supertest'
import express from 'express'
import { checkAuth } from '../middleware/authenticate.js'

const app = express()
app.use(express.json)

app.get('/test-auth', checkAuth, (req, res) => res.status(200).json({ success: true }))


describe('Middleware: checkAuth', () => {
  it('should return 401 if user is NOT in res.locals', async () => {
    const res = await request(app).get('/test-auth')

    expect(res.statusCode).toBe(401)
    expect(res.body.message).toMatch(/logged in/i)
  })

  it('should call next() and return 200 if user is in res locals', async () => {
    const authApp = express()
    authApp.use((req, res, next) => {
      res.locals.user = { id: '123'}
      next()
    })
    authApp.get('/test-auth', checkAuth, (req, res) => res.status(200).json({ success: true }))
    const res = await request(authApp).get('/test-auth')

    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
  })
})
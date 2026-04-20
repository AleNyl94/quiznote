import express from 'express'


const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello world');
})

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`);
})
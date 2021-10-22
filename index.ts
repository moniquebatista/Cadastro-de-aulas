import * as dotenv from 'dotenv'

import express from 'express'
import cors from 'cors'
import * as aula from './controllers/class'
import * as user from './controllers/user'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
const PORT = 3000

app.use(express.static('www'))

app.get('/class', aula.list)
app.get('/class/:id', aula.get)
app.post('/class', aula.create)
app.put('/class', aula.update)
app.delete('/class', aula.remove)

app.get('/user', user.list)
app.get('/user/:id', user.get)
app.post('/user', user.create)
app.put('/user', user.update)
app.delete('/user', user.remove)

app.listen(PORT, () => {
  console.log(`⚡️[server]: API rodando em http://localhost:${PORT}`)
})

import "./config/env"
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { routes } from './routes'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL as string, credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(routes)

const port = 8000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

import { env } from "./config/env"
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import { routes } from './routes'

const app = express()

app.use(cors({ origin: env.FRONTEND_URL, credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(routes)

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`)
})

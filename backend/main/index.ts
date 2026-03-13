import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { routes } from './routes'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const app = express()

app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(routes)

const port = 8000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})

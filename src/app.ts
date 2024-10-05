import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: [
      'https://ultimate-tripz.netlify.app',
      'https://ultimate-tripz-next.vercel.app',
      'http://localhost:3000',
    ], // Allow your frontend URL
    credentials: true, // Allow credentials to be included
  }),
)

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Ultimate Tripz Running!')
})
app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app

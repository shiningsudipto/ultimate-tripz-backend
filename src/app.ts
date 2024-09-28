import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import router from './app/routes'
import globalErrorHandler from './app/middlewares/globalErrorhandler'
import notFound from './app/middlewares/notFound'
const app: Application = express()

// parser
app.use(express.json())
app.use(
  cors({
    origin: ['https://car-wash-zeta-one.vercel.app', 'http://localhost:5173'], // Allow your frontend URL
    credentials: true, // Allow credentials to be included
  }),
)

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Assignment 3!')
})
app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app

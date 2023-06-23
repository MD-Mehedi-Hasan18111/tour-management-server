import express, { Application, Request, Response, NextFunction } from 'express'
const app: Application = express()
import cors from 'cors'
import globalErrorHandler from './middlewares/globalErrorHandler'
import routes from './routes/index'
import httpStatus from 'http-status'

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully!')
})

// Using Global Error Handler
app.use(globalErrorHandler)

// Handle Not Found API
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  })
  next()
})

export default app

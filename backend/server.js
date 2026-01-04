import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './configuration/db.js'
import authRouter from './routes/authRoute.js'
import taskRouter from './routes/taskRoute.js' 
import {errorHandler} from './middlewares/errorMiddleware.js'


// create express app
const app = express()
const port = 3000

// Load environment variables from .env file
dotenv.config()

// Connect to the database
connectDB();

// middlewares
app.use(cors())
app.use(express.json());


// routes
app.use('/api/v1/auth', authRouter) // no need to re write prefixes api/v1/auth 
app.use('/api/v1/tasks', taskRouter)

// error handling
app.use(errorHandler)

// start the server   
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

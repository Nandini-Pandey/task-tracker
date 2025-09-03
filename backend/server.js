import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './configuration/db.js'
import {authRoute} from './routes/authRoute.js'
import {taskRoute} from './routes/taskRoute.js' 
import {errorHandles} from './middlewares/errorMiddleware.js'


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
app.use('/api/auth', authRoute)
app.use('/api/tasks', taskRoute)

// error handling
app.use(errorHandles)

// start the server   
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`)
})

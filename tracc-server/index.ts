import express, { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connectDB = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Connected to MongoDB')
        })
        .catch((err) => {
            console.log(err)
        })
}

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth', authRoutes)

app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500
    const message = err.message || 'Something went wrong!'

    return res.status(status).json({
        success: false,
        status,
        message
    })
})

app.listen(8080, () => {
    connectDB()
    console.log('Server is running on port 8080')
})

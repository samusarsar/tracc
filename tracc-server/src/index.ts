import express, { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import walletsRoutes from './routes/wallets'
import authRoutes from './routes/auth'

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

app.use(
    cors({
        origin: '*',
        credentials: true
    })
)
app.use(cookieParser())
app.use(express.json())

app.get('/api', (req: Request, res: Response) => {
    res.status(201).json({ message: 'Welcome to Tracc Server' })
})

app.use('/api/auth', authRoutes)
app.use('/api/wallets', walletsRoutes)

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

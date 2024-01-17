import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'

import User from '../models/User'

export const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        await User.create({ ...req.body, password: hash })

        res.status(200).send('User created!')
    } catch (error) {
        next(error)
    }
}

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const existingUser = await User.findOne({
            username: req.body.username
        })

        if (!existingUser)
            return next(createHttpError(404, 'User does not exist'))

        const passwordsMatch = await bcrypt.compare(
            req.body.pasword,
            existingUser.password
        )

        if (!passwordsMatch)
            return next(createHttpError(400, 'Wrong credentials'))

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET)
        const { password, ...other } = existingUser._doc

        res.cookie('access_token', token, {
            httpOnly: false
        })
            .status(200)
            .json(other)
    } catch (error) {
        next(error)
    }
}

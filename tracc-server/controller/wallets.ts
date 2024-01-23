import { NextFunction, Request, Response } from 'express'

import Wallet from '../models/Wallet'

export const createWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const newWallet = await Wallet.create(req.body)

        res.status(200).json(newWallet)
    } catch (error) {
        next(error)
    }
}

export const editWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatedWallet = await Wallet.findOneAndUpdate(
            {
                _id: req.params.id
            },
            req.body,
            { new: true }
        )

        res.status(200).json(updatedWallet)
    } catch (error) {
        next(error)
    }
}

export const deleteWallet = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await Wallet.deleteOne({
            id: req.params.id
        })

        res.status(200).json('Wallet deleted')
    } catch (error) {
        next(error)
    }
}

export const addTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatedWallet = await Wallet.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $push: {
                    transactions: req.body
                }
            },
            { new: true }
        )

        res.status(200).json(updatedWallet)
    } catch (error) {
        next(error)
    }
}

export const deleteTransaction = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updatedWallet = await Wallet.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $pull: {
                    transactions: {
                        _id: req.body.id
                    }
                }
            },
            { new: true }
        )

        res.status(200).json(updatedWallet)
    } catch (error) {
        next(error)
    }
}

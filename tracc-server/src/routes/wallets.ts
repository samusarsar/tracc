import express from 'express'
import {
    createWallet,
    deleteWallet,
    addTransaction,
    deleteTransaction,
    editWallet,
    getWallets
} from '../controller/wallets'

const router = express.Router()

router.get('/:email', getWallets)
router.post('/create', createWallet)
router.delete('/:id', deleteWallet)
router.post('/:id', addTransaction)
router.put('/:id', deleteTransaction)
router.patch('/:id', editWallet)

export default router

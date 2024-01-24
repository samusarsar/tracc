import mongoose from 'mongoose'

const TransactionSchema = new mongoose.Schema(
    {
        coinId: {
            type: String,
            require: true
        },
        coinSymbol: {
            type: String,
            require: true
        },
        buyPrice: {
            type: Number,
            require: true
        },
        buyAmount: {
            type: Number,
            require: true
        }
    },
    { timestamps: true }
)

const WalletSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        description: {
            type: String,
            default: ''
        },
        owner: {
            type: String,
            required: true
        },
        transactions: [
            {
                type: TransactionSchema
            }
        ]
    },
    { timestamps: true }
)

export default mongoose.model('Wallet', WalletSchema)

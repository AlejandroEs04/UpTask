import mongoose from "mongoose"
import colors from 'colors'
import { exit } from 'node:process'

export const connectDB = async() => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.magenta(`MongoDB connected successfully in: ${url}`))
    } catch (error) {
        console.log(colors.red("Fail connection to MongoDB"))
        exit(1)
    }
}
import mongoose from "mongoose"

export async function connect() {
    try {
        console.log("mongoURI = ", process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("MongoDB connected successfully")
        })    
        connection.on('error', (err) => {
            console.log("MongoDB connection error due to the error : ", err)
            process.exit()
        })    
    } catch (error) {
        console.error("Error occured while connecting with MongoDB : ", error)
    }
}
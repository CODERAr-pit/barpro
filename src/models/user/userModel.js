import { timeStamp } from "console"
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    confirmPassword: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "shopOwner"],
        default: "user"
    },
    // timeStamps: true
})

const User = mongoose.models.users || mongoose.model("users", userSchema)
export default User
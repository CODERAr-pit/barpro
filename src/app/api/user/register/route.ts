import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/user/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
//mailer

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password, confirmPassword, role} = reqBody
        //all fields are required
        if (!username || !email || !password || !confirmPassword || !role) 
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        //checking password matching or not
        if (password !== confirmPassword) 
            return NextResponse.json({error: "Password is not matching"}, {status: 400})
        //check if user already exists
        const existingUser = await User.findOne({
            $or: [
                {username},
                {email}
            ]
        })
        if (existingUser) 
            return NextResponse.json({error: "User already exists"}, {status: 400})
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        })
        await newUser.save()
        return NextResponse.json({message: "User created successfully"}, {status: 201})
        //send mail
    } catch (error: any) {
        console.log("Register-Error : ", error)
        return NextResponse.json({error: "Error occured while creating your account. Please try again later"}, {status: 500})
    }
}
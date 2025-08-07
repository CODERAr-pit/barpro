import {connect} from "@/dbconfig/dbconfig"
import User from "@/models/user/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, password} = reqBody
        //all fields are required
        if (!username || !password) 
            return NextResponse.json({error: "All fields are required"}, {status: 400})
        //check if user already exists
        const existingUser = await User.findOne({username})
        if (!existingUser) 
            return NextResponse.json({error: "User not found"}, {status: 400})
        //check password is correct or not
        const validPassword = await bcryptjs.compare(password, existingUser.password)
        if (!validPassword)
            return NextResponse.json({error: "Incorrect password"}, {status: 400})
        //create token
        const tokenData = {
            id: existingUser._id,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})
        const response = NextResponse.json(
            {
                message: "Login successful",
                existingUser
            },
            {status: 201}
        )
        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
    } catch (error: any) {
        console.log("Login-Error : ", error)
        return NextResponse.json({error: "Error occured while login. Please try again later"}, {status: 500})
    }
}
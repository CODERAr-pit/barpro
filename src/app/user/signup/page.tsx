"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"
import axios from "axios"

export default function SignUpPage() {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    // const onSignUP = async () => {

    // }
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                <form className="space-y-5">
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block mb-1 text-gray-600 font-medium">Username</label>
                    <input 
                    id="username"
                    type="text" 
                    value= {user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Enter your username" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400" />
                </div>
                {/* Email */}
                <div>
                    <label htmlFor="email" className="block mb-1 text-gray-600 font-medium">Email</label>
                    <input 
                    id="email"
                    type="email"
                    value= {user.email}
                    onChange= {(e) => setUser({...user, email: e.target.value})} 
                    placeholder="Enter your email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400" />
                </div>
                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-gray-600 font-medium">Password</label>
                    <input 
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})} 
                    placeholder="Enter your password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400" />
                </div>
                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirmPassword" className="block mb-1 text-gray-600 font-medium">Confirm Password</label>
                    <input 
                    id="confirmPassword"
                    value={user.confirmPassword}
                    onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                    type="password" 
                    placeholder="Confirm your password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400" />
                </div>
                {/* Submit Button */}
                <button 
                type="submit" 
                // onClick={onSignUp}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
                </form>
                {/* Redirect to Login */}
                <p className="mt-4 text-center text-gray-600 text-sm">
                Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    )
}
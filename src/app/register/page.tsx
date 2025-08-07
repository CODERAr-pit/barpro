"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation"
import {toast} from "react-hot-toast"
import axios from "axios"

export default function SignUpPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    })
    const [serverMessage, setServerMessage] = useState<{ type: "error" | "success" | ""; text: string }>({
        type: "",
        text: ""
    });
    const onRegister = async () => {
        setServerMessage({ type: "", text: "" }); // Clear previous message
        try {
            const response = await axios.post("/api/user/register", user);
            if (response.status === 201) {
                setServerMessage({
                    type: "success",
                    text: response.data.message || "User created successfully"
                });
                setTimeout(() => {
                    router.push("/login");
                }, 500);
            }
        } catch (error: any) {
            const errMsg = error.response?.data?.error || "Something went wrong. Please try again.";
            setServerMessage({
                type: "error",
                text: errMsg
            });
            console.log("Registration failed:", errMsg);
        }
    };    
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
                <form 
                className="space-y-5"
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    onRegister(); 
                }}
                >
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
                {/* select option */}
                <div>
                    <label htmlFor="role" className="block mb-1 text-gray-600 font-medium">
                        Select Role
                    </label>
                    <select
                        id="role"
                        value={user.role}
                        onChange={(e) => setUser({ ...user, role: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                    >
                        <option value="" disabled hidden>Select your role</option>
                        <option value="user">User</option>
                        <option value="shopOwner">Shop Owner</option>
                    </select>
                </div>
                {/* Submit Button */}
                <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Sign Up</button>
                </form>
                {/* error || success messages */}
                {serverMessage.text && (
                    <div
                        className={`mt-4 text-center text-sm font-semibold ${serverMessage.type === "error" ? "text-red-600" : "text-green-600"}`}
                    >
                        {serverMessage.text}
                    </div>
                )}
                {/* Redirect to Login */}
                <p className="mt-4 text-center text-gray-600 text-sm">
                Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
                </p>
            </div>
        </div>
    )
}
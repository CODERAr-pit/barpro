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
        password: "",
    })
    const [serverMessage, setServerMessage] = useState<{ type: "error" | "success" | ""; text: string }>({
        type: "",
        text: ""
    });
    const onLogin = async () => {
        setServerMessage({ type: "", text: "" }); // Clear previous message
        try {
            const response = await axios.post("/api/user/login", user);
            if (response.status === 201) {
                const user = response.data.existingUser
                setServerMessage({
                    type: "success",
                    text: response.data.message || "Logged in successfully"
                });
                setTimeout(() => {
                    router.push(`/user/locationPage/u/${user.username}`);
                }, 500);
            }
        } catch (error: any) {
            const errMsg = error.response?.data?.error || "Something went wrong. Please try again.";
            setServerMessage({
                type: "error",
                text: errMsg
            });
            console.log("Logged in Failed:", errMsg);
        }
    }
    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form 
                className="space-y-5"
                onSubmit={(e) => { 
                    e.preventDefault(); 
                    onLogin(); 
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
                {/* Submit Button */}
                <button 
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">Login</button>
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
                Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
                </p>
            </div>
        </div>
    )
}
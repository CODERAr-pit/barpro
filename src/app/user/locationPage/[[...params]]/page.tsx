"use client";
import { useParams } from "next/navigation";

export default function LocationPage() {
    const params = useParams();
    const username = Array.isArray(params?.params) && params.params.length >= 2
        ? params.params[1]
        : null;
    return (
        <div>
            <h1>Dashboard</h1>
            {username && <p>Welcome, {username}!</p>}
        </div>
    );
}

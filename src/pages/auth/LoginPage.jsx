import { useState } from "react";
import { InputField } from "../../components/InputField";
import { SubmitButton } from "../../components/SubmitButton";
import { Card, CardContent } from "../../components/ui/card";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const API_BASE_URL = " http://localhost:3000/api";

    const login = async ({ email, password }) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/login`,
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            if (response.data.token && response.data.user) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                setUser(response.data.user);
                setToken(response.data.token);
                return {
                    success: true,
                    ...response.data,
                };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (error) {
            console.error("Login error:", error);
            return {
                success: false,
                message:
                    error.response?.data?.error ||
                    error.response?.data?.message ||
                    error.message ||
                    "Login failed",
            };
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // Pass email and password as an object
            const data = await login({ email, password });

            console.log("Login Response:", data); // Debugging step

            if (!data.success || !data.user) {
                throw new Error(data.message || "Invalid response from server");
            }

            if (data.success) {
                alert(`Login Successfully!`);
            } else {
                alert(`Something went wrong!`);
            }
        } catch (err) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Card className="w-full max-w-sm shadow-lg">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-center">Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <InputField
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <SubmitButton label="Login" isLoading={loading} />
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

import { useState } from "react";
import { InputField } from "../../components/InputField";
import { SubmitButton } from "../../components/SubmitButton";
import { Card, CardContent } from "../../components/ui/card";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../contexts/AuthContext";
import { CustomAlert } from "../../components/CustomAlert";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useAuth(); // login here is from context

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [alertInfo, setAlertInfo] = useState(null);

    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        setAlertInfo(null);

        const res = await loginUser({ email, password });

        if (res.success) {
            login(res.user, res.token);
            setAlertInfo({
                type: "success",
                message: "You have successfully logged in.",
            });
            navigate('/dashboard');
            
        } else {
            setError(res.message || "Login failed");
            setAlertInfo({
                type: "error",
                message: res.message || "Login failed. Please try again.",
            });
        }

        setLoading(false);
    };


    return (
        <div className="h-screen bg-gray-100">
            {alertInfo && (
                <div className="flex justify-center pt-4 w-80">
                    <CustomAlert
                        type={alertInfo.type}
                        message={alertInfo.message}
                        className="mb-4"
                    />
                </div>
            )}
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
        </div>
    );
}

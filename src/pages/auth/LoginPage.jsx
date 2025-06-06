import { useState } from "react";
import { InputField } from "../../components/InputField";
import { SubmitButton } from "../../components/SubmitButton";
import { Card, CardContent } from "../../components/ui/card";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Logged in:", { email, password });
      setLoading(false);
    }, 1500);
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

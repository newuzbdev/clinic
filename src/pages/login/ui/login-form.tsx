import { TextInput, PasswordInput, Checkbox, Button, Paper, Title, Text, Anchor } from "@mantine/core"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { showNotification } from "@mantine/notifications";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Fake login: if admin/admin, set user as admin
        if (email === "admin" && password === "admin") {
            localStorage.setItem("user", JSON.stringify({ role: "admin" }));
            showNotification({
                message: "Login successful!",
                color: "green",
            });
            navigate("/");
        } else {
            showNotification({
                message: "Invalid credentials. ",
                color: "red",
              
            });
        }
    }

    return (
        <div>
            <Paper className="p-8 shadow-sm border border-gray-200 rounded-lg bg-white">
                <div className="text-center mb-6">
                    <Title order={2} className="text-2xl font-semibold text-gray-900 mb-2">
                        Sign In
                    </Title>
                    <Text className="text-gray-600 text-sm">Please enter below details to access the dashboard</Text>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Text className="text-sm font-medium text-gray-700 mb-2">Email Address</Text>
                        <TextInput
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.currentTarget.value)}
                            leftSection={<Mail size={16} className="text-gray-400" />}
                            className="w-full"
                            styles={{
                                input: {
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    padding: "12px 16px 12px 40px",
                                    fontSize: "14px",
                                },
                            }}
                        />
                    </div>

                    <div>
                        <Text className="text-sm font-medium text-gray-700 mb-2">Password</Text>
                        <PasswordInput
                            placeholder="••••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.currentTarget.value)}
                            leftSection={<Lock size={16} className="text-gray-400" />}
                            visibilityToggleIcon={({ reveal }) => (reveal ? <EyeOff size={16} /> : <Eye size={16} />)}
                            className="w-full"
                            styles={{
                                input: {
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    padding: "12px 16px 12px 40px",
                                    fontSize: "14px",
                                },
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Checkbox
                            label="Remember Me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.currentTarget.checked)}
                            styles={{
                                label: {
                                    fontSize: "14px",
                                    color: "#374151",
                                },
                            }}
                        />
                        <Anchor href="#" className="text-sm text-red-500 hover:text-red-600">
                            Forgot Password?
                        </Anchor>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                        styles={{
                            root: {
                                backgroundColor: "#4f46e5",
                                "&:hover": {
                                    backgroundColor: "#4338ca",
                                },
                            },
                        }}
                    >
                        Login
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <Text className="text-sm text-gray-600">
                        Don't have an account yet?{" "}
                        <Anchor href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                            Register
                        </Anchor>
                    </Text>
                </div>
            </Paper>
        </div>
    )
}

export default LoginForm

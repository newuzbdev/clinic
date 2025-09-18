
import { Text, } from "@mantine/core"
import LoginForm from "./ui/login-form"
const Login = () => {
    return (
        <div>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 text-white">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2L12 22M2 12L22 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">MediCRM</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <LoginForm />

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <Text className="text-xs text-gray-500">Copyright © 2025 - MediCRM</Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

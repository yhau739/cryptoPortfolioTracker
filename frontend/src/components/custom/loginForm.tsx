"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { Toaster } from "sonner"
import { loginUser } from "./loginActions"
import { toast } from "sonner"

export default function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({})
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter(); // Initialize Next.js router

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Reset errors
        setErrors({})
        setIsLoading(true)

        // Validate form
        const newErrors: { username?: string; password?: string; general?: string } = {}

        if (!username.trim()) {
            newErrors.username = "Username is required"
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            setIsLoading(false);
            return
        }

        try {
            // Replace with your actual authentication logic
            await toast.promise(
                loginUser({ username, password }),
                {
                    loading: "Logging in...",
                    success: (data) => {
                        if (data.success) {
                            // set localstorage for sessionID
                            localStorage.setItem("sessionId", data.sessionId);
                            setTimeout(() => router.push("/dashboard"), 1000); // Redirect after 1 seconds
                            return `Welcome back, ${username}!`
                        } else {
                            throw new Error(data.error);
                        }
                    },
                    error: (error) => error.message,
                }
            );
        } catch (error) {
            setErrors({
                general: "Invalid username or password",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-50">
            <Toaster richColors />
            <Card className="w-full max-w-md mx-auto">
                <CardHeader >
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <form className="w-full items-center flex flex-col gap-8" onSubmit={handleSubmit}>
                    <CardContent className="space-y-4 w-full ">
                        {errors.general && (
                            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.general}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                aria-invalid={!!errors.username}
                                aria-describedby={errors.username ? "username-error" : undefined}
                            />
                            {errors.username && (
                                <p id="username-error" className="text-destructive text-sm mt-1">
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? "password-error" : undefined}
                            />
                            {errors.password && (
                                <p id="password-error" className="text-destructive text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </CardContent>

                    <CardFooter className="w-full mb-3">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}


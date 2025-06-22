
import type React from "react"
import { InfinitySpin } from 'react-loader-spinner'
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  // const [userType, setUserType] = useState<"student" | "recruiter" | null>(null)

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    setLoading(true)
    // if (!userType) {
    //   alert("Please select whether you are a student or recruiter")
    //   return
    // }

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, formData);
      console.log('Login Success:', res.data);
      navigate('/home');
    } catch (error: any) {
      console.error('Login Error:', error.response?.data || error.message);
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }

  }

  const handleGoogleLogin = () => {
    // if (!userType) {
    //   alert("Please select whether you are a student or recruiter")
    //   return
    // }
    window.location.href = (`${import.meta.env.VITE_BACKEND_URL}/auth/google`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md bg-gradient-to-b from-white to-blue-50/50 border-2 border-white shadow-2xl shadow-blue-200/50">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-black text-blue-600">Log In</CardTitle>
          <CardDescription className="text-gray-600">Choose your account type and sign in to continue</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Type Selection */}
          {/* <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">I am a:</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={userType === "student" ? "default" : "outline"}
                className={`flex-1 ${userType === "student"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                  }`}
                onClick={() => setUserType("student")}
              >
                Student
              </Button>
              <Button
                type="button"
                variant={userType === "recruiter" ? "default" : "outline"}
                className={`flex-1 ${userType === "recruiter"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-blue-200 text-blue-600 hover:bg-blue-50"
                  }`}
                onClick={() => setUserType("recruiter")}
              >
                Recruiter
              </Button>
            </div>
          </div> */}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl shadow-sm shadow-blue-100/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-white border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl shadow-sm shadow-blue-100/50"
              />
            </div>

            <div className="text-left">
              {/* <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                Forgot Password?
              </Link> */}
            </div>

            {loading && (
              <div className="fixed inset-0 bg-white/60 backdrop-blur-sm z-50 flex justify-center items-center">
                <InfinitySpin width="150" color="#2563eb" />
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200/50 transform hover:scale-[1.02] transition-all duration-200 flex justify-center items-center h-[52px]"
              disabled={loading}
            >
              {loading ? (
                <span className="text-blue-700">Logging in...</span>
              ) : (
                'Log In'
              )}
            </Button>


          </form>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">Or Log In with</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              className="w-full border-gray-200 hover:bg-gray-50 rounded-xl py-3 shadow-sm shadow-blue-100/30 transform hover:scale-[1.02] transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 488 512">
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link to="/" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
              Sign Up here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

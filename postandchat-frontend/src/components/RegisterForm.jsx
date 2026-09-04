import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useRegisterMutation } from "@/redux/api/authApi"
import { setCredentials } from "@/redux/slices/authSlice"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function RegisterForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })
  const [errorMessage, setErrorMessage] = useState("")

  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    if (formData.password !== formData.password_confirmation) {
      setErrorMessage("Password နှစ်ခု တူညီမှု မရှိပါ။")
      return
    }

    try {
      const res = await register(formData).unwrap()

      dispatch(setCredentials(res))

      if (res.access_token) {
        localStorage.setItem("token", res.access_token)
      }

      
      navigate("/", { replace: true })
    } catch (err) {
      console.error("Register Error:", err)
      setErrorMessage(
        err?.data?.message || "အကောင့်ဖွင့်ခြင်း မအောင်မြင်ပါ။ ပြန်လည်ကြိုးစားပါ။"
      )
    }
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {errorMessage && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-200">
                {errorMessage}
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters long.
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <Button variant="outline" type="button" className="w-full">
                Sign up with Google
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="underline underline-offset-4 font-medium text-primary">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
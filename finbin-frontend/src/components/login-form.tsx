"use client"
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";


const loginSchema = z.object({
  Email: z.string().email({ message: "Please enter a valid email address." }),
  Password: z.string().min(1, { message: "Password is required." }),
})
 
const DEMO_USER = [
  {
    id: 1,
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
  }
]

export default function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      Email: "",
      Password: ""
    },
  })
 
  // Submit handler
  async function onSubmit(loginData: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    try {
      // Check for demo users first
      const demoUser = DEMO_USER.find(
        (user) => user.email.toLowerCase() === loginData.Email.toLowerCase() && user.password === loginData.Password,
      )

      if (demoUser) {
        // Create a demo token
        const demoToken = `dummy-token-${demoUser.id}-${Date.now()}`

        // Store the token in localStorage
        localStorage.setItem("token", demoToken)

        // Store basic user info
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email,
          }),
        )

        toast.success("Demo login successful")

        // Redirect to dashboard
        router.push("/dashboard")
        return
      }

      // If not a dummy user, proceed with regular API login
      // const result = await apiClient<AuthResponseDTO>("/auth/authorize", {
      //   method: "POST",
      //   body: JSON.stringify(loginData),
      // })

      // Store the token in localStorage
      // localStorage.setItem("token", result.Token)

      // Store basic user info
      // localStorage.setItem(
      //   "user",
      //   JSON.stringify({
      //     id: result.Id,
      //     name: result.Name,
      //     email: result.Email,
      //   }),
      // )

      // Redirect to dashboard
      router.push("/dashboard")

    } catch (error) {
      toast.message("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div>
      <Toaster className="absolute bottom-0" />
      <Card className="">
        <CardContent className="pt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }:{ field:any }) => (
                  <FormItem className="">
                    <FormLabel className="">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Password"
                render={({ field }:{ field:any }) => (
                  <FormItem className="">
                    <FormLabel className="">Password</FormLabel>
                    <FormControl>
                      <Input value="" type="password" placeholder="********" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right flex">
                <Link href="/forgot-password" className="text-sm text-primary justify-start underline underline-offset-4">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full hover:cursor-pointer" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center flex-col">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary underline underline-offset-4">
              Register
            </Link>
          </p>
          <div className="w-full mt-4 pt-4 border-t">
            <p className="text-sm text-center text-muted-foreground mb-2">Quick Demo Access</p>
            <div className="grid gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  form.setValue("Email", "demo@example.com")
                  form.setValue("Password", "password123")
                }}
                type="button"
                className="text-xs hover:cursor-pointer"
              >
                Use Demo Credentials
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Email: demo@example.com
              <br />
              Password: password123
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
  }
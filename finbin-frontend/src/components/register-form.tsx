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


const registerSchema = z.object({
  Name: z.string().min(1, { message: "Please enter a valid name" }),
  Email: z.string().email({ message: "Please enter a valid email address." }),
  Password: z.string().min(1, { message: "Password is required." }),
  confirmPassword: z.string().min(1, { message: "Password is required." }),
})


export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      Name: "",
      Email: "",
      Password: "",
      confirmPassword: ""
    },
  })
 
  // Submit handler
  async function onSubmit(data: z.infer<typeof registerSchema>) {
    setIsLoading(true)

    try {
      // This matches the AuthResponseDTO from the API docs
      const registration = await fetch("/users", {
        method: "POST",
        body: JSON.stringify({
          name: data.Name,
          email: data.Email,
          password: data.Password,
        }),
      })
        
      toast.success("Your account has been created.")

      const authCode = await fetch("/auth/authorize", {
        method: "POST",
        body: JSON.stringify({
          client_id: "",
          redirect_uri: "/dashboard",
          code_challenge: "",
        }),
      })

      const authToken = await fetch("/auth/token", {
        method: "POST",
        body: JSON.stringify({
          grant_type: "authentication_code",
          code: authCode,
          code_verifier: "",
        }),
      })

      // Store the token in localStorage
      localStorage.setItem("token", authToken.toString())

      // Store basic user info
      localStorage.setItem(
        "user",
        JSON.stringify({
          // id: data.Id,
          name: data.Name,
          email: data.Email,
        }),
      )

      // Redirect to onboarding
      router.push("/")
    } catch (error) {
      toast.error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return(
    <div>
      <Toaster className="absolute bottom-0" />
      <Card>
        <CardContent className="pt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Name"
                render={({ field }:{ field:any }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Email"
                render={({ field }:{ field:any }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
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
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }:{ field:any }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline underline-offset-4">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
  }
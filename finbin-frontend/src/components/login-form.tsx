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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    
  }

  return(
    <div>
      <Card className="">
        <CardContent className="pt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
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
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} disabled={isLoading} />
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
              <Button type="submit" className="w-full" disabled={isLoading}>
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
                className="text-xs"
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
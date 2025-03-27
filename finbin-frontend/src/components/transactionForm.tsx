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


const transactionSchema = z.object({
  amount: z.coerce.number(),
  description: z.string().min(1, "Description is required").max(100),
  category: z.string().min(1, "Category is required").max(20),
  transaction_date: z.string().min(1, "Date is required"),
  notes: z.string().max(100).optional(),
})

interface LoginFormProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({isModalOpen,setIsModalOpen}: {isModalOpen: boolean;setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;})  {

  const apiroute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      amount: 0,
      description: "",
      category: "",
      transaction_date: new Date().toISOString().split("T")[0], // Default date set to current date
      notes: "",
    },
  })

  const generateRandomReference = () => {
    return "T" + Math.floor(Math.random() * 1e12) //Reference number generator
  }

 
  // Submit handler
  async function onSubmit(transactionData: z.infer<typeof transactionSchema>) {
    
    setIsLoading(true);

    const requestData = {
      user_id: 2, // Assuming the user_id is predetermined
      amount: transactionData.amount,
      description: transactionData.description,
      category: transactionData.category,
      transaction_date: new Date().toISOString(), // Predetermined date
      reference: generateRandomReference(), // Randomized reference
      notes: transactionData.notes || "", // Notes (can be empty)
      is_reconciled: false, // Assuming it's always false initially
    };

    try {
        const response = await fetch(`${apiroute}/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication or custom headers here if needed
            },
            body: JSON.stringify(requestData), // Send TransactionData as the body of the request
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch transactions: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data); // Handle your data here

    } catch (error) {
        console.error("Error fetching transactions:", error);
    } finally {
        setIsLoading(false);
        setIsModalOpen(false);
        
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
                name="amount"
                render={({ field }:{ field:any }) => (
                  <FormItem className="">
                    <FormLabel className="">Amount</FormLabel>
                    <FormControl>
                      <Input type="amount" placeholder="0" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className=""/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }:{ field:any }) => (
                  <FormItem className="">
                    <FormLabel className="">Description</FormLabel>
                    <FormControl>
                      <Input value="" type="description" placeholder="Enter Description" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className=""/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }:{ field:any }) => (
                  <FormItem className="">
                    <FormLabel className="">Category</FormLabel>
                    <FormControl>
                      <Input value="" type="category" placeholder="Enter Category" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className="" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="notes"
                render={({ field }:{ field:any }) => (
                  <FormItem className="">
                    <FormLabel className="">Note</FormLabel>
                    <FormControl>
                      <Input value="" type="notes" placeholder="Enter Note" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage className=""/>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full hover:cursor-pointer" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
              <Button  onClick={() => setIsModalOpen(false)} className="w-full hover:cursor-pointer" >
                {isLoading ? "Cancelling..." : "Cancel"}
              </Button>
            </form>
          </Form>
        </CardContent>

      </Card>
    </div>
  )
  }
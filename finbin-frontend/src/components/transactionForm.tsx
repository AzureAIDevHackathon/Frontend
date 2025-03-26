`use client`

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    user_id: z.number().positive().finite(),
    amount: z.number().finite(),
    description: z.string().min(1).max(100),
    category: z.string().min(1).max(20),
    transaction_date: z.string().date(),
    reference: z.string().min(1).max(50),
    notes: z.string().min(1).max(100),
    is_reconciled: z.boolean()
})

export default function TransactionForm(){
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            user_id: 0,
            amount: 0,
            description: "",
            category: "",
            transaction_date: "",
            reference: "",
            notes: "",
            is_reconciled: false
        }
    }) 

    function onSubmit(values: z.infer<typeof formSchema>){
        console.log(values)
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field } : { field : any }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
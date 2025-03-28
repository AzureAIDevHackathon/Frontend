"use client";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const bucketSchema = z.object({
  name: z.string().min(1, "Name is required"),
  target_amount: z.coerce.number(),
  current_saved_amount: z.coerce.number(),
  priority_score: z.coerce.number().min(1, "Priority is required").max(20),
  deadline: z.string().min(1, "Deadline is required"), // Ensuring it's a string for API compatibility
  status: z.string().max(100),
});

interface BucketFormProps {
  rerenderToggle: boolean;
  setRerenderToggle: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BucketForm({
  isModalOpen,
  setIsModalOpen,
  rerenderToggle,
  setRerenderToggle
}: BucketFormProps) {
  const apiroute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof bucketSchema>>({
    resolver: zodResolver(bucketSchema),
    defaultValues: {
      name: "",
      target_amount: 0,
      current_saved_amount: 0,
      priority_score: 1,
      deadline: new Date().toISOString(), // Full ISO format
      status: "active",
    },
  });

  // Submit handler
  async function onSubmit(transactionData: z.infer<typeof bucketSchema>) {
    setIsLoading(true);

    const requestData = {
      user_id: 2,
      name: transactionData.name,
      target_amount: transactionData.target_amount,
      current_saved_amount: transactionData.current_saved_amount,
      priority_score: transactionData.priority_score,
      deadline: new Date(transactionData.deadline).toISOString(), // Keep full ISO format
      status: transactionData.status,
    };

    try {
      const response = await fetch(`${apiroute}/buckets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: ${data.message || response.statusText}`
        );
      }

      toast.success("Bucket created successfully!");
      setIsModalOpen(false);
      setRerenderToggle(!rerenderToggle)
      router.refresh(); // Refresh page or data after submission
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to create bucket.");
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <div>
      <Toaster className="absolute bottom-0" />
      <Card>
        <CardContent className="pt-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Target Amount */}
              <FormField
                control={form.control}
                name="target_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Target Amount" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Current Saved Amount */}
              <FormField
                control={form.control}
                name="current_saved_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Saved Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Amount" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Priority Score */}
              <FormField
                control={form.control}
                name="priority_score"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority Score</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter Priority Score" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Deadline (Date Picker) */}
              <Controller
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deadline</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">
                          {field.value ? format(new Date(field.value), "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar mode="single" selected={new Date(field.value)} onSelect={(date) => field.onChange(date?.toISOString())} />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status Field */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Status" {...field} disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit & Cancel Buttons */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
              <Button onClick={() => setIsModalOpen(false)} className="w-full" type="button">
                Cancel
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  import { Input } from "@/components/ui/input"

  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"


export default function Transaction(){


    const invoices = [
        {
          invoice: "INV001",
          paymentStatus: "Paid",
          totalAmount: "$250.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV002",
          paymentStatus: "Pending",
          totalAmount: "$150.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV003",
          paymentStatus: "Unpaid",
          totalAmount: "$350.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV004",
          paymentStatus: "Paid",
          totalAmount: "$450.00",
          paymentMethod: "Credit Card",
        },
        {
          invoice: "INV005",
          paymentStatus: "Paid",
          totalAmount: "$550.00",
          paymentMethod: "PayPal",
        },
        {
          invoice: "INV006",
          paymentStatus: "Pending",
          totalAmount: "$200.00",
          paymentMethod: "Bank Transfer",
        },
        {
          invoice: "INV007",
          paymentStatus: "Unpaid",
          totalAmount: "$300.00",
          paymentMethod: "Credit Card",
        },
        
      ]


    return(
        <div className="flex flex-col w-full h-screen gap-5 p-6 min-w-[700px]">
            <ThemeToggle />
            <h1 className="text-2xl font-bold">Transactions</h1>
            <div className = "grid grid-cols-3 gap-4">
                <div>
                    <Card>
                        <CardContent>
                            <CardTitle>Total Income</CardTitle>
                            <CardDescription>Monthly Income from all sources</CardDescription>
                            <p className="text-2xl font-bold">$5200.00</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <CardTitle>Total Income</CardTitle>
                            <CardDescription>Monthly Income from all sources</CardDescription>
                            <p className="text-2xl font-bold">$5200.00</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <CardTitle>Total Income</CardTitle>
                            <CardDescription>Monthly Income from all sources</CardDescription>
                            <p className="text-2xl font-bold">$5200.00</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
{/* TABLE */}
            <div>
                <Card>
                    <CardContent className="flex flex-col gap-4">
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>View and filter your transaction history</CardDescription>

                        <div className="flex justify-between items-center mb-4 gap-4">
                            <Input placeholder="Search by invoice number" className="w-full" />
                            <div className="flex flex-row gap-1">

                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All Category">All Category</SelectItem>
                                        <SelectItem value="Groceries">Groceries</SelectItem>
                                        <SelectItem value="Utilities">Utilities</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Time Period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Today">Today</SelectItem>
                                        <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                                        <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                                        <SelectItem value="Last Year">Last Year</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button className="w-[180px]">
                                    Export
                                </Button>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <CardTitle>Recent Transactions</CardTitle>
                                <CardDescription>Your latest financial activities </CardDescription>
                            </div>   
                            <Button className="mb-4">Add Transaction</Button>
                        </div>

                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {invoices.map((invoice) => (
                                    <TableRow key={invoice.invoice}>
                                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                        <TableCell>{invoice.paymentStatus}</TableCell>
                                        <TableCell>{invoice.paymentMethod}</TableCell>
                                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>

                    </CardContent>
                </Card>
            </div>
{/* TABLE */}
        </div>
    )
}
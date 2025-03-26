"use client"
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
import Navbar from "@/components/navbar"
import { useEffect , useState} from "react"


export default function Transaction(){

    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        function getTransactions(){
            fetch(`http://localhost:8080/transactions/user/2`)
            .then((res) => res.json())
            .then((data) => setTransactions(data))
        }
        getTransactions()
    }, [])

    const dummyinfo = {
        "recent_transactions": [
            {
              "id": 301,
              "user_id": 123,
              "amount": -85.43,
              "description": "Grocery Store Purchase",
              "category": "Food",
              "transaction_date": "2023-06-01T14:30:00Z",
              "reference": "T78945612",
              "is_reconciled": true
            },
            {
              "id": 302,
              "user_id": 123,
              "amount": -120.00,
              "description": "Electricity Bill",
              "category": "Utilities",
              "transaction_date": "2023-05-28T09:15:00Z",
              "reference": "T78945589",
              "is_reconciled": true
            },
            {
              "id": 303,
              "user_id": 123,
              "amount": 5800.00,
              "description": "Monthly Salary",
              "category": "Income",
              "transaction_date": "2023-05-25T08:00:00Z",
              "reference": "T78945501",
              "is_reconciled": true
            },
            {
              "id": 304,
              "user_id": 123,
              "amount": -250.00,
              "description": "Transfer to Europe Vacation Bucket",
              "category": "Savings",
              "transaction_date": "2023-05-25T10:30:00Z",
              "reference": "T78945510",
              "is_reconciled": true
            }
          ]
    }


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
        <div className = "flex justify-start w-full h-screen">
            <Navbar/>
            <div className="flex flex-col w-full h-screen gap-5 py-15 p-6 min-w-[700px]">
                <h1 className="text-2xl font-bold">Transactions</h1>
                <div className = "grid grid-cols-3 gap-4">
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Total Income</CardTitle>
                                <CardDescription>Income from all sources</CardDescription>
                                <p className="text-2xl font-bold">$5200.00</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Total Expense</CardTitle>
                                <CardDescription>Expense from all sources</CardDescription>
                                <p className="text-2xl font-bold">$5200.00</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Net Amount</CardTitle>
                                <CardDescription>Net amount from all sources</CardDescription>
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
                                        <TableHead className="w-[140px]">Invoice</TableHead>
                                        <TableHead >Category</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    {transactions.map((transaction) => (
                                        <TableRow key={transaction.id}>
                                            <TableCell className="font-medium">{transaction.reference}</TableCell>
                                            <TableCell>{transaction.category}</TableCell>
                                            <TableCell>{transaction.transaction_date.split("T")[0]}</TableCell>
                                            <TableCell className={` text-right ${ transaction.amount < 0 ? "text-red-500" : "text-green-400"}`}>{transaction.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>

                        </CardContent>
                    </Card>
                </div>
    {/* TABLE */}
            </div>
        </div>
    )
}
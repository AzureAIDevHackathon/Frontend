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
import { useEffect , useState , useRef} from "react"
import { Label } from "@/components/ui/label"
import TransactionForm from "@/components/transactionForm"


export default function Transaction(){

    const apiroute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    const [transactions, setTransactions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rerenderToggle, setRerenderToggle] = useState(false);
  
    // Fetch transactions
    useEffect(() => {
      function getTransactions() {
        fetch(`${apiroute}/transactions/user/2`)
          .then((res) => res.json())
          .then((data) => setTransactions(data));
      }
      getTransactions();
    }, [rerenderToggle]);
  
    // Modal toggle
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

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
                            {/* <CardTitle>Transaction History</CardTitle>
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
                            </div> */}

                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <CardTitle>Recent Transactions</CardTitle>
                                    <CardDescription>Your latest financial activities </CardDescription>
                                </div>   
                                <Button className="mb-4" onClick={toggleModal} variant="outline">
                                    Add Transaction
                                </Button>
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
                                            <TableCell>{transaction.transaction_date?.split("T")[0]}</TableCell>
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
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className=" p-8 rounded-lg w-1/3">
                    <TransactionForm
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        rerenderToggle={rerenderToggle}
                        setRerenderToggle={setRerenderToggle}
                    />
                    </div>
                </div>
            )}
        </div>
    )
}
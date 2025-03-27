"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"

const dummyinfo = {
    "financial_summary": {
        "id": 456,
        "user_id": 123,
        "savings_balance": 15750.25,
        "investment_balance": 42000.00,
        "debt_balance": 8500.00,
        "last_updated": "2023-06-01T12:00:00Z"
      },
    "income": {
        "id": 789,
        "financial_summary_id": 456,
        "salary": 5800.00,
        "investments": 350.00,
        "business_income": 1200.00,
        "month": "June 2023"
      },
      "expenses": {
        "id": 101,
        "financial_summary_id": 456,
        "rent_mortgage": 1650.00,
        "utilities": 215.50,
        "insurance": 180.00,
        "loan_payments": 350.00,
        "groceries": 480.00,
        "transportation": 175.00,
        "subscriptions": 65.00,
        "entertainment": 220.00,
        "month": "June 2023"
      },
}

const formatCurrency = (value) => {
    return new Intl.NumberFormat(
        'en-US', { 
            style: 'currency', 
            currency: 'USD' 
        }).format(value);
}




let totalExpense = dummyinfo.expenses.rent_mortgage + dummyinfo.expenses.utilities + dummyinfo.expenses.insurance + dummyinfo.expenses.loan_payments + dummyinfo.expenses.groceries + dummyinfo.expenses.transportation + dummyinfo.expenses.subscriptions + dummyinfo.expenses.entertainment;
// let monthlySavings = totalIncome - totalExpense;
let netWorth = 12000.00; // Placeholder for net worth calculation
// let savingsBalance = dummyinfo.financial_summary.savings_balance;
// let investmentBalance = dummyinfo.financial_summary.investment_balance;
// let debtBalance = dummyinfo.financial_summary.debt_balance;

export default function Dashboard(){

    const apiroute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

    const [income, setIncome] = useState({})
    const [expense, setExpense] = useState({})
    const [financialSummary, setFinancialSummary] = useState({})

    

    useEffect(()=>{
        function getIncome(){
            fetch(`${apiroute}/incomes/user/2`)
            .then((res) => res.json())
            .then((data) => setIncome(data))
        }
        function getExpense(){
            fetch(`${apiroute}/expenses/user/2`)
            .then((res) => res.json())
            .then((data) => setExpense(data))
        }
        function getFinancialSummary(){
            fetch(`${apiroute}/financial-summaries/user/2`)
            .then((res) => res.json())
            .then((data) => setFinancialSummary(data))
        }
        getIncome();
        getExpense();
        getFinancialSummary();

    },[])

    let totalIncome = (income?.salary || 0) + (income?.investments || 0) + (income?.business_income || 0);
    let totalExpense = (expense?.rent_mortgage || 0) + (expense?.utilities || 0) + (expense?.insurance || 0) + (expense?.loan_payments || 0) + (expense?.groceries || 0) + (expense?.transportation || 0) + (expense?.subscriptions || 0) + (expense?.entertainment || 0);
    let monthlySavings = totalIncome - totalExpense;
    let savingsBalance = financialSummary.savings_balance || 0;
    let investmentBalance = financialSummary.investment_balance || 0;
    let debtBalance = financialSummary.debt_balance || 0;

    return(
        <div className = "flex justify-start w-full h-screen">
            <Navbar/>
            <div className="flex flex-col w-full h-screen gap-10 py-15 p-6">
                <div className="w-full text-3xl">
                    Dashboard
                </div>

                <div className=" grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Total Income</CardTitle>
                                <CardDescription>Monthly Income from all sources</CardDescription>
                                <p className="text-2xl font-bold">{formatCurrency(totalIncome)}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Total Expense</CardTitle>
                                <CardDescription>Monthly expenses across all categories</CardDescription>
                                <p className="text-2xl font-bold">{formatCurrency(totalExpense)}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Monthly Savings</CardTitle>
                                <CardDescription>Postive cash flow</CardDescription>
                                <p className="text-2xl font-bold">{formatCurrency(monthlySavings)}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardContent>
                                <CardTitle>Net Worth</CardTitle>
                                <CardDescription>Monthly expenses across all categories</CardDescription>
                                <p className="text-2xl font-bold">$12000.00</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Savings</CardTitle>
                                <CardDescription>Total Savings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{formatCurrency(savingsBalance)}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">Manage Savings Bucket</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Investments</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{formatCurrency(investmentBalance)}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">View Investment Analysis</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Debt</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">{formatCurrency(debtBalance)}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">View Reduction Plan</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">View All Transactions</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Card Title</CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Card Content</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">Chat with AI Assistant</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    )
}
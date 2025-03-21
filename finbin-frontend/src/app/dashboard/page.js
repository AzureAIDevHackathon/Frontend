import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"


export default function Dashboard(){
    return(
        <div className="flex flex-col w-full h-screen text-black gap-4">

            <div className="w-full text-3xl">
                Dashboard
            </div>

            <div className="grid grid-cols-4 gap-4">
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
                            <CardTitle>Total Expense</CardTitle>
                            <CardDescription>Monthly expenses across all categories</CardDescription>
                            <p className="text-2xl font-bold">$2550.00</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <CardTitle>Monthly Savings</CardTitle>
                            <CardDescription>Postive cash flow</CardDescription>
                            <p className="text-2xl font-bold">$2650.00</p>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardContent>
                            <CardTitle>Net Worth</CardTitle>
                            <p className="text-2xl font-bold">$12000.00</p>
                            <CardDescription>Monthly expenses across all categories</CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Savings</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="hover:bg-green-400" variant="outline">Manage Savings Bucket</Button>
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
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="hover:bg-green-400" variant="outline">View Investment Analysis</Button>
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
                            <p>Card Content</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="hover:bg-green-400" variant="outline">View Reduction Plan</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                            <Button className="hover:bg-green-400" variant="outline">View All Transactions</Button>
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
                            <Button className="hover:bg-green-400" variant="outline">Chat with AI Assistant</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

        </div>
    )
}
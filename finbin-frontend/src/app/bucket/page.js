import { ThemeToggle } from "@/components/theme-toggle"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"


export default function (){
    return(
        <div className="flex flex-col w-full h-screen gap-5 p-6">

            <ThemeToggle />
            <h1 className="w-full text-3xl">Bucket</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full text-3xl gap-3">
{/* BUCKET CARD */}
                <Card>
                    <CardContent className ="flex flex-col gap-5">

                        <div className="flex justify-between">
                            <CardTitle>Emergency Fund</CardTitle>
                            <div classname="flex flex-row">
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">^</Button>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">v</Button>
                                <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline">0</Button>
                            </div>
                        </div>

                        <CardDescription>Priority: {"High"}</CardDescription>

                        <div className="flex justify-between text-sm">
                            <CardDescription>Progress</CardDescription>
                            <div className ="flex justify-end">{"50"}%</div>
                        </div>

                        <Progress value={50} className="w-full"/>

                        <div className ="flex justify-between text-lg">
                            <div>
                                <CardDescription>Saved</CardDescription>
                                <div>${"2,000"}</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <CardDescription>Target</CardDescription>
                                <div>${"4,000"}</div>
                            </div>
                        </div>

                        <Separator />

                        <div className="flex flex-col text-lg">
                            <CardDescription>Deadline</CardDescription>
                            <div>{"Sep 22, 2025"}</div>
                        </div>

                    </CardContent>
                </Card>
{/* BUCKET CARD */}
            </div>

            <div>
                <Card>
                    <CardContent className ="flex flex-col gap-5">

                        <div>
                            <CardTitle>Optimize Your Savings</CardTitle>
                            <CardDescription>AI-powered recommendations for your savings goals</CardDescription>
                        </div>

                        <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"> Get Personalized Sabings Plan </Button>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}
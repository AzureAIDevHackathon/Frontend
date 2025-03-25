import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar } from "@/components/app-sidebar"


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import Navbar from "@/components/navbar"

import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

import {ArrowUp ,ArrowDown, Trash2} from "lucide-react"


export default function (){


    const dummyinfo = {
        "buckets": [
            {
              "id": 201,
              "user_id": 123,
              "name": "Emergency Fund",
              "target_amount": 10000.00,
              "current_saved_amount": 8500.00,
              "priority_score": 5,
              "deadline": null,
              "status": "active"
            },
            {
              "id": 202,
              "user_id": 123,
              "name": "Europe Vacation",
              "target_amount": 5000.00,
              "current_saved_amount": 2800.00,
              "priority_score": 3,
              "deadline": "2023-12-15T00:00:00Z",
              "status": "active"
            },
            {
              "id": 203,
              "user_id": 123,
              "name": "New Car Down Payment",
              "target_amount": 8000.00,
              "current_saved_amount": 4450.00,
              "priority_score": 4,
              "deadline": "2024-03-01T00:00:00Z",
              "status": "active"
            }
          ]
    }
    return(
        <div className = "flex justify-start w-full h-screen">
            <Navbar/>
            <div className="flex flex-col flex-grow h-screen gap-5 p-6 py-15">
                <h1 className="w-full text-3xl">Bucket</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full text-3xl gap-3">
    {/* BUCKET CARD */}
                    <Card>
                        <CardContent className ="flex flex-col gap-5">

                            <div className="flex justify-between">
                                <CardTitle className="text-2xl">Emergency Fund</CardTitle>
                                <div className="flex flex-row ">
                                    <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><ArrowUp/></Button>
                                    <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><ArrowDown/></Button>
                                    <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><Trash2/></Button>
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
                    {dummyinfo.buckets.map((bucket) => {
                        return(
                            <Card key={bucket.id}>
                                <CardContent className ="flex flex-col gap-5">

                                    <div className="flex justify-between">
                                        <CardTitle className="text-2xl">{bucket.name}</CardTitle>
                                        <div className="flex flex-row ">
                                            <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><ArrowUp/></Button>
                                            <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><ArrowDown/></Button>
                                            <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><Trash2/></Button>
                                        </div>
                                    </div>

                                    <CardDescription>Priority: {"High"}</CardDescription>

                                    <div className="flex justify-between text-sm">
                                        <CardDescription>Progress</CardDescription>
                                        <div className ="flex justify-end">{Math.round((bucket.current_saved_amount / bucket.target_amount) * 100)}%</div>
                                    </div>

                                    <Progress value={Math.round((bucket.current_saved_amount / bucket.target_amount) * 100)} className="w-full"/>

                                    <div className ="flex justify-between text-lg">
                                        <div>
                                            <CardDescription>Saved</CardDescription>
                                            <div>${bucket.current_saved_amount.toLocaleString()}</div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <CardDescription>Target</CardDescription>
                                            <div>${bucket.target_amount.toLocaleString()}</div>
                                        </div>
                                    </div>

                                    {bucket.deadline && (
                                        <Separator />
                                    )}

                                    {bucket.deadline && (
                                        <div className="flex flex-col text-lg">
                                            <CardDescription>Deadline</CardDescription>
                                            <div>{new Date(bucket.deadline).toLocaleDateString()}</div>
                                        </div>
                                    )}

                                </CardContent>
                            </Card>
                        )
                    })}
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
        </div>
    )
}
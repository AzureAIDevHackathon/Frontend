import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button"


export default function Transaction(){
    return(
        <div className="flex flex-col w-full h-screen text-black gap-4">
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
            <div>
                
            </div>
        </div>
    )
}
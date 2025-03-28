"use client"
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

import { useEffect, useState } from 'react'

import  BucketForm  from '@/components/bucketForm'


export default function (){

    const apiroute = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"


    const [buckets, setBuckets] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rerenderToggle , setRerenderToggle] = useState(false)

    function handleTrash(bucketid, userid){
        fetch(`${apiroute}/buckets/${bucketid}?user_id=${userid}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if (res.ok) {
                setBuckets(prevBuckets => prevBuckets.filter(bucket => bucket.id !== bucketid) )  // Visually update the buckets
                // setRerenderToggle(!rerenderToggle)
            }
            else{
                console.error("Bucket Delete Failed")
            }
        })
        .then(data => console.log(data))
        .catch(error => console.error("Error deleting branch : ", error))
    }

    useEffect(()=>{
        function getBuckets() {
            fetch(`${apiroute}/buckets/user/2`)
            .then((res)=> res.json())
            .then((data) => setBuckets(data))
        }
        getBuckets()
    },[rerenderToggle])

    // Modal toggle
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return(
        <div className = "flex justify-start w-full h-screen">
            <Navbar/>
            <div className="flex flex-col flex-grow h-screen gap-5 p-6 py-15">
                <div className="flex flex-row justify-between">
                    <h1 className="w-full text-3xl">Bucket</h1>
                    <Button className="mb-4" onClick={toggleModal} variant="outline">
                        Add Bucket
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full text-3xl gap-3">
                    {buckets.map((bucket) => {
                        return(
                            <Card key={bucket.id}>
                                <CardContent className ="flex flex-col gap-5">

                                    <div className="flex justify-between">
                                        <CardTitle className="text-2xl">{bucket.name}</CardTitle>
                                        <div className="flex flex-row ">
                                            {/* <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><ArrowUp/></Button>
                                            <Button className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><ArrowDown/></Button> */}
                                            <Button onClick={() => handleTrash(bucket.id, bucket.user_id)} className="hover:bg-green-400 hover:dark:bg-green-400" variant="outline"><Trash2/></Button>
                                        </div>
                                    </div>

                                    <CardDescription>Priority: {bucket.priority_score}</CardDescription>

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
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                    <div className=" p-8 rounded-lg w-1/3">
                    <BucketForm
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                        rerenderToggle = {rerenderToggle}
                        setRerenderToggle={setRerenderToggle}
                    />
                    </div>
                </div>
            )}
        </div>
    )
}
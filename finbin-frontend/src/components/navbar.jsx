'use client'
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import whiteLogoFill from "@/components/logo white fill.png"
import blackLogoFill from "@/components/logo black fill.png"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import { Calendar, Home, Inbox, Search, Settings, LogIn, HandCoins, LayoutDashboard, ArrowRightFromLine, ArrowLeftFromLine} from "lucide-react"


import { Separator } from "@/components/ui/separator"


export default function Navbar(){

    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const router = useRouter()

    const navigateTo = (path) => {
        router.push(path)  // Navigate to the specified path
        setIsOpen(false)  // close the menu when a link is clicked
    }

    const handleLogout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        router.push("/")
      }
    
    return(
            <div className="relative">

                {/* Backdrop */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black opacity-50 z-10"
                        onClick={toggleMenu} // Close the menu when the backdrop is clicked
                    />
                )}

                {/* Button to open/close the sidebar */}
                <Button
                    className={isOpen ? "hidden" : "md:hidden z-20 fixed top-4 left-4 border bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-green-500 dark:hover:bg-green-500 p-5 rounded-md"}
                    onClick={toggleMenu}
                >
                    {isOpen ? <ArrowLeftFromLine/> : <ArrowRightFromLine/>}
                </Button>

                {/* Sidebar Mobile*/}
                <div
                    className={`transition-transform duration-300 ease-in-out fixed top-0 left-0 h-full bg-white dark:bg-gray-800 w-[250px] border-r-2 border-gray-300 dark:border-gray-700 z-20 transform ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                >
                    <div className="flex p-3 ml-2">
                        <Image className="dark:invert" src={blackLogoFill} width={90} height={90} />
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2 px-4">
                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/')}>
                            <Home />
                            {isOpen && "Home"}
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/dashboard')}>
                            <LayoutDashboard/>
                            Dashboard
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/bucket')}>
                            <Inbox />
                            {isOpen && "Bucket"}
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost " onClick={() => navigateTo('/transactions')}>
                            <HandCoins />
                            {isOpen && "Transactions"}
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" >
                            <Settings />
                            {isOpen && "Settings"}
                        </Button>
                    </div>

                    <Separator />

                    <div className="flex flex-col w-full justify-between gap-2 bottom-2 absolute">
                        <div className="w-full h-[3rem] flex">
                            <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 h-full w-full flex flex-row justify-start" variant="outline">
                                <div className="bg-amber-100 rounded-full w-[40px] h-[40px]" />
                                <div>{'Joe Shmoe'}</div>
                            </Button>
                        </div>
                        <div className="flex flex-row gap-3 w-full justify-center">
                            <Button className="hover:bg-gray-200 hover:dark:bg-gray-700" variant="outline" onClick={handleLogout}>
                                <LogIn />
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>

                {/* Sidebar Desktop*/}
                <div className="hidden md:block flex-col w-[250px] h-full border-b-2  border-gray-300 dark:border-gray-700 gap-4 p-3">
                    <div className="p-3">
                        <Image className="dark:invert" src={blackLogoFill} width={100} height={100} />
                    </div>

                    <Separator />

                    <div className="flex flex-col gap-2">
                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/')}>
                            <Home/>
                            Home
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/dashboard')}>
                            <LayoutDashboard/>
                            Dashboard
                        </Button>


                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/bucket')}>
                            <Inbox/>
                            Bucket
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost" onClick={() => navigateTo('/transactions')}>
                            <HandCoins/>
                            Transactions
                        </Button>

                        <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 justify-start" variant="ghost">
                            <Settings/>
                            Settings
                        </Button>

                    </div>


                    <Separator />

                    <div className="flex flex-col w-full justify-between gap-2 bottom-2 absolute">
                        <div className="w-full h-[3rem] flex">
                            <Button className="hover:bg-gray-200 hover:dark:bg-gray-700 h-full w-full flex flex-row justify-start" variant="outline">
                                <div className="bg-amber-100 rounded-full w-[40px] h-[40px]"></div>
                                <div>{`Joe Shmoe`}</div>
                            </Button>
                        </div>
                        <div className="flex flex-row gap-3 w-full justify-center">
                            <Button className="hover:bg-gray-200 hover:dark:bg-gray-700" variant="outline" onClick={handleLogout}>
                                <LogIn/>
                            </Button>
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
    )
}
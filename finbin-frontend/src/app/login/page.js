"use client"
import { ThemeToggle } from "@/components/theme-toggle";
import particleConfig from "../../components/particlesjs-config-1.json";
import { useEffect } from "react";
import LoginForm from "@/components/login-form";
import blackLogoFill from "@/components/logo black fill.png"
import whiteLogoFill from "@/components/logo white fill.png"
import Image from "next/image";

export default function LoginPage() {
    useEffect(() => {
      const loadParticles = async () => {
        await import("particles.js"); // Dynamic import for Next.js compatibility
  
        window.particlesJS("particles-container", particleConfig);
      };
  
      loadParticles();
    }, []);

  return (
    <div className="relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <Image className="dark:invert" src={blackLogoFill} width={100} height={100}/>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
          </div>
        <LoginForm/>
        </div>
      </div>
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <ThemeToggle />
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div id="particles-container" className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-500 to-pink-400"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-400" /> */}
        <div className="relative z-20 flex items-center text-lg font-medium select-none">
          <Image src={whiteLogoFill} width={90} height={90}/>
        </div>
        <div className="flex relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Buck.it has completely transformed how I manage my finances. The AI insights are incredibly helpful!"
            </p>
            <footer className="text-sm">Jane Doe</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
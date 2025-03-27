"use client"
import { ThemeToggle } from "@/components/theme-toggle";
import particleConfig from "../../components/particlesjs-config-1.json";
import { useEffect } from "react";
import RegisterForm from "@/components/register-form";

export default function registerPage() {
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
              {/* <Logo /> */}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your details to create your account</p>
          </div>
        <RegisterForm/>
        </div>
      </div>
      <div className="absolute left-4 top-4 md:left-8 md:top-8">
        <ThemeToggle />
      </div>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div id="particles-container" className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 to-green-500"></div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-pink-400" /> */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          Finbins
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
            "With FinBins, I've been able to save more money than ever before. The savings buckets feature is a
            game-changer!"
            </p>
            <footer className="text-sm">Ellen Joe</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
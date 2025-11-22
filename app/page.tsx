import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/section/hero";
import { Features } from "@/components/section/features";
export default function Home() {
  return (
    // <main className="min-h-screen flex flex-col items-center">
    //   <div className="flex-1 w-full flex flex-col gap-20 items-center">
    //     <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
    //       <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
    //         <div className="flex gap-5 items-center font-semibold">
    //           <Navbar />
    //         </div>
    //       </div>
    //     </nav>
    //     <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
    //       <Hero />
    //       <Features />
    //     </div>

    //     <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
    //       <Footer/>
    //       <ThemeSwitcher />
    //     </footer>
    //   </div>
    // </main>
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

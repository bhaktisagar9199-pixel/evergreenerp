import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-accent/30 selection:text-foreground">
      <Navbar />
      <main className="flex-1 w-full pt-[72px]">
        {children}
      </main>
      <Footer />
    </div>
  );
}

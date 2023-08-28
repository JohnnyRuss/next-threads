import React from "react";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";

import { BottomBar, LeftBar, RightBar, TopBar } from "@/components/common";

interface pageT {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Threads",
  description: "A Next.js 13 meta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<pageT> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <TopBar />
          <main className="flex flex-row">
            <LeftBar />
            <section className="main-container">
              <div className="w-full max-w-4xl">{children}</div>
            </section>
            <RightBar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;

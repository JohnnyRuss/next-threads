import React from "react";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../styles/globals.css";

interface LayoutT {
  children: React.ReactNode;
}

export const metadata = {
  title: "Threads",
  description: "A Next.js 13 meta Threads Application",
};

const inter = Inter({ subsets: ["latin"] });

const Layout: React.FC<LayoutT> = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;

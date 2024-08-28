import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { TmaProvider } from "@/components/tma/provider";
import { WalletProvider } from "@/components/wallet/provider";
import { CSSProperties } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Telegram Mini App",
  description: "A mini app for Telegram.",
};

const style1: CSSProperties = {
  backgroundColor: "black",
  color: "white",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <body className={inter.className} style={style1}>
          <TmaProvider>
            <WalletProvider>
              {" "}
              <Navbar />
              {children}{" "}
            </WalletProvider>
          </TmaProvider>
        </body>
      </html>
    </>
  );
}
/*
 
 

 */

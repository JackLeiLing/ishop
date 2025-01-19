import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WixContextProvider } from "@/context/wixContext";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixContextProvider>
          <NavBar />
          {children}
          <Footer />
        </WixContextProvider>
      </body>
    </html>
  );
}

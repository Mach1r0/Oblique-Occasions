import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./base/navbar";
import Footer from "./base/footer"

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <html lang="en">
      <body>
      <Navbar />
      {children}
      <Footer />
      </body>
    </html>
  );
}
export default Layout;
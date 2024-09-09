import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./base/navbar";
import Footer from "./base/footer"
import { AuthProvider } from './Context/AuthContext'

const Layout = ({ children }: { children: React.ReactNode }) =>  {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
      </AuthProvider>
      </body>
    </html>
  );
}
export default Layout;
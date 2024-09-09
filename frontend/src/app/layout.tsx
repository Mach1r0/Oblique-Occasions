import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./base/navbar";
import Footer from "./base/footer"
import { AuthProvider } from './Context/AuthContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";

import RegisterPage from "./register/page";
import LoginPage from "./login/page";
import Contact from "./contact/page";

export const metadata: Metadata = {
  title: "CIBUM-AGRI"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" /> 
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /> 
      <link href="https://fonts.googleapis.com/css2?family=Mirza:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <RegisterPage/>
        {/* <LoginPage /> */}
        <Contact/>
        {children}
        <Footer />
      </body>
    </html>
  );
}

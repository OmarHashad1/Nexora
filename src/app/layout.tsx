import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";
import "./globals.css";
import { Toaster } from "sonner";
import { NextAuthProvider } from "@/Providers/next-auth.provider";
import Providers from "@/Providers/react-query.provider";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});


export const metadata: Metadata = {
  title: "Nexora",
  description: "E-commerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body
        className={`${manrope.className} flex flex-col justify-between items-center min-w-full min-h-screen`}
      >
        <Providers>
          <NextAuthProvider>
            <Navbar />
            <Toaster richColors position="top-center" />
            {children}
            <Footer />
          </NextAuthProvider>
        </Providers>
      </body>
    </html>
  );
}

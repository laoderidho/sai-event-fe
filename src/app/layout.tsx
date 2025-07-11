import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/provider";
import { AuthRedirectProvider } from "./providers/AuthRedirect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAI Event",
  description: "Manajemen Event untuk Komunitas SAI",
  icons: {
    icon: "/logo.png?v=2"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ReduxProvider>
            <AuthRedirectProvider>
              {children}
            </AuthRedirectProvider>
          </ReduxProvider>
       
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { OrdersProvider } from '@/app/context/order-context';

// Self-hosted so builds never depend on reaching fonts.gstatic.com.
const geistSans = localFont({
  src: "../fonts/Geist-Variable-latin.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

const geistMono = localFont({
  src: "../fonts/GeistMono-Variable-latin.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  title: "Storlo",
  description: "Buy and sell with escrow-protected payments.",
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
         <OrdersProvider>
          {children}
        </OrdersProvider>
      </body>
    </html>
  );
}

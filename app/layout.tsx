import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';

// Font coding (Monospace)
const mono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1337_PAY // RIALO MODE",
  description: "Decentralized Payment Gateway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.className} bg-black text-green-500`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
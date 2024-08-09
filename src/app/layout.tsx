import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query";
import TopNav from "@/components/navigation/top-nav";
import BackgroundBlobs from "@/components/background-blobs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Joshuab Brigati Kinetic Take Home",
  description: "A take-home project for Kinetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div className="flex flex-col z-10">
            <TopNav />
            <main className="flex flex-1 flex-col">
              {children}
            </main>
          </div>
        </ReactQueryProvider>
        <BackgroundBlobs />
      </body>
    </html>
  );
}

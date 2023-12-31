import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import NavBar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud Video Uploader",
  description:
    "A fullstack app to showcase the core functionality of a video uploading system using Google Cloud"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Providers>
          <div className="relative overflow-hidden">
            <NavBar />

            <main className="min-h-[calc(100vh-4rem)] px-4 py-4 2xl:container lg:px-6">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

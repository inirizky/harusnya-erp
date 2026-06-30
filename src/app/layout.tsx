import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ERP Dashboard",
  description: "Modern ERP Dashboard built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", jakartaSans.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#0a0a0a" showSpinner={false} />
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}

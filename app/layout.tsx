import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "./storeprovider";

export const metadata: Metadata = {
  title: "Racepulse | F1 Edition",
  description: "Generated by create next app",
};

const formulaFont = localFont({
  src: [
    {
      path: "../public/font/f1-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/f1-bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/f1-wide.woff2",
      weight: "900",
      style: "normal",
    },
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(formulaFont.className, "bg-[#14141D]")}>
        <StoreProvider>
          <ThemeProvider attribute="class" enableSystem defaultTheme="dark">
            {children}
            <Toaster />
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

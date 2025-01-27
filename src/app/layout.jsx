import localFont from "next/font/local";
import { Anuphan } from "next/font/google"
import "./globals.css";
import { Toaster } from "sonner";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { QueryProvider } from "@/features/query-provider";
import { Suspense } from "react";
const anuphan = Anuphan({
  weight: '500',
  subsets: ['thai', 'latin']
})

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${anuphan.className} antialiased`}
      >
        <QueryProvider>
          <NuqsAdapter>
            <Toaster position="top-center" richColors />
            <Suspense>
              {children}
            </Suspense>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}

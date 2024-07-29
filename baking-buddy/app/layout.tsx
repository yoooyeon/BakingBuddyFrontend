// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Baking Buddy",
  description: "Share Secret Recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

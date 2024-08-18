// app/layout.tsx
import {Inter} from "next/font/google";
import "./globals.css";
import Header from "./_components/header/header";
import {AuthProvider} from "@/context/AuthContext";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Recipe Diary",
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
        <AuthProvider>
            <Header/>
            {children}
        </AuthProvider>

        </body>
        </html>
    );
}

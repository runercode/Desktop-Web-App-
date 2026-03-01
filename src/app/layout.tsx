import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Launchpad — Create web & mobile apps in 5 minutes with AI",
  description:
    "Create an account, pick a plan, and build fully functional web apps and iOS/Android apps from a simple prompt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {siteUrl && (
          <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 text-center text-sm font-medium shadow-md">
            <a href={siteUrl} target="_blank" rel="noreferrer" className="hover:underline">
              🚀 Live at: {siteUrl.replace(/^https?:\/\//, "")}
            </a>
          </header>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

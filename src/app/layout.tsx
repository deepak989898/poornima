import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Poornima University Marksheet Admin",
  description: "Generate and manage university-style marksheets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

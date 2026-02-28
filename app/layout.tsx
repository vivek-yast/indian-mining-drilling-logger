import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indian Mining Drilling Logger",
  description: "Professional drilling information logging and analytics for Indian mining operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
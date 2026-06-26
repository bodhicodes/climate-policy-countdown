import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Climate Policy Countdown",
  description: "Tracking the deadlines that matter for climate policy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

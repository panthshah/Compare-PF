import type { Metadata } from "next";
import localFont from "next/font/local";
import { Providers } from "./providers";
import "./globals.css";

const samsungSharpSans = localFont({
  src: [
    { path: "../fonts/samsungsharpsans.otf", weight: "400", style: "normal" },
    { path: "../fonts/samsungsharpsans-medium.otf", weight: "500", style: "normal" },
    { path: "../fonts/samsungsharpsans-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-sharp-sans",
  display: "swap",
});

const samsungOne = localFont({
  src: [
    { path: "../fonts/SamsungOne-400.ttf", weight: "400", style: "normal" },
    { path: "../fonts/SamsungOne-600.ttf", weight: "600", style: "normal" },
    { path: "../fonts/SamsungOne-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-samsung-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compare",
  description: "Compare Page Prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${samsungSharpSans.variable} ${samsungOne.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

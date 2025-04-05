import "./globals.css";
import { Geist, Geist_Mono, Red_Hat_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const redHatMono = Red_Hat_Mono({
  variable: "--font-red-hat-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "Weather Cereal",
  description: "Weather app with spoonful of joke",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redHatMono.variable} antialiased`}
      >
        {children}
        <div id="modal" />
      </body>
    </html>
  );
}

import "./globals.css";
import { Geist, Red_Hat_Mono, DM_Sans, Poppins } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const redHatMono = Red_Hat_Mono({
  variable: "--font-red-hat-mono",
  subsets: ["latin"],
});

const dmSansSemiBold = DM_Sans({
  variable: "--font-dm-sans-semi-bold",
  subsets: ["latin"],
  weight: ["600"],
});

const dmSansBold = DM_Sans({
  variable: "--font-dm-sans-bold",
  subsets: ["latin"],
  weight: ["700"],
});

const poppinsBold = Poppins({
  variable: "--font-poppins-bold",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  title: "Weather Cereal",
  description: "Weather app with spoonful of joke",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`
          ${geistSans.variable} 
          ${redHatMono.variable} 
          ${dmSansSemiBold.variable} 
          ${dmSansBold.variable}
          ${poppinsBold.variable} 
          antialiased`}
      >
        {children}
        <div id="modal" />
      </body>
    </html>
  );
}

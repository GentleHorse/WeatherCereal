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
  title: "Weather Cereal – A Zen Weather Experience",
  description:
    "A calming, 3D weather app inspired by Japanese Zen gardens. Visualize real-time forecasts with ambient sounds and cinematic visuals.",
  keywords: [
    "weather app",
    "zen garden",
    "3D weather",
    "nature sounds",
    "ambient weather app",
    "weather visualization",
    "calming app",
  ],
  openGraph: {
    title: "Weather Cereal – A Zen Weather Experience",
    description:
      "A cinematic, calming weather app that blends real-time data with peaceful 3D Zen visuals.",
    url: "https://weather-cereal.vercel.app/",
    siteName: "Weather Cereal",
    images: [
      {
        url: "https://weather-cereal.vercel.app/images/preview/preview.png", 
        width: 1200,
        height: 630,
        alt: "Weather Cereal Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Cereal – A Zen Weather Experience",
    description:
      "Check weather around the world through a cinematic Zen garden with ambient sounds.",
    images: ["https://weather-cereal.vercel.app/images/preview/preview.png"],
    creator: "@toshihito_endo",
  },
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

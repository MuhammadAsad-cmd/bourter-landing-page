import { Poppins } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layouts/Mainlayout";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Bourter - Your Reliable Ride-Sharing App",
  description:
    "Book rides with trusted drivers. Join as a driver or company. Fast, safe, and convenient transportation at your fingertips.",
  images: [
    {
      url: "/images/logo_eng.png",
      width: 267,
      height: 100,
      alt: "Bourter Logo",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}

import AllinOne from "@/components/AllinOne";
import DownloadBanner from "@/components/DownloadBanner";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import JoinSection from "@/components/JoinSection";

export const metadata = {
  title: "Bourter - Your Reliable Ride-Sharing App",
  description: "Book rides with trusted drivers. Join as a driver or company. Fast, safe, and convenient transportation at your fingertips.",
  images: [
    {
      url: "/images/logo_final.svg",
      width: 267,
      height: 100,
      alt: "Bourter Logo",
    },
  ],
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AllinOne />
      <HowItWorks />
      <Features />
      <WhyChooseUs />
      <JoinSection />
      <FAQ />
      <DownloadBanner />
      <Footer />
    </main>
  );
}

import FeaturesJob from "@/components/features";
import FinalCTA from "@/components/finalcta";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import JobDiscovery from "@/components/job-discovery";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Navbar />
      <Hero />
      <JobDiscovery />
      <FeaturesJob />
      <Pricing />
      <FinalCTA/>
      <Footer/>
    </main>
  );
}

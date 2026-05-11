import HeroSection from "@/components/home/HeroSection";
import IntegrationsSection from "@/components/home/PowerfullIntergration";
import ServicesSection from "@/components/home/ServicesSection";
import UseCasesSection from "@/components/home/UsecaseSection";


export default async function Home() {
  return (
   <>
      <HeroSection />
      <ServicesSection />
      <IntegrationsSection />
      <UseCasesSection />
   </>
  );
}
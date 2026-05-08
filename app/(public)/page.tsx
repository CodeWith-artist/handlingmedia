import HeroSection from "@/components/HeroSection";
import IntegrationsSection from "@/components/PowerfullIntergration";
import ServicesSection from "@/components/ServicesSection";
import UseCasesSection from "@/components/UsecaseSection";


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
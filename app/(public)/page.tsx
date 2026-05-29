import HeroSection from "@/components/home/HeroSection";
import UseCasesSection from "@/components/home/Usecase";
import IntegrationsSection from "@/components/home/IntegrationsSection";
import FaqSection from "@/components/home/FaqSection";

export default async function Home() {
  return (
   <>
      <HeroSection />
      <UseCasesSection />      
      <IntegrationsSection /> 
      <FaqSection />
      
   </>
  );
}
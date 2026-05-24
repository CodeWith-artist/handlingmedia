import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/Howitworks";
import PortfolioSection from "@/components/home/Portfolio";
import PricingSection from "@/components/home/PricingSection";
import QueryForm from "@/components/home/QueryForm";
import ServicesSection from "@/components/home/Servicessection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import TrustedBy from "@/components/home/TrustedBy";
import WhatsAppSolutionsSection from "@/components/home/WhatsAppSolutionsSection";

export default async function Home() {
  return (
   <>
      <HeroSection />
      {/* <QueryForm /> */}
      <TrustedBy />
      <ServicesSection />
      <HowItWorks />
      <WhatsAppSolutionsSection />
      <PricingSection />
      <PortfolioSection />
      <TestimonialsSection />
      
      
      
     
   </>
  );
}
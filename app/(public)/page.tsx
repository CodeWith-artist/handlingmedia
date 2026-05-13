import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/Howitworks";
import QueryForm from "@/components/home/QueryForm";
import ServicesSection from "@/components/home/Servicessection";
import TrustedBy from "@/components/home/TrustedBy";
import WhatsAppSolutionsSection from "@/components/home/WhatsAppSolutionsSection";

export default async function Home() {
  return (
   <>
      <HeroSection />
      <QueryForm />
      <TrustedBy />
      <ServicesSection />
      <HowItWorks />
      <WhatsAppSolutionsSection />
     
   </>
  );
}
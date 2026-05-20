import HeroSection from "@/components/HeroServiceSection";
import TrustStrip from "./components/TrustStrip";
import ProblemsSection from "./components/ProblemsSection";
import ServicesSection from "./components/ServicesSection";
import DevelopmentProcessSection from "./components/DevelopmentProcessSection";
import TechStackSection from "./components/TechStackSection";
import WhyChooseUsSection from "./components/WhyChooseUsCompact";
export default function CustomWebsiteDevelopment() {
    return (
        <>
            <HeroSection
                badge="Custom Web Development"
                title="Build Modern"
                highlightedText="Web Experiences"
                subtitle="We create scalable, fast, and conversion-focused websites for modern businesses."
                primaryButtonText="Start Project"
                secondaryButtonText="View Portfolio"
                trustItems={[
                    "Next.js Development",
                    "SEO Optimized",
                    "Scalable Architecture",
                    "Fast Performance",
                    "Conversion-Focused",
                ]}
                />
            <TrustStrip />
            <ProblemsSection />
            <ServicesSection />
            <DevelopmentProcessSection />
            <TechStackSection />
            <WhyChooseUsSection />
        </>
    )
}
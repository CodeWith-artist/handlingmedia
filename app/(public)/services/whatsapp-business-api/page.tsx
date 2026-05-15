import HeroSection from "@/components/HeroServiceSection";
import WhatsAppBroadcast from "./components/Whatsappbroadcast";
import WhatsAppForms from "./components/Whatsappforms";

export default function WhatsAppBusinessAPI() {
    return (
        <>
        <HeroSection
            badge="WhatsApp Business API"
            title="Engage Customers at Scale with WhatsApp Business API"
            highlightedText="Unlock the full potential of WhatsApp for your business with our expert API integration services."
            subtitle="From seamless customer support to powerful marketing automation, we help you leverage WhatsApp's global reach to grow your business and delight your customers."
            primaryButtonText="Book Free Consultation"
            secondaryButtonText="Talk to Sales →"
            trustItems={[
                "Global Reach",
                "Rich Messaging",
                "Automation & CRM",
            ]}
            />
        <WhatsAppBroadcast />
        <WhatsAppForms />
        </>
    )
}
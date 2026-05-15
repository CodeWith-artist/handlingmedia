import HeroSection from "@/components/HeroServiceSection";

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
        </>
    )
}
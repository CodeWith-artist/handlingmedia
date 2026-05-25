"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

import "swiper/css";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Founder, LuxeCart",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
    review:
      "Handling Media completely transformed our WhatsApp sales flow. Our response time dropped by 70% and conversions increased within weeks.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Marketing Lead, GlowSkin",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    review:
      "The automation and campaign setup felt seamless. Their team genuinely understands D2C growth and customer engagement.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    role: "CEO, UrbanFits",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop",
    review:
      "From onboarding to scaling campaigns, everything was smooth. The dashboard and support quality are top-tier.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
  {
    name: "Neha Kapoor",
    role: "Co-Founder, FitVerse",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    review:
      "Our retention campaigns started performing significantly better after switching to Handling Media.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24">
      {/* Orange Glow */}
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-1 text-sm text-orange-400">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Loved by modern brands.
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-white/60">
            See how brands are scaling engagement and conversions with
            Handling Media.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}

          loop
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
          className="overflow-hidden cursor-grab"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-orange-500/30 hover:bg-white/  ">
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-orange-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Stars */}
                <div className="relative mb-5 flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="relative text-base leading-7 text-white/70">
                  “{testimonial.review}”
                </p>

                {/* User */}
                <div className="relative mt-8 flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-orange-500/20"
                  />

                  <div>
                    <h4 className="text-base font-medium text-white">
                      {testimonial.name}
                    </h4>

                    <p className="text-sm text-white/50">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
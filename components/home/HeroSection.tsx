"use client";

import { ArrowRight, Calendar, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const phrases = [
    "AI Automation",
    "WhatsApp Marketing",
    "Sales Funnels",
    "Customer Engagement",
  ];

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [fade, setFade] = useState(true);

  // 🚀 Optimized typing animation (single interval)
  useEffect(() => {
    const currentWord = phrases[index];
    const typingSpeed = isDeleting ? 40 : 80;

    const interval = setInterval(() => {
      setDisplayText((prev) => {
        if (!isDeleting) {
          if (prev.length < currentWord.length) {
            return currentWord.slice(0, prev.length + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
            return prev;
          }
        } else {
          if (prev.length > 0) {
            return prev.slice(0, -1);
          } else {
            setIsDeleting(false);
            setFade(false);

            setTimeout(() => {
              setIndex((prev) => (prev + 1) % phrases.length);
              setFade(true);
            }, 200);

            return "";
          }
        }
      });
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isDeleting, index]);

  const handleBookCall = () => {
    console.log("Book a call clicked");
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
      
      {/* 🔥 Gradient Background Glow */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/10 via-purple-500/5 to-transparent blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="space-y-8 text-center lg:text-left">

            {/* Glass Badge */}
            <div className="inline-flex items-center px-5 py-2 rounded-full 
              bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
              <Sparkles size={16} className="text-orange-400 mr-2" />
              <span className="text-sm text-white/90 font-medium">
                AI Powered Growth System
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white">
              Save Time & Close More Deals with
              <br />
              <span
                className={`text-orange-400 transition-all duration-300 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
              >
                {displayText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>

            {/* Subheadline (Conversion Optimized) */}
            <p className="text-lg text-white/70 max-w-xl mx-auto lg:mx-0">
              Automate leads, follow-ups, bookings, and payments on WhatsApp —
              so you can focus on growing your business instead of chasing customers.
            </p>

            {/* 🔥 Conversion Optimized CTA */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">

              {/* Primary CTA */}
              <button
                onClick={handleBookCall}
                className="group relative inline-flex items-center justify-center 
                bg-orange-500 hover:bg-orange-600 text-white px-8 py-5 
                rounded-xl text-base font-semibold transition-all duration-300 
                shadow-lg hover:shadow-orange-500/40 hover:scale-105"
              >
                <Calendar className="mr-2" size={20} />
                Book Free Strategy Call
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA */}
              <a href="https://app.handlingmedia.io/">
                <button
                  className="inline-flex items-center justify-center 
                  border border-white/20 bg-white/5 backdrop-blur-md 
                  hover:bg-white/10 text-white px-8 py-5 
                  rounded-xl text-base font-medium transition-all duration-300"
                >
                  <Zap className="mr-2" size={20} />
                  Login
                </button>
              </a>

            </div>

            {/* 🔥 Trust Signal */}
            <p className="text-sm text-white/40">
              No coding required • Setup in 10 minutes • Cancel anytime
            </p>

          </div>

          {/* RIGHT IMAGE PANEL */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl 
              bg-white/5 backdrop-blur-lg border border-white/10 
              shadow-2xl">

              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto rounded-2xl shadow-2xl"
              >
                <source src="/hero-video.mp4" type="video/mp4" />
              </video>
              {/* Glow effect behind video */}
              <div className="absolute -inset-8 bg-brand-orange/20 blur-3xl rounded-2xl -z-10"></div>
              
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

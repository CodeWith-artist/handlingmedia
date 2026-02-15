import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-black flex items-center py-12 sm:py-16 lg:py-20">
      {/* Background gradients */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-[#0b1220] via-[#0b1220] to-black" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-linear-to-bl from-orange-600/20 via-transparent to-transparent" /> */}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="mb-4 sm:mb-6 flex items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
              <span className="rounded-full bg-orange-500/10 px-2.5 sm:px-3 py-1 text-orange-400 whitespace-nowrap">
                What&apos;s new
              </span>
              <span className="hidden sm:inline">Just shipped v1.0 →</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white">
              Supercharge
              <br />
              your web app
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-gray-400">
              Anim aute id magna aliqua ad ad non deserunt sunt.
              Qui irure qui lorem cupidatat commodo.
            </p>

            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button className="w-full sm:w-auto rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400">
                Documentation
              </button>

              <button className="w-full sm:w-auto group flex items-center justify-center gap-1 font-medium text-gray-300 transition hover:text-white">
                View on GitHub
                <span className="transition group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>

          {/* Right image panel */}
          <div className="relative w-full">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0f172a] shadow-2xl ring-1 ring-white/10">
              {/* Image */}
              <Image
                src="/hero.jpeg"
                alt="Hero preview"
                width={900}
                height={700}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
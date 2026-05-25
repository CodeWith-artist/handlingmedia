// app/components/business-solutions-grid.tsx

import solutions from "./components/solutions";



export default function BusinessSolutionsGrid() {
  return (
    <section className="w-full bg-black py-24 text-white">
      <div className="mx-auto max-w-6xl px-4">
        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-orange-500">
            Business Solutions
          </p>

          <h2 className="mx-auto max-w-xl text-2xl font-bold leading-tight md:text-5xl">
            Websites & Apps Built
            <span className="text-orange-500">
              {" "}
              For Modern Businesses
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-400">
            Custom digital products designed for startups, local businesses,
            and growing brands.
          </p>
        </div>

        {/* Compact Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition-all duration-300 hover:border-orange-500/40 hover:bg-zinc-900"
              >
                {/* Top */}
                <div className="mb-4 flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="mb-4 text-xs leading-6 text-zinc-400">
                  {item.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {item.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-orange-500/10 bg-orange-500/5 px-3 py-1 text-[10px] font-medium text-orange-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
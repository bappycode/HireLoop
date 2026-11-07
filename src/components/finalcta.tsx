
const longitudeLines = [
  "M600 0 Q450 140 0 390",
  "M600 0 Q490 140 150 390",
  "M600 0 Q530 140 300 390",
  "M600 0 Q565 140 450 390",
  "M600 0 Q585 140 550 390",
  "M600 0 Q615 140 650 390",
  "M600 0 Q635 140 750 390",
  "M600 0 Q670 140 900 390",
  "M600 0 Q710 140 1050 390",
  "M600 0 Q750 140 1200 390",
];

const latitudeLines = [
  "M600 0 Q900 30 1200 220",
  "M600 0 Q850 65 1200 270",
  "M600 0 Q800 110 1200 315",
  "M600 0 Q750 160 1200 350",
  "M600 0 Q700 210 1200 380",
  "M600 0 Q600 240 1200 400",
  "M600 0 Q300 240 0 400",
  "M600 0 Q450 210 0 380",
  "M600 0 Q350 160 0 350",
  "M600 0 Q400 110 0 315",
  "M600 0 Q350 65 0 270",
  "M600 0 Q300 30 0 220",
];

export default function FinalCTA() {
  return (
    <section className="relative isolate flex min-h-[370px] items-start justify-center overflow-hidden bg-black px-5 pt-28 text-center sm:min-h-[390px] sm:pt-32">

      {/* Glowing Dome */}
      <div className="pointer-events-none absolute left-1/2 top-[65px] -z-10 h-[340px] w-[125%] -translate-x-1/2 overflow-hidden rounded-[50%_50%_0_0] bg-[radial-gradient(ellipse_at_50%_0%,#6055ff_0%,#3932a0_28%,#17143e_53%,#050509_76%,#000_100%)] opacity-95 blur-[0.5px] sm:w-[110%]">

        {/* Dome Grid */}
        <svg
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          className="h-full w-full opacity-40"
          fill="none"
        >
          {longitudeLines.map((path, index) => (
            <path
              key={`longitude-${index}`}
              d={path}
              stroke="#7772cf"
              strokeWidth="1"
            />
          ))}

          {latitudeLines.map((path, index) => (
            <path
              key={`latitude-${index}`}
              d={path}
              stroke="#7772cf"
              strokeWidth="1"
            />
          ))}
        </svg>

        {/* Dark fade at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl">
        <h2 className="text-3xl font-medium leading-tight tracking-tight text-white sm:text-4xl">
          Your next role is
          <br />
          already looking for you
        </h2>

        <p className="mt-3 text-xs leading-6 text-gray-400 sm:text-sm">
          Build a profile in three minutes. The matches start arriving tomorrow morning.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <a
            href="/signup"
            className="rounded-lg bg-white px-4 py-2.5 text-xs font-medium text-black transition hover:bg-gray-200"
          >
            Create a free account
          </a>

          <a
            href="/pricing"
            className="rounded-lg border border-zinc-700 bg-zinc-950/60 px-4 py-2.5 text-xs font-medium text-white transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            View pricing
          </a>
        </div>
      </div>
    </section>
  );
}

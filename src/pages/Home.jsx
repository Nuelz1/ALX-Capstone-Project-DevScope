import {motion, useReducedMotion} from "framer-motion";

import SearchBar from "../components/SearchBar";



const features = [
  {
    icon: "✦",
    label: "REPOSITORY IMPACT",
    title: "Total Stars",
    description:
      "See the combined stars across a developer's public repositories.",
    accent: "text-amber-300",
    iconBg: "bg-amber-400/10",
    borderHover: "hover:border-amber-400/30",
  },
  {
    icon: "</>",
    label: "LANGUAGE INSIGHTS",
    title: "Top Language",
    description:
      "Identify the most frequently used programming language across repositories.",
    accent: "text-indigo-300",
    iconBg: "bg-indigo-400/10",
    borderHover: "hover:border-indigo-400/30",
  },
  {
    icon: "▤",
    label: "PROJECT EXPLORER",
    title: "Repositories",
    description:
      "Explore public projects, descriptions, stars, forks, and update dates.",
    accent: "text-cyan-300",
    iconBg: "bg-cyan-400/10",
    borderHover: "hover:border-cyan-400/30",
  },
  {
    icon: "↗",
    label: "DEVELOPER OVERVIEW",
    title: "Profile Analytics",
    description:
      "Bring profile details and repository statistics together in one view.",
    accent: "text-emerald-300",
    iconBg: "bg-emerald-400/10",
    borderHover: "hover:border-emerald-400/30",
  },
];



export default function Home() {

  const shouldReduceMotion = useReducedMotion();
  
  return (
    <div className="relative isolate flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center py-12 sm:py-16">
      {/* Decorative background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-12 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl sm:h-96 sm:w-96"
      />

      {/* Hero section */}
      <motion.section
          className="w-full max-w-3xl text-center"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            ease: "easeOut",
          }}
        >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.07] px-3.5 py-1.5">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-indigo-400"
          />
          <span className="text-xs font-medium tracking-wide text-indigo-300">
            GITHUB DEVELOPER INTELLIGENCE
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Understand the developer
          <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            behind the code.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
          Explore GitHub profiles, discover repository insights, and
          understand a developer&apos;s public projects—all in one place.
        </p>

        {/* Search section */}
        <div className="mx-auto mt-9 w-full max-w-2xl rounded-2xl border border-slate-700/80 bg-slate-900/80 p-3 shadow-2xl shadow-indigo-950/20 sm:p-4">
          <p className="mb-3 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
            Explore a GitHub developer
          </p>
          <SearchBar />
          <p className="mt-3 text-left text-xs text-slate-500">
            Search using a public GitHub username.
          </p>
        </div>

        <p className="mt-5 text-sm text-slate-500">
          Built for developers, learners, and technical recruiters.
        </p>
      </motion.section>

      {/* Feature section */}
      <section
        aria-labelledby="features-heading"
        className="mt-16 w-full max-w-6xl sm:mt-20"
      >
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
              WHAT YOU CAN EXPLORE
            </p>
            <h2
              id="features-heading"
              className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl"
            >
              Insights at a glance
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-slate-500 sm:text-right">
            Turn public repository data into a clearer picture of a developer&apos;s work.
          </p>
        </div>

        <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.08,
                },
              },
            }}
          >
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.3,
                ease: "easeOut",
              }}
              className={`group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors duration-200 ${feature.borderHover}`}
            >
              <div
                className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl text-lg font-semibold ${feature.iconBg} ${feature.accent}`}
                aria-hidden="true"
              >
                {feature.icon}
              </div>

              <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-500">
                {feature.label}
              </p>

              <h3 className="mt-2 text-base font-semibold text-slate-100">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
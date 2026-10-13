
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="group inline-flex items-center gap-3 rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          aria-label="DevScope home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-lg transition-colors duration-200 group-hover:bg-indigo-500/20">
            🔭
          </span>

          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Dev<span className="text-indigo-400">Scope</span>
          </span>
        </Link>

        <div className="ml-auto hidden items-center gap-2 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" />
          <span className="text-xs font-medium tracking-wide text-slate-400">
            GITHUB ANALYTICS
          </span>
        </div>
      </div>
    </nav>
  );
}
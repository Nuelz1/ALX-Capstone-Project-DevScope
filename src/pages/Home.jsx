import SearchBar from "../components/SearchBar"

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">

      {/* Hero Section */}
      <div className="max-w-2xl">
        <h1 className="text-5xl font-semibold tracking-tight text-white mb-4">
          DevScope
        </h1>

        <p className="text-lg text-slate-400 mb-2">
          Analyze GitHub developers beyond the surface.
        </p>

        <p className="text-sm text-slate-500 mb-10">
          Search any developer and instantly explore their repositories,
          language distribution, and contribution insights.
        </p>

        <SearchBar />
      </div>

      {/* Feature Hint Cards */}
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-5xl">

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
          <div className="text-2xl mb-3">⭐</div>
          <h3 className="text-white font-medium mb-1">Total Stars</h3>
          <p className="text-slate-400 text-sm">
            Aggregate stars across all repositories to measure overall impact.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
          <div className="text-2xl mb-3">🧠</div>
          <h3 className="text-white font-medium mb-1">Top Language</h3>
          <p className="text-slate-400 text-sm">
            Identify the developer’s dominant programming language instantly.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
          <div className="text-2xl mb-3">📦</div>
          <h3 className="text-white font-medium mb-1">Repositories</h3>
          <p className="text-slate-400 text-sm">
            Browse public repositories with sorting and filtering capabilities.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
          <div className="text-2xl mb-3">📊</div>
          <h3 className="text-white font-medium mb-1">Analytics Overview</h3>
          <p className="text-slate-400 text-sm">
            Quick insights into activity, scale, and development patterns.
          </p>
        </div>

      </div>
    </div>
  )
}
import { motion, useReducedMotion} from "motion/react";




export default function RepoList({ repos }) {

  const shouldReducedMotion = useReducedMotion();
  if (!repos || repos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center">
        <span className="text-3xl" aria-hidden="true">
          📂
        </span>

        <h3 className="mt-4 text-base font-semibold text-slate-200">
          No repositories found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
          There are no repositories to display for the current selection.
          Try choosing another language or viewing all repositories.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {repos.map((repo) => (
        <motion.article
          key={repo.id}
          initial={
            shouldReducedMotion
            ? false
            : { opacity: 0, y:12}
          }
          animate = {{opacity: 1, y:0}}
          transition = {{
            duration: shouldReducedMotion ? 0 : 0.3,
            delay: shouldReducedMotion ? 0 : Math.min(
              repos.indexOf(repo) * 0.05,
              0.25
            ),
            ease: "easeOut"
          }}
          className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition-colors duration-200 hover:border-indigo-400/40 hover:bg-slate-900 sm:p-6"
        >
          {/* Repository name and visibility */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="min-w-0 break-words text-base font-semibold">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-indigo-300 transition-colors hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                {repo.name}
                <span
                  className="ml-2 inline-block text-xs transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </h3>

            <span className="shrink-0 rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-400">
              {repo.fork ? "Fork" : "Repository"}
            </span>
          </div>

          {/* Repository description */}
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {repo.description || "No description provided for this repository."}
          </p>

          {/* Repository metadata */}
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5" title="Stars">
              <span aria-hidden="true" className="text-amber-300">★</span>
              <span className="font-medium text-slate-200">
                {repo.stargazers_count.toLocaleString()}
              </span>
              <span>stars</span>
            </span>

            <span className="inline-flex items-center gap-1.5" title="Forks">
              <span aria-hidden="true">⑂</span>
              <span className="font-medium text-slate-200">
                {repo.forks_count.toLocaleString()}
              </span>
              <span>forks</span>
            </span>

            {repo.language && (
              <span className="inline-flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full bg-indigo-400"
                  aria-hidden="true"
                />
                <span>{repo.language}</span>
              </span>
            )}

            <span className="ml-auto text-slate-500">
              Updated{" "}
              {new Date(repo.updated_at).toLocaleDateString(undefined, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
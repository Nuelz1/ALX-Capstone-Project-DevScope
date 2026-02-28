// src/components/repos/RepoList.jsx

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) {
    return (
      <div className="mt-6 text-slate-400">
        No repositories found.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {repos.map((repo) => (
        <div
          key={repo.id}
          className="bg-slate-900 border border-slate-800 p-4 rounded-xl"
        >
          {/* Repo Name */}
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 font-semibold hover:underline"
          >
            {repo.name}
          </a>

          {/* Description */}
          {repo.description && (
            <p className="text-slate-400 text-sm mt-1">
              {repo.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex gap-4 text-xs text-slate-500 mt-3">
            <span>⭐ {repo.stargazers_count}</span>
            <span>🍴 {repo.forks_count}</span>
            {repo.language && <span>🧠 {repo.language}</span>}
            <span>
              Updated: {new Date(repo.updated_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
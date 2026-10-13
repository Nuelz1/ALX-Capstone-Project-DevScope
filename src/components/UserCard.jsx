
const UserCard = ({ user }) => {
  const {
    avatar_url,
    login,
    name,
    bio,
    followers,
    following,
    public_repos,
    location,
    company,
    blog,
    twitter_username,
    html_url,
    created_at,
  } = user;

  const websiteUrl = blog
    ? blog.startsWith("http")
      ? blog
      : `https://${blog}`
    : null;

  const memberSince = new Date(created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
  });

  return (
    <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
      <div className="mb-6 flex flex-col items-center text-center">
        <img
          src={avatar_url}
          alt={`${login}'s GitHub avatar`}
          className="h-28 w-28 rounded-full border-2 border-slate-700 object-cover shadow-lg shadow-black/20 sm:h-32 sm:w-32"
        />

        <h1 className="mt-5 text-2xl font-semibold tracking-tight text-white">
          {name || login}
        </h1>

        <p className="mt-1 text-sm text-indigo-300">@{login}</p>

        {bio && (
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
            {bio}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 border-y border-slate-800 py-4 text-center">
        <div>
          <p className="text-xl font-semibold text-white">{followers}</p>
          <p className="mt-1 text-xs text-slate-500">Followers</p>
        </div>

        <div>
          <p className="text-xl font-semibold text-white">{following}</p>
          <p className="mt-1 text-xs text-slate-500">Following</p>
        </div>

        <div>
          <p className="text-xl font-semibold text-white">{public_repos}</p>
          <p className="mt-1 text-xs text-slate-500">Repositories</p>
        </div>
      </div>

      <div className="mt-5 space-y-4 text-sm">
        {location && (
          <div className="flex items-start gap-3">
            <span aria-hidden="true">📍</span>
            <span className="break-words text-slate-300">{location}</span>
          </div>
        )}

        {company && (
          <div className="flex items-start gap-3">
            <span aria-hidden="true">🏢</span>
            <span className="break-words text-slate-300">{company}</span>
          </div>
        )}

        {websiteUrl && (
          <div className="flex items-start gap-3">
            <span aria-hidden="true">🔗</span>
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-indigo-300 transition-colors hover:text-indigo-200"
            >
              {blog}
            </a>
          </div>
        )}

        {twitter_username && (
          <div className="flex items-start gap-3">
            <span aria-hidden="true">𝕏</span>
            <a
              href={`https://twitter.com/${twitter_username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="break-words text-indigo-300 transition-colors hover:text-indigo-200"
            >
              @{twitter_username}
            </a>
          </div>
        )}
      </div>

      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-white transition-colors hover:border-indigo-400/40 hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
      >
        View GitHub Profile
        <span aria-hidden="true">↗</span>
      </a>

      <p className="mt-4 text-center text-xs text-slate-500">
        Member since {memberSince}
      </p>
    </aside>
  );
};

export default UserCard;
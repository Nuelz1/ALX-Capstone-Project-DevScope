import { useParams } from "react-router-dom";
import useGithubUser from "../hooks/useGithubUser";
import useUserRepos from "../hooks/useUserRepos";
import {
  calculateTotalStars,
  getTopStarredRepo,
  getMostUsedLanguage,
} from "../utils/analytics";
import UserCard from "../components/UserCard";

const UserProfile = () => {
  const { username } = useParams();
  const { user, loading, error } = useGithubUser(username);
  const { repos, loading: reposLoading, error: reposError } = useUserRepos(username);
  
  const totalStars = calculateTotalStars(repos);
  const topRepo = getTopStarredRepo(repos);
  const topLanguage = getMostUsedLanguage(repos);
  
  if (loading || reposLoading) {
    return <div className="text-white p-8">Loading...</div>;
  }

  if (error || reposError) {
    return(

   <div className="text-rose-500 p-8">
    {error || reposError}
    </div>
    );
  }

  return (
  <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Sidebar */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-2xl font-bold">
          {user.name || user.login}
        </h1>
        <p className="text-slate-400 mt-2">{user.bio}</p>

        <div className="mt-6 space-y-2 text-sm text-slate-400">
          <p>Followers: {user.followers}</p>
          <p>Following: {user.following}</p>
          <p>Public Repos: {user.public_repos}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-8 space-y-8">

        {/* Analytics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm">Total Stars</p>
            <p className="text-3xl font-bold">{totalStars}</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm">Top Language</p>
            <p className="text-3xl font-bold">
              {topLanguage || "N/A"}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
            <p className="text-slate-400 text-sm">Top Repo</p>
            <p className="text-xl font-semibold">
              {topRepo?.name || "N/A"}
            </p>
          </div>
        </div>

        {/* Repo List */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Repositories
          </h2>

          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-slate-900 border border-slate-800 p-4 rounded-xl mb-4"
            >
              <h3 className="font-semibold">{repo.name}</h3>
              <p className="text-sm text-slate-400">
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
);
};

export default UserProfile;
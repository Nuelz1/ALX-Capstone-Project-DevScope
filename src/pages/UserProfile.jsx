import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGithubUser from "../hooks/useGithubUser";
import useUserRepos from "../hooks/useUserRepos";
import {
  getTotalStars,
  getMostUsedLanguage,
  getTopStarredRepo,
  sortRepositories,
  getUniqueLanguages
} from "../utils/analytics";
import RepoList from "../components/RepoList";
import Spinner from "../components/UI/Spinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import LanguageFilter from "../components/LanguageFilter";
import Button from "../components/UI/Button"


const UserProfile = () => {
  const { username } = useParams();
  const { user, loading, error } = useGithubUser(username);
  const { repos, loading: reposLoading, error: reposError } = useUserRepos(username);
  const [sortBy, setSortBy] = useState("stars");
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const navigate = useNavigate()

  console.log("sortBy:", sortBy)
  console.log("selectedLanguage:", selectedLanguage)

  const filteredRepos = selectedLanguage
    ? repos.filter(repo => repo.language === selectedLanguage)
    : repos

  const totalStars = getTotalStars(repos);
  const topRepo = getTopStarredRepo(repos);
  const topLanguage = getMostUsedLanguage(repos);
  const sortedRepos = sortRepositories(filteredRepos, sortBy);
  const languages = getUniqueLanguages(repos);



  if (loading || reposLoading) {
    return <Spinner size="large" fullPage={true} />;
  }

  if (error || reposError) {
    return (
      <div className="flex flex-col items-center">
        <ErrorMessage message={error || reposError} />
        <Button
          className=""
          variant="outline"
          size="medium"
          onClick={() => navigate('/')}
        >
          Search Again</Button>
      </div>

    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex justify-center mb-4">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full"
          />
          </div>

          <h1 className="text-2xl font-semibold">
            {user.name || user.login}
          </h1>

          {user.bio && (
            <p className="text-slate-400 mt-2 text-sm leading-relaxed">
              {user.bio}
            </p>
          )}

          <div className="mt-6 space-y-3 text-sm text-slate-400">

            {/* Core Stats (Always Present) */}
            <div className="flex justify-between">
              <span>Followers</span>
              <span className="text-white font-medium">{user.followers}</span>
            </div>

            <div className="flex justify-between">
              <span>Following</span>
              <span className="text-white font-medium">{user.following}</span>
            </div>

            <div className="flex justify-between">
              <span>Public Repos</span>
              <span className="text-white font-medium">{user.public_repos}</span>
            </div>

            {/* Optional Fields (Render Only If They Exist) */}

            {user.location && (
              <p>📍 {user.location}</p>
            )}

            {user.company && (
              <p>🏢 {user.company}</p>
            )}

            {user.blog && (
              <a
                href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                🔗 {user.blog}
              </a>
            )}

            {user.twitter_username && (
              <a
                href={`https://twitter.com/${user.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                🐦 @{user.twitter_username}
              </a>
            )}

            {/* GitHub Profile Link (Always Exists) */}
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-sm text-white bg-slate-800 hover:bg-slate-700 transition-colors px-4 py-2 rounded-xl text-center"
            >
              View GitHub Profile →
            </a>

            {/* Member Since */}
            <p className="text-xs text-slate-500 mt-4">
              Member since {new Date(user.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
              })}
            </p>

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

          {/* Controls Section */}
          <div
            className="flex flex-wrap items-center gap-4 my-4">
            <Button
            variant={sortBy === "stars" ? "primary" : "outline"}
            onClick={() => setSortBy("stars")}
            >
              Stars</Button>
              <Button
            variant={sortBy === "forks" ? "primary" : "outline"}
            onClick={() => setSortBy("forks")}
            >
              Forks</Button>
              <Button
            variant={sortBy === "updated" ? "primary" : "outline"}
            onClick={() => setSortBy("updated")}
            >
              Updated</Button>
           

            <LanguageFilter
              languages={languages}
              selectedLanguage={selectedLanguage}
              onSelectLanguage={setSelectedLanguage}
            />
          </div>

          {/* Repo List */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Repositories
            </h2>
            <div>
              <RepoList repos={sortedRepos} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
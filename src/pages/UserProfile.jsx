import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGithubUser from "../hooks/useGithubUser";
import useUserRepos from "../hooks/useUserRepos";
import {
  getTotalStars,
  getMostUsedLanguage,
  getTopStarredRepo,
  sortRepositories,
  getUniqueLanguages,
} from "../utils/analytics";
import RepoList from "../components/RepoList";
import Spinner from "../components/UI/Spinner";
import ErrorMessage from "../components/UI/ErrorMessage";
import LanguageFilter from "../components/LanguageFilter";
import Button from "../components/UI/Button";
import Usercard from "../components/UserCard";

const UserProfile = () => {
  const { username } = useParams();
  const { user, loading, error } = useGithubUser(username);
  const {
    repos,
    loading: reposLoading,
    error: reposError,
  } = useUserRepos(username);
  const [sortBy, setSortBy] = useState("stars");
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const navigate = useNavigate();

  const filteredRepos = selectedLanguage
    ? repos.filter((repo) => repo.language === selectedLanguage)
    : repos;

  const totalStars = getTotalStars(repos);
  const topRepo = getTopStarredRepo(repos);
  const topLanguage = getMostUsedLanguage(repos);
  const sortedRepos = sortRepositories(filteredRepos, sortBy);
  const languages = getUniqueLanguages(repos);

  if (loading || reposLoading) {
    return <Spinner size="large" fullpage={true} />;
  }

  if (error || reposError) {
    return (
      <div className="flex flex-col items-center">
        <ErrorMessage message={error || reposError} />
        <Button
          className=""
          variant="outline"
          size="medium"
          onClick={() => navigate("/")}
        >
          Search Again
        </Button>
      </div>
    );
  }

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
        {/* Developer Profile */}
        <div className="lg:col-span-4">
          <Usercard user={user} />
        </div>

        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* Analytics Overview */}
          <section aria-label="Repository analytics">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                DEVELOPER INSIGHTS
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">
                Repository analytics
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                A snapshot of @{user.login}&apos;s public GitHub projects.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-colors hover:border-amber-400/30">
                <p className="text-sm text-slate-400">Total Stars</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                  {totalStars.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Across public repositories
                </p>
              </article>

              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-colors hover:border-indigo-400/30">
                <p className="text-sm text-slate-400">Top Language</p>
                <p className="mt-3 break-words text-2xl font-semibold tracking-tight text-white">
                  {topLanguage || "N/A"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Most-used repository language
                </p>
              </article>

              <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition-colors hover:border-cyan-400/30">
                <p className="text-sm text-slate-400">Top Repository</p>
                <p className="mt-3 break-words text-lg font-semibold text-white">
                  {topRepo?.name || "N/A"}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {topRepo
                    ? `${topRepo.stargazers_count.toLocaleString()} stars`
                    : "No repositories available"}
                </p>
              </article>
            </div>
          </section>

          {/* Repository Explorer */}
          <section aria-labelledby="repositories-heading">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                PROJECT EXPLORER
              </p>
              <h2
                id="repositories-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-white"
              >
                Repositories
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Sort projects and filter by programming language.
              </p>
            </div>

            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Sort by
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={sortBy === "stars" ? "primary" : "outline"}
                    onClick={() => setSortBy("stars")}
                  >
                    Stars
                  </Button>
                  <Button
                    variant={sortBy === "forks" ? "primary" : "outline"}
                    onClick={() => setSortBy("forks")}
                  >
                    Forks
                  </Button>
                  <Button
                    variant={sortBy === "updated" ? "primary" : "outline"}
                    onClick={() => setSortBy("updated")}
                  >
                    Recently Updated
                  </Button>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  Filter by language
                </p>
                <LanguageFilter
                  languages={languages}
                  selectedLanguage={selectedLanguage}
                  onSelectLanguage={setSelectedLanguage}
                />
              </div>
            </div>

            <p className="mb-4 text-sm text-slate-400" aria-live="polite">
              Showing {sortedRepos.length}{" "}
              {sortedRepos.length === 1 ? "repository" : "repositories"}
              {selectedLanguage ? ` using ${selectedLanguage}` : ""}
            </p>

            <RepoList repos={sortedRepos} />
          </section>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;

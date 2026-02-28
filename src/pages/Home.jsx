import { useState } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import useGithubUser from "../hooks/useGithubUser";
import useUserRepos from "../hooks/useUserRepos";

export default function Home() {
  const [username, setUsername] = useState("");

  const { user, loading: userLoading, error: userError } =
    useGithubUser(username);

  const { repos, loading: repoLoading, error: repoError } =
    useUserRepos(username);

  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  );

  const repoCount = repos.length;


  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <SearchBar setUsername={setUsername} />

      {userLoading && <p>Loading user...</p>}
      {userError && <p>{userError}</p>}
      {user && <UserCard user={user} />}

      {/* Later: Analytics Component */}
    </div>
  );
}
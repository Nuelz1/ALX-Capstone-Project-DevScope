import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <SearchBar />
      <UserCard />
    </div>
  )
}
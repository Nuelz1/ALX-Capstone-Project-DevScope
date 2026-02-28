import SearchBar from "../components/SearchBar"

// ✅ Fixed: Home no longer tries to manage username state or fetch data.
// SearchBar uses useNavigate internally and routes to /user/:username.
// All data fetching and display happens in UserProfile.

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-white">
      <h1 className="text-4xl font-bold mb-2">DevScope</h1>
      <p className="text-slate-400 mb-8">Search any GitHub developer and explore their profile</p>
      <SearchBar />
    </div>
  )
}
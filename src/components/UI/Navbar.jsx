import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        <Link
          to="/"
          className="flex items-center gap-2 text-lg sm:text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity duration-200"
        >
          <span className="text-xl">🔭</span>
          <span>DevScope</span>
        </Link>

      </div>
    </nav>
  );
}

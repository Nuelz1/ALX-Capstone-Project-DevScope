
export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold">404 - Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 inline-block text-blue-400 hover:text-blue-300">
        Go back home
      </Link>
    </div>
  );
}
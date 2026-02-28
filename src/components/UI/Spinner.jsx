export default function Spinner({size = "medium", fullpage = false}) {

  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-20 h-20"
  };

  return (
    <div className={`flex items-center justify-center ${fullpage ? "h-screen w-screen" : "h-64"}`}>
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-t-indigo-500 border-slate-700`}></div>
    </div>
  );
}
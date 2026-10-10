export default function Button({ onClick, className = '', size = "medium", variant = "primary", type, children, disabled = false }) {
  
  const sizeClasses = {
small: "px-3 py-1.5 text-sm",
medium: "px-4 py-2.5 text-sm",
large: "px-6 py-3 text-base",
};

const variantClasses = {
primary:
"bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed",
secondary:
"bg-slate-700 text-slate-100 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed",
outline:
"border border-slate-600 text-slate-200 hover:bg-slate-800 disabled:border-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed",
};




    return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950`}
      type={type}
      >
      {children}
    </button>
  );
}
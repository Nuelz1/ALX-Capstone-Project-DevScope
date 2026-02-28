export default function Button({ onClick, className = '', size = "medium", variant = "primary", type, children, disabled = false }) {
  
  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg"
  };

  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed",
    outline: "border border-gray-600 text-white hover:bg-gray-700 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
  };



    return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} rounded-lg transition-colors duration-300`}
      type={type}
      >
      {children}
    </button>
  );
}
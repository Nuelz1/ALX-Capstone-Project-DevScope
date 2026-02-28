export default function Input({type = 'text', value, onChange,placeholder = '', className = '' }) {
    const baseStyles = "border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500";

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseStyles} ${className}`}
            />
    );
};






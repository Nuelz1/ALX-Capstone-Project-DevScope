export default function Input({
  type = "text",
  value,
  onChange,
  placeholder = "",
  className = "",
  id,
  name,
  ariaLabel,
  ariaInvalid,
  ariaDescribedby,
}) {
  const baseStyles =
    "w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-colors duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      className={`${baseStyles} ${className}`}
    />
  );
}

export default function ErrorMessage({message}) {
    const messageText = typeof message === "string" ? message : "An error occurred ";
    
  return (
    <div className="bg-rose-500/10 text-rose-400 p-4 rounded-xl flex items-center gap-3">
      <span>⚠️</span>
      <span>{messageText}</span>
    </div>
  );
}
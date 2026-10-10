
const UserCard = ({ user }) => {
  const { avatar_url, login, public_repos } = user;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-800 p-5 transition-colors duration-200 hover:border-slate-600">
      <img
        src={avatar_url}
        alt={`${login}'s GitHub avatar`}
        className="h-16 w-16 rounded-full border border-slate-600 object-cover"
      />

      <div className="min-w-0">
        <h3 className="truncate text-lg font-semibold text-slate-100">
          {login}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          {public_repos} public repositories
        </p>
      </div>
    </div>
  );
};

export default UserCard;
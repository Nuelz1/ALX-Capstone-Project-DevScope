import react from 'react'

const UserCard = ({ login, avatar_url, public_repos }) => {
    return (
        <div className="bg-slate-800 rounded-lg p-4 flex items-center gap-4">
            <img src={avatar_url} alt={login} className="w-12 h-12 rounded-full" />
            <div>
                <h3 className="font-bold">{login}</h3>
                <p className="text-sm text-slate-400">{public_repos} repositories</p>
            </div>
        </div>
    )
}

export default UserCard

import UserCard from './UserCard.jsx';

function UserList({users}) {
    if (!users || users.length === 0){
        return <p>No Users found</p>
    }

    return(
        <div>
            {users.map((user) =>(
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}


export default UserList;    
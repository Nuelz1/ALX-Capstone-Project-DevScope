import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
            navigate(`/user/${username}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center py-10">
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter GitHub username"
                className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
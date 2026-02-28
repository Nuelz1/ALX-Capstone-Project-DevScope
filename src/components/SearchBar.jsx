import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Input from "./UI/Input";
import Button from "./UI/Button";

const SearchBar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(username.trim());
        if (username.trim()) {
            navigate(`/user/${username}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center items-center py-10">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter GitHub username"/>
           <Button type="submit" className="ml-4">Search</Button>
        </form>
    );
};

export default SearchBar;
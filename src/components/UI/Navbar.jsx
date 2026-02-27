import {Link} from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="py-6 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold tracking-tight">DEVSCOPE</Link>
        </nav>
    )
}
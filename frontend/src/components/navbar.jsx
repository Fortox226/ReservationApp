import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className='navigation'>
            <nav>
                <Link to="/">Rezerwacje</Link>
                <Link to="/shedule">Terminarz</Link>
                <Link to="/settings">Ustawienia</Link>
            </nav>
        </div>
    )
}
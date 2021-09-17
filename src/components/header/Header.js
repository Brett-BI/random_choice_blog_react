import React from "react";
import { Link } from 'react-router-dom';

import UserContext from '../../context/UserContext';

import './Header.scss';


class Header extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { isLoggedIn } = this.context;
        console.log(`is admin? ${window.location.pathname.includes('/admin')}`);
        return (
            <header>                
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link className={ window.location.pathname.includes('/admin') ? "active" : null } to="/admin">Admin</Link>
                        </li>                        
                    </ul>
                </nav>
                <span className="logout">{ isLoggedIn ? <Link to="/logout">Logout</Link> : null }</span>
            </header>
        )
    }
}

export default Header;
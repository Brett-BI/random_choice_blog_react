import React from "react";
import { Link } from 'react-router-dom';

import './Header.scss';


class Header extends React.Component {
    //static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            displayState: 'full',
            hideSubNav: true
        };
        this.handleScroll = this.handleScroll.bind(this);
        this.handleBrandClick = this.handleBrandClick.bind(this);
    }

    componentDidMount() {
        this.setState({ ...this.state, displayState: 'full', hideSubNav: true });
        window.addEventListener('scroll', () => {
            console.log(window.scrollY);
            this.handleScroll(window.scrollY);
        })
    }

    handleScroll(scroll) {
        if(scroll > 60) {
            this.setState({ ...this.state, displayState: 'minimal' });
        } else {
            this.setState({ ...this.state, displayState: 'full' });
        }
    }

    handleBrandClick(e) {
        this.setState({ ...this.state, hideSubNav: !this.state.hideSubNav });
    }

    render() {
        //const { isLoggedIn } = this.context;
        let isLoggedIn = false;
        if(this.props.user) {
            isLoggedIn = this.props.user.isLoggedIn;
        }

        console.log(`is admin? ${window.location.pathname.includes('/admin')}`);
        return (
            <header className={ this.state.displayState }>
                <span className={ `${this.state.displayState === "minimal" ? 'brand' : 'hidden'}` } onClick={ this.handleBrandClick }><Link to="/">RC</Link></span>
                <nav className={ this.state.hideSubNav ? "hide" : "show"}>
                    <span className={ `${this.state.displayState === "minimal" ? 'nav-item' : 'brand'}` }><Link to="/">{ this.state.displayState === "minimal" ? 'Home' : 'RC' }</Link></span>
                    <span className="nav-item"><Link className={ window.location.pathname.includes('/admin') ? ", active" : '' } to="/admin">Administrator</Link></span>
                </nav>
                <span className={ `${this.state.displayState === "minimal" ? 'hidden' : 'logout'}` }>{ isLoggedIn ? <Link to="/logout">Logout</Link> : null }</span>
            </header>
        )
    }
}

export default Header;
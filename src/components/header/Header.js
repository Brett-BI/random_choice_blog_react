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
        console.log(`is admin? ${window.location.pathname.includes('/admin')}`);
        return (
            // <header className={ this.state.displayState }>
            //     <span className={ `${this.state.displayState === "minimal" ? 'brand' : 'hidden'}` } onClick={ this.handleBrandClick }><Link to="/">RC</Link></span>
            //     <nav className={ this.state.hideSubNav ? "hide" : "show"}>
            //         <span className={ `${this.state.displayState === "minimal" ? 'nav-item' : 'brand'}` }><Link to="/">{ this.state.displayState === "minimal" ? 'Home' : 'RC' }</Link></span>
            //         <span className="nav-item"><Link className={ window.location.pathname.includes('/admin') ? ", active" : '' } to="/admin">Administrator</Link></span>
            //     </nav>
            //     <span className={ `${this.state.displayState === "minimal" ? 'hidden' : 'logout'}` }>{ isLoggedIn ? <Link to="/logout">Logout</Link> : null }</span>
            // </header>

            // <header className={ "minimal" }>
            //     <span className={ `brand` } onClick={ this.handleBrandClick }><span>RC</span></span>
            //     <nav className={ this.state.hideSubNav ? "hide" : "show"}>                    
            //         <span className={ `nav-item` }><Link to="/">{ 'Home' }</Link></span>
            //         <span className="nav-item"><Link className={ window.location.pathname.includes('/admin') ? ", active" : '' } to="/admin">Administrasdfasdfasdfator</Link></span>
            //         { isLoggedIn ? <span className={ "nav-item" }><Link to="/logout">Logout</Link></span> : null }
            //     </nav>
            // </header>

            <nav className={ 'nav nav-minimal' }>
                <span className={ 'nav-item brand' }><Link to="/">RC</Link></span>
                <span className={ 'nav-item' }><Link to="/">RA</Link></span>
                { this.props.user && this.props.user.isLoggedIn ? (
                    <div className={ 'sub-nav' }>
                        <span className={ 'sub-nav-primary' } onClick={ this.handleBrandClick }>Admin</span>
                        <div className={ `sub-nav-items ${this.state.hideSubNav ? 'hide' : 'show'}` }>
                        <span className={ `nav-item ${this.state.hideSubNav ? 'hide' : 'show'}` }><Link to="/admin">Home</Link></span>
                            <span className={ `nav-item ${this.state.hideSubNav ? 'hide' : 'show'}` }><Link to="/admin/article/new">+ Article</Link></span>
                            <span className={ `nav-item ${this.state.hideSubNav ? 'hide' : 'show'}` }><Link to="/">Drafts</Link></span>
                            <span className={ `nav-item ${this.state.hideSubNav ? 'hide' : 'show'}` }><Link to="/">My Info</Link></span>
                            <span className={ `nav-item ${this.state.hideSubNav ? 'hide' : 'show'}` }><Link to="/logout">Logout</Link></span>
                        </div>
                    </div>
                ) : <span className={ 'nav-item' }><Link to="/login">Login</Link></span> }
            </nav>
        )
    }
}

export default Header;
import React from "react";
import UserContext from "../../context/UserContext";


class Header extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { token, username } = this.context;
        return (
            <header>
                TOKEN: { token }<br/>
                USERNAME: { username }
            </header>
        )
    }
}

export default Header;
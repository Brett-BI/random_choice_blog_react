import React from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../../context/UserContext';

class Logout extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log('Logout did mount?');
        const { clearAllData } = this.context;
        clearAllData('');
        //setUsername('');
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

export default Logout;
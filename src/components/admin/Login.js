import React from 'react';

import { getToken } from '../../utils/Requests';
import UserContext from '../../context/UserContext';

class Login extends React.Component {
    static contextType = UserContext // sets the contextType for the whole component?

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                loggedIn: false
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidMount() {
        // const user = this.context;
        // console.log('user is:');
        // console.log(user);
        // this.setState({ user: { username: user.name, loggedIn: user.loggedIn }});
        // console.log('now state is: ');
        // console.log(this.state);
        
    }

    // request a token
    // store the token
    // pass the token with each subsequent request
    handleSubmit(e) {
        e.preventDefault();

        const { token, setToken, setUsername, setIsLoggedIn } = this.context;
        console.log(`token right now is: ${token}`);

        let _token = getToken(this.state.user);
        _token.then(data => data.json())
        .then(d => {
            //UserContext.setToken(d.access_token);
            console.log('setting the token from Login');
            setToken(d.access_token);
            console.log('setting the username from Login');
            setUsername(d.username);
            console.log('setting isLoggedIn from Login');
            setIsLoggedIn(true);
            console.log('going to admin panel...');
            this.props.history.push('/admin');
        })
    }

    handleUsernameChange(e) {
        e.preventDefault()
        this.setState({ user: { ...this.state.user, 'username': e.target.value }});
    }

    handlePasswordChange(e) {
        e.preventDefault()
        this.setState({ user: { ...this.state.user, 'password': e.target.value }})
    }

    render() {        
        return (
            <div>
                <form onSubmit={ this.handleSubmit }>
                    <label>Username</label>
                    <input type="text" name="username" value={ this.state.user.username } onChange={ this.handleUsernameChange } />

                    <label>Password</label>
                    <input type="password" name="password" value={ this.state.user.password } onChange={ this.handlePasswordChange } />

                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;
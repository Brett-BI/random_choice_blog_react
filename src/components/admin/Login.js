import React from 'react';
import { Redirect } from 'react-router-dom';

import { getToken } from '../../utils/Requests';
import { getUserData, setToken } from '../../utils/User';
import UserContext from '../../context/UserContext';

class Login extends React.Component {
    static contextType = UserContext // sets the contextType for the whole component?

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
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
        console.log(this.props);
        console.log(`(Login) did mount. isLoggedIn? ${this.props.user.isLoggedIn}`);
        if(this.props.user.isLoggedIn) {
            console.log('(Login) user already logged in.');
            //return ( <Redirect user={ this.props.user } to="/admin" /> );
            this.props.history.push('/admin');
        }
    }

    // request a token
    // store the token
    // pass the token with each subsequent request
    handleSubmit(e) {
        e.preventDefault();

        //const { token, setToken, setIsLoggedIn } = this.context;
        //console.log(`token right now is: ${token}`);

        // let _token = getToken(this.state.user);
        // _token.then(data => data.json())
        // .then(d => {
        //     //UserContext.setToken(d.access_token);
        //     console.log('setting the token from Login');
        //     setToken(d.access_token);
        //     console.log('setting isLoggedIn from Login');
        //     //setIsLoggedIn(true);
        //     console.log('going to admin panel...');
        //     this.props.history.push('/admin');
        // })

        let _loginUser = getToken(this.state.user);
        _loginUser.then((res) => {
            if(res.ok) {
                return res.json();
            } else {
                return Promise.reject(res);
            }
        })
        .then((_data) => {
            console.log('Setting token from login...');
            setToken(_data.access_token);
            let _userData = getUserData();
            _userData.then(data => {
                console.log('(User) setting the user data...');
                this.props.setUser(data);
            });
            this.props.history.push('/admin');
        })
        .catch((err) => {
            console.log('Error occured logging user in.');
            console.log(err);
        });
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
        const { isLoggedIn } = this.props.user;
        if(isLoggedIn) {
            return (
                <Redirect to="/admin" />
            )
        } else {
            return (
                <div className="d-flex flex-center p-2">
                    <form className="w-30" onSubmit={ this.handleSubmit }>
                        <label className="d-block w-100">Username</label>
                        <input className="d-block w-100" type="text" name="username" value={ this.state.user.username } onChange={ this.handleUsernameChange } />

                        <label className="d-block w-100">Password</label>
                        <input className="d-block w-100" type="password" name="password" value={ this.state.user.password } onChange={ this.handlePasswordChange } />

                        <button className="float-right btn-gold" type="submit">Login</button>
                    </form>
                </div>
            )
        }
    }
}

export default Login;
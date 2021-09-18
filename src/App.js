import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.scss';

import Admin from './components/admin/Admin';
import Article from './components/article/Article';
import Articles from './components/article/Articles';
import Header from './components/header/Header';
import Loading from './components/loading/Loading';
import Login from './components/admin/Login';
import Logout from './components/admin/Logout';
import { getUserData } from './utils/User';

class App extends React.Component {
  //static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      user: {}, 
      loading: false
    };
    this._isMounted = false;
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    // look for user information and put it in the state
    console.log('App did mount.');
    this.setState({ ...this.state, loading: true });
    let _userData = getUserData();
    _userData.then(_data => {
      if(this._isMounted) {
        console.log('(App) setting loading to false');
        this.setState({ user: { ...this.state.user, ..._data }, loading: false });
      }
    });
  }

  componentWillUnmount() { 
    this._isMounted = false;
  }

  setUser(user) {
    console.log('(App) setUser called.');
    this.setState({ user: { ...this.state.user, ...user }});
  }

  render() {
    console.log(`(App) user is logged in: ${ this.state.user.isLoggedIn }`);
    console.log(`(App) loading display? ${ this.state.loading }`);
    
    if(this.state.loading) {
      console.log('(App) loading render');
      return (
        <Router>
          <Header />
          <div className="content">
            <Loading />
          </div>
        </Router>
      )
    } else {
      console.log('(App) not loading render');
      return (
        <Router>
          <Header user={ this.state.user } />
          <div className="content">
            <Switch>
              <Route path="/article/:article_id" component={ Article }></Route>
              <Route path="/admin/" render={ (props) => <Admin { ...props } user={ this.state.user } /> } >
              </Route>              
              <Route exact path="/login" render={ (props) => <Login { ...props } user={ this.state.user } setUser={ this.setUser } /> }>
              </Route>
              <Route exact path="/logout">
                <Logout setUser={ this.setUser } />
              </Route>
              <Route exact path="/">
                <div className="w-100 d-flex flex-center">
                  <Articles admin={ false } />
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      )
    }
  }
}

export default App;

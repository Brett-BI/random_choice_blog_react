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
import Login from './components/admin/Login';
import Logout from './components/admin/Logout';
import UserContext, { UserProvider } from './context/UserContext';

class App extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <UserProvider>
        <Router>
          <Header />
          <div className="content">
            <Switch>
              <Route path="/article/:article_id" component={ Article }>
              </Route>
              <Route path="/admin/" component={ Admin }>
              </Route>
              <Route exact path="/login" component={ Login }></Route>
              <Route exact path="/logout" component={ Logout }></Route>
              <Route exact path="/">
                <div className="w-100 d-flex flex-center">
                  <Articles />
                </div>
              </Route>
            </Switch>
          </div>
        </Router>
      </UserProvider>
    );
  }
}

export default App;

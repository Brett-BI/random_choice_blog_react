import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

import Admin from './components/admin/Admin';
import Article from './components/article/Article';
import Articles from './components/article/Articles';
import Header from './components/header/Header';
import UserContext, { UserProvider } from './context/UserContext';

class App extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: 'Brian', 
        loggedIn: true
      }
    }
  }
  render() {
    return (
      <UserProvider value={ this.state.user }>
        <Router>
          <Header />
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/admin">Admin</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route path="/article/:article_id" component={ Article }>
              </Route>
              <Route path="/admin/" component={ Admin }>
              </Route>
              <Route exact path="/">
                <Articles />
              </Route>
            </Switch>
          </div>
        </Router>
        </UserProvider>
    );
  }
}

export default App;

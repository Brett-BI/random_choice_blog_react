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

class App extends React.Component {
  render() {
    return (
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
    );
  }
}

export default App;

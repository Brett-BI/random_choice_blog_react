import React from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect
} from 'react-router-dom';

import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import Articles from '../article/Articles';
import UserContext from '../../context/UserContext';

import './Admin.scss';

class Admin extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    render() {
        let { isLoggedIn } = this.context;
        console.log(`user is logged in: ${isLoggedIn}`);
        if(isLoggedIn) {
            return (
                <div className="admin-container">
                    <Switch>
                        <Route exact path={`/admin`}>
                            <div className="new-article-button w-50">
                                <Link className="btn btn-gold float-right" to="/admin/article/new">+ NEW ARTICLE</Link>
                            </div>
                            <Articles match={ this.props.match } />
                        </Route>
                        <Route path={`/admin/article/new`} component={ CreateArticle } />
                        <Route path={`/admin/article/:article_id`} component={ EditArticle } />                                                                                     
                    </Switch>
                </div>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

export default Admin;
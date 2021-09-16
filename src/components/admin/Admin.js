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

class Admin extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    render() {
        let { username } = this.context;
        console.log(`username is: ${username}`);
        if(username) {
            return (
                <Switch>
                    <Route exact path={`/admin`}>
                        <Link to="/admin/article/new">NEW ARTICLE</Link>
                        <Articles match={ this.props.match } />
                    </Route>
                    <Route path={`/admin/article/new`} component={ CreateArticle } />
                    <Route path={`/admin/article/:article_id`} component={ EditArticle } />                                                                                     
                </Switch>
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}

export default Admin;
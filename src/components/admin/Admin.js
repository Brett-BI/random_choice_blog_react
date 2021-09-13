import React from 'react';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom';

import CreateArticle from './CreateArticle';
import EditArticle from './EditArticle';
import Articles from '../article/Articles';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    render() {
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
    }
}

export default Admin;
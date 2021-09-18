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

import './Admin.scss';

class Admin extends React.Component {
    //static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };
    }

    render() {
        // let { isLoggedIn } = this.context;
        //let isLoggedIn = this.props.isLoggedIn;
        console.log(`(Admin) user is logged in? ${this.props.user.isLoggedIn}`);
        console.log('admin props');
        console.log(this.props);
        let content = (
            <Switch>
                <Route exact path={`/admin/article/new`} component={ CreateArticle } />
                <Route path={`/admin/article/:article_id`} component={ EditArticle } />  
                <Route exact path={`/admin`}>
                    <div className="new-article-button w-50">
                        <Link className="btn btn-gold float-right" to="/admin/article/new">+ NEW ARTICLE</Link>
                    </div>
                    <Articles admin={ true } />
                </Route>                                                                                                           
            </Switch>
        );
        return (
            <div className="admin-container">{ this.props.user.isLoggedIn ? content : <Redirect to="/login" /> }</div>
        )
        // if(isLoggedIn) {
        //     return (
        //         <div className="admin-container">
        //             { content }
        //         </div>
        //     )
        // } else {
        //     return (
        //         <div>Not logged in, son.</div>
        //     )
        // }
        //let { isLoggedIn } = this.context;
        //console.log(`user is logged in: ${isLoggedIn}`);
        
        //if(isLoggedIn) {
            // return (
            //     <div className="admin-container">
            //         <UserConsumer>
            //             {(isLoggedIn) => ( isLoggedIn ? content : <Redirect to="/login" /> )} 
            //         </UserConsumer>
            //     </div>
            // )
        //} else {
            // return (
            //     <Redirect to="/login" />
            // )
        //}
    }
}

export default Admin;
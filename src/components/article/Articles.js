import React from "react";
import { Link } from 'react-router-dom';

import { getArticles } from '../../utils/Requests'
import Loading from '../loading/Loading';

import './Articles.scss';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false
    };
    this._isMounted = false;
  }

  async componentDidMount() {
    this._isMounted = true;
    console.log('(Articles) did mount...');
    //this.getRecentArticles();
    console.log('(Articles) loading set to true');
   
    if(!this.state.articles.length) {      
      this.setState({ ...this.state, loading: true });      
      let articles = await getArticles(3);
      
      if(this._isMounted) {
        this.setState({ ...this.state, 'articles': articles, loading: false })
      }
      //articles.then(data => data.json())
      // .then(d => {
      //   console.log('(Articles) Loading set to false...')
      //   this.setState({'articles': d, loading: false });
      // });
    }
  }

  componentWillUnmount() {
    console.log('(Articles) is unmounting...');
    this._isMounted = false;
  }

  render() {
    if(this.state.loading) {
      console.log('(Articles) loading render...');
      return (
        <div className="article-preview-container d-flex flex-align-center flex-direction-col">
          <Loading message="Fetching articles ..." />
        </div>
      )
    } else {
      console.log('(Articles) not loading render...');
      let articles = this.state.articles.map((a) => {
        return (
          <Link className="card card-flush w-100 d-block m-2" to={ this.props.admin ? `/admin/article/${a.id}` : `/article/${a.id}` } key={ a.id }>
            <div>
              <h1 className="article-preview-title">{a.title}</h1>
              <p className="article-preview-subtitle">{a.subtitle}</p>
              <p className="article-preview-summary">{a.markup_content}</p>
              <p className="article-preview-date">{a.posted_date}</p>
              <p className="article-preview-author">{a.author}</p>
            </div>
          </Link>
        )
      });
      return (
        <div className="article-preview-container d-flex flex-align-center flex-direction-col">
          { articles }
        </div>
      )
    }
    
    //let {title, subtitle, content, posted_date, author} = props.data;
    
  }
}

export default Articles;
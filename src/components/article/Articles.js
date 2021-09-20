import React from "react";
import { Link } from 'react-router-dom';

import { getArticles } from '../../utils/Requests'
import Loading from '../loading/Loading';
import { formatDate } from '../../utils/Helpers';

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
      let articles = await getArticles(5);

      if(this._isMounted) {
        console.log(articles);
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
            <div className="article-preview">
              <div className="title-container">
                <h1 className="title">{ a.title }</h1>
                <p className="subtitle">{ a.subtitle }</p>
              </div>              
              <p className="summary">{ a.markup_content }</p>
              <div className="meta-container">
                <p className="author mb-0">{ a.author.full_name }</p>
                <p className="date mb-0">{ formatDate(a.posted_date) }</p>                
              </div>
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
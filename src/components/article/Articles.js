import React from "react";

import { getArticles } from '../../utils/Requests'

import './Articles.scss';

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: []
    };
  }

  async componentDidMount() {
    await this.getRecentArticles();
  }

  async getRecentArticles() {
    let articles = getArticles(3);
    articles.then(data => data.json())
    .then(d => {
      this.setState({'articles': d});
    });
    console.log(this.state);
  }

  render() {
    let articles = this.state.articles.map((a) => {
    let adminURL = this.props.match && this.props.match.path.includes('/admin') ? true : false;
    return (
      <a className="card w-100 d-block m-2" href={ adminURL ? `/admin/article/${a.id}` : `/article/${a.id}` } key={ a.id }>
        <div>
          <h1 className="article-preview-title">{a.title}</h1>
          <p className="article-preview-subtitle">{a.subtitle}</p>
          <p className="article-preview-summary">{a.markup_content}</p>
          <p className="article-preview-date">{a.posted_date}</p>
          <p className="article-preview-author">{a.author}</p>
        </div>
      </a>
    )
    });
    //let {title, subtitle, content, posted_date, author} = props.data;
    return (
      <div className="article-preview-container d-flex flex-align-center flex-direction-col">
        { articles }
      </div>
    )
  }
}

export default Articles;
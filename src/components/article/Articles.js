import React from "react";

import { getArticles } from '../../utils/Requests'

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
      <div className="article_preview" key={a.id}>
          <p>({a.id}) {a.title}</p>
          <p>{a.subtitle}</p>
          <p>{a.markup_content}</p>
          <p>{a.posted_date}</p>
          <p>{a.author}</p>
          <p>
            <a href={ adminURL ? `/admin/article/${a.id}` : `/article/${a.id}` }>Go to Article</a>
          </p>
      </div>
    )
    });
    //let {title, subtitle, content, posted_date, author} = props.data;
    return (
      <div className="article_previews">
        { articles }
      </div>
    )
  }
}

export default Articles;
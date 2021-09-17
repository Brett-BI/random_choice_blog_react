import React from 'react';

import { getArticle } from '../../utils/Requests';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {}
        };
    }

    async componentDidMount() {
        console.log(`article id is: ${this.props.match.params.article_id}`);
        console.log(this.props);
        this.getArticleData(this.props.match.params.article_id);
    }

    async getArticleData(article_id) {
        let article = getArticle(article_id);
        article.then(data => data.json())
        .then(d => {
            this.setState({'article': d})
        });
    }

    render () {
        return (
            <div className="d-flex flex-center m-2">
                <div className="w-50">
                    <h1 className="article_title">{this.state.article.title}</h1>
                    <p className="article_subtitle">{this.state.article.subtitle}</p>
                    <p>{this.state.article.markup_content}</p>
                    <p>{this.state.article.posted_date}</p>
                    <p>{this.state.article.author}</p>
                    <p>{this.state.article.id}</p>
                </div>
            </div>
        )
    }
}

export default Article;
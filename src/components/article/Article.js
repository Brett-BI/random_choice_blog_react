import React from 'react';
import MarkdownIt from 'markdown-it';

import { getArticle } from '../../utils/Requests';

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {}
        };
        this._isMounted = false;
        this.convertMarkdown = this.convertMarkdown.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        console.log(`article id is: ${this.props.match.params.article_id}`);
        console.log(this.props);
        this.getArticleData(this.props.match.params.article_id);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getArticleData(article_id) {
        let article = getArticle(article_id);
        article.then(data => data.json())
        .then(d => {
            console.log(d);
            if(this._isMounted) {
                this.setState({'article': d})
            }
        });
    }

    convertMarkdown(markdownContent) {
        let md = MarkdownIt()
        let htmlRender = md.render(markdownContent);

        return htmlRender;
    }

    render () {
        if(Object.keys(this.state.article).length) {
            return (
                <div className="d-flex flex-center m-2">
                    <div className="card-no-hover w-75 p-3">
                        <h1 className="article_title">{this.state.article.title}</h1>
                        <p className="article_subtitle">{this.state.article.subtitle}</p>
                        <p dangerouslySetInnerHTML={{ __html: this.convertMarkdown(this.state.article.markup_content) }}></p>
                        <p>{this.state.article.posted_date}</p>
                        <p>{this.state.article.author.full_name}</p>
                        <p>{this.state.article.id}</p>
                    </div>
                </div>
            )
        } else {
            return (
                <div>LOADING...</div>
            )
        }
    }
}

export default Article;
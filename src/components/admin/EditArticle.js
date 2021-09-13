import React from 'react';

import { getArticle, patchArticle } from '../../utils/Requests';

class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: '',
                subtitle: '',
                content: '',
                posted_date: '',
                author: '',
                id: ''
            }
        };
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubtitleChange = this.handleSubtitleChange.bind(this);
        this.handleContentChange = this.handleTitleChange.bind(this);
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

    onSubmitHandler(e) {
        e.preventDefault();
        console.log('submitted form...');
        // fetch -> post(this.state.article)
        let _article = {
            title: this.state.article.title,
            subtitle: this.state.article.subtitle,
            markup_content: this.state.article.markup_content,
            author: this.state.article.author,
            id: this.state.article.id
        };
        let patchedArticle = patchArticle(_article);
        patchedArticle.then(data => data.json())
        .then(d => {
            console.log('posted the article, boss');
            console.log(d);
            this.props.history.push('/admin');
        })
    }

    handleTitleChange(e) {
        console.log(`changed title to: ${e.target.value}`);
        this.setState({article: {...this.state.article, 'title': e.target.value}});
        console.log(this.state);
    }

    handleSubtitleChange(e) {
        console.log(`changed subtitle to: ${e.target.value}`);
        this.setState({article: {...this.state.article, 'subtitle': e.target.value}});
        console.log(this.state);
    }

    handleContentChange(e) {
        console.log(`changed content to: ${e.target.value}`);
        this.setState({article: {...this.state.article, 'content': e.target.value}});
        console.log(this.state);
    }

    render() {
        let a = this.state.article;
        let { path, url } = this.props.match;
        console.log(this.props.match);
        console.log(`path is: ${path}`);
        console.log(`url is: ${url}`);
        console.log(`building: ${url}/article/:article_id OR ${url}`);
        console.log(`also building: admin/article/:article_id OR admin/`);
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <label>title</label>
                    <input name="title" value={a.title} onChange={ this.handleTitleChange } />

                    <label>subtitle</label>
                    <input name="subtitle" value={a.subtitle} onChange={ this.handleSubtitleChange } />

                    <label>content</label>
                    <textarea name="content" defaultValue={a.markup_content} onChange={ this.handleContentChange } />

                    <input type="hidden" name="author" value={a.author} />
                    <input type="hidden" name="id" value={a.id} />

                    <button type="submit">Update</button>
                </form>
            </div>
        )
    }
}

export default EditArticle;
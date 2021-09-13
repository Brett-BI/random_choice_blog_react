import React from 'react';

import { postArticle } from '../../utils/Requests';

class EditArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {
                title: '',
                subtitle: '',
                content: '',
                posted_date: '',
                author: '1',
                id: ''
            }
        };
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleSubtitleChange = this.handleSubtitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
    }

    async componentDidMount() {
    }

    onSubmitHandler(e) {
        e.preventDefault();
        console.log('submitted form...');
        // fetch -> post(this.state.article)
        let _article = {
            title: this.state.article.title,
            subtitle: this.state.article.subtitle,
            markup_content: this.state.article.markup_content,
            author: this.state.article.author
        };
        console.log(_article);
        let postedArticle = postArticle(_article);
        postedArticle.then(data => data.json())
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
        this.setState({article: {...this.state.article, 'markup_content': e.target.value}});
        console.log(this.state);
    }

    render() {
        let a = this.state.article;
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <label>title</label>
                    <input name="title" value={ a.title } onChange={ this.handleTitleChange } />

                    <label>subtitle</label>
                    <input name="subtitle" value={ a.subtitle } onChange={ this.handleSubtitleChange } />

                    <label>content</label>
                    <textarea name="content" value={ a.markup_content } onChange={ this.handleContentChange } />

                    <input type="hidden" value={ a.author } name="author" />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default EditArticle;
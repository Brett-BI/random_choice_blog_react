async function getArticle(article_id) {
    return fetch(`http://127.0.0.1:8000/article/${article_id}`, {
        method: 'GET'
    });
}

async function getArticles(count) {
    return fetch(`http://127.0.0.1:8000/article/latest?count=${count}`, {
        method: 'GET'
    });
    //.then(res => res.json());
}

async function patchArticle(article) {
    console.log(article);
    return fetch(`http://127.0.0.1:8000/article/${article.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    });
}

async function postArticle(article) {
    return fetch(`http://127.0.0.1:8000/article/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(article)
    });
}

export { getArticle, getArticles, patchArticle, postArticle };
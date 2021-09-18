async function getArticle(article_id) {
    return fetch(`http://127.0.0.1:8000/article/${article_id}`, {
        method: 'GET'
    });
}

async function getArticles(count) {
    return fetch(`http://127.0.0.1:8000/article/latest?count=${count}`, {
        method: 'GET'
    })
    .then(res => res.json());
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

async function getToken(user) {
    console.log('Getting a token...');
    return fetch(`http://127.0.0.1:8000/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(
            `grant_type=&username=${user.username}&password=${user.password}&scope=&client_id=&client_secret=`
        )
    })
}

export { getArticle, getArticles, getToken, patchArticle, postArticle };
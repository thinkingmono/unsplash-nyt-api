/* eslint-env jquery */

(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        fecthImages();
        fetchArticles();
    });

    function fecthImages() {
        $.ajax({
            url: `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
            headers: {
                Authorization: 'Client-ID brTTS3FYgel65kX3IE_5Lq0wmqsmLVNyLeXuAmq9lrI'
            }
        }).done(addImage);
    }

    function addImage(images) {
        let imgsResult = '';

        if (images && images.results && images.results[0]) {
            const firstImage = images.results[0];
            imgsResult = `<figure>
                <img src="${firstImage.urls.regular}" alt="${firstImage.alt_description}" />
                <figcaption>${firstImage.alt_description} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            imgsResult = `<div class="error-no-image">No Images Available</div>`;
        }

        responseContainer.insertAdjacentHTML("afterbegin", imgsResult);
    }

    function fetchArticles() {
        $.ajax({
            url: `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=BnmHgSt0QNQJsOGjWD0ykPMR4vd8LQ3a`,
        }).done(addArticles);
    }

    function addArticles(articles) {
        let articlesResult = '';

        if (articles.response && articles.response.docs && articles.response.docs.length > 1) {
            articlesResult = '<ul>'+articles.response.docs.map(article =>
               `<li class="article">
                    <h2><a href="${article.web_url}" target="_blank">${article.headline.main}</a></h2>
                    <p>${article.snippet}</p>
                </li>`
            ).join('') + '</ul>';
        } else {
            articlesResult = `<div class="error-no-article">No Articles Available</div>`;
        }

        responseContainer.insertAdjacentHTML("beforeend", articlesResult);
    }
})();

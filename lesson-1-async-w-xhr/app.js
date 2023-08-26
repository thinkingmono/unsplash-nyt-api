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
        /*Request*/
        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID brTTS3FYgel65kX3IE_5Lq0wmqsmLVNyLeXuAmq9lrI');
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = handleError;
        unsplashRequest.send()
    }

    function addImage() {
        let imgsResult = '';
        const data = JSON.parse(this.responseText);
        console.log(data);

        if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];
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
        const articleRequest = new XMLHttpRequest();
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=BnmHgSt0QNQJsOGjWD0ykPMR4vd8LQ3a`);
        // articleRequest.setRequestHeader('Authorization', 'Client-ID BnmHgSt0QNQJsOGjWD0ykPMR4vd8LQ3a');
        articleRequest.onload = addArticles;
        articleRequest.send();
    }

    function addArticles() {
        let articlesResult = '';
        const data = JSON.parse(this.responseText);
        console.log(data);

        if (data.response && data.response.docs && data.response.docs.length > 1) {
            console.log('Debería renderizar');
            articlesResult = '<ul>'+data.response.docs.map(article =>
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

    function handleError() {
        console.log('An error ocurred 😒');
    }

})();



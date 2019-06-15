'use strict';
import youtubeService from './services/youtube-service.js';
import wikiService from './services/wiki-service.js';

document.body.onload = onInit;


function onInit() {
    document.querySelector('.search-btn').onclick = onSearchTermSub;
}

function onSearchTermSub() {
    const subSearchTermVal = document.querySelector('.search-term-input').value;
    let prmYoutubeRes = youtubeService.getSearchItems(subSearchTermVal);
    let prmWikiRes = wikiService.getWiki(subSearchTermVal);
    prmYoutubeRes.then(res => {
            let listOfItems = res;
            handleYoutubeSearchItems(listOfItems);
        })
        .catch(res => console.log('Error, couldn\'t get search items', res))
    prmWikiRes.then(res => {
        let titles = res[1];
        let descriptions = res[2];
        let links = res[3];
        handleWikiSearchItems(titles, descriptions, links)
    })
}

function handleWikiSearchItems(titles, descriptions, links) {
    const elWikiItemsContainer = document.querySelector('.search-wiki-items');
    let strHTML = [];
    for (let i = 0; i < titles.length; i++) {
        let strItem = `
        <div class="wiki-container">
                <h3 class="wiki-title">${titles[i]}</h3>
                <p class="wiki-desc">${descriptions[i]}</p>
                <a href="${links[i]}">${links[i]}</a>
        </div>`
        strHTML.push(strItem);
    }
    elWikiItemsContainer.innerHTML = strHTML.join('');
}

function handleYoutubeSearchItems (searchItems) {
    const main = document.querySelector('main');
    const strHTML = searchItems.map(item => {
        let videoId = item.id.videoId;
        let itemThumbnailUrl = item.snippet.thumbnails.medium.url;
        let itemTitle = item.snippet.title;
        return `
        <section class="video-wiki-container" data-videoid="${videoId}">
            <img src="${itemThumbnailUrl}" />
            <div class="text-wrapper">
                    <h4>${itemTitle}</h4>
            </div>
        </section>`
    })
    main.innerHTML = strHTML.join('');
    let items = document.querySelectorAll('.video-wiki-container');
    for (let i =0; i < items.length; i++) {
        items[i].onclick = () => {
            let videoId = items[i].dataset.videoid;
            onOpenModal(videoId);
        };
    }
}

function onOpenModal (videoId) {
    let elIframeContainer = document.querySelector('.video-wiki-modal div');
    let strHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" 
    frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; 
    picture-in-picture" allowfullscreen></iframe>`
    elIframeContainer.innerHTML = strHTML;
    document.querySelector('.video-wiki-modal').classList.add('shown');
}
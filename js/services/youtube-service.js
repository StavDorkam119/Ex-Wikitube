'use strict';

let gSearchItems = [];

const API_KEY = 'AIzaSyB615GG8cDYiOwBb-Gf-gySU3KCtiHgk7Q';

function getSearchItems (searchTerm) {
    const searchURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API_KEY}&q=${searchTerm}&maxResults=20`
    return axios.get(searchURL).then(res => {
        gSearchItems = res.data.items;
        return res.data.items
        });
}

export default {
    getSearchItems,
}
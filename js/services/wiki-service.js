
export default {
    getWiki
}

function getWiki (searchTerm) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchTerm}`)
        .then(res => res.data);
}
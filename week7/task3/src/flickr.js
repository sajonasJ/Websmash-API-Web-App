import $ from "jquery";
import query from "./css/query.css";
import styles from "./css/style.css";
import img1 from "./assets/beach.JPG"
import * as app from "./app.js";
import * as view from "./view.js"

// Global Variables
let photos = [];
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&api_key=' + API_KEY;
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';
let mrequest = 0;
let mrecieved = 0;
let ready_cb;
// Start - initialisation


export function getInteresting(ready) {
    ready_cb = ready;
    fetch(INTRSTNG)
        .then(response => response.json())
        .then(data => fetchPhoto(data))
        .catch(error => alert(error));
}
// convert photoID and caption into URL
 function fetchPhoto(data) {
    mrequest = data.photos.photo.length;
    for (let i = 0; i < mrequest; i++) {
        const photoObj = { id: data.photos.photo[i].id, title: data.photos.photo[i].title };
        photos.push(photoObj);
        getSizes(photoObj);
    }
}

// get sizes for the photo and run display
function getSizes(photoObj) {
    let getSizeReq = GETSIZES + photoObj.id;
    mrecieved = 0;
    $.get(getSizeReq, function (data) {
        mrecieved++;
        photoObj.file = data.sizes.size[3].source;
        photoObj.full = data.sizes.size[data.sizes.size.length - 1].source;
        if (mrequest === mrecieved) {
            ready_cb(photos);
        }
    });
}

export function search_handler() {
    let input = $('#search-input').val();
    photos = []
    let searchapi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${input}&per_page=10&format=json&nojsoncallback=1`;
    fetch(searchapi).then(function (response) {
        return response.json();
    }).then(function (data) {
        fetchPhoto(data);

    }).catch(function (error) {
        alert(error);

    });
}
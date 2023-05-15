import $ from "jquery";
import query from "./css/query.css";
import styles from "./css/style.css";
import img1 from "./assets/beach.JPG"
import * as flickr from "./flickr.js";
import * as view from "./view.js";
import * as fb from "./fb.js"

// Jquery Ready
$(function () {
    fb.fb_bootstrap();
    view.insertHtml();
    flickr.getInteresting(flickrReady);
    $('#modal-close').on("click",function () {
        $('#modal-container').hide();
    });
    $('#search-btn').on("click",flickr.search_handler);
});
function flickrReady(photos) {
    view.display(photos);
}

export function callHtml(){
    view.insertHtml();
}
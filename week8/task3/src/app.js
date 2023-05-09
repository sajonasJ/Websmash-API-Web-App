import $ from "jquery";
import query from "./css/query.css";
import styles from "./css/style.css";
import img1 from "./assets/beach.JPG"
import * as flickr from "./flickr.js";
import * as view from "./view.js";

// Jquery Ready
$(function () {
    view.insertHtml();
    flickr.getInteresting(flickrReady);
    $('#modal-close').click(function () {
        $('#modal-container').hide();
    });
    $('#search-btn').click(flickr.search_handler);
});
function flickrReady(photos) {
    view.display(photos);
}
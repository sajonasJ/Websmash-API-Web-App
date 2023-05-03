import $ from "jquery";
import styles from "./css/styles.css";
import img1 from "./assets/cityview.JPG"
$(function () {
insertHtml();
});

const insertHtml = () => {
    $('#head').html("Hello Webpack"),
    $('#body').html("I'm the body"),
    $('#body').html(`<img src=${img1}>`),
    $('#legs').html("I'm the legs")
};
import $ from "jquery";
import img1 from "./assets/beach.JPG";
import query from "./css/query.css";
import styles from "./css/style.css";

export const insertHtml = () => {
    $('header').html(`
        <h1>My Outstanding Photo Album</h1>
        <button id="btn" type="button" class="log">Login</button>
    `);
    $('footer').html("<h3>by @Jonas Sajonas</h3>");
    $('#nav-container').html(`
        <h2>Categories:</h2>
        <a class="cat" href="">Cities</a>
        <a class="cat" href="">Beaches</a>
        <a class="cat" href="">Downtown</a>
        <a class="cat" href="">Amusements</a>
        <a class="cat" href="">Parks</a>
        <img src=${img1}>
    `);
};

export function display(data) {
    const htmlArr = data.map(photo => `
        <figure class="scenery" data-text="${photo.title}" data-full="${photo.full}">
            <img src="${photo.file}" alt="${photo.title}" />
            <figcaption>${photo.title}</figcaption>
        </figure>
    `);
    const htmlStr = htmlArr.join('');
    $('#thumbnails').html(htmlStr);

    getModal();
};

export function getModal() {
    $('figure').each(function (index) {
        $(this).click(function () {
            $('#modal-container').css('display', 'flex');
            $('#modal-content').attr('src', '');
            $('#modal-content').attr('src', $(this).attr('data-full'));
            $('#modal-caption').text($(this).attr('data-text'));
        });
    });
}
import $ from "jquery";
import img1 from "./assets/beach.JPG";
import query from "./css/query.css";
import styles from "./css/style.css";
import catergory from "./templates/category.handlebars";
import hello from "./templates/hello.handlebars";
import thumbnail from "./templates/thumbnail.handlebars";
let name = { loggedin: true, first: "Anonymous", last: "User" };                                         //handlebar data
let temp = hello(name);//handlebar variable
let location = {
    title: "Categories:",
    location: [
        "Cities",
        "Beaches",
        "Downtown",
        "Amusements",
        "Parks"
    ]
};

let tempLocate = catergory(location);

export const insertHtml = () => {
    $('header').html(
        `<h1>My Outstanding Photo Album</h1>
        <button id="btn" type="button" class="log">Login</button>`
    );
    $('#hello').html(temp);                                                              //Handlebars if statement
    $('footer').html("<h3>by @Jonas Sajonas</h3>");
    $('#nav-container').html(tempLocate);                                                //handlebar each block location
};

export function display(data){
    const htmlStr = thumbnail({photos:data})
    $('#thumbnails').html(htmlStr);
    getModal();
}

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
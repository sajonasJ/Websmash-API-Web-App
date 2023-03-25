// Global Variables
let figure;
let isCaption = false;
// Start - initialisation
$(function () {
    $('#thumbnails').hide();
    $.get('/week3/data/photodata.json', function (data) {
        display(data);
        repeat(data)
        $('#thumbnails').show(500);
    });
  
    $('#search-btn').click(search_handler);
});
function repeat(photodata){
    figure = `<figure><a href="${photodata.photos[0].file}">
    <img src="${photodata.photos[0].file}" alt="${photodata.photos[0].alternate}"/>
    <figcaption>${photodata.photos[0].title}</figcaption></figure>`;
}

function display(photodata) {
    let htmlStr = "";
    for (let i = 0; i < photodata.photos.length; i++) {
        htmlStr += `<figure class="scenery"><a href="${photodata.photos[i].file}">
        <img src="${photodata.photos[i].file}" alt="${photodata.photos[i].alternate}"/>
        <figcaption>${photodata.photos[i].title}</figcaption></figure>`
    }
    $('#thumbnails').html(htmlStr);

}

// search functions
function search_handler() {
    let input = $('#search-input').val();
    let htmlStr = ''

    if (isNaN(input) && isCaption == false) {
        let cat_item = `<a class="cat" href="">${input}</a>`;
        $('#nav-container').append(cat_item);

    } else {
        for (let i = 0; i < input; i++) {
            htmlStr += figure;
        }
        $('#thumbnails').html(htmlStr);
    }
}
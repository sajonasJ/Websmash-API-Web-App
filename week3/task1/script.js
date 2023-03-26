// Boiler plater for using search event handlers

// Global Variables
let figure;
let isCaption = false;
// Start - initialisation
$(function () {
    figure = $("figure").html();
    $('#search-btn').click(search_handler);
});
// search functions
function search_handler() {
    let input = $('#search-input').val();
    let htmlStr = ''

    if (isNaN(input) && isCaption == false) {
        let cat_item = `<a class="cat" href="">${input}</a>`;
        $('#nav-container').append(cat_item);

    } else {
        for (let i = 0; i < input; i++) {
            htmlStr += `<figure>${figure}</figure>`;
        }
        $('#thumbnails').html(htmlStr);
    }
}
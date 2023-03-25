// This boiler plate is using fetch to get some data from a meme website and generates
// a random number per iteration. extra non-functioning code was removed.

// Global Variables
const SOMEURL = 'https://api.imgflip.com/get_memes';
// let image_num = 10;
let image_num = Math.floor(Math.random() * 20) + 10;
// Start - initialisation

// fetch
fetch(SOMEURL).then(function (response) {
    return response.json();
}).then(function (data) {
    display(data);
}).catch(function (error) {
    alert(error);
});

// Jquery Ready
$(function () {
    
});

// Display data
function display(data) {
    let htmlStr = "";
    let memeLength = data.data.memes.length;
    for (let i = 0; i < image_num; i++) {
        random_num = Math.floor(Math.random() * memeLength);
        htmlStr += `<figure class="scenery">
            <img src="${data.data.memes[random_num].url}" 
            alt="${data.data.memes[random_num].name}"/>
            <figcaption>${data.data.memes[random_num].name}</figcaption></figure>`
    }

    // display images
    $('#thumbnails').html(htmlStr);
}

// Global Variables
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=20&format=json&nojsoncallback=1&api_key=' + API_KEY;
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';
// Start - initialisation

// fetch
fetch(INTRSTNG).then(function (response) {
    return response.json();
}).then(function (data) {
    fetchPhoto(data);
    // }).catch(function (error) {
    //     alert(error);
});

// Jquery Ready
$(function () {
});

// convert photoID into URL
function fetchPhoto(data) {
    let photoID = data.photos.photo[0].id;
    let photoCap= data.photos.photo[0].title;
    getSizes(photoID, photoCap);
}

function getSizes(photoID,photoCap) {
    let getSizeReq = GETSIZES + photoID;
    $.get(getSizeReq, function (data) {
        let photoURL = data.sizes.size[10].source;
        let photoTitle = photoCap;
        let photoArr = [{ 'file': photoURL, 'title': photoTitle }];
        display(photoArr);
    });
}



function display(data) {
    let htmlStr = "";
    for (let i = 0; i < data.length; i++) {
        htmlStr += `<figure class="scenery">
        <img src="${data[i].file}" alt="${data[i].file}"/>
        <figcaption>${data[i].title}</figcaption></figure>`
    };
    $('#thumbnails').html(htmlStr);
}




















// Display data
// function display(data) {
//     let htmlStr = "";
//     let memeLength = data.data.memes.length;
//     for (let i = 0; i < image_num; i++) {
//         htmlStr += `<figure class="scenery">
//             <img src="${data.data.memes[i].url}"
//             alt="${data.data.memes[i].name}"/>
//             <figcaption>${data.data.memes[i].name}</figcaption></figure>`
//     }
//     // display images
//     $('#thumbnails').html(htmlStr);
// }
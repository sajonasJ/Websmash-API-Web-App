// This boiler plate is using fetch to get some data from a meme website and generates
// a random number per iteration. extra non-functioning code was removed. USING FOREACH

// Global Variables
const SOMEURL = 'https://api.imgflip.com/get_memes';
let image_num = 10;
// Start - initialisation

// fetch
fetch(SOMEURL).then(function (response) {
    return response.json();
}).then(function (data) {
    display(data);
    // }).catch(function (error) {
    //     alert(error);
});

// Jquery Ready
$(function () {
});



function display(data) {
    let htmlStr = "";
    let memeLength = data.data.memes;
// math random generates the random number, math floor makes sure that the number is an integer and multiplied by 2 then the sort function arranges
// the memes according to the new numbers generated
    memeLength.sort(function() {
        console.log(Math.floor(Math.random()*2));
        return Math.floor(Math.random()*2);
      });

    memeLength.forEach(function (memeLength) {
        htmlStr += `<figure class="scenery">
        <img src="${memeLength.url}" alt="${memeLength.name}"/>
        <figcaption>${memeLength.name}</figcaption></figure>`
    });
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
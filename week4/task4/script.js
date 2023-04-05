// Global Variables
let photos = [];
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&api_key=' + API_KEY;
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';
let mrequest = 0;
let mrecieved = 0;
// Start - initialisation

// fetch
fetch(INTRSTNG).then(function (response) {
    return response.json();
}).then(function (data) {
    fetchPhoto(data);
}).catch(function (error) {
    alert(error);
});

// Jquery Ready
$(function () {
    $('#modal-close').click(function(){
        $('#modal-container').css('display','none');
    })
});

// convert photoID and caption into URL
function fetchPhoto(data) {
    mrequest = data.photos.photo.length;
    for (let i = 0; i < mrequest; i++) {
        let photoObj = { 'id': data.photos.photo[i].id, 'title': data.photos.photo[i].title };
        photos.push(photoObj);
        getSizes(photoObj);
    }
}
// get sizes for the photo and run display
function getSizes(photoObj) {
    let getSizeReq = GETSIZES + photoObj.id;
    $.get(getSizeReq, function (data) {
        mrecieved++;
        photoObj.file = data.sizes.size[3].source;
        photoObj.full = data.sizes.size[data.sizes.size.length - 1].source;
        if (mrequest === mrecieved) {
            display(photos);
        }
        console.log(mrecieved);
    });
}
// display data
function display(data) {
    let htmlStr = "";
    for (let i = 0; i < data.length; i++) {
        htmlStr += `<figure class="scenery" data-full="${data[i].full}">
        <img src="${data[i].file}" alt="${data[i].title}"/>
        <figcaption>${data[i].title}</figcaption></figure>`
    };
    $('#thumbnails').html(htmlStr);
    $('figure').each(function(index){
        $(this).click(function(){
            $('#modal-container').css('display','flex');
            $('#modal-content').attr('src',"");
            $('#modal-content').attr('src',$(this).attr('data-full'));
        });
    });
}


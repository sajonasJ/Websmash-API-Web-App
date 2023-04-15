// boiler plate for the modal and event function with captions

// Global Variables
let photos = [];
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&api_key=' + API_KEY;
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';
let mrequest = 0;
let mrecieved = 0;
// Start - initialisation


// Jquery Ready
$(function () {
    $('#modal-close').click(function () {
        $('#modal-container').css('display', 'none');
    })

    fetch(INTRSTNG).then(function (response) {
        return response.json();
    }).then(function (data) {
        fetchPhoto(data);
    }).catch(function (error) {
        alert(error);
    });

    $('#search-btn').click(search_handler);
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
    mrecieved = 0;
    $.get(getSizeReq, function (data) {
        mrecieved++;
        photoObj.file = data.sizes.size[3].source;
        photoObj.full = data.sizes.size[data.sizes.size.length - 1].source;
        if (mrequest === mrecieved) {
            display(photos);
        }
    });
}
// display data
function display(data) {
    let htmlStr = "";
    for (let i = 0; i < data.length; i++) {
        htmlStr += `<figure class="scenery" data-text="${data[i].title}" data-full="${data[i].full}">
        <img src="${data[i].file}" alt="${data[i].title}"/>
        <figcaption>${data[i].title}</figcaption></figure>`
    };
    $('#thumbnails').html(htmlStr);
    // event handler for clicking the modal
    $('figure').each(function (index) {
        $(this).click(function () {
            $('#modal-container').css('display', 'flex');
            $('#modal-content').attr('src', "");
            $('#modal-content').attr('src', $(this).attr('data-full'));
            $('#modal-caption').text($(this).attr('data-text'));
        });
    });
}

function search_handler() {
    let input = $('#search-input').val();
    photos = []
    let searchapi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${input}&per_page=10&format=json&nojsoncallback=1`;
    console.log(input);
    fetch(searchapi).then(function (response) {
        return response.json();
    }).then(function (data) {
        fetchPhoto(data);
        console.log(data)

    }).catch(function (error) {
        alert(error);

    });
}

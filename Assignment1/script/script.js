// Global Variables
let photos = [];
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&api_key=' + API_KEY;
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';
let mrequest = 0;
let mrecieved = 0;
// Start - initialisation
$(function () {
    $.get('../json/imgdata.json', function (jsonData) {
        //TODO GET JSON DATA
        getDestination(jsonData);
    });


    $('#modal-close').click(function () {
        //TODO SET MODAL TO NONE
        $('#modal-container').css('display', 'none');
    })


    fetch(INTRSTNG).then(function (response) {
        //TODO FETCH FLICKR API
        return response.json();
    }).then(function (data) {
        fetchPhoto(data);
    }).catch(function (error) {
        alert(error);
    });
});

function fetchPhoto(data) {
    //TODO CONVERT RETURNED API DATA TO USABLE OBJECT
    mrequest = data.photos.photo.length;
    for (let i = 0; i < mrequest; i++) {
        let photoObj = { 'id': data.photos.photo[i].id, 'title': data.photos.photo[i].title };
        photos.push(photoObj);
        getSizes(photoObj);
    }
}

function getSizes(photoObj) {
    // TODO USE THE DATA OBJECT AND GET SIZES FROM API
    let getSizeReq = GETSIZES + photoObj.id;
    mrecieved = 0;
    $.get(getSizeReq, function (data) {
        // TODO THIS IS INSIDE A FOR LOOP FROM fetchphoto
        mrecieved++;
        photoObj.file = data.sizes.size[5].source;
        photoObj.full = data.sizes.size[data.sizes.size.length - 1].source;
        if (mrequest === mrecieved) {
            // TODO IT COUNTS ITERATION BEFORE DISPLAYING PHOTO
            display(photos);
        }
    });
}

function getDestination(data) {
    //TODO DISPLAY NAVIGATION IMG LINKS
    let desStr = "";
    let dest = data.destination;
    for (let i = 0; i < dest.length; i++) {
        desStr += `<li><a href="${"#"}"><figure id ="fig-id"><img id="nav-img" src="${dest[i].file}" alt="${dest[i].alt}"> 
        <figcaption id="fig-links">${dest[i].name}</figcaption></figure></a></li>`
    }
    $('#destination-list').html(desStr);
}
function display(data) {
    let htmlStr = "";
    for (let i = 0; i < data.length; i++) {
        htmlStr += `<figure class="scenery" data-text="${data[i].title}" data-full="${data[i].full}">
        <img id="api-img" src="${data[i].file}" alt="${data[i].title}"/>
        <figcaption id ="fig-pic">${data[i].title}</figcaption></figure>`
    };

    $('#thumbnail-container').html(htmlStr);

    $('.scenery').each(function (index) {
        //TODO event handler for clicking the modal, used for each loop to pass modal properties
        $(this).click(function () {
            $('#modal-container').css('display', 'flex');
            $('#modal-content').attr('src', "");
            $('#modal-content').attr('src', $(this).attr('data-full'));
            $('#modal-caption').text($(this).attr('data-text'));
        });
    });
}
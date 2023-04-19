// Global Variables
let photos = [];
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';

let messageLength = 0;
let messageRecieved = 0;
// Start - initialisation
$(() => {
    $.get('../json/imgdata.json', (jsonData) => {
        //TODO GET JSON DATA
        getDestination(jsonData);
    });
    $('#modal-close').click(() => {
        //TODO SET MODAL TO NONE
        $('#modal-container').css('display', 'none');
    })
});

function fetchPhoto(data) {
    //TODO CONVERT RETURNED API DATA TO USABLE OBJECT
    messageLength = data.photos.photo.length;
    let photo = data.photos.photo
    photo.forEach((photo) => {
        // TODO SPLIT PHOTODATE
        let photoDate = photo.datetaken.split(' ')
        let photoObject = { 'id': photo.id, 'title': photo.title, 'date': photoDate[0] };
        photos.push(photoObject);
        getSizes(photoObject);
    });
}

function getSizes(photoObj) {
    // TODO USE THE DATA OBJECT AND GET SIZES FROM API
    let getSizeReq = GETSIZES + photoObj.id;
    messageRecieved = 0;
    $.get(getSizeReq, (data) => {
        // TODO THIS IS INSIDE A FOR LOOP FROM fetchphoto counter to check if all photos can be displayed
        messageRecieved++;
        const XL = data.sizes.size.length - 1;
        const MEDIUM = 5;
        photoObj.file = data.sizes.size[MEDIUM].source;
        photoObj.full = data.sizes.size[XL].source;
        if (messageLength === messageRecieved) {
            // TODO IT COUNTS ITERATION BEFORE DISPLAYING PHOTO
            // !Display photos
            showImage(photos);
        }
    });
}

function getDestination(data) {
    //TODO DISPLAY NAVIGATION IMG LINKS
    let displayList = "";
    let destination = data.destination;
    destination.forEach((destination) => {
        // TODO APPEND TO DISPLAYLIST THE JSON FILEOBJECT
        displayList += `<li><figure><img class="nav-img" data-url="${destination.url}" src="${destination.file}" alt="${destination.alt}">
        <figcaption class="fig-links">${destination.name}</figcaption></figure></li>`;
      });
    $('#destination-list').html(displayList);

    $('.nav-img').each(function () {
        $(this).click(()=> {
            // TODO CLICK EVENT FOR EACH IMAGELINKS, REMOVE VIDEO, RESET ARRAY, PASS URL OF API TO FETCH
            $('#video').remove();
            photos = []
            let urLink = $(this).data('url')
            fetch(urLink).then((response)=> {
                return response.json();
            }).then((data)=> {
                fetchPhoto(data);
            }).catch( (error)=> {
                alert(error);
            });
        });
    });
}

function showImage(data) {
    // TODO DISPLAY PHOTOS ADD IMAGE DATA,MED SIZE AND FULL SIZE, TITLE AND DATE
    let displayImage = "";
    data.forEach((data) => {
        // TODO PASS FETCHED API DATA TO DISPLAY PHOTOS
        displayImage += `<figure class="scenery" data-text="${data.title}" data-full="${data.full}">
        <img id="api-img" src="${data.file}" alt="${data.title}"/>
        <figcaption id ="fig-pic">${data.title} Date taken: ${data.date}</figcaption></figure>`
    });
    $('#thumbnail-container').html(displayImage);

    $('.scenery').each(function () {
        //TODO event handler for clicking the modal, used for each loop to pass modal properties
        $(this).click(() => {
            $('#modal-container').css('display', 'flex');
            $('#modal-content').attr('src', "");
            $('#modal-content').attr('src', $(this).attr('data-full'));
            $('#modal-caption').text($(this).attr('data-text'));
        });
    });
}

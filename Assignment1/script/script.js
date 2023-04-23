// Global Variables
let photos = [];
let recentlyViewed = [];
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
        const THUMB = 1;
        const XL = data.sizes.size.length - 1;
        const MEDIUM = 5;
        photoObj.thumb = data.sizes.size[THUMB].source
        photoObj.file = data.sizes.size[MEDIUM].source;
        photoObj.full = data.sizes.size[XL].source;
        if (messageLength === messageRecieved) {
            // TODO IT COUNTS ITERATION BEFORE DISPLAYING PHOTO
            showImage(photos);
        }
    });
}

function getDestination(data) {
    //TODO DISPLAY NAVIGATION IMG LINKS
    let displayList = "";
    let burgerDisplay = "";
    let destination = data.destination;
    destination.forEach((destination) => {
        // TODO APPEND TO DISPLAYLIST THE JSON FILEOBJECT
        displayList += `<li><figure class = destination-figure><img class="nav-img" data-url="${destination.url}" src="${destination.file}" alt="${destination.alt}">
        <figcaption class="nav-caption">${destination.name}</figcaption></figure></li>`;
        burgerDisplay += `<li><h3 data-url="${destination.url}" src="${destination.file}" >${destination.name}</h3></li>`;
    });
    $('#destination-list').html(displayList);
    $('#burger-list').html(burgerDisplay);

    $('.nav-img').each(function () {
        $(this).click(clickDestinations);
    });
    $('h3').each(function () {
        $(this).click(clickDestinations);
    });

}

// TODO CLICK EVENT FOR EACH IMAGELINKS, REMOVE VIDEO, RESET ARRAY, PASS URL OF API TO FETCH
$('.sidenav').click(clickDestinations);
function clickDestinations() {
    $('#video').remove();
    photos = []
    let urLink = $(this).data('url')
    fetch(urLink).then((response) => {
        return response.json();
    }).then((data) => {
        fetchPhoto(data);
    }).catch((error) => {
        alert(error);
    });
}

function showImage(data) {
    // TODO DISPLAY PHOTOS ADD IMAGE DATA,MED SIZE AND FULL SIZE, TITLE AND DATE
    let displayImages = '<div class="grid row">';
    let column = 1;
    data.forEach((item) => {
        // TODO PASS FETCHED API DATA TO DISPLAY PHOTOS
        displayImages += `
        <figure class="thumbnail" data-src="${item.file}" data-date="${item.date}" data-text="${item.title}" data-thumb="${item.thumb}" data-full="${item.full}">
           <div class ="div-img"> <img class="thumbnail-img" class="column" src="${item.file}" alt="${item.title}"/></div>
            <figcaption id ="thumbnail-caption">"${item.title}"</figcaption>
        </figure>`;
        if (column % 4 === 0) {
            displayImages += '</div><div class="grid row">';
        }
        column++;
    });

    displayImages += '</div>';
    $('#thumbnail-container').html(displayImages);
    $('.thumbnail').each(function () {
        //TODO event handler for clicking the modal, used for each loop to pass modal properties
        $(this).click(clickToModal);
    });
}
function clickToModal() {
    $(this).click(() => {
        $('#modal-container').css('display', 'flex');
        $('#modal-content').attr('src', "");
        $('#modal-content').attr('src', $(this).attr('data-full'));
        $('#modal-caption').text($(this).attr('data-text'));
        $('.view-list').css('background-color', 'transparent');
        $('.view-list').css('height', 'auto');
        $('.view-list').css('box-shadow', 'none');
        let viewImage = {
            title: $(this).attr('data-text'),
            thumb: $(this).attr('data-thumb'),
            file: $(this).attr('data-src'),
            date: $(this).attr('data-date'),
            full: $(this).attr('data-full')
        }
        recentlyViewed.push(viewImage);
        // TODO display the recentlyviewed using the click event
        viewRecent(recentlyViewed)
    })
};

function viewRecent(data) {
    // TODO display recent data taken from modal click event
    data.forEach((item) => {
        // TODO it filters and remove an object if the object is property is the same as the incoming object property
        // TODO viewed is placeholderobject with placeholder.file property. 
        // TODO in other words if file property is equal it's going to be included in a new array.
        // TODO anon function checks if the property is not equal if not equal do nothing, if equal filter the object.
        recentlyViewed = recentlyViewed.filter((viewed) => viewed.file !== item.file);
        // TODO then pushes it
        recentlyViewed.push(item);
    });

    // TODO removes the first element in the array
    if (recentlyViewed.length > 5) {
        recentlyViewed.shift();
    }

    let displayRecent = "";
    recentlyViewed.forEach((item) => {
        displayRecent += `<li><figure class="recent-thumbnail" data-src="${item.file}" data-date="${item.date}" data-text="${item.title}" data-thumb="${item.thumb}" data-full="${item.full}">
                <img id="recent-img" src="${item.thumb}" alt="${item.title}"/>
                <figcaption class ="recently-caption">${item.title}<br> Date taken: ${item.date}</figcaption>
            </figure></li>`;
    });
    $('.nav-list-aside').html(displayRecent);

    $('.recent-thumbnail').each(function () {
        //TODO event handler for clicking the modal, used for each loop to pass modal properties
        $(this).click(clickToModal);
    });
}

function openNav() {
    $("#mySidenav").css("width", "350px");
}

function closeNav() {
    $("#mySidenav").css("width", "0");
}

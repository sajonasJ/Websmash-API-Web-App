// Start - initialisation
// TODO # 1
$(() => {
    $.get('../json/imgdata.json', (jsonData) => {                //FETCH JSON DATA
        getDestination(jsonData);
    });
    $('#modal-close').click(() => {
        $('#modal-container').css('display', 'none');           //HIDE MODAL
    });
    $('.nav-toggle').click(toggleNav);                          //StartTOGGLE
});

// TODO # 2
function getDestination(data) {                                //USE JSONDATA TO DISPLAY NAVIGATION-IMAGE AND POP-UP DISPLAY
    let displayList = "", burgerDisplay = "";
    const destination = data.destination;
    destination.forEach((destination) => {
        displayList += `<li><figure class = destination-figure>
            <img class="nav-img"
            data-url="${destination.url}"
            src="${destination.file}"
            alt="${destination.alt}">
            <figcaption class="nav-caption">${destination.name}</figcaption></figure></li>`;

        burgerDisplay += `<li><h3
            data-url="${destination.url}"
            src="${destination.file}">
            ${destination.name}</h3></li>`;
    });
    $('#destination-list').html(displayList);                 //DISPLAY NAVIGATION-IMAGE
    $('#burger-list').html(burgerDisplay);                    //DISPLAY LINKS TO SIDE MENU

    $('.nav-img,h3').each(function () {                        //?TRIGGERS FETCH TO GET DATA FROM API
        $(this).click(clickDestinations);
        $(this).click(toggleNav);                             //CLOSE SIDENAV
    });
};

// TODO #3
function clickDestinations() {                               //FETCH API DATA SPECIFICALLY TO GET ID
    $('#video').remove();
    photos = [];
    let urLink = $(this).data('url')

    fetch(urLink).then((response) => {
        return response.json();
    }).then((data) => {
        fetchPhoto(data);
    }).catch((error) => {
        alert(error);
    });
};

// TODO #4
function fetchPhoto(data) {                                             //API DATA PUT INTO OBJECT
    messageLength = data.photos.photo.length;
    const photo = data.photos.photo;
    photo.forEach((photo) => {
        let photoDate = photo.datetaken.split(' ');                      //SPLIT PHOTODATE STRING TO TWO
        let photoObject = {
            'id': photo.id,
            'title': photo.title,
            'date': photoDate[0]
        };
        photos.push(photoObject);                                       //PUT API DATA TO PHOTOS ARRAY
        getSizes(photoObject);                                          //FUNC TO GET ACTUAL IMAGE SIZES
    });
};

// TODO #5
function getSizes(photoObj) {                                           // FETCH IMAGES AND APPEND TO ARRAY
    let getSizeReq = GETSIZES + photoObj.id;                             //APPEND DATA:ID TO URL
    messageRecieved = 0;

    $.get(getSizeReq, (data) => {                                      //FETCH SIZES
        messageRecieved++;
        const THUMB = 1;
        const XL = data.sizes.size.length - 1;
        const MEDIUM = 5;
        photoObj.thumb = data.sizes.size[THUMB].source;                 //append images sizes to photos array
        photoObj.file = data.sizes.size[MEDIUM].source;
        photoObj.full = data.sizes.size[XL].source;
        if (messageLength === messageRecieved) {                         //do not run until all image is recieved
            showImage(photos);                                          //?run show image
        };
    });
};

// TODO #6
function showImage(data) {
    let displayImages = '<div class="grid row">';           //IMPLEMENTED ADDITIONAL ROWS TO GET RESPONSIVE PHOTOS INSIDE CONTAINER
    let column = 1;                                         //EVERY 4 IMAGE A MAKE A CONTAINER
    data.forEach((item) => {                                //PASS DATA INSIDE THE HTML FIGURE
        displayImages += `
        <figure class="thumbnail"
        data-src="${item.file}"
        data-date="${item.date}"
        data-text="${item.title}"
        data-thumb="${item.thumb}"
        data-full="${item.full}">
           <div class ="div-img">
           <img class="thumbnail-img"
           class="column"
           src="${item.file}"
           alt="${item.title}"/></div>
            <figcaption id ="thumbnail-caption">"${item.title}"</figcaption>
        </figure>`;
        if (column % 4 === 0) {
            displayImages += '</div><div class="grid row">';
        }
        column++;
    })
    displayImages += '</div>';                                  //CLOSE THE CONTAINER

    $('#thumbnail-container').html(displayImages);              //DISPLAY THE ARRAY INSIDE THUMBNAIL CONTAINER
    $('.thumbnail').each(function () {                          //?ADD FUNC TO CLICK THUMBNAILS
        $(this).click(clickToModal);
    });
}

// TODO #7
function clickToModal() {                                       //OPENS MODAL AND PASS DATA FROM FIGURES TO ANOTHER ARRAY
    $(this).click(() => {
        $('#modal-container').css('display', 'flex');
        $('#modal-content').attr('src', "");
        $('#modal-content').attr('src', $(this).attr('data-full'));
        $('#modal-caption').text($(this).attr('data-text'));
        $('.view-list').css('background-color', 'transparent');
        $('.view-list').css('height', 'auto');
        $('.view-list').css('box-shadow', 'none');
        let viewImage = {                                           //temp object that is passed to array RECENTLY VIEWED
            title: $(this).attr('data-text'),
            thumb: $(this).attr('data-thumb'),
            file: $(this).attr('data-src'),
            date: $(this).attr('data-date'),
            full: $(this).attr('data-full')
        };
        recentlyViewed.push(viewImage);
        viewRecent(recentlyViewed);
    });
};

// TODO #8
function viewRecent(data) {                                          //FILTER THE ARRAY IF IT CONTAINS THE OBJECT THEN REMOVES IT
    data.forEach((item) => {                                         //IF NOT THE SAME IT STAYS IN THE ARRAY
        recentlyViewed = recentlyViewed.filter((viewed) => viewed.file !== item.file);
        recentlyViewed.push(item);
    });

    if (recentlyViewed.length > 5) { recentlyViewed.shift(); };        // IF MORE THAN 5 REMOVE THE 1ST INDEX OF ARRAY

    let displayRecent = "";
    recentlyViewed.forEach((item) => {                               // PASS DATA USING HTML TO BE USED IN OTHER FUNC
        displayRecent += `<li>
        <figure class="recent-thumbnail"
        data-src="${item.file}"
        data-date="${item.date}"
        data-text="${item.title}"
        data-thumb="${item.thumb}"
        data-full="${item.full}">
            <img id="recent-img"
            src="${item.thumb}"
            alt="${item.title}"/>
            <figcaption
            class="recently-caption">"${item.title}"
            <br>
            Date taken: ${item.date}</figcaption>
            </figure></li>`;
    });

    $('.nav-list-aside').html(displayRecent);                        //DISPLAY RECENTLY VIEWED

    $('.recent-thumbnail').each(function () {                        //?USE CLICKTOMODAL TO EACH RECENT-THUMBNAIL
        $(this).click(clickToModal);
    });
}

// TODO --AVAILABLE AT THE START--
const toggleNav = () => $("#mySidenav").toggleClass("open-nav");     // ANON FUNC TO MAKE THE TOGGLE ONE LINER


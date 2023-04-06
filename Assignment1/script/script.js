// Global Variables
// Start - initialisation
$(function () {
    $.get('../json/imgdata.json', function (jsonData) {
        // getPhotos(jsonData);
        displayMain(jsonData);
        getDestination(jsonData);
        getNavigation(jsonData);
        // displayMain(jsonData);
    });
});

function displayMain(data) {
    let mainStr = "";
    let photo = data.photos;
    let dest = data.destination;
    for (let i = 0; i < dest.length; i++) {
        if ($(location).attr('href') === dest[i].file) {
            mainStr += `<figure class="scenery">
            <img src="${photo[i].file}"
            alt="${photo[i].alternate}"/>
            <figcaption>${photo[i].title}</figcaption>
            </figure><p id="description">${photo[i].description}</p>`
        }
    }
    console.log(mainStr)
    console.log(dest[2].file)
    console.log($(location).attr('href'))
    $('#thumbnail-container').html(mainStr);
}
//  TODO: working code
// function getPhotos(data) {
//     let htmlStr = "";
//     let photo = data.photos;
//     for (let i = 0; i < photo.length; i++) {
//         htmlStr += `<figure class="scenery">
//         <img src="${photo[i].file}"
//         alt="${photo[i].alternate}"/>
//         <figcaption>${photo[i].title}</figcaption>
//         </figure><p id="description">${photo[i].description}</p>`
//     }
//     $('#thumbnail-container').html(htmlStr);
// }

function getDestination(data) {
    let desStr = "";
    let dest = data.destination;
    for (let i = 0; i < dest.length; i++) {
        desStr += `<li><a href="${dest[i].file}">
        ${dest[i].name}</a></li>`
    }
    $('#destination-list').html(desStr);
}

function getNavigation(data) {
    let navStr = "";
    let nav = data.navigation;
    for (let i = 0; i < nav.length; i++) {
        navStr += `<li><a href="${nav[i].file}">
        ${nav[i].name}</a></li>`
    }
    $('#nav-container').html(navStr);
}
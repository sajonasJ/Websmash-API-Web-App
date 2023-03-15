 "use strict"
 // Boilerplate for changing the number of items on the page using


const tagName = tagName => document.getElementsByTagName(tagName);
const id = idName => document.getElementById(idName);

let figs = tagName("figure")[0].innerHTML;
let figFrames = tagName("figure");
let figs_C = document.getElementsByTagName("figcaption");
let figArray = [];  // create an empty array for captions
let figFramesArray = [] // create an empty array for figures
let isCaption = false;

for (let figItem of figs_C) {  //
    figArray.push(figItem.innerHTML.toLowerCase());
}

for (let figFrameItem of figFrames) {
    figFramesArray.push(figFrameItem.innerHTML);
}


id("serc").onclick = () => {
    let searchNum = id("searchNum").value.trim().toLowerCase();

    // if array is a number;
    id("thumbnails").innerHTML = "";
    for (let i = 0; i < searchNum && i < 10; i++) {
        id("thumbnails").innerHTML +=
            `<figure>${figs}</figure>`;
    }

    if (figArray.includes(searchNum)) {
        id("thumbnails").innerHTML +=
            `<figure>${figFramesArray[figArray.indexOf(searchNum)]}</figure}`;
        isCaption = true;
    } else {
        isCaption = false;
    }

    // if search is not a number, add search to category list
    if (isNaN(searchNum) && isCaption === false) {
        id("nav-container").innerHTML +=
            `<a class="cat" href="">${searchNum}</a>`;
    }
};


// Boilerplate for changing the number of items on the page using
let isCaption = false;// boolean to limit the category list for noncaptions
// bunch of alias functions
// function tagName(tagName) {
//     return document.getElementsByTagName(tagName);}

// function id(idName) {
//     return document.getElementById(idName);}

const tagName = tagName => document.getElementsByTagName(tagName);//>>>>shorter version
const id = idName => document.getElementById(idName);


// let figs = document.getElementsByTagName("figure")[0].innerHTML; BELOW is the short version
let figs = tagName("figure")[0].innerHTML;


// grab all figure elements
// let figFrames = document.getElementsByTagName("figure");
let figFrames = tagName("figure");
// to get all captions,we need to grab elements by tag name
let figs_C = document.getElementsByTagName("figcaption");

let figArray = new Array();  // create an empty array for captions
let figFramesArray = new Array(); // create an empty array for figures


// put the figcaptions inside an array
// for (let i = 0; i < figs_C.length; i++) {   LONG VERSION
//     figArray.push(figs_C[i].innerHTML);
// }

for (let figItem of figs_C) {  // SHORT HAND get captions
    figArray.push(figItem.innerHTML.toLowerCase());
}

for (let figFrameItem of figFrames) {
    figFramesArray.push(figFrameItem.innerHTML)
}


// !document.getElementById("serc").onclick = () => {
id("serc").onclick = () => { // SHORT HAND VERSION OF CODE ABOVE THIS

    let searchNum = id("searchNum").value.trim().toLowerCase();

    id("thumbnails").innerHTML = "";
    for (let i = 0; i < searchNum && i < 10; i++) {
        id("thumbnails").innerHTML +=
            `<figure>${figs}</figure>`;
    }

    if (figArray.includes(searchNum)) {
        id("thumbnails").innerHTML +=
            `<figure>${figFramesArray[figArray.indexOf(searchNum)]}</figure}`
        isCaption = true;
    } else {
        isCaption = false;
    }

    // if search is not a number, add search to category list
    if (isNaN(searchNum) && isCaption === false) {
        id("nav-container").innerHTML +=
            `<a class="cat" href="">${searchNum}</a>`;
    }

}

// ? figs is a global variable that can be used anywhere
// TODO: searchNum is a local variable that can only be used
// TODO: inside the anonymous arrow function
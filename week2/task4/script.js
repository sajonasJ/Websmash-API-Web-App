// Boilerplate for changing the number of items on the page using
let isCaption = false;
const tagName = tagName => document.getElementsByTagName(tagName);
const id = idName => document.getElementById(idName);
let figs = tagName("figure")[0].innerHTML;
let figFrames = tagName("figure");
let figs_C = document.getElementsByTagName("figcaption");
let figArray = new Array();
let figFramesArray = new Array();


for (let figItem of figs_C) {
    figArray.push(figItem.innerHTML);
}
for (let figFrameItem of figFrames) {
    figFramesArray.push(figFrameItem.innerHTML)
}

id("serc").onclick = () => { // SHORT HAND VERSION OF CODE ABOVE THIS

    let searchNum = id("searchNum").value;
    if (!isNaN(searchNum)) {
        id("thumbnails").innerHTML = "";
        for (let i = 0; i < searchNum && i < 10; i++) {
            id("thumbnails").innerHTML +=
                `<figure>${figs}</figure>`;
        }
    }
    if (figArray.includes(searchNum)) {
        id("thumbnails").innerHTML +=
            `<figure>${figFramesArray[figArray.indexOf(searchNum)]}</figure}`
        isCaption = true;
    } else {
        isCaption = false;
    }
    if (isNaN(searchNum) && isCaption === false) {
        id("nav-container").innerHTML +=
            `<a class="cat" href="">${searchNum}</a>`;
    }
}
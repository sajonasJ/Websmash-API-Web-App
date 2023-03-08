// Boilerplate for changing the number of items on the page using tags.

// sample anonymous function
let figs = document.getElementsByTagName("figure")[0].innerHTML;

//TODO document.getElementById("serc").onclick = function () {
//TODO     let searchNum = document.getElementById("searchNum").value;
//TODO     document.getElementById("thumbnails").innerHTML ="";
//TODO     for (let i = 0; i < searchNum; i++) {
//TODO        document.getElementById("thumbnails").innerHTML +=
//TODO         `<figure>${figs}</figure>`;
//TODO     }
//TODO }

// ? sample regular function

// ? document.getElementById("serc").onclick = clickHandler;
// ? function clickHandler() {
// ?   let searchNum = document.getElementById("searchNum").value;
// ?  document.getElementById("thumbnails").innerHTML = "";
// ? for (let i = 0; i < searchNum; i++) {
// ?    document.getElementById("thumbnails").innerHTML +=
// ?       `<figure>${figs}</figure>`;
// ? }
// ?}

// sample anonymous function

document.getElementById("serc").onclick = () => {
    let searchNum = document.getElementById("searchNum").value;

    document.getElementById("thumbnails").innerHTML = "";
    for (let i = 0; i < searchNum && i <= 14 ; i++) {
        document.getElementById("thumbnails").innerHTML +=
            `<figure>${figs}</figure>`;
    }
}
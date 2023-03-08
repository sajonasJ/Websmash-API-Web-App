// Boilerplate for changing the number of items on the page using tags.


let figs = document.getElementsByTagName("figure")[0].innerHTML;

document.getElementById("serc").onclick = () => {
    let searchNum = document.getElementById("searchNum").value;

    document.getElementById("thumbnails").innerHTML = "";
    for (let i = 0; i < searchNum && i < 10; i++) {
        document.getElementById("thumbnails").innerHTML +=
            `<figure>${figs}</figure>`;
    }

    if ( isNaN(searchNum)) {
        document.getElementById("nav-container").innerHTML +=
            `<a class="cat" href="">${searchNum}</a>`;
    }
}
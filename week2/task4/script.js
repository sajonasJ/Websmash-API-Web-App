// Boilerplate for changing the number of items on the page using
let figs = document.getElementsByTagName("figure")[0].innerHTML;

document.getElementById("serc").onclick = () => {
    let searchNum = document.getElementById("searchNum").value;

// if search is a number less than 10, loop figure[0] same value as input
    document.getElementById("thumbnails").innerHTML = "";
    for (let i = 0; i < searchNum && i < 10; i++) {
        document.getElementById("thumbnails").innerHTML +=
            `<figure>${figs}</figure>`;
    }

// if search is not a number, add search to cate

    if ( isNaN(searchNum)) {
        document.getElementById("nav-container").innerHTML +=
            `<a class="cat" href="">${searchNum}</a>`;
    }
}


// ? figs is a global variable that can be used anywhere
// TODO: searchNum is a local variable that can only be used
// TODO: inside the anonymous arrow function
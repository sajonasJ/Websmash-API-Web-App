// Boilerplate for random number and removal of initial thumbnails.

let figs = document.getElementsByTagName("figure")[0].innerHTML;

document.getElementById("thumbnails").innerHTML = "";
let randomNum = ((Math.random() * 15) + 1);
console.log(randomNum);
for (let i = 0; i < randomNum; i++) {
    document.getElementById("thumbnails").innerHTML +=
    `<figure>${figs}</figure>`;
}

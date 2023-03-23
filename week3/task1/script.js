// 'use strict'
let fig;
let figz;
let fig_cap;
let isCaption = false;
let figCapArray = [];
let figArray = [];
$(function () {
    // figure 0
    fig = $('figure').hmtl();
    $('#searchClick').click(search_handler);
    // 
    for (let i = 0; i < $('figure').length; i++) {
        figArray.push($('figure'));

    }
}
);
console.log(fig);


let search_handler = () => {
    // adds a figure depends on the search value
    let entry = $('#searchNum').val();
    let htmlStr = '';
    for (let i = 0; i < entry; i++) {
        htmlStr += `<figure>${fig}</figure>`;
    }

    // ! not working can access aray index but cannot access proper html figure
    // ! need to revise figz and figarray structure

    // if (figCapArray.includes(entry)) {
    //     htmlStr += `<figure>${fig_cap}</figure>`;
    //     console.log("true");
    //     // console.log(fig_cap);
    //     isCaption = true;

    // } else {
    //     isCaption = false;
    // }


    // if (isNaN(entry) && isCaption === false) {
    //     $('#nav-container').append(`<a class="cat" href="">${entry}</a>`)
    // }
    console.log(`this is the input: ${entry}`);
    console.log(`this is ${isCaption}`);
    // console.log(fig);




    // html update
    $(`#thumbnails`).html(htmlStr);
};












//     }

//     if (figArray.includes(searchNum)) {
//         id("thumbnails").innerHTML +=
//             `<figure>${figFramesArray[figArray.indexOf(searchNum)]}</figure}`;
//         isCaption = true;
//     } else {
//         isCaption = false;
//     }

//  
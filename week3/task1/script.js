// 'use strict'
let fig;
let figz;
let fig_cap;
let isCaption = false;
let figCapArray = [];
let figArray = [];
$(function () {
    fig = $('figure').eq(4);
    $('#searchClick').click(search_handler);
    for (let i = 0; i < $('figure').length; i++) {
        figArray.push($('figure'));
    }
});


// clears the 
let search_handler = () => {
    // adds a figure depends on the search value
    let entry = $('#searchNum').val();
    let htmlStr = '';
    for (let i = 0; i < entry; i++) {
        htmlStr += `<figure>${fig}</figure>`;
    }

    // ! not working can access aray index but cannot access proper html figure
    // ! need to revise figz and figarray structure

    if (figCapArray.includes(entry)) {
        htmlStr += `<figure>${fig_cap[2]}</figure>`;
        isCaption = true;

    } else {
        isCaption = false;
        console.log('false');
    }

    if (isNaN(entry) && isCaption === false) {
        $('#nav-container').append(`<a class="cat" href="">${entry}</a>`)
    }
    console.log(`this is the input: ${entry}`);

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
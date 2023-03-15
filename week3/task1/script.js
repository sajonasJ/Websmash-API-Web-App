// 'use strict'
let fig;
let figz;
let fig_cap;
let isCaption = false;
let figCapArray = [];
let figArray = [];
$(function () {
    fig = $('figure').html();
    $('#searchClick').click(search_handler);
    fig_cap = $('figcaption').each(function (index) {
        // console.log(index + ':' + $(this).text());
        figCapArray.push($(this).text());
    });
    figz = $('figure').each(function (index) {
        // figArray.push(figz);
    });
    // console.log(figArray);
});



let search_handler = () => {
    let entry = $('#searchNum').val();
    let htmlStr = '';
    for (let i = 0; i < entry; i++) {
        htmlStr += `<figure>${fig}</figure>`;
    }
    $(`#thumbnails`).html(htmlStr);
    //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    // ! not working can access aray index but cannot access proper html figure
    // ! need to revise figz and figarray structure

    // if (figCapArray.includes(entry)) {
    //     htmlStr += `<figure>${$('figure').eq(figCapArray.indexOf(entry))}</figure>`;
    //     console.log("true");
    //     // console.log(figCapArray.indexOf(entry));
    //     isCaption = true;
    //     $(`#thumbnails`).html(htmlStr);
    //     // console.log(figArray[4]);
    //     console.log($('figure').eq(4));
    // } else {
    //     isCaption = false;
    //     console.log('false');
    // }





    if (isNaN(entry) && isCaption === false) {
        $('#nav-container').append(`<a class="cat" href="">${entry}</a>`)
    }
    console.log(`this is the input: ${entry}`);

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
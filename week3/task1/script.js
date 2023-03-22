// 'use strict'
let fig;
let figz;
let fig_cap;
let isCaption = false;
let figCapArray = [];
let figArray = [];
$(function () {
    // figure 0
    fig = $('figure').eq(4);
    $('#searchClick').click(search_handler);
    // 
    for (let i = 0; i < $('figure').length; i++) {
        // console.log($('figure'));
        figArray.push($('figure'));
        // console.log($('figure').get());
    }
    console.log($('figure').eq(1));
}

);



let search_handler = () => {
    let entry = $('#searchNum').val();
    let htmlStr = '';
    for (let i = 0; i < entry; i++) {
        htmlStr += `<figure>${fig}</figure>`;
    }



    // ! not working can access aray index but cannot access proper html figure
    // ! need to revise figz and figarray structure

    if (figCapArray.includes(entry)) {
        htmlStr += `<figure>${fig_cap[2]}</figure>`;
        console.log("true");
        // console.log(fig_cap);
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
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ (() => {

eval("// boiler plate for the modal and event function with captions\r\n\r\n// Global Variables\r\nlet photos = [];\r\nconst API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';\r\nconst INTRSTNG = 'https://www.flickr.com/services/rest/?method=flickr.interestingness.getList&per_page=10&format=json&nojsoncallback=1&api_key=' + API_KEY;\r\nconst GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';\r\nlet mrequest = 0;\r\nlet mrecieved = 0;\r\n// Start - initialisation\r\n\r\n\r\n// Jquery Ready\r\n$(function () {\r\n    $('#modal-close').click(function () {\r\n        $('#modal-container').css('display', 'none');\r\n    })\r\n\r\n    fetch(INTRSTNG).then(function (response) {\r\n        return response.json();\r\n    }).then(function (data) {\r\n        fetchPhoto(data);\r\n    }).catch(function (error) {\r\n        alert(error);\r\n    });\r\n\r\n    $('#search-btn').click(search_handler);\r\n});\r\n\r\n// convert photoID and caption into URL\r\nfunction fetchPhoto(data) {\r\n    mrequest = data.photos.photo.length;\r\n    for (let i = 0; i < mrequest; i++) {\r\n        let photoObj = { 'id': data.photos.photo[i].id, 'title': data.photos.photo[i].title };\r\n        photos.push(photoObj);\r\n        getSizes(photoObj);\r\n    }\r\n}\r\n// get sizes for the photo and run display\r\nfunction getSizes(photoObj) {\r\n    let getSizeReq = GETSIZES + photoObj.id;\r\n    mrecieved = 0;\r\n    $.get(getSizeReq, function (data) {\r\n        mrecieved++;\r\n        photoObj.file = data.sizes.size[3].source;\r\n        photoObj.full = data.sizes.size[data.sizes.size.length - 1].source;\r\n        if (mrequest === mrecieved) {\r\n            display(photos);\r\n        }\r\n    });\r\n}\r\n// display data\r\nfunction display(data) {\r\n    let htmlStr = \"\";\r\n    for (let i = 0; i < data.length; i++) {\r\n        htmlStr += `<figure class=\"scenery\" data-text=\"${data[i].title}\" data-full=\"${data[i].full}\">\r\n        <img src=\"${data[i].file}\" alt=\"${data[i].title}\"/>\r\n        <figcaption>${data[i].title}</figcaption></figure>`\r\n    };\r\n    $('#thumbnails').html(htmlStr);\r\n    // event handler for clicking the modal\r\n    $('figure').each(function (index) {\r\n        $(this).click(function () {\r\n            $('#modal-container').css('display', 'flex');\r\n            $('#modal-content').attr('src', \"\");\r\n            $('#modal-content').attr('src', $(this).attr('data-full'));\r\n            $('#modal-caption').text($(this).attr('data-text'));\r\n        });\r\n    });\r\n}\r\n\r\nfunction search_handler() {\r\n    let input = $('#search-input').val();\r\n    photos = []\r\n    let searchapi = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&tags=${input}&per_page=10&format=json&nojsoncallback=1`;\r\n    console.log(input);\r\n    fetch(searchapi).then(function (response) {\r\n        return response.json();\r\n    }).then(function (data) {\r\n        fetchPhoto(data);\r\n        console.log(data)\r\n\r\n    }).catch(function (error) {\r\n        alert(error);\r\n\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack://task2/./src/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/script.js"]();
/******/ 	
/******/ })()
;
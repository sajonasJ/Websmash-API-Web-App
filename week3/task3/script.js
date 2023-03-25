// BOILER PLATE .GET and Fetch
// Global Variables
const SOMEURL ='http://quotes.rest/qod.json?category=inspire';
// loaded before as not dependent on the website


// JQUERY
// $.get(SOMEURL, function (data) {
//     console.log(`this is from jQuery:`);
//     console.log(data.contents.quotes[0].quote);
// }).fail(function(){
//     alert('Get Request Failed');
// });


// FETCH
fetch(SOMEURL).then(function(response){
    return response.json();
}).then(function(data){
    console.log(`this is from fetch:`);
    console.log(data.contents.quotes[0].quote);
}).catch(function(error){
    alert(error);
});

// Start - initialisation $GETREADY
$(function () {

});

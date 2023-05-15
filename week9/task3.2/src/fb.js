import $ from "jquery";
const appID = "902755017614739";
const myURL = "https://127.0.0.1:5500/week9/task3/dist/"
let faceBook = `https://www.facebook.com/dialog/oauth?client_id=${appID}&redirect_uri=${myURL}&response_type=token`;

// further permission scope parameter: add to "faceBook"
// &scope=email,public_profile

// to redirect browser to a url: window.location.replace(URL);

//  to direct to the facebook login page:
// window.location.replace(faceBook);

// access token must be sent with every subsequent request:
//  if (access_token != undefined){
//     $.post('https//graph.facebook.com/123456789/likes?access_token='+acess_token,function(response{
//         ...
//     });)
// }

// logout:
// https://www.facebook.com/logout.php?access_token=CURRENT_ACCESS_TOKEN&confirm=1&next=APP_URL;

export function fb_bootstrap(){
    console.log("bootstrap on")
    $.ajaxSetup({ cache: true });
    $.getScript('https://connect.facebook.net/en_US/sdk.js', function(){
      FB.init({
        appId: appID,
        version: 'v16.0'
      });
    //   $('#loginbutton,#feedbutton').removeAttr('disabled');
      FB.getLoginStatus(updateStatusCallback);
    });
}

// function updateStatusCallback(response) {
//     if (response.status === 'connected') {
//         console.log("connected")
//       var uid = response.authResponse.userID;
//       var accessToken = response.authResponse.accessToken;
//       fbButtonOut();
//     } else if (response.status === 'not_authorized') {
//         console.log("not authorized")
//         login();
//     } else {
//         console.log("not connected")
//         login();
//     }
//    };

// function login(){
//     FB.login(function(response){
//         console.log(response);
//         $("#facebook-btn").text("Log out");
//     })
// }

// export function fbButtonOut(){
//   FB.logout(function(response){
//     console.log(response);
//     $("#facebook-btn").text("Log in");
//   })
// }

async function updateStatusCallback(response) {
  if (response.status === 'connected') {
      console.log("connected")
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      fbButtonOut();
      alert("You clicked Log out");
  } else if (response.status === 'not_authorized') {
      console.log("not authorized")
      await login();
      alert("You clicked Log in");
  } else {
      console.log("not connected")
      await login();
      alert("You clicked Log in");
  }
};

function login(){
  return new Promise(resolve => {
      FB.login(function(response){
          console.log(response);
          $("#facebook-btn").text("Log out");
          resolve();
      });
  });
}

export function fbButtonOut(){
  return new Promise(resolve => {
      FB.logout(function(response){
          console.log(response);
          $("#facebook-btn").text("Log in");
          resolve();
      });
  });
}

import $ from "jquery";
const appID = "902755017614739";
const myURL = "https://s5284977.elf.ict.griffith.edu.au/IntelligentMediaSystems/week9/task3/dist/"
let faceBook = `https://www.facebook.com/dialog/oauth?client_id=${appID}&redirect_uri=${myURL}&response_type=token&scope=email`;
let accessToken;
export let logOff = `https://www.facebook.com/logout.php?access_token=${accessToken}&confirm=1&next=${myURL}`;


// further permission scope parameter: add to "faceBook"
// &scope=email,public_profile


// logout:
// https://www.facebook.com/logout.php?access_token=CURRENT_ACCESS_TOKEN&confirm=1&next=APP_URL;

export function fb_bootstrap() {
  window.location.replace(faceBook);
  getAccessTokenFromURL();
}
// if (access_token != undefined) {
//   $.post('https://graph.facebook.com/902755017614739/access_token=' + access_token, function (response) {
//     // console.log(accessToken);
//   });
// }

function getAccessTokenFromURL() {
  console.log('gettingtoken')
  const url = window.location.href;
  const hashIndex = url.indexOf('#');
  if (hashIndex !== -1) {
    const paramsString = url.substring(hashIndex + 1);
    const params = new URLSearchParams(paramsString);
    accessToken = params.get('access_token');
    console.log(accessToken);
  }
}



// export function logOut() {
//   window.location.replace(logOff);
//   console.log('logoff')
//   $("#btn").on(click, function () {
//     $("#btn").text("Log out");
//     console.log('click')
//   })
// }

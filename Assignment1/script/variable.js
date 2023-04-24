// Global Variables
let photos = [];
//! let widgets =[];
let recentlyViewed = [];
const API_KEY = 'dc140afe3fd3a251c2fdf9dcd835be5c';
//! const ACCUAPI = 'HrNOM8UqdcgRmJrqGDYGWtlGG2fr6sNC';
//! const GETKEYS = 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?&toplevel=true&apikey=' + ACCUAPI;
const GETSIZES = 'https://www.flickr.com/services/rest/?method=flickr.photos.getSizes&format=json&nojsoncallback=1&api_key=' + API_KEY + '&photo_id=';
let messageLength = 0;
let messageRecieved = 0;

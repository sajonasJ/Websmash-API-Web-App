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

// GOOGLE MAPS API CODE
(g => {
    var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window; b = b[c] || (b[c] = {});
    var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams, u = () => h || (h = new Promise(async (f, n) => {
        await (a = m.createElement("script")); e.set("libraries", [...r] + "");
        for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]); e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f; a.onerror = () => h = n(Error(p + " could not load."));
        a.nonce = m.querySelector("script[nonce]")?.nonce || ""; m.head.append(a)
    })); d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))
})
    ({ key: "AIzaSyAgBC6giIsx_omf4KGfBXMwFK1o0opNMZU", v: "weekly" });

let map;

// CANNOT CHANGE MAP AND CODE AS IT IS BINDINGS TO A GOOGLE MAP
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        center: { lat: -27.470125, lng: 153.021072 },
        zoom: 11,
    });
}

initMap();
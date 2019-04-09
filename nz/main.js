// alert ("Hallo Welt!")

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat");
const laenge1 = div.getAttribute("data-lng");
const titel1 = div.getAttribute("data-titel");


// alert (div);
// alert (breite);
// alert (laenge);
// alert (titel);

// console.log ("Breite=", lat,"Länge=", lng,"Titel=" title)

// Karte initialisieren 
let karte = L.map("map");
// console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
[breite1, laenge1],
13
);

// openstreet map
/*
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
subdomains : ["a","b","c"],
attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
}).addTo(karte);
*/

const kartenLayer = {

    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    }),
    stamen_toner : L.tileLayer ("http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains : ["a", "b", "c"],
        attribution :`Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.`
    }),
    stamen_watercolor : L.tileLayer ("http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png", {
        subdomains : ["a", "b", "c"],
        attribution :`Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.`
    }),
    stamen_terrain : L.tileLayer ("http://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png", {
        subdomains : ["a", "b", "c"],
        attribution :`Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.`
    })
};


karte.addLayer(kartenLayer.stamen_watercolor);

//Auswahlmenü hinzufügen
let mapcontrol = L.control.layers({

"OpenStreetMap" : kartenLayer.osm,
"Stamen Toner": kartenLayer.stamen_toner,
"Stamen Watercolor": kartenLayer.stamen_watercolor,
"Stamen Terrain": kartenLayer.stamen_terrain
});

karte.addControl(mapcontrol);

let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

//Popup zu Pin hängen
pin1.bindPopup(titel1).openPopup();

//Kartenelemente einbauen: 

karte.addControl(new L.Control.Fullscreen());
let hash = new L.Hash(karte);
let coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function(e) {
	coords.setCoordinates(e);
});

//Skript für Adlerweg

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-titel1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-titel2");

//console.log("Breite="breite, "Länge="laenge, "Titel="titel);

//Karte initialisieren
let karte = L.map("map");
//console.log(karte);
/*
//auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);
*/
//openstreetmap einbauen - s=server, z= zoom, x=laenge, y=breite
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
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: `Datenquelle: <a href="www.basemap.at">basemap.at</a>`
    }),
}

kartenLayer.bmapgelaende.addTo(karte);

//Auswahlmenü hinzufügen
L.control.layers({
"Geoland Basemap" : kartenLayer.geolandbasemap,
"Geoland Basemap Grau" : kartenLayer.bmapgrau,
"OpenStreetMap" : kartenLayer.osm,
"Geoland Basemap Overlay" : kartenLayer.bmapoverlay,
"Orthophoto" : kartenLayer.bmaporthofoto30cm,
"Geoland Basemap hiDPI": kartenLayer.bmaphidpi,
"Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
"Geoland Basemap Gelände": kartenLayer.bmapgelaende
}).addTo(karte);


//Positionmaker 1 setzen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

//Popup zum Pin hängen
pin1.bindPopup(titel1).openPopup();

//Positionmaker 2 setzen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//Popup zum Pin hängen
pin2.bindPopup(titel2).openPopup();

let blickeGruppe = L.featureGroup().addTo(karte);


for (let blick of ADLERBLICKE) {
    console.log(blick);
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe}</p>
        <em> Kunde: ${blick.kunde}</em>`
    );
}
karte.fitBounds(blickeGruppe.getBounds());

// alert ("Hallo Welt!")

const div = document.getElementById("map");
const breite = div.getAttribute ("data-lat");
const laenge = div.getAttribute ("data-lng");
const titel = div.getAttribute ("data-title");

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
[breite, laenge],
13
);

// openstreet map
L.tileLayer ("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

L.marker(
[breite,laenge]
).addTo(karte);



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


//Skript für Adlerweg

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const title1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

//console.log("Breite="breite, "Länge="laenge, "Titel="titel);

//Karte initialisieren
let karte = L.map("map");
//console.log(karte);

//auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);

//openstreetmap einbauen - s=server, z= zoom, x=laenge, y=breite
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionmaker 1 setzen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);

//Popup zum Pin hängen
pin1.bindPopup(title1).openPopup();

//Positionmaker 2 setzen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);

//Popup zum Pin hängen
pin2.bindPopup(titel2).openPopup();


for (let blicPk of ADLERBLICKE) {
    console.log(blick);
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(karte);
    blickpin.bindPopup(
        `<h1>Standort ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe}</p>
        <em> Kunde: ${blick.kunde}</em>`
    )
}


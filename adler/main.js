
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
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

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

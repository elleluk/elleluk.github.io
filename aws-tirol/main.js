let karte = L.map("map");

const kartenlayer = {
    osm: L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https//www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.pgn", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    stamen_relief: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    }),


};

kartenlayer.geolandbasemap.addTo(karte);

const layerControl = L.control.layers({
    "Geoland Basemap": kartenlayer.geolandbasemap,
    "Geoland Basemap Grau": kartenlayer.bmapgrau,
    "Basemap High DPI": kartenlayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenlayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenlayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenlayer.bmapoberflaeche,
    "Stamen Toner": kartenlayer.stamen_toner,
    "Stamen Relief": kartenlayer.stamen_relief,
    "Stamen Watercolor": kartenlayer.stamen_watercolor
}).addTo(karte);

karte.setView(
    [47.267222, 11.392778], 15
);

//console.log(AWS);

//immer aktuelle Daten einbauen - ohne Inet aufhängt
async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    //await um warten bis geladen
    const stations = await response.json();

    const awsTirol = L.featureGroup();

    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer", layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum: ", date);
            return `<h4> ${layer.feature.properties.name} </h4>
    Höhe: ${layer.feature.geometry.coordinates[2]} <br>
    Temperatur: ${layer.feature.properties.LT} °C <br>
    Datum: ${date.toLocaleDateString("de-AT")} <br>
     Zeit: ${date.toLocaleTimeString("de-AT")} <br>
     Windgeschwindigkeit: 
     ${layer.feature.properties.WG ? layer.feature.properties.WG + 'km/h' : 'keine Daten' } <hr> 
     <footer> Quelle: Land Tirol - <a href=https://data.tirol.gv.at> data.tirol.at</a></footer>`;


        })
        .addTo(awsTirol);
    awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");



    const windLayer = L.featureGroup();
      let farbpalette_wind= [
        [3, "#00b900"],
        [4, "#10cd24"],
        [5, "#72d475"],
        [6, "#fed6d3"],
        [7, "#ffb6b3"],
        [8, "#ff9e9a"],
        [9, "#ff8281"],
        [10, "#ff6160"],
        [11, "#ff453c"],
        [12, "#ff200e"]
]; 




L.geoJson(stations, {
    pointToLayer: function (feature, latlng) {
        if (feature.properties.WR) {
    
            for (let i = 0; i < farbpalette_wind.length; i++) {
                const windspeed_bf = Math.round(Math.pow(((feature.properties.WG / 3.6) / 0.836), (2 / 3))); 
                //Umrechnen von beauford -> km/h
                if (windspeed_bf < farbpalette_wind[i][0]) {
                    color = farbpalette_wind[i][1];
                    break;
                }
            }

            //console.log('Windspeed (Beafort):', windspeed_bf);
            return L.marker(latlng, {
                icon: L.divIcon({
                    html: `<i style="color: ${color}; transform: rotate(${feature.properties.WR-45}deg)" class="fas fa-arrow-circle-right"></i>`
                })

            });

        }
    }
}).addTo(windLayer);
layerControl.addOverlay(windLayer, "Windrichtung");

//windLayer.addTo(karte);




    //Temperatur Layer statt Wind
    const temperaturlayer = L.featureGroup();
        let farbPalette_temp= [
        [-30, "#646664"],
        [-28, "#8c8a8c"],
        [-26, "#b4b2b4"],
        [-24, "#cccecc"],
        [-22, "#e4e6e4"],
        [-20, "#772d76"],
        [-18, "#b123b0"],
        [-16, "#d219d1"],
        [-14, "#f0f"],
        [-12, "#ff94ff"],
        [-10, "#3800d1"],
        [-8, "#325afe"],
        [-6, "#2695ff"],
        [-4, "#00cdff"],
        [-2, "#00fffe"],
        [0, "#007800"],
        [2, "#009d00"],
        [4, "#00bc02"],
        [6, "#00e200"],
        [8, "#0f0"],
        [10, "#fcff00"],
        [12, "#fdf200"],
        [14, "#fde100"],
        [16, "#ffd100"],
        [18, "#ffbd00"],
        [20, "#ffad00"],
        [22, "#ff9c00"],
        [24, "#ff7800"],
        [26, "red"],
        [28, "#f30102"],
        [30, "#d20000"],
        [32, "#c10000"],
        [34, "#b10000"],
        [36, "#a10000"],
        [38, "#900000"],
        [40, "#770100"],
        [42, "#5f0100"],
        [44, "#460101"],
        [46, "#2e0203"]
];


    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            let color;
            if (feature.properties.LT) {
                for (let i=0; i<farbPalette_temp.length; i++) {
                    console.log(farbPalette_temp[i],feature.properties.LT);
                    if (feature.properties.LT < farbPalette_temp[i][0]){
                        color = farbPalette_temp[i][1];
                        break;
                    }
                }

                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT}</div>`

                    })
                });
            }
        }
    }).addTo(temperaturlayer);
    layerControl.addOverlay(temperaturlayer, "Temperatur")
    temperaturlayer.addTo(karte);


    const humidityLayer = L.featureGroup();
    let farbpalette_humi = [
        [30,"#EEE"],
        [40,"#DDD"],
        [50,"#C6C9CE"],
        [60,"#BBB"],
        [70,"#AAC"],
        [80,"#9998DD"],
        [90,"#8788EE"],
        [100,"#7677E1"]
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            let color;
            // Luftfeuchte Bsp. "RH": 72.000,
            if (feature.properties.RH) {
                for (let i = 0; i < farbpalette_humi.length; i++) {
                    console.log(farbpalette_humi[i], feature.properties.RH);
                    if (feature.properties.RH < farbpalette_humi[i][0]) {
                        color = farbpalette_humi[i][1];
                        break;
                    }
                }

        
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperatureLabel" style="background-color:${color}"> ${feature.properties.RH} </div>`
                    })

                });

            }
        }
    }).addTo(humidityLayer);
layerControl.addOverlay(humidityLayer, "Relative Luftfeuchte");

}
loadStations();
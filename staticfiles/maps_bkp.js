var map = L.map("map", {zoomSnap:0.01, minZoom: 3}).setView([-15.83, -47.86], 3);
      var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
	
	 
      // https://gist.github.com/ricardobeat/674646
	var geojsonMarkerOptions = {
            radius: 8,
            fillColor: "#ff7800", color: "#000",
            weight: 1, opacity: 1,
            fillOpacity: 0.8
	};

	var localizationMarkerOptions = {
		radius: 8,
		fillColor: "#90EE90", color: "#000",
		weight: 1, opacity: 1,
		fillOpacity: 0.8
    };




// Marcadores representando os pontos de incêndio
//let url2="https://queimadas.dgi.inpe.br/home/download?id=focos_brasil&time=48h&outputFormat=json&utm_source=landing-page&utm_medium=landing-page&utm_campaign=dados-abertos&utm_content=focos_brasil_48h";
let url2="https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_South_America_48h.csv"
fetch(url2)
.then(function(response) {
	return response.json()
})
.then(function(data) {
	L.geoJSON(data, {
		pointToLayer: function (feature, latlng) {
    //return L.marker(latlng, {icon: fireicon});
    return L.circleMarker(latlng, 
			    {radius:5,
			    color:'red',
			    opacity:0.75});
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup( "Data: " + feature.properties.data_hora_gmt + "<br>"
				+ " Municipio: " + feature.properties.municipio + "<br>"
				+ " Estado: " + feature.properties.estado + "<br>"
				+ " Bioma: " + feature.properties.bioma);
		}
	}).addTo(map) 
});
/*let url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
fetch(url)
.then(function(response) {
	return response.json()
})
.then(function(data) {
	L.geoJSON(data, {
		pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, 
			    {radius:10,
			    color:'purple',
			    opacity:0.5});
		},
		onEachFeature: function (feature, layer) {
			layer.bindPopup( "Place: " + feature.properties.place + "<br>"
				+ " Type: " + feature.properties.type + "<br>"
				+ " Title: " + feature.properties.title);
		}

	}).addTo(map)
});*/

let h2 = document.querySelector('h2');
	
function success(pos){
	console.log(pos.coords.latitude, pos.coords.longitude);
		//h2.textContent = `Latitude:${pos.coords.latitude}, Longitude:${pos.coords.longitude}`;
		L.circleMarker([pos.coords.latitude, pos.coords.longitude],localizationMarkerOptions).addTo(map)
			.bindPopup('Localização Atual')
			.openPopup();
		}
		
function error(err){
		console.log(err);
		}
		
var watchID = navigator.geolocation.watchPosition(success, error, {
		enableHighAccuracy: true,
		timeout: 5000
		});
		
//navigator.geolocation.clearWatch(watchID);
		
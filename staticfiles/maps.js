var map = L.map("map", {zoomSnap:0.01, minZoom: 4}).setView([-15.83, -47.86], 3);
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

/*
// Marcadores representando os pontos de incêndio
let url2="https://queimadas.dgi.inpe.br/home/download?id=focos_brasil&time=48h&outputFormat=json&utm_source=landing-page&utm_medium=landing-page&utm_campaign=dados-abertos&utm_content=focos_brasil_48h";
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
*/
var markers = L.layerGroup().addTo(map);

// Function to handle CSV file parsing and marker creation
function handleCSV(csvData) {
  // Clear existing markers
  markers.clearLayers();

  // Parse the CSV data using Papa Parse
  Papa.parse(csvData, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      download: true,
      complete: function (result) {
          // Process CSV data and create markers
          result.data.forEach(function (row) {
              var lat = parseFloat(row.latitude);
              var lon = parseFloat(row.longitude);
              //var lat = parseFloat(row.lat);
              //var lon = parseFloat(row.lon);
              if (!isNaN(lat) && !isNaN(lon)) {
                L.circleMarker([lat, lon], 
                  {radius:5,
                  color:'red',
                  opacity:0.75}).bindPopup("Data:" + row.acq_date).addTo(markers);
                  //L.marker([lat, lon]).addTo(markers);
              }
          });
          // Fit the map bounds to the markers
          //map.fitBounds(markers.getBounds());
      }
  });
}  // Read markers data from csv file

let url2=" https://firms.modaps.eosdis.nasa.gov/api/area/csv/dbb312bad2293b4ef94c84c8c1cdf9fa/VIIRS_NOAA20_NRT/-80,-57,-32,8/1"
//let url2="https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_South_America_48h.csv"
//let url2="https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/diario/Brasil/focos_diario_br_20230828.csv"
handleCSV(url2)

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

document.addEventListener("DOMContentLoaded", function () {
    // Obtenha elementos do DOM que você precisa
    const selectFaixaDeDatas = document.getElementById("faixa-de-datas");
    const filtroDataForm = document.getElementById("filtro-data-form");

    filtroDataForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Impede o envio do formulário padrão.

        const selectedValue = selectFaixaDeDatas.value;

        // Lógica para buscar dados com base na seleção de datas usando Axios ou outra biblioteca.
        // Atualize a camada do mapa com os dados obtidos.

        // Exemplo: Use Axios para buscar dados e atualizar o mapa.
        axios.get(`https://firms.modaps.eosdis.nasa.gov/api/area/csv/dbb312bad2293b4ef94c84c8c1cdf9fa/VIIRS_NOAA20_NRT/-80,-57,-32,8/${selectedValue}`)
            .then(function (response) {
                // Lógica para adicionar ou atualizar marcadores no mapa com base nos dados obtidos.
				console.log("Dados brutos:", response.data); // Adicione este log
                // Exemplo: Limpe os marcadores existentes e adicione novos marcadores.
                markers.clearLayers();

                // Exemplo: Adicione marcadores aos novos dados.
                const data = response.data;
                data.forEach(function (item) {
                    var lat = parseFloat(item.latitude);
                    var lon = parseFloat(item.longitude);
                    if (!isNaN(lat) && !isNaN(lon)) {
                        L.circleMarker([lat, lon], 
                            { radius: 5, color: 'red', opacity: 0.75 }).bindPopup("Data:" + item.acq_date).addTo(markers);
                    }
                });
            })
            .catch(function (error) {
                console.error("Erro ao buscar dados:", error);
            });
    });
});

// Crie um grupo de camadas para a clusterização de marcadores
var markerCluster = L.markerClusterGroup();

function createMarkersFromCSV(csvData) {
    // Parse the CSV data using Papa Parse
    Papa.parse(csvData, {
        header: true, // Indica que a primeira linha contém os cabeçalhos
        skipEmptyLines: true,
        complete: function (result) {
            // Process CSV data and create clusterized markers
            result.data.forEach(function (row) {
                var lat = parseFloat(row.latitude);
                var lon = parseFloat(row.longitude);
                if (!isNaN(lat) && !isNaN(lon)) {
                    // Crie marcadores no mapa com base nos dados
                    //var marker = L.marker([lat, lon]).addTo(map);
					var marker = L.marker([lat, lon]);
                	marker.bindPopup("Data:" + row.acq_date);
                	markers.push(marker);

                    // Personalize os marcadores ou adicione pop-ups
                    marker.bindPopup("Data: " + row.acq_date + "<br> Hora: " + row.acq_time);
                }
            });

			// Add the clusterized markers to the markerCluster group
			markerCluster.addLayers(markers);

			// Add the markerCluster group to the map
			map.addLayer(markerCluster);
        }
    });
}

// Função para buscar os dados com base na seleção de datas e criar marcadores
function fetchDataAndCreateMarkers(selectedValue) {
    axios.get(`https://firms.modaps.eosdis.nasa.gov/api/area/csv/dbb312bad2293b4ef94c84c8c1cdf9fa/VIIRS_NOAA20_NRT/-80,-57,-32,8/${selectedValue}`)
        .then(function (response) {
            // Chame a função para criar marcadores a partir dos dados brutos
            createMarkersFromCSV(response.data);
        })
        .catch(function (error) {
            console.error("Erro ao buscar dados:", error);
        });
}

// Adicione um ouvinte de evento para o formulário
const filtroDataForm = document.getElementById("filtro-data-form");
filtroDataForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio do formulário padrão.

    const selectFaixaDeDatas = document.getElementById("faixa-de-datas");
    const selectedValue = selectFaixaDeDatas.value;

	// Limpe a camada de clusterização de marcadores antes de adicionar novos marcadores
    map.removeLayer(markerCluster);

    // Chame a função para buscar dados e criar marcadores com base na seleção de datas
    fetchDataAndCreateMarkers(selectedValue);
});

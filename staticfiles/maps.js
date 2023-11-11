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

handleCSV(url2)


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


//FILTROS:
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
                	
					marker.bindPopup("Data: " + row.acq_date + "<br> Hora: " + row.acq_time);
                    
					// Adicione os marcadores diretamente ao grupo de camadas de clusterização
                    markerCluster.addLayer(marker);

                    // Personalize os marcadores ou adicione pop-ups
                    marker.bindPopup("Data: " + row.acq_date + "<br> Hora: " + row.acq_time);
                }
            });

			// Adicione o grupo de camadas de clusterização ao mapa
            map.addLayer(markerCluster);

			
		
        }
    });
}

// Função para buscar os dados com base na seleção de datas e criar marcadores
function fetchDataAndCreateMarkers(selectedValue) {
    axios.get(`https://firms.modaps.eosdis.nasa.gov/api/area/csv/dbb312bad2293b4ef94c84c8c1cdf9fa/VIIRS_NOAA20_NRT/-80,-57,-32,8/${selectedValue}`)
        .then(function (response) {
            // Limpe a camada de clusterização de marcadores antes de adicionar novos marcadores
            markerCluster.clearLayers();

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

    // Chame a função para buscar dados e criar marcadores com base na seleção de datas
    fetchDataAndCreateMarkers(selectedValue);
});

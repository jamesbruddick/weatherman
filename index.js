mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXNicnVkZGljayIsImEiOiJjbHdmdGVqazMxemxlMnFudHJnam9oNDFuIn0.WVMzNUUgxKOTK56tUzGLKg';

let map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/jamesbruddick/clwcovsc701u601oxhzl6fmv2',
	center: [-98.5795, 39.8281],
	zoom: 5
});

map.on('load', () => {
	map.addSource('spc-outlook-day1-cat', {
		type: 'geojson',
		data: 'https://www.spc.noaa.gov/products/outlook/day1otlk_cat.nolyr.geojson'
	});

	map.addLayer({
		id: 'spc-outlook-day1-cat-line-layer',
		source: 'spc-outlook-day1-cat',
		type: 'line',
		paint: {
			'line-color': ['get', 'stroke']
		},
		layout: {
			visibility: 'visible'
		}
	});

	map.addLayer({
		id: 'spc-outlook-day1-cat-fill-layer',
		source: 'spc-outlook-day1-cat',
		type: 'fill',
		paint: {
			'fill-color': ['get', 'fill'],
			'fill-opacity': 0.2
		},
		layout: {
			visibility: 'visible'
		}
	});

	map.addSource('spc-outlook-day1-torn', {
		'type': 'geojson',
		'data': 'https://www.spc.noaa.gov/products/outlook/day1otlk_torn.nolyr.geojson'
	});

	map.addLayer({
		'id': 'spc-outlook-day1-torn-line-layer',
		'source': 'spc-outlook-day1-torn',
		'type': 'line',
		'paint': {
			'line-color': ['get', 'stroke']
		},
		layout: {
			visibility: 'none'
		}
	});

	map.addLayer({
		'id': 'spc-outlook-day1-torn-fill-layer',
		'source': 'spc-outlook-day1-torn',
		'type': 'fill',
		'paint': {
			'fill-color': ['get', 'fill'],
			'fill-opacity': 0.2
		},
		layout: {
			visibility: 'none'
		}
	});

	map.addSource('spc-outlook-day1-hail', {
		'type': 'geojson',
		'data': 'https://www.spc.noaa.gov/products/outlook/day1otlk_hail.nolyr.geojson'
	});

	map.addLayer({
		'id': 'spc-outlook-day1-hail-line-layer',
		'source': 'spc-outlook-day1-hail',
		'type': 'line',
		'paint': {
			'line-color': ['get', 'stroke']
		},
		layout: {
			visibility: 'none'
		}
	});

	map.addLayer({
		'id': 'spc-outlook-day1-hail-fill-layer',
		'source': 'spc-outlook-day1-hail',
		'type': 'fill',
		'paint': {
			'fill-color': ['get', 'fill'],
			'fill-opacity': 0.2
		},
		layout: {
			visibility: 'none'
		}
	});

	map.addSource('spc-outlook-day1-wind', {
		'type': 'geojson',
		'data': 'https://www.spc.noaa.gov/products/outlook/day1otlk_wind.nolyr.geojson'
	});

	map.addLayer({
		'id': 'spc-outlook-day1-wind-line-layer',
		'source': 'spc-outlook-day1-wind',
		'type': 'line',
		'paint': {
			'line-color': ['get', 'stroke']
		},
		layout: {
			visibility: 'none'
		}
	});

	map.addLayer({
		'id': 'spc-outlook-day1-wind-fill-layer',
		'source': 'spc-outlook-day1-wind',
		'type': 'fill',
		'paint': {
			'fill-color': ['get', 'fill'],
			'fill-opacity': 0.2
		},
		layout: {
			visibility: 'none'
		}
	});

	document.getElementById('toggleSPCOutlookDay1Cat').addEventListener('click', () => {
		toggleLayerVisibility(['spc-outlook-day1-cat-line-layer', 'spc-outlook-day1-cat-fill-layer']);
	});

	document.getElementById('toggleSPCOutlookDay1Torn').addEventListener('click', () => {
		toggleLayerVisibility(['spc-outlook-day1-torn-line-layer', 'spc-outlook-day1-torn-fill-layer']);
	});

	document.getElementById('toggleSPCOutlookDay1Hail').addEventListener('click', () => {
		toggleLayerVisibility(['spc-outlook-day1-hail-line-layer', 'spc-outlook-day1-hail-fill-layer']);
	});

	document.getElementById('toggleSPCOutlookDay1Wind').addEventListener('click', () => {
		toggleLayerVisibility(['spc-outlook-day1-wind-line-layer', 'spc-outlook-day1-wind-fill-layer']);
	});

	function toggleLayerVisibility(layerIds) {
		map.getStyle().layers.forEach(layer => {
			if (layer.id.startsWith('spc-outlook-day1')) {
				let visibility = 'none';

				if (layerIds.includes(layer.id)) {
					visibility = 'visible';
				}

				map.setLayoutProperty(layer.id, 'visibility', visibility);
			}
		});
	}

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			let userLocation = [position.coords.longitude, position.coords.latitude];
	
			map.setCenter(userLocation);
			map.setZoom(8);
	
			let userLocationMarker = document.createElement('div');
			userLocationMarker.className = 'geolocation-marker';
	
			new mapboxgl.Marker(userLocationMarker).setLngLat(userLocation).addTo(map);
		}, error => {
			console.error('Error occurred while retrieving geolocation:', error);
		});
	} else {
		console.error('Geolocation is not supported by this browser.');
	}
});

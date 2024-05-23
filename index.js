document.addEventListener('DOMContentLoaded', () => {
	const mapMenu = document.getElementById('mapmenu');
	const mapMenuOpen = document.querySelector('#mapmenu-open');

	mapMenu.addEventListener('shown.bs.offcanvas', () => mapMenuOpen.style.visibility = 'hidden');
	mapMenu.addEventListener('hidden.bs.offcanvas', () => mapMenuOpen.style.visibility = 'visible');

	let map = new mapboxgl.Map({
		accessToken: 'pk.eyJ1IjoiamFtZXNicnVkZGljayIsImEiOiJjbHdmdGVqazMxemxlMnFudHJnam9oNDFuIn0.WVMzNUUgxKOTK56tUzGLKg',
		container: 'map',
		style: 'mapbox://styles/jamesbruddick/clwcovsc701u601oxhzl6fmv2',
		center: [-98, 38],
		minZoom: 5,
		maxZoom: 15,
		pitchWithRotate: false
	});

	map.addControl(new mapboxgl.GeolocateControl({
		fitBoundsOptions: { maxZoom: 6 },
		showAccuracyCircle: false,
		trackUserLocation: true
	}), 'bottom-right');

	map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

	map.on('load', () => {
		const layerInfo = [
			{ id: 'spc-outlook-day1-cat', url: 'https://www.spc.noaa.gov/products/outlook/day1otlk_cat.nolyr.geojson', visible: true },
			{ id: 'spc-outlook-day1-torn', url: 'https://www.spc.noaa.gov/products/outlook/day1otlk_torn.nolyr.geojson', visible: false },
			{ id: 'spc-outlook-day1-hail', url: 'https://www.spc.noaa.gov/products/outlook/day1otlk_hail.nolyr.geojson', visible: false },
			{ id: 'spc-outlook-day1-wind', url: 'https://www.spc.noaa.gov/products/outlook/day1otlk_wind.nolyr.geojson', visible: false }
		];

		layerInfo.forEach(info => {
			map.addSource(info.id, { type: 'geojson', data: info.url });

			const lineLayerId = `${info.id}-line-layer`;
			const fillLayerId = `${info.id}-fill-layer`;
			const labelLayerId = `${info.id}-label-layer`;

			map.addLayer({
				id: lineLayerId,
				source: info.id,
				type: 'line',
				paint: { 'line-color': ['get', 'stroke'] },
				layout: { visibility: info.visible ? 'visible' : 'none' }
			});

			map.addLayer({
				id: fillLayerId,
				source: info.id,
				type: 'fill',
				paint: { 'fill-color': ['get', 'fill'], 'fill-opacity': 0.2 },
				layout: { visibility: info.visible ? 'visible' : 'none' }
			});

			map.addLayer({
				id: labelLayerId,
				source: info.id,
				type: 'symbol',
				paint: {
					'text-color': '#ffffff',
					'text-halo-color': '#000000',
					'text-halo-width': 1
				},
				layout: {
					'symbol-placement': 'line',
					'text-field': ['get', 'LABEL2'],
					'text-keep-upright': false,
					'text-max-angle': 10,
					'text-offset': [0, 1],
					'text-size': 16,
					'text-font': ['Open Sans Bold'],
					'text-letter-spacing': 0.05,
					visibility: info.visible ? 'visible' : 'none'
				}
			});
			

			document.getElementById(`toggle-${info.id}`).addEventListener('click', () => {
				toggleLayerVisibility([lineLayerId, fillLayerId, labelLayerId]);
			});
		});
	});

	function toggleLayerVisibility(layerIds) {
		map.getStyle().layers.forEach(layer => {
			if (layer.id.startsWith('spc-outlook-day1')) {
				const visibility = layerIds.includes(layer.id) ? 'visible' : 'none';
				map.setLayoutProperty(layer.id, 'visibility', visibility);
			}
		});
	}
});
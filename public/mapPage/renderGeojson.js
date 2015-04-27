var featureStyle = require('./featureStyle.js');

exports.point = function(feature) {
	var coord = [+feature.geometry.coordinates[1], +feature.geometry.coordinates[0]];
	if(feature.properties.style == undefined) {
		L.marker(coord, {icon: featureStyle.blueIcon}).addTo(map);
	} else if(feature.properties.style.icon == undefined) {
		L.marker(coord, {icon: featureStyle.blueIcon}).addTo(map);
	} else {
		var icon = feature.properties.style.icon;
		if(icon == 'blueIcon') { L.marker(coord, {icon: featureStyle.blueIcon}).addTo(map); }
		if(icon == 'greenIcon') { L.marker(coord, {icon: featureStyle.greenIcon}).addTo(map); }
		if(icon == 'redIcon') { L.marker(coord, {icon: featureStyle.redIcon}).addTo(map); }
		if(icon == 'orangeIcon') { L.marker(coord, {icon: featureStyle.orangeIcon}).addTo(map); }
		if(icon == 'purpleIcon') { L.marker(coord, {icon: featureStyle.purpleIcon}).addTo(map); }
		if(icon == 'grayIcon') { L.marker(coord, {icon: featureStyle.grayIcon}).addTo(map); }
	}
}

exports.line = function(feature) {
	if(feature.properties.style == undefined) {
		L.geoJson(feature, {
			style: { 
				color: '#1f78b4',
				weight: 5,
				opacity: 0.5
			}
		}).addTo(map)
	} else {
		if(feature.properties.style.color != undefined) { var color = feature.properties.style.color }
		else { var color = '#1f78b4'; }
		if(feature.properties.style.opacity != undefined) { var opacity = +feature.properties.style.opacity }
		else { var opacity = 0.5 }
		L.geoJson(feature, {
			style: { 
				color: color,
				weight: 5,
				opacity: opacity
			}
		}).addTo(map)
	}
}

exports.polygon = function(feature) {
	if(feature.properties.style == undefined) {
		L.geoJson(feature, {
			style: { 
				color: '#1f78b4',
				weight: 5,
				opacity: 0.5,
				fillColor: '#1f78b4',
				fillOpacity: 0.2
			}
		}).addTo(map)
	} else {
		if(feature.properties.style.color != undefined) { var color = feature.properties.style.color }
		else { var color = '#1f78b4'; }
		if(feature.properties.style.opacity != undefined) { var opacity = +feature.properties.style.opacity }
		else { var opacity = 0.5 }
		if(feature.properties.style.fillColor != undefined) { var fillColor = feature.properties.style.fillColor }
		else { var color = '#1f78b4'; }
		if(feature.properties.style.fillOpacity != undefined) { var fillOpacity = +feature.properties.style.fillOpacity }
		else { var opacity = 0.2 }
		L.geoJson(feature, {
			style: { 
				color: color,
				weight: 5,
				opacity: opacity,
				fillColor: fillColor,
				fillOpacity: fillOpacity
			}
		}).addTo(map)
	}
}

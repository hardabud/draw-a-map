var icons = require('./icons.js');

exports.point = function(feature) {
	var coord = [+feature.geometry.coordinates[1], +feature.geometry.coordinates[0]];
	if(feature.properties.style == undefined) {
		L.marker(coord, {icon: icons.blueIcon}).addTo(map);
	} else if(feature.properties.style.icon == undefined) {
		L.marker(coord, {icon: icons.blueIcon}).addTo(map);
	} else {
		var icon = feature.properties.style.icon;
		if(icon == 'blueIcon') { L.marker(coord, {icon: icons.blueIcon}).addTo(map); }
		if(icon == 'greenIcon') { L.marker(coord, {icon: icons.greenIcon}).addTo(map); }
		if(icon == 'redIcon') { L.marker(coord, {icon: icons.redIcon}).addTo(map); }
		if(icon == 'orangeIcon') { L.marker(coord, {icon: icons.orangeIcon}).addTo(map); }
		if(icon == 'purpleIcon') { L.marker(coord, {icon: icons.purpleIcon}).addTo(map); }
		if(icon == 'grayIcon') { L.marker(coord, {icon: icons.grayIcon}).addTo(map); }
	}
}

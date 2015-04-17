var L = require('leaflet');
var $ = require('jquery');

var menuCtrl = require('./menuCtrl.js');

module.exports = function() {
	map.on('click', function(e) {
		if(mode == 'drawPoint') { drawPoint(e); }
		else if(mode == 'drawLine') { drawLine(e); }
	});
}

function drawPoint(e) {
	L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
	window.mode = 'idle';
	menuCtrl.drawingPoint([e.latlng.lat, e.latlng.lng]);
}

function drawLine(e) {
	var newPt = [+e.latlng.lat, +e.latlng.lng];
	pts.push(newPt);
	if(pts.length == 1) {
		L.circle(pts[0], 100).addTo(map)
	} else {
		L.polyline(pts).addTo(map);
		menuCtrl.drawingLine(pts);
	} 
}

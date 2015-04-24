var L = require('leaflet');
var $ = require('jquery');


var menuCtrl = require('./menuCtrl.js');

exports.init = function() {
	window.map = L.map('map');
	window.pts = [];
	window.mode = 'idle';

	$.getJSON('/api/get/' + id, function(json) {
		var geojson = L.geoJson(json).addTo(map);
		if(json.features.length == 0) { map.setView([0, 0], 10); }
		else if(json.features.length == 1 && json.features[0].geometry.type == 'Point') { 
			map.setView(geojson.getBounds()._southWest, 10) 
		} else { 
			map.fitBounds(geojson.getBounds()) 
		}
	});

	map.on('click', function(e) { mapClick(e) })
}

function mapClick(e) {
	if(mode == 'drawPoint') { drawPoint(e) }
	if(mode == 'drawLine') { drawLine(e) }
	if(mode == 'drawPolygon') { drawPolygon(e) }
}

function drawPoint(e) {
	L.marker(e.latlng).addTo(map)
	window.mode = 'idle';

	menuCtrl.drawingPoint([e.latlng.lng, e.latlng.lat]);
}

function drawLine(e) {
	$('path#draw').remove();
	var newPt = [+e.latlng.lat, +e.latlng.lng];
	pts.push(newPt);
	if(pts.length == 1) {
		var draw = L.circle(pts[0], 1).addTo(map);
	} else {
		var draw = L.polyline(pts).addTo(map);
		var coord = [];
		for(i=0;i<pts.length;i++) {
			coord.push([pts[i][1], pts[i][0]])
		}
		menuCtrl.drawingLine(coord)
	}
	draw._path.id = 'draw';
}

function drawPolygon(e) {
	$('path#draw').remove();
	var newPt = [+e.latlng.lat, +e.latlng.lng];
	pts.push(newPt);
	if(pts.length == 1) {
		L.circle(pts[0], 1).addTo(map)._path.id = 'draw';
	} else if(pts.length == 2) {
		L.polyline(pts).addTo(map)._path.id = 'draw';
	} else {
		L.polygon([pts]).addTo(map)._path.id = 'draw';
		var coord = [[]];
		for(i=0;i<pts.length;i++) {
			coord[0].push([pts[i][1], pts[i][0]])
		}
		console.log(coord)
		menuCtrl.drawingPolygon(coord);
	}
}


var $ = require('jquery');


exports.init = init;

function init() {

	$('svg.leaflet-zoom-animated').empty();
	$('.leaflet-shadow-pane').empty();
	$('.leaflet-marker-pane').empty();
	$('.leaflet-popup-pane').empty();

	var menu = $('#menu');
	window.mode = 'idle';
	menu.empty();
	menu.append('<h2>Draw</h2>')
	menu.append('<button id="drawPoint">a point</button>')
	menu.append('<button id="drawLine">a line</button>')
	menu.append('<button id="drawPolygon">a polygon</button>')

	$('#drawPoint').on('click', function() { drawPoint(menu) })
	$('#drawLine').on('click', function() { drawLine(menu) })
	$('#drawPolygon').on('click', function() { mode = 'drawPolygon'; })

	$.getJSON('/api/get/' + id, function(json) { console.log(json)
		if(json.features.length != 0) {
			for(i=0;i<json.features.length;i++) {
				if(json.features[i].geometry.type == 'Point') {
					L.marker(json.features[i].geometry.coordinates).addTo(map);				
				} else if(json.features[i].geometry.type == 'LineString') {
					L.polyline(json.features[i].geometry.coordinates).addTo(map);
				}
			}
		}
	})

}

function drawPoint(menu) {
	mode = 'drawPoint';
	menu.empty();
	menu.append('<h2>Add a point to the map</h2>')
}

function drawLine(menu) {
	mode = 'drawLine';
	menu.empty();
	menu.append('<h2>Add a line to the map</h2>')
}



exports.drawingPoint = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<h2>Save this point?</h2>');
	menu.append('<input id="name" type="text" placeholder="name" required>')
	menu.append('<button id="yes">Yes</button>');
	menu.append('<button id="no">No</button>');
	$('button#no').on('click', function() { init(); })
	$('button#yes').on('click', function() {
		if($('#name').val() == '') {
			menu.append('<p>Give this point a name</p>')
		} else {
			var date = Date.now();
			$.post('/api/add/' + id, {type: 'Feature', geometry: { type: 'Point', coordinates: coord}, properties: {created: date}}, 
				function(resp) { init(); }
			);
		}
	})
}

exports.drawingLine = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<h2>Save this line?</h2>');
	menu.append('<input id="name" type="text" placeholder="name" required>')
	menu.append('<button id="yes">Yes</button>');
	menu.append('<button id="no">No</button>');
	$('button#no').on('click', function() { init(); })
	$('button#yes').on('click', function() {
		if($('#name').val() == '') {
			menu.append('<p>Give this line a name</p>')
		} else {
			var date = Date.now();
			$.post('/api/add/' + id, {type: 'Feature', geometry: { type: 'LineString', coordinates: coord}, properties: {created: date}}, 
				function(resp) { 
					pts = [];
					init(); 
				}
			);
		}
	})
}

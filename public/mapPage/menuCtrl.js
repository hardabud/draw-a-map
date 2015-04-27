var $ = require('jquery');

var mapCtrl = require('./mapCtrl.js');
var icons = require('./icons.js');

exports.init = init;

function init() {
	
	mapCtrl.init();

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

function drawPolygon(menu) {
	mode = 'drawPolygon';
	menu.empty();
	menu.append('<h2>Add a polygon to the map</h2>')
}

exports.drawingPoint = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<h2>Save this point?</h2>');
	menu.append('<p>Name this point</p>');
	menu.append('<input id="name" type="text" placeholder="name" required>');
	menu.append('<p>Choose icon color</p>');	
	menu.append('<select id="color">');
	var select = $('#color')
	var colors = icons.options();
	for(i=0;i<colors.length;i++) {
		select.append('<option value="' + colors[i] + '">' + colors[i] + '</option>')
	}
	menu.append('<button id="yes">Yes</button>');
	menu.append('<button id="no">No</button>');
	$('button#no').on('click', function() { map.remove(); init(); })
	$('button#yes').on('click', function() {
		var date = Date.now();
		$.post('/api/add/' + id, {
			type: 'Feature', 
			geometry: { 
				type: 'Point', 
				coordinates: coord
			}, 
			properties: {
				created: date,
				name: $('#name').val(),
				style: icons.style($('#color').val())
			}
		}, function(resp) { map.remove(); init(); });
	})
}

exports.drawingLine = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<h2>Save this line?</h2>');
	menu.append('<input id="name" type="text" placeholder="name" required>')
	menu.append('<button id="yes">Yes</button>');
	menu.append('<button id="no">No</button>');
	$('button#no').on('click', function() { map.remove(); init(); })
	$('button#yes').on('click', function() {
		if($('#name').val() == '') {
			menu.append('<p>Give this line a name</p>')
		} else {
			var date = Date.now();
			$.post('/api/add/' + id, {
				type: 'Feature', 
				geometry: { 
					type: 'LineString', 
					coordinates: coord
				}, 
				properties: {
					created: date,
					name: $('#name').val()
				}
			}, function(resp) { map.remove(); init(); });
		}
	})
}

exports.drawingPolygon = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<h2>Save this polygon?</h2>');
	menu.append('<input id="name" type="text" placeholder="name" required>')
	menu.append('<button id="yes">Yes</button>');
	menu.append('<button id="no">No</button>');
	$('button#no').on('click', function() { map.remove(); init(); })
	$('button#yes').on('click', function() {
		if($('#name').val() == '') {
			menu.append('<p>Give this polygon a name</p>')
		} else {
			var date = Date.now();
			$.post('/api/add/' + id, {
				type: 'Feature', 
				geometry: { 
					type: 'Polygon', 
					coordinates: coord}, 
				properties: {
					created: date,
					name: $('#name').val()
				}
			}, function(resp) { map.remove(); init(); });
		}
	})
}


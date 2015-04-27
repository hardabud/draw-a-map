var $ = require('jquery');

var mapCtrl = require('./mapCtrl.js');
var featureStyle = require('./featureStyle.js');

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
	menu.append('<p>Name this point</p>');
	menu.append('<input id="name" type="text" placeholder="name" required>');
	menu.append('<p>Choose icon color</p>');	
	menu.append('<select id="color">');
	var select = $('#color')
	var colors = featureStyle.colorOptions();
	for(i=0;i<colors.length;i++) {
		select.append('<option value="' + colors[i] + '">' + colors[i] + '</option>')
	}
	menu.append('<br><br>');
	menu.append('<button id="yes">Save</button>');
	menu.append('<button id="no">Cancel</button>');

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
				style: featureStyle.pointStyle($('#color').val())
			}
		}, function(resp) { map.remove(); init(); });
	})
}

exports.drawingLine = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<p>Name this line</p>')
	menu.append('<input id="name" type="text" placeholder="name" required>');
	menu.append('<p>Choose color</p>');
	menu.append('<select id="color">');
	var select = $('#color');
	var colors = featureStyle.colorOptions();
	for(i=0;i<colors.length;i++) {
		select.append('<option value="' + colors[i] + '">' + colors[i] + '</option>')
	}
	menu.append('<p>Choose line opacity</p>');
	menu.append('<input type="range" id="opacity" value="50">');
	menu.append('<br><br>');
	menu.append('<button id="yes">Save</button>');
	menu.append('<button id="no">Cancel</button>');

	$('button#no').on('click', function() { map.remove(); init(); })
	$('button#yes').on('click', function() {
		var date = Date.now();
		$.post('/api/add/' + id, {
			type: 'Feature', 
			geometry: { 
				type: 'LineString', 
				coordinates: coord,
			}, 
			properties: {
				created: date,
				name: $('#name').val(),
				style: {
						color: featureStyle.toHex($('#color').val()),
						opacity: $('#opacity').val() / 100
				}
			}
		}, function(resp) { map.remove(); init(); });
	})
}

exports.drawingPolygon = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<p>Name this polygon</p>')
	menu.append('<input id="name" type="text" placeholder="name" required>')
	menu.append('<p>Border color</p>');
	menu.append('<select id="bordercolor">');
	menu.append('<p>Border opacity</p>');
	menu.append('<input type="range" id="borderopacity" value="50">');
	menu.append('<p>Fill color</p>');
	menu.append('<select id="fillcolor">');
	menu.append('<p>Fill opacity</p>');
	menu.append('<input type="range" id="fillopacity" value="20">');
	menu.append('<br><br>');
	menu.append('<button id="yes">Save</button>');
	menu.append('<button id="no">Cancel</button>');
	var selectBorder = $('#bordercolor');
	var selectFill = $('#fillcolor');
	var colors = featureStyle.colorOptions();
	for(i=0;i<colors.length;i++) {
		selectBorder.append('<option value="' + colors[i] + '">' + colors[i] + '</option>');
		selectFill.append('<option value="' + colors[i] + '">' + colors[i] + '</option>');
	}

	$('button#no').on('click', function() { map.remove(); init(); })
	$('button#yes').on('click', function() {
		var date = Date.now();
		$.post('/api/add/' + id, {
			type: 'Feature', 
			geometry: { 
				type: 'Polygon', 
				coordinates: coord}, 
			properties: {
				created: date,
				name: $('#name').val(),
				style: {
					color: featureStyle.toHex($('#bordercolor').val()),
					opacity: $('#borderopacity').val() / 100,
					fillColor: featureStyle.toHex($('#fillcolor').val()),
					fillOpacity: $('#fillopacity').val() / 100,						
				}
			}
		}, function(resp) { map.remove(); init(); });
	})
}


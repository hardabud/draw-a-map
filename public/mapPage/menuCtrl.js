var $ = require('jquery');

var mapCtrl = require('./mapCtrl.js');
var featureStyle = require('./featureStyle.js');
var txtFr = require('./txtFr.js');
var txtEn = require('./txtEn.js');
var lang = window.location.pathname.substring(1,3);
console.log(lang)
if(lang == 'fr') { var txt = txtFr; console.log('en francais')} else { var txt = txtEn; }

exports.init = init;

function init() {
	
	mapCtrl.init();

	var menu = $('#menu');
	window.mode = 'idle';
	menu.empty();
	menu.append('<h2>' + txt.draw() + '</h2>')
	menu.append('<button id="drawPoint">' + txt.aPoint() + '</button>')
	menu.append('<button id="drawLine">' + txt.aLine() + '</button>')
	menu.append('<button id="drawPolygon">' + txt.aPolygon() + '</button>')

	$('#drawPoint').on('click', function() { drawPoint(menu) })
	$('#drawLine').on('click', function() { drawLine(menu) })
	$('#drawPolygon').on('click', function() { mode = 'drawPolygon'; })
}

function drawPoint(menu) {
	mode = 'drawPoint';
	menu.empty();
	menu.append('<h2>' + txt.addAPoint() + '</h2>')
}

function drawLine(menu) {
	mode = 'drawLine';
	menu.empty();
	menu.append('<h2>' + txt.addALine() + '</h2>')
}

function drawPolygon(menu) {
	mode = 'drawPolygon';
	menu.empty();
	menu.append('<h2>' + txt.addAPolygon() + '</h2>')
}

exports.drawingPoint = function(coord) {
	var menu = $('#menu');
	menu.empty();
	menu.append('<p>' + txt.name() + '</p>');
	menu.append('<input id="name" type="text" placeholder="' + txt.name() + '" required>');
	menu.append('<p>' + txt.iconColor() + '</p>');	
	menu.append('<select id="color">');
	var select = $('#color')
	var colors = txt.colorOptions();
	for(i=0;i<colors.length;i++) {
		select.append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>')
	}
	menu.append('<br><br>');
	menu.append('<button id="yes">' + txt.save() + '</button>');
	menu.append('<button id="no">' + txt.cancel() + '</button>');

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
	menu.append('<p>' + txt.name() + '</p>')
	menu.append('<input id="name" type="text" placeholder="' + txt.name() + '" required>');
	menu.append('<p>' + txt.color() + '</p>');
	menu.append('<select id="color">');
	var select = $('#color');
	var colors = txt.colorOptions();
	for(i=0;i<colors.length;i++) {
		select.append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>')
	}
	menu.append('<p>' + txt.opacity() + '</p>');
	menu.append('<input type="range" id="opacity" value="50">');
	menu.append('<br><br>');
	menu.append('<button id="yes">' + txt.save() + '</button>');
	menu.append('<button id="no">' + txt.cancel() + '</button>');

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
	menu.append('<p>' + txt.name() + '</p>')
	menu.append('<input id="name" type="text" placeholder="' + txt.name() + '" required>')
	menu.append('<p>' + txt.borderColor() + '</p>');
	menu.append('<select id="bordercolor">');
	menu.append('<p>' + txt.borderOpacity() + '</p>');
	menu.append('<input type="range" id="borderopacity" value="50">');
	menu.append('<p>' + txt.fillColor() + '</p>');
	menu.append('<select id="fillcolor">');
	menu.append('<p>' + txt.fillOpacity() + '</p>');
	menu.append('<input type="range" id="fillopacity" value="20">');
	menu.append('<br><br>');
	menu.append('<button id="yes">' + txt.save() + '</button>');
	menu.append('<button id="no">' + txt.cancel() + '</button>');
	var selectBorder = $('#bordercolor');
	var selectFill = $('#fillcolor');
	var colors = txt.colorOptions();
	for(i=0;i<colors.length;i++) {
		selectBorder.append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>');
		selectFill.append('<option value="' + colors[i].id + '">' + colors[i].name + '</option>');
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


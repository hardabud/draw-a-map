var $ = require('jquery');
var L = require('leaflet');

L.Icon.Default.imagePath = 'img';

var mapGrid = require('./mapPage/grid.js');
var menuCtrl = require('./mapPage/menuCtrl.js');
var mapCtrl = require('./mapPage/mapCtrl.js');

window.mode = 'idle';
window.id = window.location.pathname.substring(1,window.location.length);
window.pts = [];
var body = $('body');
mapGrid(body);

menuCtrl.init();

window.map = L.map('map').setView([0, 0], 10);
mapCtrl(map);



var $ = require('jquery');
var L = require('leaflet');

L.Icon.Default.imagePath = 'img';

var mapGrid = require('./mapPage/grid.js');
var menuCtrl = require('./mapPage/menuCtrl.js');

window.mode = 'idle';
window.id = window.location.pathname.substring(1,window.location.length);
window.cur = {};

var body = $('body');
mapGrid(body);

menuCtrl.init();




var $ = require('jquery');
var L = require('leaflet');

L.Icon.Default.imagePath = 'img';

var mapGrid = require('./mapPage/grid.js');
var menuCtrl = require('./mapPage/menuCtrl.js');

window.mode = 'idle';
//window.lang = window.location.pathname.substring(1,3); console.log('lang: ' + lang)
window.id = window.location.pathname.substring(3,window.location.length);
window.cur = {};

var body = $('body');
mapGrid(body);

menuCtrl.init();




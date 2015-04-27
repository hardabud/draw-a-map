var icon = L.Icon.extend({
	options: {
		shadowUrl: 'img/icons/shadow.png',
		iconSize:     [30, 41],
		shadowSize:   [20, 20],
		iconAnchor:   [15, 41],
		shadowAnchor: [4, 20],
		popupAnchor:  [0, -42]
	}
});

exports.blueIcon = new icon({iconUrl: 'img/icons/blue.png'});
exports.greenIcon = new icon({iconUrl: 'img/icons/green.png'});
exports.redIcon = new icon({iconUrl: 'img/icons/red.png'});
exports.orangeIcon = new icon({iconUrl: 'img/icons/orange.png'});
exports.purpleIcon = new icon({iconUrl: 'img/icons/purple.png'});
exports.grayIcon = new icon({iconUrl: 'img/icons/gray.png'});

exports.options = function() {
	return ['Blue', 'Green', 'Red', 'Orange', 'Purple', 'Gray']
}

exports.style = function(color) {
	if(color == 'Blue') { return { icon: 'blueIcon' } }
	else if(color == 'Green') { return { icon: 'greenIcon' } }
	else if(color == 'Red') { return { icon: 'redIcon' } }
	else if(color == 'Orange') { return { icon: 'orangeIcon' } }
	else if(color == 'Purple') { return { icon: 'purpleIcon' } }
	else if(color == 'Gray') { return { icon: 'grayIcon' } }
	else { return { icon: 'blueIcon' } }
}


var $ = require('jquery');

module.exports = function(body) { 
	body.css({
			width: '100%',
			height: '100%',
			margin: '0px',
			padding: '0px',
			border: 'none'
	})

	body.append('<div id="content">')
	$('#content').css({
			width: '100%',
			height: '100%'
		})

	$('#content').append('<div id="menu">')
	$('#menu').css({
		'float': 'left',
		width: $('body').width() * 0.3,
		height: $('body').height()
	})

	$('#content').append('<div id="map">')
	$('#map').css({
		'float': 'left',
		width: $('body').width() * 0.7,
		height: $('body').height()
	})
}


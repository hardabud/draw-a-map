var $ = require('jquery');

$('#open').on('click', function(e) {
	e.preventDefault();
	var id = $('#id').val();
	window.location = '/' + id;
})

var $ = require('jquery');

var text = $('div#text');
window.lang = 'en';
text.append('<button id="langchoice">En français</button>');
text.append('<h1 id="title">Draw a map</h1>');
text.append('<a id="ok" href="/new/en"><button>OK</button></a>');

$('#langchoice').on('click', function(e) { 
	e.preventDefault();
	if(lang == 'en') { 
		lang = 'fr';  
		$('#langchoice').text('In English');
		$('#title').text('Dessinez une carte');
		$('#ok').attr('href', '/new/fr');
	} 
	else { 
		lang = 'en';
		$('#langchoice').text('En Français');
		$('#title').text('Draw a map');
		$('#ok').attr('href', '/new/en');
	}
})


var express = require('express');
var app = express();
var jf = require('jsonfile')
var bodyParser = require('body-parser');

var tmpl = require('./templates');
var account = require('./account');

app.set('views', './views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/img', express.static(__dirname + '/public/img'));
app.use('/css', express.static(__dirname + '/public/css'));



app.get('/', function(req, res) {
	res.render('index')
})

app.get('/new/:lang' , function(req, res) {
	var id = account.createId();
	var lang = req.params.lang;
	jf.writeFileSync('data/' + id + '.json', tmpl.collection());
	res.redirect('/' + lang + id);
})

app.get('/:id', function(req, res) {
	var id = req.params.id;
	res.render('map', { id: id });
})

app.get('/api/get/:id', function(req, res) {
	var id = req.params.id;
	var geojson = jf.readFileSync('data/' + id + '.json');
	res.send(geojson);
})

app.post('/api/add/:id', function(req, res) {
	var id = req.params.id;
	var geojson = jf.readFileSync('data/' + id + '.json');
	var feature = req.body; 
	console.log(feature.geometry.coordinates)
	if(feature.geometry.type == 'LineString') { 
		var old = feature.geometry.coordinates;
		var coords = [];
		for(i=0;i<old.length;i++) {
			var lat = +old[i][0]; console.log(lat)
			var lng = +old[i][1];
			coords.push([lat, lng]);
		}	
		console.log(coords)
		feature.geometry.coordinates = coords;
	}
	feature.properties.id = geojson.features.length + 1;
	geojson.features.push(feature);
	jf.writeFileSync('data/' + id + '.json', geojson);
	res.send(geojson)
})

app.post('/api/rm/:id/:featureId', function(req, res) {
	var id = req.params.id;
	var featureId = +req.params.featureId;
	var geojson = jf.readFileSync('data/' + id + '.json');
	
	var feats = []
	for(i=0;i<geojson.features.length;i++) {
		if(geojson.feature[i].properties.id != featureId) {
			feats.push(geojson.features[i])
		}
	}
	geojson.features = feats;
	jf.writeFileSync('data/' + id + '.json', geojson);
	res.send(geojson)
})


var port = 3000;
app.listen(port, function() {console.log('listening on ' + port)})




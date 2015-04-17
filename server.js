var express = require('express');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/lib', express.static(__dirname + '/public/lib'));
app.use('/css', express.static(__dirname + '/public/css'));

var jf = require('jsonfile')

var tmpl = require('./templates');
var account = require('./account');

app.get('/', function(req, res) {
	res.render('index')
})

app.get('/new' , function(req, res) {
	var id = account.createId();
	jf.writeFileSync('data/' + id + '.json', tmpl.collection());
	res.redirect('/id/' + id);
})

app.get('/id/:id', function(req, res) {
	var id = req.params.id;
	var geojson = jf.readFileSync('data/' + id + '.json');
	res.render('map', {geojson: geojson});
})

app.post('/id/:id/add', function(req, res) {
	var id = req.params.id;
	var geojson = jf.readFileSync('data/' + id + '.json');
	var feature = req.body;
	feature.properties.id = geojson.features.length + 1;
	geojson.features.push(feature);
	jf.writeFileSync('data/' + id + '.json', geojson);
	res.send(geojson)
})

app.post('/id/:id/rm/:featureId', function(req, res) {
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




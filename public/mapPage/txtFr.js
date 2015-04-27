exports.draw = function() { return 'Dessinez' }
exports.aPoint = function() { return 'un point' }
exports.aLine = function() { return 'une ligne' }
exports.aPolygon = function() { return 'un polygone' }
exports.addAPoint = function() { return 'Dessinez un point' }
exports.addALine = function() { return 'Dessinez une ligne' }
exports.addAPolyon = function() { return 'Dessinez un polygone' }
exports.name = function() { return 'Nom' }
exports.iconColor = function() { return 'Couleur de l&#39;icône' }
exports.save = function() { return 'Sauver' }
exports.cancel = function() { return 'Annuler' }
exports.color = function() { return 'Couleur' }
exports.opacity = function() { return 'Opacité' }
exports.borderColor = function() { return 'Couleur de bordure' }
exports.borderOpacity = function() { return 'Opacité de bordure' }
exports.fillColor = function() { return 'Couleur' }
exports.fillOpacity = function() { return 'Opacité' }
exports.colorOptions = function() {
	return [
		{ name: 'Bleu', id: 'Blue'},
		{ name: 'Vert', id: 'Green'},
		{ name: 'Rouge', id: 'Red'},
		{ name: 'Orange', id: 'Orange'},
		{ name: 'Violet', id: 'Purple'},
		{ name: 'Gris', id: 'Gray'}
	]
}


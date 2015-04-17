exports.collection = function() { 
	return { 
		'type': 'FeatureCollection', 
		'features': [] 
	}
}

exports.feature = function(type, coord, props) { 
	return { 
		'type': 'Feature',
		'geometry': {
			'type': type,
			'coordinates': coord,
			'properties': props
		} 
	}
}



exports.createId = function() {
	var rndm = String(Math.random())
	var str = Date.now() + rndm.substring(2,8)
	return +str
}

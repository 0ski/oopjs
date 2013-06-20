(function (exports) {
	
	//short function to test functionality
	exports.ok = function (variable, message) {
		message = message ? '| ' + message : '';
		if (variable) {
			console.log('pass', message);
		} else {
			console.log('fail', message);
		}
	}

}(typeof window !== 'undefined' ? window : exports));

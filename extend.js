(function (exports) {
	//Extends destination with a source
	exports.extend = function extend (destination, source) {
		var propertiesNames, propertyName, property, descriptor, i, length;

		// We can't extend not objective destination
		if (destination === null || typeof destination !== 'object') {
			throw 'Cannot extend not objective destination';
		}

		// We can't extend object with not objective source
		if (source === null || typeof source !== 'object') {
			return destination;
		}

		// Return destination if source is empty
		if (Object.keys(source).length === 0) {
			return destination;
		}

		//Merge own properties only! In other case it will merge prototypes' properties
		propertiesNames = Object.getOwnPropertyNames(source);

		for (i = 0, length = propertiesNames.length; i < length; i++) {

			propertyName = propertiesNames[i];
			property = source[propertyName];
			
			//Clone object unless it's null
			if (typeof property === 'object' && property !== null) {
				property = property.extend({});
			}

			//Get property's descriptor
			descriptor = Object.getOwnPropertyDescriptor(source, propertyName);

			//And if descriptor exists define new property in destination
			//In other case just assign new variable
			if (descriptor) {
				if (descriptor.value === undefined) {
					descriptor.value = property;
				}
				Object.defineProperty(destination, propertyName, descriptor);
			} else {
				destination[propertyName] = item;
			}
		}

		return destination;
	};

	//Clones existing instance
	Object.defineProperty(Object.prototype, "clone", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function () {
			return exports.extend({}, this);
		}
	});

	//Creating clone of existing object and extending it with a source
	Object.defineProperty(Object.prototype, "extend", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (source) {
			var clone = this.clone();
			return exports.extend(clone, source);
		}
	});

	//Merging source into instance
	Object.defineProperty(Object.prototype, "merge", {
		enumerable: false,
		writable: false,
		configurable: false,
		value: function (source) {
			return exports.extend(this, source);
		}
	});

}(typeof window !== 'undefined' ? window : exports));

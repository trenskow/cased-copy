'use strict';

// This code handles both syncronous and asynchronous calls
// - hence all the returns.

// Allow IO when used asynchronously.
var handleIO = function(callback, sync) {
	if (sync) return callback();
	(setImmediate || (process || {}).nextTick || setTimeout)(callback);
};

var copyObj = function(obj, casing, callback, sync) {

	var keys = Object.keys(obj);

	// Final copy.
	var copy = {};

	// Iterate keys.
	return (function next(idx) {

		// If end of keys array return data.
		if (idx == keys.length) return callback(copy);

		var key = keys[idx]
		return copyAny(obj[key], casing, function(val) {
			// Convert key casing.
			if (casing === 'camel') key = key.substr(0, 1).toLowerCase() + key.substr(1);
			if (casing === 'pascal') key = key.substr(0, 1).toUpperCase() + key.substr(1);

			// Set copied value.
			copy[key] = val;

			// Handle next key.
			return handleIO(function() {
				return next(idx + 1);
			}, sync);

		}, sync);
	}(0));

};

var copyArr = function(arr, casing, callback, sync) {

	// Final copy.
	var copy = [];

	// Iterate items.
	return (function next(idx) {

		// If end of array return data.
		if (idx == arr.length) return callback(copy);

		return copyAny(arr[idx], casing, function(val) {

			// Push copied value.
			copy.push(val);

			// Handle next item.
			return handleIO(function() {
				return next(idx + 1);
			}, sync);

		}, sync);

	}(0));

};

var copyAny = function(data, casing, callback, sync) {

	// Handle objects.
	if (data && data.constructor.name === 'Object') return copyObj(data, casing, callback, sync);
	// Handle arrays.
	if (data && data.constructor.name === 'Array') return copyArr(data, casing, callback, sync);

	// - else just return data.
	return callback(data);

};

exports = module.exports = function(data, casing, callback) {

	// Handle missing `casing` parameter.
	if (typeof casing === 'function' && !callback) {
		callback = casing;
		casing = undefined;
	}

	// Setup for sync operation if `callback` is missing.
	var sync = false;
	if (typeof callback === 'undefined') {
		// Sync operations just return their parameter.
		callback = function(a) { return a; };
		sync = true;
	}

	// Copy data.
	return copyAny(data, casing, callback, sync);

};

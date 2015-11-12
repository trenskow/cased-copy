# cased-copy
Copy JSON objects and transform key casing.

----

## Install

    npm install --save cased-copy
    

## Usage

	copy(obj, casing, callback);
	
`casing` can have these values

 * `'camel'` (lowercase)
 * `'pascal'` (uppercase)
 * `''` or absent (preserve case)

## Example

    var copy = require('cased-copy');
    
	var obj = {
		'ANumber': 123,
		'AnObject': {
			'AString': 'a string'
		}
	};

	copy(obj, 'camel', function(camelCasedObj) {
		console.log(JSON.stringify(camelCasedObj, null, 4));
	});
    
The above outputs

	{
		"aNumber": 123,
		"anObject": {
			"aString": "a string"
		}
	}

Take the output object and copy it with `'pascal'` casing, and it comes back out uppercased.

# License

MIT
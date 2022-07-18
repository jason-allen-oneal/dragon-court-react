(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var jquery = {exports: {}};

	/*!
	 * jQuery JavaScript Library v3.6.0
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright OpenJS Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2021-03-02T17:08Z
	 */

	(function (module) {
		( function( global, factory ) {

			{

				// For CommonJS and CommonJS-like environments where a proper `window`
				// is present, execute the factory and get jQuery.
				// For environments that do not have a `window` with a `document`
				// (such as Node.js), expose a factory as module.exports.
				// This accentuates the need for the creation of a real `window`.
				// e.g. var jQuery = require("jquery")(window);
				// See ticket #14549 for more info.
				module.exports = global.document ?
					factory( global, true ) :
					function( w ) {
						if ( !w.document ) {
							throw new Error( "jQuery requires a window with a document" );
						}
						return factory( w );
					};
			}

		// Pass this if window is not defined yet
		} )( typeof window !== "undefined" ? window : commonjsGlobal, function( window, noGlobal ) {

		var arr = [];

		var getProto = Object.getPrototypeOf;

		var slice = arr.slice;

		var flat = arr.flat ? function( array ) {
			return arr.flat.call( array );
		} : function( array ) {
			return arr.concat.apply( [], array );
		};


		var push = arr.push;

		var indexOf = arr.indexOf;

		var class2type = {};

		var toString = class2type.toString;

		var hasOwn = class2type.hasOwnProperty;

		var fnToString = hasOwn.toString;

		var ObjectFunctionString = fnToString.call( Object );

		var support = {};

		var isFunction = function isFunction( obj ) {

				// Support: Chrome <=57, Firefox <=52
				// In some browsers, typeof returns "function" for HTML <object> elements
				// (i.e., `typeof document.createElement( "object" ) === "function"`).
				// We don't want to classify *any* DOM node as a function.
				// Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
				// Plus for old WebKit, typeof returns "function" for HTML collections
				// (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
				return typeof obj === "function" && typeof obj.nodeType !== "number" &&
					typeof obj.item !== "function";
			};


		var isWindow = function isWindow( obj ) {
				return obj != null && obj === obj.window;
			};


		var document = window.document;



			var preservedScriptAttributes = {
				type: true,
				src: true,
				nonce: true,
				noModule: true
			};

			function DOMEval( code, node, doc ) {
				doc = doc || document;

				var i, val,
					script = doc.createElement( "script" );

				script.text = code;
				if ( node ) {
					for ( i in preservedScriptAttributes ) {

						// Support: Firefox 64+, Edge 18+
						// Some browsers don't support the "nonce" property on scripts.
						// On the other hand, just using `getAttribute` is not enough as
						// the `nonce` attribute is reset to an empty string whenever it
						// becomes browsing-context connected.
						// See https://github.com/whatwg/html/issues/2369
						// See https://html.spec.whatwg.org/#nonce-attributes
						// The `node.getAttribute` check was added for the sake of
						// `jQuery.globalEval` so that it can fake a nonce-containing node
						// via an object.
						val = node[ i ] || node.getAttribute && node.getAttribute( i );
						if ( val ) {
							script.setAttribute( i, val );
						}
					}
				}
				doc.head.appendChild( script ).parentNode.removeChild( script );
			}


		function toType( obj ) {
			if ( obj == null ) {
				return obj + "";
			}

			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		}
		/* global Symbol */
		// Defining this global in .eslintrc.json would create a danger of using the global
		// unguarded in another place, it seems safer to define global only for this module



		var
			version = "3.6.0",

			// Define a local copy of jQuery
			jQuery = function( selector, context ) {

				// The jQuery object is actually just the init constructor 'enhanced'
				// Need init if jQuery is called (just allow error to be thrown if not included)
				return new jQuery.fn.init( selector, context );
			};

		jQuery.fn = jQuery.prototype = {

			// The current version of jQuery being used
			jquery: version,

			constructor: jQuery,

			// The default length of a jQuery object is 0
			length: 0,

			toArray: function() {
				return slice.call( this );
			},

			// Get the Nth element in the matched element set OR
			// Get the whole matched element set as a clean array
			get: function( num ) {

				// Return all the elements in a clean array
				if ( num == null ) {
					return slice.call( this );
				}

				// Return just the one element from the set
				return num < 0 ? this[ num + this.length ] : this[ num ];
			},

			// Take an array of elements and push it onto the stack
			// (returning the new matched element set)
			pushStack: function( elems ) {

				// Build a new jQuery matched element set
				var ret = jQuery.merge( this.constructor(), elems );

				// Add the old object onto the stack (as a reference)
				ret.prevObject = this;

				// Return the newly-formed element set
				return ret;
			},

			// Execute a callback for every element in the matched set.
			each: function( callback ) {
				return jQuery.each( this, callback );
			},

			map: function( callback ) {
				return this.pushStack( jQuery.map( this, function( elem, i ) {
					return callback.call( elem, i, elem );
				} ) );
			},

			slice: function() {
				return this.pushStack( slice.apply( this, arguments ) );
			},

			first: function() {
				return this.eq( 0 );
			},

			last: function() {
				return this.eq( -1 );
			},

			even: function() {
				return this.pushStack( jQuery.grep( this, function( _elem, i ) {
					return ( i + 1 ) % 2;
				} ) );
			},

			odd: function() {
				return this.pushStack( jQuery.grep( this, function( _elem, i ) {
					return i % 2;
				} ) );
			},

			eq: function( i ) {
				var len = this.length,
					j = +i + ( i < 0 ? len : 0 );
				return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
			},

			end: function() {
				return this.prevObject || this.constructor();
			},

			// For internal use only.
			// Behaves like an Array's method, not like a jQuery method.
			push: push,
			sort: arr.sort,
			splice: arr.splice
		};

		jQuery.extend = jQuery.fn.extend = function() {
			var options, name, src, copy, copyIsArray, clone,
				target = arguments[ 0 ] || {},
				i = 1,
				length = arguments.length,
				deep = false;

			// Handle a deep copy situation
			if ( typeof target === "boolean" ) {
				deep = target;

				// Skip the boolean and the target
				target = arguments[ i ] || {};
				i++;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ( typeof target !== "object" && !isFunction( target ) ) {
				target = {};
			}

			// Extend jQuery itself if only one argument is passed
			if ( i === length ) {
				target = this;
				i--;
			}

			for ( ; i < length; i++ ) {

				// Only deal with non-null/undefined values
				if ( ( options = arguments[ i ] ) != null ) {

					// Extend the base object
					for ( name in options ) {
						copy = options[ name ];

						// Prevent Object.prototype pollution
						// Prevent never-ending loop
						if ( name === "__proto__" || target === copy ) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
							( copyIsArray = Array.isArray( copy ) ) ) ) {
							src = target[ name ];

							// Ensure proper type for the source value
							if ( copyIsArray && !Array.isArray( src ) ) {
								clone = [];
							} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
								clone = {};
							} else {
								clone = src;
							}
							copyIsArray = false;

							// Never move original objects, clone them
							target[ name ] = jQuery.extend( deep, clone, copy );

						// Don't bring in undefined values
						} else if ( copy !== undefined ) {
							target[ name ] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};

		jQuery.extend( {

			// Unique for each copy of jQuery on the page
			expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

			// Assume jQuery is ready without the ready module
			isReady: true,

			error: function( msg ) {
				throw new Error( msg );
			},

			noop: function() {},

			isPlainObject: function( obj ) {
				var proto, Ctor;

				// Detect obvious negatives
				// Use toString instead of jQuery.type to catch host objects
				if ( !obj || toString.call( obj ) !== "[object Object]" ) {
					return false;
				}

				proto = getProto( obj );

				// Objects with no prototype (e.g., `Object.create( null )`) are plain
				if ( !proto ) {
					return true;
				}

				// Objects with prototype are plain iff they were constructed by a global Object function
				Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
				return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
			},

			isEmptyObject: function( obj ) {
				var name;

				for ( name in obj ) {
					return false;
				}
				return true;
			},

			// Evaluates a script in a provided context; falls back to the global one
			// if not specified.
			globalEval: function( code, options, doc ) {
				DOMEval( code, { nonce: options && options.nonce }, doc );
			},

			each: function( obj, callback ) {
				var length, i = 0;

				if ( isArrayLike( obj ) ) {
					length = obj.length;
					for ( ; i < length; i++ ) {
						if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
							break;
						}
					}
				}

				return obj;
			},

			// results is for internal usage only
			makeArray: function( arr, results ) {
				var ret = results || [];

				if ( arr != null ) {
					if ( isArrayLike( Object( arr ) ) ) {
						jQuery.merge( ret,
							typeof arr === "string" ?
								[ arr ] : arr
						);
					} else {
						push.call( ret, arr );
					}
				}

				return ret;
			},

			inArray: function( elem, arr, i ) {
				return arr == null ? -1 : indexOf.call( arr, elem, i );
			},

			// Support: Android <=4.0 only, PhantomJS 1 only
			// push.apply(_, arraylike) throws on ancient WebKit
			merge: function( first, second ) {
				var len = +second.length,
					j = 0,
					i = first.length;

				for ( ; j < len; j++ ) {
					first[ i++ ] = second[ j ];
				}

				first.length = i;

				return first;
			},

			grep: function( elems, callback, invert ) {
				var callbackInverse,
					matches = [],
					i = 0,
					length = elems.length,
					callbackExpect = !invert;

				// Go through the array, only saving the items
				// that pass the validator function
				for ( ; i < length; i++ ) {
					callbackInverse = !callback( elems[ i ], i );
					if ( callbackInverse !== callbackExpect ) {
						matches.push( elems[ i ] );
					}
				}

				return matches;
			},

			// arg is for internal usage only
			map: function( elems, callback, arg ) {
				var length, value,
					i = 0,
					ret = [];

				// Go through the array, translating each of the items to their new values
				if ( isArrayLike( elems ) ) {
					length = elems.length;
					for ( ; i < length; i++ ) {
						value = callback( elems[ i ], i, arg );

						if ( value != null ) {
							ret.push( value );
						}
					}

				// Go through every key on the object,
				} else {
					for ( i in elems ) {
						value = callback( elems[ i ], i, arg );

						if ( value != null ) {
							ret.push( value );
						}
					}
				}

				// Flatten any nested arrays
				return flat( ret );
			},

			// A global GUID counter for objects
			guid: 1,

			// jQuery.support is not used in Core but other projects attach their
			// properties to it so it needs to exist.
			support: support
		} );

		if ( typeof Symbol === "function" ) {
			jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
		}

		// Populate the class2type map
		jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
			function( _i, name ) {
				class2type[ "[object " + name + "]" ] = name.toLowerCase();
			} );

		function isArrayLike( obj ) {

			// Support: real iOS 8.2 only (not reproducible in simulator)
			// `in` check used to prevent JIT error (gh-2145)
			// hasOwn isn't used here due to false negatives
			// regarding Nodelist length in IE
			var length = !!obj && "length" in obj && obj.length,
				type = toType( obj );

			if ( isFunction( obj ) || isWindow( obj ) ) {
				return false;
			}

			return type === "array" || length === 0 ||
				typeof length === "number" && length > 0 && ( length - 1 ) in obj;
		}
		var Sizzle =
		/*!
		 * Sizzle CSS Selector Engine v2.3.6
		 * https://sizzlejs.com/
		 *
		 * Copyright JS Foundation and other contributors
		 * Released under the MIT license
		 * https://js.foundation/
		 *
		 * Date: 2021-02-16
		 */
		( function( window ) {
		var i,
			support,
			Expr,
			getText,
			isXML,
			tokenize,
			compile,
			select,
			outermostContext,
			sortInput,
			hasDuplicate,

			// Local document vars
			setDocument,
			document,
			docElem,
			documentIsHTML,
			rbuggyQSA,
			rbuggyMatches,
			matches,
			contains,

			// Instance-specific data
			expando = "sizzle" + 1 * new Date(),
			preferredDoc = window.document,
			dirruns = 0,
			done = 0,
			classCache = createCache(),
			tokenCache = createCache(),
			compilerCache = createCache(),
			nonnativeSelectorCache = createCache(),
			sortOrder = function( a, b ) {
				if ( a === b ) {
					hasDuplicate = true;
				}
				return 0;
			},

			// Instance methods
			hasOwn = ( {} ).hasOwnProperty,
			arr = [],
			pop = arr.pop,
			pushNative = arr.push,
			push = arr.push,
			slice = arr.slice,

			// Use a stripped-down indexOf as it's faster than native
			// https://jsperf.com/thor-indexof-vs-for/5
			indexOf = function( list, elem ) {
				var i = 0,
					len = list.length;
				for ( ; i < len; i++ ) {
					if ( list[ i ] === elem ) {
						return i;
					}
				}
				return -1;
			},

			booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|" +
				"ismap|loop|multiple|open|readonly|required|scoped",

			// Regular expressions

			// http://www.w3.org/TR/css3-selectors/#whitespace
			whitespace = "[\\x20\\t\\r\\n\\f]",

			// https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
			identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace +
				"?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",

			// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
			attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +

				// Operator (capture 2)
				"*([*^$|!~]?=)" + whitespace +

				// "Attribute values must be CSS identifiers [capture 5]
				// or strings [capture 3 or capture 4]"
				"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" +
				whitespace + "*\\]",

			pseudos = ":(" + identifier + ")(?:\\((" +

				// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
				// 1. quoted (capture 3; capture 4 or capture 5)
				"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +

				// 2. simple (capture 6)
				"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +

				// 3. anything else (capture 2)
				".*" +
				")\\)|)",

			// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
			rwhitespace = new RegExp( whitespace + "+", "g" ),
			rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" +
				whitespace + "+$", "g" ),

			rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
			rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace +
				"*" ),
			rdescend = new RegExp( whitespace + "|>" ),

			rpseudo = new RegExp( pseudos ),
			ridentifier = new RegExp( "^" + identifier + "$" ),

			matchExpr = {
				"ID": new RegExp( "^#(" + identifier + ")" ),
				"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
				"TAG": new RegExp( "^(" + identifier + "|[*])" ),
				"ATTR": new RegExp( "^" + attributes ),
				"PSEUDO": new RegExp( "^" + pseudos ),
				"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
					whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" +
					whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
				"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),

				// For use in libraries implementing .is()
				// We use this for POS matching in `select`
				"needsContext": new RegExp( "^" + whitespace +
					"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace +
					"*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
			},

			rhtml = /HTML$/i,
			rinputs = /^(?:input|select|textarea|button)$/i,
			rheader = /^h\d$/i,

			rnative = /^[^{]+\{\s*\[native \w/,

			// Easily-parseable/retrievable ID or TAG or CLASS selectors
			rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

			rsibling = /[+~]/,

			// CSS escapes
			// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
			runescape = new RegExp( "\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g" ),
			funescape = function( escape, nonHex ) {
				var high = "0x" + escape.slice( 1 ) - 0x10000;

				return nonHex ?

					// Strip the backslash prefix from a non-hex escape sequence
					nonHex :

					// Replace a hexadecimal escape sequence with the encoded Unicode code point
					// Support: IE <=11+
					// For values outside the Basic Multilingual Plane (BMP), manually construct a
					// surrogate pair
					high < 0 ?
						String.fromCharCode( high + 0x10000 ) :
						String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
			},

			// CSS string/identifier serialization
			// https://drafts.csswg.org/cssom/#common-serializing-idioms
			rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
			fcssescape = function( ch, asCodePoint ) {
				if ( asCodePoint ) {

					// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
					if ( ch === "\0" ) {
						return "\uFFFD";
					}

					// Control characters and (dependent upon position) numbers get escaped as code points
					return ch.slice( 0, -1 ) + "\\" +
						ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
				}

				// Other potentially-special ASCII characters get backslash-escaped
				return "\\" + ch;
			},

			// Used for iframes
			// See setDocument()
			// Removing the function wrapper causes a "Permission Denied"
			// error in IE
			unloadHandler = function() {
				setDocument();
			},

			inDisabledFieldset = addCombinator(
				function( elem ) {
					return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
				},
				{ dir: "parentNode", next: "legend" }
			);

		// Optimize for push.apply( _, NodeList )
		try {
			push.apply(
				( arr = slice.call( preferredDoc.childNodes ) ),
				preferredDoc.childNodes
			);

			// Support: Android<4.0
			// Detect silently failing push.apply
			// eslint-disable-next-line no-unused-expressions
			arr[ preferredDoc.childNodes.length ].nodeType;
		} catch ( e ) {
			push = { apply: arr.length ?

				// Leverage slice if possible
				function( target, els ) {
					pushNative.apply( target, slice.call( els ) );
				} :

				// Support: IE<9
				// Otherwise append directly
				function( target, els ) {
					var j = target.length,
						i = 0;

					// Can't trust NodeList.length
					while ( ( target[ j++ ] = els[ i++ ] ) ) {}
					target.length = j - 1;
				}
			};
		}

		function Sizzle( selector, context, results, seed ) {
			var m, i, elem, nid, match, groups, newSelector,
				newContext = context && context.ownerDocument,

				// nodeType defaults to 9, since context defaults to document
				nodeType = context ? context.nodeType : 9;

			results = results || [];

			// Return early from calls with invalid selector or context
			if ( typeof selector !== "string" || !selector ||
				nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

				return results;
			}

			// Try to shortcut find operations (as opposed to filters) in HTML documents
			if ( !seed ) {
				setDocument( context );
				context = context || document;

				if ( documentIsHTML ) {

					// If the selector is sufficiently simple, try using a "get*By*" DOM method
					// (excepting DocumentFragment context, where the methods don't exist)
					if ( nodeType !== 11 && ( match = rquickExpr.exec( selector ) ) ) {

						// ID selector
						if ( ( m = match[ 1 ] ) ) {

							// Document context
							if ( nodeType === 9 ) {
								if ( ( elem = context.getElementById( m ) ) ) {

									// Support: IE, Opera, Webkit
									// TODO: identify versions
									// getElementById can match elements by name instead of ID
									if ( elem.id === m ) {
										results.push( elem );
										return results;
									}
								} else {
									return results;
								}

							// Element context
							} else {

								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( newContext && ( elem = newContext.getElementById( m ) ) &&
									contains( context, elem ) &&
									elem.id === m ) {

									results.push( elem );
									return results;
								}
							}

						// Type selector
						} else if ( match[ 2 ] ) {
							push.apply( results, context.getElementsByTagName( selector ) );
							return results;

						// Class selector
						} else if ( ( m = match[ 3 ] ) && support.getElementsByClassName &&
							context.getElementsByClassName ) {

							push.apply( results, context.getElementsByClassName( m ) );
							return results;
						}
					}

					// Take advantage of querySelectorAll
					if ( support.qsa &&
						!nonnativeSelectorCache[ selector + " " ] &&
						( !rbuggyQSA || !rbuggyQSA.test( selector ) ) &&

						// Support: IE 8 only
						// Exclude object elements
						( nodeType !== 1 || context.nodeName.toLowerCase() !== "object" ) ) {

						newSelector = selector;
						newContext = context;

						// qSA considers elements outside a scoping root when evaluating child or
						// descendant combinators, which is not what we want.
						// In such cases, we work around the behavior by prefixing every selector in the
						// list with an ID selector referencing the scope context.
						// The technique has to be used as well when a leading combinator is used
						// as such selectors are not recognized by querySelectorAll.
						// Thanks to Andrew Dupont for this technique.
						if ( nodeType === 1 &&
							( rdescend.test( selector ) || rcombinators.test( selector ) ) ) {

							// Expand context for sibling selectors
							newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
								context;

							// We can use :scope instead of the ID hack if the browser
							// supports it & if we're not changing the context.
							if ( newContext !== context || !support.scope ) {

								// Capture the context ID, setting it first if necessary
								if ( ( nid = context.getAttribute( "id" ) ) ) {
									nid = nid.replace( rcssescape, fcssescape );
								} else {
									context.setAttribute( "id", ( nid = expando ) );
								}
							}

							// Prefix every selector in the list
							groups = tokenize( selector );
							i = groups.length;
							while ( i-- ) {
								groups[ i ] = ( nid ? "#" + nid : ":scope" ) + " " +
									toSelector( groups[ i ] );
							}
							newSelector = groups.join( "," );
						}

						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
							nonnativeSelectorCache( selector, true );
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}

			// All others
			return select( selector.replace( rtrim, "$1" ), context, results, seed );
		}

		/**
		 * Create key-value caches of limited size
		 * @returns {function(string, object)} Returns the Object data after storing it on itself with
		 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
		 *	deleting the oldest entry
		 */
		function createCache() {
			var keys = [];

			function cache( key, value ) {

				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if ( keys.push( key + " " ) > Expr.cacheLength ) {

					// Only keep the most recent entries
					delete cache[ keys.shift() ];
				}
				return ( cache[ key + " " ] = value );
			}
			return cache;
		}

		/**
		 * Mark a function for special use by Sizzle
		 * @param {Function} fn The function to mark
		 */
		function markFunction( fn ) {
			fn[ expando ] = true;
			return fn;
		}

		/**
		 * Support testing using an element
		 * @param {Function} fn Passed the created element and returns a boolean result
		 */
		function assert( fn ) {
			var el = document.createElement( "fieldset" );

			try {
				return !!fn( el );
			} catch ( e ) {
				return false;
			} finally {

				// Remove from its parent by default
				if ( el.parentNode ) {
					el.parentNode.removeChild( el );
				}

				// release memory in IE
				el = null;
			}
		}

		/**
		 * Adds the same handler for all of the specified attrs
		 * @param {String} attrs Pipe-separated list of attributes
		 * @param {Function} handler The method that will be applied
		 */
		function addHandle( attrs, handler ) {
			var arr = attrs.split( "|" ),
				i = arr.length;

			while ( i-- ) {
				Expr.attrHandle[ arr[ i ] ] = handler;
			}
		}

		/**
		 * Checks document order of two siblings
		 * @param {Element} a
		 * @param {Element} b
		 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
		 */
		function siblingCheck( a, b ) {
			var cur = b && a,
				diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
					a.sourceIndex - b.sourceIndex;

			// Use IE sourceIndex if available on both nodes
			if ( diff ) {
				return diff;
			}

			// Check if b follows a
			if ( cur ) {
				while ( ( cur = cur.nextSibling ) ) {
					if ( cur === b ) {
						return -1;
					}
				}
			}

			return a ? 1 : -1;
		}

		/**
		 * Returns a function to use in pseudos for input types
		 * @param {String} type
		 */
		function createInputPseudo( type ) {
			return function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === type;
			};
		}

		/**
		 * Returns a function to use in pseudos for buttons
		 * @param {String} type
		 */
		function createButtonPseudo( type ) {
			return function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return ( name === "input" || name === "button" ) && elem.type === type;
			};
		}

		/**
		 * Returns a function to use in pseudos for :enabled/:disabled
		 * @param {Boolean} disabled true for :disabled; false for :enabled
		 */
		function createDisabledPseudo( disabled ) {

			// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
			return function( elem ) {

				// Only certain elements can match :enabled or :disabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
				// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
				if ( "form" in elem ) {

					// Check for inherited disabledness on relevant non-disabled elements:
					// * listed form-associated elements in a disabled fieldset
					//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
					// * option elements in a disabled optgroup
					//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
					// All such elements have a "form" property.
					if ( elem.parentNode && elem.disabled === false ) {

						// Option elements defer to a parent optgroup if present
						if ( "label" in elem ) {
							if ( "label" in elem.parentNode ) {
								return elem.parentNode.disabled === disabled;
							} else {
								return elem.disabled === disabled;
							}
						}

						// Support: IE 6 - 11
						// Use the isDisabled shortcut property to check for disabled fieldset ancestors
						return elem.isDisabled === disabled ||

							// Where there is no isDisabled, check manually
							/* jshint -W018 */
							elem.isDisabled !== !disabled &&
							inDisabledFieldset( elem ) === disabled;
					}

					return elem.disabled === disabled;

				// Try to winnow out elements that can't be disabled before trusting the disabled property.
				// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
				// even exist on them, let alone have a boolean value.
				} else if ( "label" in elem ) {
					return elem.disabled === disabled;
				}

				// Remaining elements are neither :enabled nor :disabled
				return false;
			};
		}

		/**
		 * Returns a function to use in pseudos for positionals
		 * @param {Function} fn
		 */
		function createPositionalPseudo( fn ) {
			return markFunction( function( argument ) {
				argument = +argument;
				return markFunction( function( seed, matches ) {
					var j,
						matchIndexes = fn( [], seed.length, argument ),
						i = matchIndexes.length;

					// Match elements found at the specified indexes
					while ( i-- ) {
						if ( seed[ ( j = matchIndexes[ i ] ) ] ) {
							seed[ j ] = !( matches[ j ] = seed[ j ] );
						}
					}
				} );
			} );
		}

		/**
		 * Checks a node for validity as a Sizzle context
		 * @param {Element|Object=} context
		 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
		 */
		function testContext( context ) {
			return context && typeof context.getElementsByTagName !== "undefined" && context;
		}

		// Expose support vars for convenience
		support = Sizzle.support = {};

		/**
		 * Detects XML nodes
		 * @param {Element|Object} elem An element or a document
		 * @returns {Boolean} True iff elem is a non-HTML XML node
		 */
		isXML = Sizzle.isXML = function( elem ) {
			var namespace = elem && elem.namespaceURI,
				docElem = elem && ( elem.ownerDocument || elem ).documentElement;

			// Support: IE <=8
			// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
			// https://bugs.jquery.com/ticket/4833
			return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
		};

		/**
		 * Sets document-related variables once based on the current document
		 * @param {Element|Object} [doc] An element or document object to use to set the document
		 * @returns {Object} Returns the current document
		 */
		setDocument = Sizzle.setDocument = function( node ) {
			var hasCompare, subWindow,
				doc = node ? node.ownerDocument || node : preferredDoc;

			// Return early if doc is invalid or already selected
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( doc == document || doc.nodeType !== 9 || !doc.documentElement ) {
				return document;
			}

			// Update global variables
			document = doc;
			docElem = document.documentElement;
			documentIsHTML = !isXML( document );

			// Support: IE 9 - 11+, Edge 12 - 18+
			// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( preferredDoc != document &&
				( subWindow = document.defaultView ) && subWindow.top !== subWindow ) {

				// Support: IE 11, Edge
				if ( subWindow.addEventListener ) {
					subWindow.addEventListener( "unload", unloadHandler, false );

				// Support: IE 9 - 10 only
				} else if ( subWindow.attachEvent ) {
					subWindow.attachEvent( "onunload", unloadHandler );
				}
			}

			// Support: IE 8 - 11+, Edge 12 - 18+, Chrome <=16 - 25 only, Firefox <=3.6 - 31 only,
			// Safari 4 - 5 only, Opera <=11.6 - 12.x only
			// IE/Edge & older browsers don't support the :scope pseudo-class.
			// Support: Safari 6.0 only
			// Safari 6.0 supports :scope but it's an alias of :root there.
			support.scope = assert( function( el ) {
				docElem.appendChild( el ).appendChild( document.createElement( "div" ) );
				return typeof el.querySelectorAll !== "undefined" &&
					!el.querySelectorAll( ":scope fieldset div" ).length;
			} );

			/* Attributes
			---------------------------------------------------------------------- */

			// Support: IE<8
			// Verify that getAttribute really returns attributes and not properties
			// (excepting IE8 booleans)
			support.attributes = assert( function( el ) {
				el.className = "i";
				return !el.getAttribute( "className" );
			} );

			/* getElement(s)By*
			---------------------------------------------------------------------- */

			// Check if getElementsByTagName("*") returns only elements
			support.getElementsByTagName = assert( function( el ) {
				el.appendChild( document.createComment( "" ) );
				return !el.getElementsByTagName( "*" ).length;
			} );

			// Support: IE<9
			support.getElementsByClassName = rnative.test( document.getElementsByClassName );

			// Support: IE<10
			// Check if getElementById returns elements by name
			// The broken getElementById methods don't pick up programmatically-set names,
			// so use a roundabout getElementsByName test
			support.getById = assert( function( el ) {
				docElem.appendChild( el ).id = expando;
				return !document.getElementsByName || !document.getElementsByName( expando ).length;
			} );

			// ID filter and find
			if ( support.getById ) {
				Expr.filter[ "ID" ] = function( id ) {
					var attrId = id.replace( runescape, funescape );
					return function( elem ) {
						return elem.getAttribute( "id" ) === attrId;
					};
				};
				Expr.find[ "ID" ] = function( id, context ) {
					if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
						var elem = context.getElementById( id );
						return elem ? [ elem ] : [];
					}
				};
			} else {
				Expr.filter[ "ID" ] =  function( id ) {
					var attrId = id.replace( runescape, funescape );
					return function( elem ) {
						var node = typeof elem.getAttributeNode !== "undefined" &&
							elem.getAttributeNode( "id" );
						return node && node.value === attrId;
					};
				};

				// Support: IE 6 - 7 only
				// getElementById is not reliable as a find shortcut
				Expr.find[ "ID" ] = function( id, context ) {
					if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
						var node, i, elems,
							elem = context.getElementById( id );

						if ( elem ) {

							// Verify the id attribute
							node = elem.getAttributeNode( "id" );
							if ( node && node.value === id ) {
								return [ elem ];
							}

							// Fall back on getElementsByName
							elems = context.getElementsByName( id );
							i = 0;
							while ( ( elem = elems[ i++ ] ) ) {
								node = elem.getAttributeNode( "id" );
								if ( node && node.value === id ) {
									return [ elem ];
								}
							}
						}

						return [];
					}
				};
			}

			// Tag
			Expr.find[ "TAG" ] = support.getElementsByTagName ?
				function( tag, context ) {
					if ( typeof context.getElementsByTagName !== "undefined" ) {
						return context.getElementsByTagName( tag );

					// DocumentFragment nodes don't have gEBTN
					} else if ( support.qsa ) {
						return context.querySelectorAll( tag );
					}
				} :

				function( tag, context ) {
					var elem,
						tmp = [],
						i = 0,

						// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
						results = context.getElementsByTagName( tag );

					// Filter out possible comments
					if ( tag === "*" ) {
						while ( ( elem = results[ i++ ] ) ) {
							if ( elem.nodeType === 1 ) {
								tmp.push( elem );
							}
						}

						return tmp;
					}
					return results;
				};

			// Class
			Expr.find[ "CLASS" ] = support.getElementsByClassName && function( className, context ) {
				if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
					return context.getElementsByClassName( className );
				}
			};

			/* QSA/matchesSelector
			---------------------------------------------------------------------- */

			// QSA and matchesSelector support

			// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
			rbuggyMatches = [];

			// qSa(:focus) reports false when true (Chrome 21)
			// We allow this because of a bug in IE8/9 that throws an error
			// whenever `document.activeElement` is accessed on an iframe
			// So, we allow :focus to pass through QSA all the time to avoid the IE error
			// See https://bugs.jquery.com/ticket/13378
			rbuggyQSA = [];

			if ( ( support.qsa = rnative.test( document.querySelectorAll ) ) ) {

				// Build QSA regex
				// Regex strategy adopted from Diego Perini
				assert( function( el ) {

					var input;

					// Select is set to empty string on purpose
					// This is to test IE's treatment of not explicitly
					// setting a boolean content attribute,
					// since its presence should be enough
					// https://bugs.jquery.com/ticket/12359
					docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
						"<select id='" + expando + "-\r\\' msallowcapture=''>" +
						"<option selected=''></option></select>";

					// Support: IE8, Opera 11-12.16
					// Nothing should be selected when empty strings follow ^= or $= or *=
					// The test attribute must be unknown in Opera but "safe" for WinRT
					// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
					if ( el.querySelectorAll( "[msallowcapture^='']" ).length ) {
						rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
					}

					// Support: IE8
					// Boolean attributes and "value" are not treated correctly
					if ( !el.querySelectorAll( "[selected]" ).length ) {
						rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
					}

					// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
					if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
						rbuggyQSA.push( "~=" );
					}

					// Support: IE 11+, Edge 15 - 18+
					// IE 11/Edge don't find elements on a `[name='']` query in some cases.
					// Adding a temporary attribute to the document before the selection works
					// around the issue.
					// Interestingly, IE 10 & older don't seem to have the issue.
					input = document.createElement( "input" );
					input.setAttribute( "name", "" );
					el.appendChild( input );
					if ( !el.querySelectorAll( "[name='']" ).length ) {
						rbuggyQSA.push( "\\[" + whitespace + "*name" + whitespace + "*=" +
							whitespace + "*(?:''|\"\")" );
					}

					// Webkit/Opera - :checked should return selected option elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					// IE8 throws error here and will not see later tests
					if ( !el.querySelectorAll( ":checked" ).length ) {
						rbuggyQSA.push( ":checked" );
					}

					// Support: Safari 8+, iOS 8+
					// https://bugs.webkit.org/show_bug.cgi?id=136851
					// In-page `selector#id sibling-combinator selector` fails
					if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
						rbuggyQSA.push( ".#.+[+~]" );
					}

					// Support: Firefox <=3.6 - 5 only
					// Old Firefox doesn't throw on a badly-escaped identifier.
					el.querySelectorAll( "\\\f" );
					rbuggyQSA.push( "[\\r\\n\\f]" );
				} );

				assert( function( el ) {
					el.innerHTML = "<a href='' disabled='disabled'></a>" +
						"<select disabled='disabled'><option/></select>";

					// Support: Windows 8 Native Apps
					// The type and name attributes are restricted during .innerHTML assignment
					var input = document.createElement( "input" );
					input.setAttribute( "type", "hidden" );
					el.appendChild( input ).setAttribute( "name", "D" );

					// Support: IE8
					// Enforce case-sensitivity of name attribute
					if ( el.querySelectorAll( "[name=d]" ).length ) {
						rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
					}

					// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
					// IE8 throws error here and will not see later tests
					if ( el.querySelectorAll( ":enabled" ).length !== 2 ) {
						rbuggyQSA.push( ":enabled", ":disabled" );
					}

					// Support: IE9-11+
					// IE's :disabled selector does not pick up the children of disabled fieldsets
					docElem.appendChild( el ).disabled = true;
					if ( el.querySelectorAll( ":disabled" ).length !== 2 ) {
						rbuggyQSA.push( ":enabled", ":disabled" );
					}

					// Support: Opera 10 - 11 only
					// Opera 10-11 does not throw on post-comma invalid pseudos
					el.querySelectorAll( "*,:x" );
					rbuggyQSA.push( ",.*:" );
				} );
			}

			if ( ( support.matchesSelector = rnative.test( ( matches = docElem.matches ||
				docElem.webkitMatchesSelector ||
				docElem.mozMatchesSelector ||
				docElem.oMatchesSelector ||
				docElem.msMatchesSelector ) ) ) ) {

				assert( function( el ) {

					// Check to see if it's possible to do matchesSelector
					// on a disconnected node (IE 9)
					support.disconnectedMatch = matches.call( el, "*" );

					// This should fail with an exception
					// Gecko does not error, returns false instead
					matches.call( el, "[s!='']:x" );
					rbuggyMatches.push( "!=", pseudos );
				} );
			}

			rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join( "|" ) );
			rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join( "|" ) );

			/* Contains
			---------------------------------------------------------------------- */
			hasCompare = rnative.test( docElem.compareDocumentPosition );

			// Element contains another
			// Purposefully self-exclusive
			// As in, an element does not contain itself
			contains = hasCompare || rnative.test( docElem.contains ) ?
				function( a, b ) {
					var adown = a.nodeType === 9 ? a.documentElement : a,
						bup = b && b.parentNode;
					return a === bup || !!( bup && bup.nodeType === 1 && (
						adown.contains ?
							adown.contains( bup ) :
							a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
					) );
				} :
				function( a, b ) {
					if ( b ) {
						while ( ( b = b.parentNode ) ) {
							if ( b === a ) {
								return true;
							}
						}
					}
					return false;
				};

			/* Sorting
			---------------------------------------------------------------------- */

			// Document order sorting
			sortOrder = hasCompare ?
			function( a, b ) {

				// Flag for duplicate removal
				if ( a === b ) {
					hasDuplicate = true;
					return 0;
				}

				// Sort on method existence if only one input has compareDocumentPosition
				var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
				if ( compare ) {
					return compare;
				}

				// Calculate position if both inputs belong to the same document
				// Support: IE 11+, Edge 17 - 18+
				// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
				// two documents; shallow comparisons work.
				// eslint-disable-next-line eqeqeq
				compare = ( a.ownerDocument || a ) == ( b.ownerDocument || b ) ?
					a.compareDocumentPosition( b ) :

					// Otherwise we know they are disconnected
					1;

				// Disconnected nodes
				if ( compare & 1 ||
					( !support.sortDetached && b.compareDocumentPosition( a ) === compare ) ) {

					// Choose the first element that is related to our preferred document
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( a == document || a.ownerDocument == preferredDoc &&
						contains( preferredDoc, a ) ) {
						return -1;
					}

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					// eslint-disable-next-line eqeqeq
					if ( b == document || b.ownerDocument == preferredDoc &&
						contains( preferredDoc, b ) ) {
						return 1;
					}

					// Maintain original order
					return sortInput ?
						( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
						0;
				}

				return compare & 4 ? -1 : 1;
			} :
			function( a, b ) {

				// Exit early if the nodes are identical
				if ( a === b ) {
					hasDuplicate = true;
					return 0;
				}

				var cur,
					i = 0,
					aup = a.parentNode,
					bup = b.parentNode,
					ap = [ a ],
					bp = [ b ];

				// Parentless nodes are either documents or disconnected
				if ( !aup || !bup ) {

					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					/* eslint-disable eqeqeq */
					return a == document ? -1 :
						b == document ? 1 :
						/* eslint-enable eqeqeq */
						aup ? -1 :
						bup ? 1 :
						sortInput ?
						( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
						0;

				// If the nodes are siblings, we can do a quick check
				} else if ( aup === bup ) {
					return siblingCheck( a, b );
				}

				// Otherwise we need full lists of their ancestors for comparison
				cur = a;
				while ( ( cur = cur.parentNode ) ) {
					ap.unshift( cur );
				}
				cur = b;
				while ( ( cur = cur.parentNode ) ) {
					bp.unshift( cur );
				}

				// Walk down the tree looking for a discrepancy
				while ( ap[ i ] === bp[ i ] ) {
					i++;
				}

				return i ?

					// Do a sibling check if the nodes have a common ancestor
					siblingCheck( ap[ i ], bp[ i ] ) :

					// Otherwise nodes in our document sort first
					// Support: IE 11+, Edge 17 - 18+
					// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
					// two documents; shallow comparisons work.
					/* eslint-disable eqeqeq */
					ap[ i ] == preferredDoc ? -1 :
					bp[ i ] == preferredDoc ? 1 :
					/* eslint-enable eqeqeq */
					0;
			};

			return document;
		};

		Sizzle.matches = function( expr, elements ) {
			return Sizzle( expr, null, null, elements );
		};

		Sizzle.matchesSelector = function( elem, expr ) {
			setDocument( elem );

			if ( support.matchesSelector && documentIsHTML &&
				!nonnativeSelectorCache[ expr + " " ] &&
				( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
				( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

				try {
					var ret = matches.call( elem, expr );

					// IE 9's matchesSelector returns false on disconnected nodes
					if ( ret || support.disconnectedMatch ||

						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
						return ret;
					}
				} catch ( e ) {
					nonnativeSelectorCache( expr, true );
				}
			}

			return Sizzle( expr, document, null, [ elem ] ).length > 0;
		};

		Sizzle.contains = function( context, elem ) {

			// Set document vars if needed
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( ( context.ownerDocument || context ) != document ) {
				setDocument( context );
			}
			return contains( context, elem );
		};

		Sizzle.attr = function( elem, name ) {

			// Set document vars if needed
			// Support: IE 11+, Edge 17 - 18+
			// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
			// two documents; shallow comparisons work.
			// eslint-disable-next-line eqeqeq
			if ( ( elem.ownerDocument || elem ) != document ) {
				setDocument( elem );
			}

			var fn = Expr.attrHandle[ name.toLowerCase() ],

				// Don't get fooled by Object.prototype properties (jQuery #13807)
				val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
					fn( elem, name, !documentIsHTML ) :
					undefined;

			return val !== undefined ?
				val :
				support.attributes || !documentIsHTML ?
					elem.getAttribute( name ) :
					( val = elem.getAttributeNode( name ) ) && val.specified ?
						val.value :
						null;
		};

		Sizzle.escape = function( sel ) {
			return ( sel + "" ).replace( rcssescape, fcssescape );
		};

		Sizzle.error = function( msg ) {
			throw new Error( "Syntax error, unrecognized expression: " + msg );
		};

		/**
		 * Document sorting and removing duplicates
		 * @param {ArrayLike} results
		 */
		Sizzle.uniqueSort = function( results ) {
			var elem,
				duplicates = [],
				j = 0,
				i = 0;

			// Unless we *know* we can detect duplicates, assume their presence
			hasDuplicate = !support.detectDuplicates;
			sortInput = !support.sortStable && results.slice( 0 );
			results.sort( sortOrder );

			if ( hasDuplicate ) {
				while ( ( elem = results[ i++ ] ) ) {
					if ( elem === results[ i ] ) {
						j = duplicates.push( i );
					}
				}
				while ( j-- ) {
					results.splice( duplicates[ j ], 1 );
				}
			}

			// Clear input after sorting to release objects
			// See https://github.com/jquery/sizzle/pull/225
			sortInput = null;

			return results;
		};

		/**
		 * Utility function for retrieving the text value of an array of DOM nodes
		 * @param {Array|Element} elem
		 */
		getText = Sizzle.getText = function( elem ) {
			var node,
				ret = "",
				i = 0,
				nodeType = elem.nodeType;

			if ( !nodeType ) {

				// If no nodeType, this is expected to be an array
				while ( ( node = elem[ i++ ] ) ) {

					// Do not traverse comment nodes
					ret += getText( node );
				}
			} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {

				// Use textContent for elements
				// innerText usage removed for consistency of new lines (jQuery #11153)
				if ( typeof elem.textContent === "string" ) {
					return elem.textContent;
				} else {

					// Traverse its children
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
						ret += getText( elem );
					}
				}
			} else if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}

			// Do not include comment or processing instruction nodes

			return ret;
		};

		Expr = Sizzle.selectors = {

			// Can be adjusted by the user
			cacheLength: 50,

			createPseudo: markFunction,

			match: matchExpr,

			attrHandle: {},

			find: {},

			relative: {
				">": { dir: "parentNode", first: true },
				" ": { dir: "parentNode" },
				"+": { dir: "previousSibling", first: true },
				"~": { dir: "previousSibling" }
			},

			preFilter: {
				"ATTR": function( match ) {
					match[ 1 ] = match[ 1 ].replace( runescape, funescape );

					// Move the given value to match[3] whether quoted or unquoted
					match[ 3 ] = ( match[ 3 ] || match[ 4 ] ||
						match[ 5 ] || "" ).replace( runescape, funescape );

					if ( match[ 2 ] === "~=" ) {
						match[ 3 ] = " " + match[ 3 ] + " ";
					}

					return match.slice( 0, 4 );
				},

				"CHILD": function( match ) {

					/* matches from matchExpr["CHILD"]
						1 type (only|nth|...)
						2 what (child|of-type)
						3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
						4 xn-component of xn+y argument ([+-]?\d*n|)
						5 sign of xn-component
						6 x of xn-component
						7 sign of y-component
						8 y of y-component
					*/
					match[ 1 ] = match[ 1 ].toLowerCase();

					if ( match[ 1 ].slice( 0, 3 ) === "nth" ) {

						// nth-* requires argument
						if ( !match[ 3 ] ) {
							Sizzle.error( match[ 0 ] );
						}

						// numeric x and y parameters for Expr.filter.CHILD
						// remember that false/true cast respectively to 0/1
						match[ 4 ] = +( match[ 4 ] ?
							match[ 5 ] + ( match[ 6 ] || 1 ) :
							2 * ( match[ 3 ] === "even" || match[ 3 ] === "odd" ) );
						match[ 5 ] = +( ( match[ 7 ] + match[ 8 ] ) || match[ 3 ] === "odd" );

						// other types prohibit arguments
					} else if ( match[ 3 ] ) {
						Sizzle.error( match[ 0 ] );
					}

					return match;
				},

				"PSEUDO": function( match ) {
					var excess,
						unquoted = !match[ 6 ] && match[ 2 ];

					if ( matchExpr[ "CHILD" ].test( match[ 0 ] ) ) {
						return null;
					}

					// Accept quoted arguments as-is
					if ( match[ 3 ] ) {
						match[ 2 ] = match[ 4 ] || match[ 5 ] || "";

					// Strip excess characters from unquoted arguments
					} else if ( unquoted && rpseudo.test( unquoted ) &&

						// Get excess from tokenize (recursively)
						( excess = tokenize( unquoted, true ) ) &&

						// advance to the next closing parenthesis
						( excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length ) ) {

						// excess is a negative index
						match[ 0 ] = match[ 0 ].slice( 0, excess );
						match[ 2 ] = unquoted.slice( 0, excess );
					}

					// Return only captures needed by the pseudo filter method (type and argument)
					return match.slice( 0, 3 );
				}
			},

			filter: {

				"TAG": function( nodeNameSelector ) {
					var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
					return nodeNameSelector === "*" ?
						function() {
							return true;
						} :
						function( elem ) {
							return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
						};
				},

				"CLASS": function( className ) {
					var pattern = classCache[ className + " " ];

					return pattern ||
						( pattern = new RegExp( "(^|" + whitespace +
							")" + className + "(" + whitespace + "|$)" ) ) && classCache(
								className, function( elem ) {
									return pattern.test(
										typeof elem.className === "string" && elem.className ||
										typeof elem.getAttribute !== "undefined" &&
											elem.getAttribute( "class" ) ||
										""
									);
						} );
				},

				"ATTR": function( name, operator, check ) {
					return function( elem ) {
						var result = Sizzle.attr( elem, name );

						if ( result == null ) {
							return operator === "!=";
						}
						if ( !operator ) {
							return true;
						}

						result += "";

						/* eslint-disable max-len */

						return operator === "=" ? result === check :
							operator === "!=" ? result !== check :
							operator === "^=" ? check && result.indexOf( check ) === 0 :
							operator === "*=" ? check && result.indexOf( check ) > -1 :
							operator === "$=" ? check && result.slice( -check.length ) === check :
							operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
							operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
							false;
						/* eslint-enable max-len */

					};
				},

				"CHILD": function( type, what, _argument, first, last ) {
					var simple = type.slice( 0, 3 ) !== "nth",
						forward = type.slice( -4 ) !== "last",
						ofType = what === "of-type";

					return first === 1 && last === 0 ?

						// Shortcut for :nth-*(n)
						function( elem ) {
							return !!elem.parentNode;
						} :

						function( elem, _context, xml ) {
							var cache, uniqueCache, outerCache, node, nodeIndex, start,
								dir = simple !== forward ? "nextSibling" : "previousSibling",
								parent = elem.parentNode,
								name = ofType && elem.nodeName.toLowerCase(),
								useCache = !xml && !ofType,
								diff = false;

							if ( parent ) {

								// :(first|last|only)-(child|of-type)
								if ( simple ) {
									while ( dir ) {
										node = elem;
										while ( ( node = node[ dir ] ) ) {
											if ( ofType ?
												node.nodeName.toLowerCase() === name :
												node.nodeType === 1 ) {

												return false;
											}
										}

										// Reverse direction for :only-* (if we haven't yet done so)
										start = dir = type === "only" && !start && "nextSibling";
									}
									return true;
								}

								start = [ forward ? parent.firstChild : parent.lastChild ];

								// non-xml :nth-child(...) stores cache data on `parent`
								if ( forward && useCache ) {

									// Seek `elem` from a previously-cached index

									// ...in a gzip-friendly way
									node = parent;
									outerCache = node[ expando ] || ( node[ expando ] = {} );

									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										( outerCache[ node.uniqueID ] = {} );

									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex && cache[ 2 ];
									node = nodeIndex && parent.childNodes[ nodeIndex ];

									while ( ( node = ++nodeIndex && node && node[ dir ] ||

										// Fallback to seeking `elem` from the start
										( diff = nodeIndex = 0 ) || start.pop() ) ) {

										// When found, cache indexes on `parent` and break
										if ( node.nodeType === 1 && ++diff && node === elem ) {
											uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
											break;
										}
									}

								} else {

									// Use previously-cached element index if available
									if ( useCache ) {

										// ...in a gzip-friendly way
										node = elem;
										outerCache = node[ expando ] || ( node[ expando ] = {} );

										// Support: IE <9 only
										// Defend against cloned attroperties (jQuery gh-1709)
										uniqueCache = outerCache[ node.uniqueID ] ||
											( outerCache[ node.uniqueID ] = {} );

										cache = uniqueCache[ type ] || [];
										nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
										diff = nodeIndex;
									}

									// xml :nth-child(...)
									// or :nth-last-child(...) or :nth(-last)?-of-type(...)
									if ( diff === false ) {

										// Use the same loop as above to seek `elem` from the start
										while ( ( node = ++nodeIndex && node && node[ dir ] ||
											( diff = nodeIndex = 0 ) || start.pop() ) ) {

											if ( ( ofType ?
												node.nodeName.toLowerCase() === name :
												node.nodeType === 1 ) &&
												++diff ) {

												// Cache the index of each encountered element
												if ( useCache ) {
													outerCache = node[ expando ] ||
														( node[ expando ] = {} );

													// Support: IE <9 only
													// Defend against cloned attroperties (jQuery gh-1709)
													uniqueCache = outerCache[ node.uniqueID ] ||
														( outerCache[ node.uniqueID ] = {} );

													uniqueCache[ type ] = [ dirruns, diff ];
												}

												if ( node === elem ) {
													break;
												}
											}
										}
									}
								}

								// Incorporate the offset, then check against cycle size
								diff -= last;
								return diff === first || ( diff % first === 0 && diff / first >= 0 );
							}
						};
				},

				"PSEUDO": function( pseudo, argument ) {

					// pseudo-class names are case-insensitive
					// http://www.w3.org/TR/selectors/#pseudo-classes
					// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
					// Remember that setFilters inherits from pseudos
					var args,
						fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
							Sizzle.error( "unsupported pseudo: " + pseudo );

					// The user may use createPseudo to indicate that
					// arguments are needed to create the filter function
					// just as Sizzle does
					if ( fn[ expando ] ) {
						return fn( argument );
					}

					// But maintain support for old signatures
					if ( fn.length > 1 ) {
						args = [ pseudo, pseudo, "", argument ];
						return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
							markFunction( function( seed, matches ) {
								var idx,
									matched = fn( seed, argument ),
									i = matched.length;
								while ( i-- ) {
									idx = indexOf( seed, matched[ i ] );
									seed[ idx ] = !( matches[ idx ] = matched[ i ] );
								}
							} ) :
							function( elem ) {
								return fn( elem, 0, args );
							};
					}

					return fn;
				}
			},

			pseudos: {

				// Potentially complex pseudos
				"not": markFunction( function( selector ) {

					// Trim the selector passed to compile
					// to avoid treating leading and trailing
					// spaces as combinators
					var input = [],
						results = [],
						matcher = compile( selector.replace( rtrim, "$1" ) );

					return matcher[ expando ] ?
						markFunction( function( seed, matches, _context, xml ) {
							var elem,
								unmatched = matcher( seed, null, xml, [] ),
								i = seed.length;

							// Match elements unmatched by `matcher`
							while ( i-- ) {
								if ( ( elem = unmatched[ i ] ) ) {
									seed[ i ] = !( matches[ i ] = elem );
								}
							}
						} ) :
						function( elem, _context, xml ) {
							input[ 0 ] = elem;
							matcher( input, null, xml, results );

							// Don't keep the element (issue #299)
							input[ 0 ] = null;
							return !results.pop();
						};
				} ),

				"has": markFunction( function( selector ) {
					return function( elem ) {
						return Sizzle( selector, elem ).length > 0;
					};
				} ),

				"contains": markFunction( function( text ) {
					text = text.replace( runescape, funescape );
					return function( elem ) {
						return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
					};
				} ),

				// "Whether an element is represented by a :lang() selector
				// is based solely on the element's language value
				// being equal to the identifier C,
				// or beginning with the identifier C immediately followed by "-".
				// The matching of C against the element's language value is performed case-insensitively.
				// The identifier C does not have to be a valid language name."
				// http://www.w3.org/TR/selectors/#lang-pseudo
				"lang": markFunction( function( lang ) {

					// lang value must be a valid identifier
					if ( !ridentifier.test( lang || "" ) ) {
						Sizzle.error( "unsupported lang: " + lang );
					}
					lang = lang.replace( runescape, funescape ).toLowerCase();
					return function( elem ) {
						var elemLang;
						do {
							if ( ( elemLang = documentIsHTML ?
								elem.lang :
								elem.getAttribute( "xml:lang" ) || elem.getAttribute( "lang" ) ) ) {

								elemLang = elemLang.toLowerCase();
								return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
							}
						} while ( ( elem = elem.parentNode ) && elem.nodeType === 1 );
						return false;
					};
				} ),

				// Miscellaneous
				"target": function( elem ) {
					var hash = window.location && window.location.hash;
					return hash && hash.slice( 1 ) === elem.id;
				},

				"root": function( elem ) {
					return elem === docElem;
				},

				"focus": function( elem ) {
					return elem === document.activeElement &&
						( !document.hasFocus || document.hasFocus() ) &&
						!!( elem.type || elem.href || ~elem.tabIndex );
				},

				// Boolean properties
				"enabled": createDisabledPseudo( false ),
				"disabled": createDisabledPseudo( true ),

				"checked": function( elem ) {

					// In CSS3, :checked should return both checked and selected elements
					// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
					var nodeName = elem.nodeName.toLowerCase();
					return ( nodeName === "input" && !!elem.checked ) ||
						( nodeName === "option" && !!elem.selected );
				},

				"selected": function( elem ) {

					// Accessing this property makes selected-by-default
					// options in Safari work properly
					if ( elem.parentNode ) {
						// eslint-disable-next-line no-unused-expressions
						elem.parentNode.selectedIndex;
					}

					return elem.selected === true;
				},

				// Contents
				"empty": function( elem ) {

					// http://www.w3.org/TR/selectors/#empty-pseudo
					// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
					//   but not by others (comment: 8; processing instruction: 7; etc.)
					// nodeType < 6 works because attributes (2) do not appear as children
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
						if ( elem.nodeType < 6 ) {
							return false;
						}
					}
					return true;
				},

				"parent": function( elem ) {
					return !Expr.pseudos[ "empty" ]( elem );
				},

				// Element/input types
				"header": function( elem ) {
					return rheader.test( elem.nodeName );
				},

				"input": function( elem ) {
					return rinputs.test( elem.nodeName );
				},

				"button": function( elem ) {
					var name = elem.nodeName.toLowerCase();
					return name === "input" && elem.type === "button" || name === "button";
				},

				"text": function( elem ) {
					var attr;
					return elem.nodeName.toLowerCase() === "input" &&
						elem.type === "text" &&

						// Support: IE<8
						// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
						( ( attr = elem.getAttribute( "type" ) ) == null ||
							attr.toLowerCase() === "text" );
				},

				// Position-in-collection
				"first": createPositionalPseudo( function() {
					return [ 0 ];
				} ),

				"last": createPositionalPseudo( function( _matchIndexes, length ) {
					return [ length - 1 ];
				} ),

				"eq": createPositionalPseudo( function( _matchIndexes, length, argument ) {
					return [ argument < 0 ? argument + length : argument ];
				} ),

				"even": createPositionalPseudo( function( matchIndexes, length ) {
					var i = 0;
					for ( ; i < length; i += 2 ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				} ),

				"odd": createPositionalPseudo( function( matchIndexes, length ) {
					var i = 1;
					for ( ; i < length; i += 2 ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				} ),

				"lt": createPositionalPseudo( function( matchIndexes, length, argument ) {
					var i = argument < 0 ?
						argument + length :
						argument > length ?
							length :
							argument;
					for ( ; --i >= 0; ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				} ),

				"gt": createPositionalPseudo( function( matchIndexes, length, argument ) {
					var i = argument < 0 ? argument + length : argument;
					for ( ; ++i < length; ) {
						matchIndexes.push( i );
					}
					return matchIndexes;
				} )
			}
		};

		Expr.pseudos[ "nth" ] = Expr.pseudos[ "eq" ];

		// Add button/input type pseudos
		for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
			Expr.pseudos[ i ] = createInputPseudo( i );
		}
		for ( i in { submit: true, reset: true } ) {
			Expr.pseudos[ i ] = createButtonPseudo( i );
		}

		// Easy API for creating new setFilters
		function setFilters() {}
		setFilters.prototype = Expr.filters = Expr.pseudos;
		Expr.setFilters = new setFilters();

		tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
			var matched, match, tokens, type,
				soFar, groups, preFilters,
				cached = tokenCache[ selector + " " ];

			if ( cached ) {
				return parseOnly ? 0 : cached.slice( 0 );
			}

			soFar = selector;
			groups = [];
			preFilters = Expr.preFilter;

			while ( soFar ) {

				// Comma and first run
				if ( !matched || ( match = rcomma.exec( soFar ) ) ) {
					if ( match ) {

						// Don't consume trailing commas as valid
						soFar = soFar.slice( match[ 0 ].length ) || soFar;
					}
					groups.push( ( tokens = [] ) );
				}

				matched = false;

				// Combinators
				if ( ( match = rcombinators.exec( soFar ) ) ) {
					matched = match.shift();
					tokens.push( {
						value: matched,

						// Cast descendant combinators to space
						type: match[ 0 ].replace( rtrim, " " )
					} );
					soFar = soFar.slice( matched.length );
				}

				// Filters
				for ( type in Expr.filter ) {
					if ( ( match = matchExpr[ type ].exec( soFar ) ) && ( !preFilters[ type ] ||
						( match = preFilters[ type ]( match ) ) ) ) {
						matched = match.shift();
						tokens.push( {
							value: matched,
							type: type,
							matches: match
						} );
						soFar = soFar.slice( matched.length );
					}
				}

				if ( !matched ) {
					break;
				}
			}

			// Return the length of the invalid excess
			// if we're just parsing
			// Otherwise, throw an error or return tokens
			return parseOnly ?
				soFar.length :
				soFar ?
					Sizzle.error( selector ) :

					// Cache the tokens
					tokenCache( selector, groups ).slice( 0 );
		};

		function toSelector( tokens ) {
			var i = 0,
				len = tokens.length,
				selector = "";
			for ( ; i < len; i++ ) {
				selector += tokens[ i ].value;
			}
			return selector;
		}

		function addCombinator( matcher, combinator, base ) {
			var dir = combinator.dir,
				skip = combinator.next,
				key = skip || dir,
				checkNonElements = base && key === "parentNode",
				doneName = done++;

			return combinator.first ?

				// Check against closest ancestor/preceding element
				function( elem, context, xml ) {
					while ( ( elem = elem[ dir ] ) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							return matcher( elem, context, xml );
						}
					}
					return false;
				} :

				// Check against all ancestor/preceding elements
				function( elem, context, xml ) {
					var oldCache, uniqueCache, outerCache,
						newCache = [ dirruns, doneName ];

					// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
					if ( xml ) {
						while ( ( elem = elem[ dir ] ) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								if ( matcher( elem, context, xml ) ) {
									return true;
								}
							}
						}
					} else {
						while ( ( elem = elem[ dir ] ) ) {
							if ( elem.nodeType === 1 || checkNonElements ) {
								outerCache = elem[ expando ] || ( elem[ expando ] = {} );

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ elem.uniqueID ] ||
									( outerCache[ elem.uniqueID ] = {} );

								if ( skip && skip === elem.nodeName.toLowerCase() ) {
									elem = elem[ dir ] || elem;
								} else if ( ( oldCache = uniqueCache[ key ] ) &&
									oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

									// Assign to newCache so results back-propagate to previous elements
									return ( newCache[ 2 ] = oldCache[ 2 ] );
								} else {

									// Reuse newcache so results back-propagate to previous elements
									uniqueCache[ key ] = newCache;

									// A match means we're done; a fail means we have to keep checking
									if ( ( newCache[ 2 ] = matcher( elem, context, xml ) ) ) {
										return true;
									}
								}
							}
						}
					}
					return false;
				};
		}

		function elementMatcher( matchers ) {
			return matchers.length > 1 ?
				function( elem, context, xml ) {
					var i = matchers.length;
					while ( i-- ) {
						if ( !matchers[ i ]( elem, context, xml ) ) {
							return false;
						}
					}
					return true;
				} :
				matchers[ 0 ];
		}

		function multipleContexts( selector, contexts, results ) {
			var i = 0,
				len = contexts.length;
			for ( ; i < len; i++ ) {
				Sizzle( selector, contexts[ i ], results );
			}
			return results;
		}

		function condense( unmatched, map, filter, context, xml ) {
			var elem,
				newUnmatched = [],
				i = 0,
				len = unmatched.length,
				mapped = map != null;

			for ( ; i < len; i++ ) {
				if ( ( elem = unmatched[ i ] ) ) {
					if ( !filter || filter( elem, context, xml ) ) {
						newUnmatched.push( elem );
						if ( mapped ) {
							map.push( i );
						}
					}
				}
			}

			return newUnmatched;
		}

		function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
			if ( postFilter && !postFilter[ expando ] ) {
				postFilter = setMatcher( postFilter );
			}
			if ( postFinder && !postFinder[ expando ] ) {
				postFinder = setMatcher( postFinder, postSelector );
			}
			return markFunction( function( seed, results, context, xml ) {
				var temp, i, elem,
					preMap = [],
					postMap = [],
					preexisting = results.length,

					// Get initial elements from seed or context
					elems = seed || multipleContexts(
						selector || "*",
						context.nodeType ? [ context ] : context,
						[]
					),

					// Prefilter to get matcher input, preserving a map for seed-results synchronization
					matcherIn = preFilter && ( seed || !selector ) ?
						condense( elems, preMap, preFilter, context, xml ) :
						elems,

					matcherOut = matcher ?

						// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
						postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

							// ...intermediate processing is necessary
							[] :

							// ...otherwise use results directly
							results :
						matcherIn;

				// Find primary matches
				if ( matcher ) {
					matcher( matcherIn, matcherOut, context, xml );
				}

				// Apply postFilter
				if ( postFilter ) {
					temp = condense( matcherOut, postMap );
					postFilter( temp, [], context, xml );

					// Un-match failing elements by moving them back to matcherIn
					i = temp.length;
					while ( i-- ) {
						if ( ( elem = temp[ i ] ) ) {
							matcherOut[ postMap[ i ] ] = !( matcherIn[ postMap[ i ] ] = elem );
						}
					}
				}

				if ( seed ) {
					if ( postFinder || preFilter ) {
						if ( postFinder ) {

							// Get the final matcherOut by condensing this intermediate into postFinder contexts
							temp = [];
							i = matcherOut.length;
							while ( i-- ) {
								if ( ( elem = matcherOut[ i ] ) ) {

									// Restore matcherIn since elem is not yet a final match
									temp.push( ( matcherIn[ i ] = elem ) );
								}
							}
							postFinder( null, ( matcherOut = [] ), temp, xml );
						}

						// Move matched elements from seed to results to keep them synchronized
						i = matcherOut.length;
						while ( i-- ) {
							if ( ( elem = matcherOut[ i ] ) &&
								( temp = postFinder ? indexOf( seed, elem ) : preMap[ i ] ) > -1 ) {

								seed[ temp ] = !( results[ temp ] = elem );
							}
						}
					}

				// Add elements to results, through postFinder if defined
				} else {
					matcherOut = condense(
						matcherOut === results ?
							matcherOut.splice( preexisting, matcherOut.length ) :
							matcherOut
					);
					if ( postFinder ) {
						postFinder( null, results, matcherOut, xml );
					} else {
						push.apply( results, matcherOut );
					}
				}
			} );
		}

		function matcherFromTokens( tokens ) {
			var checkContext, matcher, j,
				len = tokens.length,
				leadingRelative = Expr.relative[ tokens[ 0 ].type ],
				implicitRelative = leadingRelative || Expr.relative[ " " ],
				i = leadingRelative ? 1 : 0,

				// The foundational matcher ensures that elements are reachable from top-level context(s)
				matchContext = addCombinator( function( elem ) {
					return elem === checkContext;
				}, implicitRelative, true ),
				matchAnyContext = addCombinator( function( elem ) {
					return indexOf( checkContext, elem ) > -1;
				}, implicitRelative, true ),
				matchers = [ function( elem, context, xml ) {
					var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
						( checkContext = context ).nodeType ?
							matchContext( elem, context, xml ) :
							matchAnyContext( elem, context, xml ) );

					// Avoid hanging onto element (issue #299)
					checkContext = null;
					return ret;
				} ];

			for ( ; i < len; i++ ) {
				if ( ( matcher = Expr.relative[ tokens[ i ].type ] ) ) {
					matchers = [ addCombinator( elementMatcher( matchers ), matcher ) ];
				} else {
					matcher = Expr.filter[ tokens[ i ].type ].apply( null, tokens[ i ].matches );

					// Return special upon seeing a positional matcher
					if ( matcher[ expando ] ) {

						// Find the next relative operator (if any) for proper handling
						j = ++i;
						for ( ; j < len; j++ ) {
							if ( Expr.relative[ tokens[ j ].type ] ) {
								break;
							}
						}
						return setMatcher(
							i > 1 && elementMatcher( matchers ),
							i > 1 && toSelector(

							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens
								.slice( 0, i - 1 )
								.concat( { value: tokens[ i - 2 ].type === " " ? "*" : "" } )
							).replace( rtrim, "$1" ),
							matcher,
							i < j && matcherFromTokens( tokens.slice( i, j ) ),
							j < len && matcherFromTokens( ( tokens = tokens.slice( j ) ) ),
							j < len && toSelector( tokens )
						);
					}
					matchers.push( matcher );
				}
			}

			return elementMatcher( matchers );
		}

		function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
			var bySet = setMatchers.length > 0,
				byElement = elementMatchers.length > 0,
				superMatcher = function( seed, context, xml, results, outermost ) {
					var elem, j, matcher,
						matchedCount = 0,
						i = "0",
						unmatched = seed && [],
						setMatched = [],
						contextBackup = outermostContext,

						// We must always have either seed elements or outermost context
						elems = seed || byElement && Expr.find[ "TAG" ]( "*", outermost ),

						// Use integer dirruns iff this is the outermost matcher
						dirrunsUnique = ( dirruns += contextBackup == null ? 1 : Math.random() || 0.1 ),
						len = elems.length;

					if ( outermost ) {

						// Support: IE 11+, Edge 17 - 18+
						// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
						// two documents; shallow comparisons work.
						// eslint-disable-next-line eqeqeq
						outermostContext = context == document || context || outermost;
					}

					// Add elements passing elementMatchers directly to results
					// Support: IE<9, Safari
					// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
					for ( ; i !== len && ( elem = elems[ i ] ) != null; i++ ) {
						if ( byElement && elem ) {
							j = 0;

							// Support: IE 11+, Edge 17 - 18+
							// IE/Edge sometimes throw a "Permission denied" error when strict-comparing
							// two documents; shallow comparisons work.
							// eslint-disable-next-line eqeqeq
							if ( !context && elem.ownerDocument != document ) {
								setDocument( elem );
								xml = !documentIsHTML;
							}
							while ( ( matcher = elementMatchers[ j++ ] ) ) {
								if ( matcher( elem, context || document, xml ) ) {
									results.push( elem );
									break;
								}
							}
							if ( outermost ) {
								dirruns = dirrunsUnique;
							}
						}

						// Track unmatched elements for set filters
						if ( bySet ) {

							// They will have gone through all possible matchers
							if ( ( elem = !matcher && elem ) ) {
								matchedCount--;
							}

							// Lengthen the array for every element, matched or not
							if ( seed ) {
								unmatched.push( elem );
							}
						}
					}

					// `i` is now the count of elements visited above, and adding it to `matchedCount`
					// makes the latter nonnegative.
					matchedCount += i;

					// Apply set filters to unmatched elements
					// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
					// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
					// no element matchers and no seed.
					// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
					// case, which will result in a "00" `matchedCount` that differs from `i` but is also
					// numerically zero.
					if ( bySet && i !== matchedCount ) {
						j = 0;
						while ( ( matcher = setMatchers[ j++ ] ) ) {
							matcher( unmatched, setMatched, context, xml );
						}

						if ( seed ) {

							// Reintegrate element matches to eliminate the need for sorting
							if ( matchedCount > 0 ) {
								while ( i-- ) {
									if ( !( unmatched[ i ] || setMatched[ i ] ) ) {
										setMatched[ i ] = pop.call( results );
									}
								}
							}

							// Discard index placeholder values to get only actual matches
							setMatched = condense( setMatched );
						}

						// Add matches to results
						push.apply( results, setMatched );

						// Seedless set matches succeeding multiple successful matchers stipulate sorting
						if ( outermost && !seed && setMatched.length > 0 &&
							( matchedCount + setMatchers.length ) > 1 ) {

							Sizzle.uniqueSort( results );
						}
					}

					// Override manipulation of globals by nested matchers
					if ( outermost ) {
						dirruns = dirrunsUnique;
						outermostContext = contextBackup;
					}

					return unmatched;
				};

			return bySet ?
				markFunction( superMatcher ) :
				superMatcher;
		}

		compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
			var i,
				setMatchers = [],
				elementMatchers = [],
				cached = compilerCache[ selector + " " ];

			if ( !cached ) {

				// Generate a function of recursive functions that can be used to check each element
				if ( !match ) {
					match = tokenize( selector );
				}
				i = match.length;
				while ( i-- ) {
					cached = matcherFromTokens( match[ i ] );
					if ( cached[ expando ] ) {
						setMatchers.push( cached );
					} else {
						elementMatchers.push( cached );
					}
				}

				// Cache the compiled function
				cached = compilerCache(
					selector,
					matcherFromGroupMatchers( elementMatchers, setMatchers )
				);

				// Save selector and tokenization
				cached.selector = selector;
			}
			return cached;
		};

		/**
		 * A low-level selection function that works with Sizzle's compiled
		 *  selector functions
		 * @param {String|Function} selector A selector or a pre-compiled
		 *  selector function built with Sizzle.compile
		 * @param {Element} context
		 * @param {Array} [results]
		 * @param {Array} [seed] A set of elements to match against
		 */
		select = Sizzle.select = function( selector, context, results, seed ) {
			var i, tokens, token, type, find,
				compiled = typeof selector === "function" && selector,
				match = !seed && tokenize( ( selector = compiled.selector || selector ) );

			results = results || [];

			// Try to minimize operations if there is only one selector in the list and no seed
			// (the latter of which guarantees us context)
			if ( match.length === 1 ) {

				// Reduce context if the leading compound selector is an ID
				tokens = match[ 0 ] = match[ 0 ].slice( 0 );
				if ( tokens.length > 2 && ( token = tokens[ 0 ] ).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[ 1 ].type ] ) {

					context = ( Expr.find[ "ID" ]( token.matches[ 0 ]
						.replace( runescape, funescape ), context ) || [] )[ 0 ];
					if ( !context ) {
						return results;

					// Precompiled matchers will still verify ancestry, so step up a level
					} else if ( compiled ) {
						context = context.parentNode;
					}

					selector = selector.slice( tokens.shift().value.length );
				}

				// Fetch a seed set for right-to-left matching
				i = matchExpr[ "needsContext" ].test( selector ) ? 0 : tokens.length;
				while ( i-- ) {
					token = tokens[ i ];

					// Abort if we hit a combinator
					if ( Expr.relative[ ( type = token.type ) ] ) {
						break;
					}
					if ( ( find = Expr.find[ type ] ) ) {

						// Search, expanding context for leading sibling combinators
						if ( ( seed = find(
							token.matches[ 0 ].replace( runescape, funescape ),
							rsibling.test( tokens[ 0 ].type ) && testContext( context.parentNode ) ||
								context
						) ) ) {

							// If seed is empty or no tokens remain, we can return early
							tokens.splice( i, 1 );
							selector = seed.length && toSelector( tokens );
							if ( !selector ) {
								push.apply( results, seed );
								return results;
							}

							break;
						}
					}
				}
			}

			// Compile and execute a filtering function if one is not provided
			// Provide `match` to avoid retokenization if we modified the selector above
			( compiled || compile( selector, match ) )(
				seed,
				context,
				!documentIsHTML,
				results,
				!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
			);
			return results;
		};

		// One-time assignments

		// Sort stability
		support.sortStable = expando.split( "" ).sort( sortOrder ).join( "" ) === expando;

		// Support: Chrome 14-35+
		// Always assume duplicates if they aren't passed to the comparison function
		support.detectDuplicates = !!hasDuplicate;

		// Initialize against the default document
		setDocument();

		// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
		// Detached nodes confoundingly follow *each other*
		support.sortDetached = assert( function( el ) {

			// Should return 1, but returns 4 (following)
			return el.compareDocumentPosition( document.createElement( "fieldset" ) ) & 1;
		} );

		// Support: IE<8
		// Prevent attribute/property "interpolation"
		// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
		if ( !assert( function( el ) {
			el.innerHTML = "<a href='#'></a>";
			return el.firstChild.getAttribute( "href" ) === "#";
		} ) ) {
			addHandle( "type|href|height|width", function( elem, name, isXML ) {
				if ( !isXML ) {
					return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
				}
			} );
		}

		// Support: IE<9
		// Use defaultValue in place of getAttribute("value")
		if ( !support.attributes || !assert( function( el ) {
			el.innerHTML = "<input/>";
			el.firstChild.setAttribute( "value", "" );
			return el.firstChild.getAttribute( "value" ) === "";
		} ) ) {
			addHandle( "value", function( elem, _name, isXML ) {
				if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
					return elem.defaultValue;
				}
			} );
		}

		// Support: IE<9
		// Use getAttributeNode to fetch booleans when getAttribute lies
		if ( !assert( function( el ) {
			return el.getAttribute( "disabled" ) == null;
		} ) ) {
			addHandle( booleans, function( elem, name, isXML ) {
				var val;
				if ( !isXML ) {
					return elem[ name ] === true ? name.toLowerCase() :
						( val = elem.getAttributeNode( name ) ) && val.specified ?
							val.value :
							null;
				}
			} );
		}

		return Sizzle;

		} )( window );



		jQuery.find = Sizzle;
		jQuery.expr = Sizzle.selectors;

		// Deprecated
		jQuery.expr[ ":" ] = jQuery.expr.pseudos;
		jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
		jQuery.text = Sizzle.getText;
		jQuery.isXMLDoc = Sizzle.isXML;
		jQuery.contains = Sizzle.contains;
		jQuery.escapeSelector = Sizzle.escape;




		var dir = function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		};


		var siblings = function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		};


		var rneedsContext = jQuery.expr.match.needsContext;



		function nodeName( elem, name ) {

			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

		}
		var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



		// Implement the identical functionality for filter and not
		function winnow( elements, qualifier, not ) {
			if ( isFunction( qualifier ) ) {
				return jQuery.grep( elements, function( elem, i ) {
					return !!qualifier.call( elem, i, elem ) !== not;
				} );
			}

			// Single element
			if ( qualifier.nodeType ) {
				return jQuery.grep( elements, function( elem ) {
					return ( elem === qualifier ) !== not;
				} );
			}

			// Arraylike of elements (jQuery, arguments, Array)
			if ( typeof qualifier !== "string" ) {
				return jQuery.grep( elements, function( elem ) {
					return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
				} );
			}

			// Filtered directly for both simple and complex selectors
			return jQuery.filter( qualifier, elements, not );
		}

		jQuery.filter = function( expr, elems, not ) {
			var elem = elems[ 0 ];

			if ( not ) {
				expr = ":not(" + expr + ")";
			}

			if ( elems.length === 1 && elem.nodeType === 1 ) {
				return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
			}

			return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
		};

		jQuery.fn.extend( {
			find: function( selector ) {
				var i, ret,
					len = this.length,
					self = this;

				if ( typeof selector !== "string" ) {
					return this.pushStack( jQuery( selector ).filter( function() {
						for ( i = 0; i < len; i++ ) {
							if ( jQuery.contains( self[ i ], this ) ) {
								return true;
							}
						}
					} ) );
				}

				ret = this.pushStack( [] );

				for ( i = 0; i < len; i++ ) {
					jQuery.find( selector, self[ i ], ret );
				}

				return len > 1 ? jQuery.uniqueSort( ret ) : ret;
			},
			filter: function( selector ) {
				return this.pushStack( winnow( this, selector || [], false ) );
			},
			not: function( selector ) {
				return this.pushStack( winnow( this, selector || [], true ) );
			},
			is: function( selector ) {
				return !!winnow(
					this,

					// If this is a positional/relative selector, check membership in the returned set
					// so $("p:first").is("p:last") won't return true for a doc with two "p".
					typeof selector === "string" && rneedsContext.test( selector ) ?
						jQuery( selector ) :
						selector || [],
					false
				).length;
			}
		} );


		// Initialize a jQuery object


		// A central reference to the root jQuery(document)
		var rootjQuery,

			// A simple way to check for HTML strings
			// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
			// Strict HTML recognition (#11290: must start with <)
			// Shortcut simple #id case for speed
			rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

			init = jQuery.fn.init = function( selector, context, root ) {
				var match, elem;

				// HANDLE: $(""), $(null), $(undefined), $(false)
				if ( !selector ) {
					return this;
				}

				// Method init() accepts an alternate rootjQuery
				// so migrate can support jQuery.sub (gh-2101)
				root = root || rootjQuery;

				// Handle HTML strings
				if ( typeof selector === "string" ) {
					if ( selector[ 0 ] === "<" &&
						selector[ selector.length - 1 ] === ">" &&
						selector.length >= 3 ) {

						// Assume that strings that start and end with <> are HTML and skip the regex check
						match = [ null, selector, null ];

					} else {
						match = rquickExpr.exec( selector );
					}

					// Match html or make sure no context is specified for #id
					if ( match && ( match[ 1 ] || !context ) ) {

						// HANDLE: $(html) -> $(array)
						if ( match[ 1 ] ) {
							context = context instanceof jQuery ? context[ 0 ] : context;

							// Option to run scripts is true for back-compat
							// Intentionally let the error be thrown if parseHTML is not present
							jQuery.merge( this, jQuery.parseHTML(
								match[ 1 ],
								context && context.nodeType ? context.ownerDocument || context : document,
								true
							) );

							// HANDLE: $(html, props)
							if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
								for ( match in context ) {

									// Properties of context are called as methods if possible
									if ( isFunction( this[ match ] ) ) {
										this[ match ]( context[ match ] );

									// ...and otherwise set as attributes
									} else {
										this.attr( match, context[ match ] );
									}
								}
							}

							return this;

						// HANDLE: $(#id)
						} else {
							elem = document.getElementById( match[ 2 ] );

							if ( elem ) {

								// Inject the element directly into the jQuery object
								this[ 0 ] = elem;
								this.length = 1;
							}
							return this;
						}

					// HANDLE: $(expr, $(...))
					} else if ( !context || context.jquery ) {
						return ( context || root ).find( selector );

					// HANDLE: $(expr, context)
					// (which is just equivalent to: $(context).find(expr)
					} else {
						return this.constructor( context ).find( selector );
					}

				// HANDLE: $(DOMElement)
				} else if ( selector.nodeType ) {
					this[ 0 ] = selector;
					this.length = 1;
					return this;

				// HANDLE: $(function)
				// Shortcut for document ready
				} else if ( isFunction( selector ) ) {
					return root.ready !== undefined ?
						root.ready( selector ) :

						// Execute immediately if ready is not present
						selector( jQuery );
				}

				return jQuery.makeArray( selector, this );
			};

		// Give the init function the jQuery prototype for later instantiation
		init.prototype = jQuery.fn;

		// Initialize central reference
		rootjQuery = jQuery( document );


		var rparentsprev = /^(?:parents|prev(?:Until|All))/,

			// Methods guaranteed to produce a unique set when starting from a unique set
			guaranteedUnique = {
				children: true,
				contents: true,
				next: true,
				prev: true
			};

		jQuery.fn.extend( {
			has: function( target ) {
				var targets = jQuery( target, this ),
					l = targets.length;

				return this.filter( function() {
					var i = 0;
					for ( ; i < l; i++ ) {
						if ( jQuery.contains( this, targets[ i ] ) ) {
							return true;
						}
					}
				} );
			},

			closest: function( selectors, context ) {
				var cur,
					i = 0,
					l = this.length,
					matched = [],
					targets = typeof selectors !== "string" && jQuery( selectors );

				// Positional selectors never match, since there's no _selection_ context
				if ( !rneedsContext.test( selectors ) ) {
					for ( ; i < l; i++ ) {
						for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

							// Always skip document fragments
							if ( cur.nodeType < 11 && ( targets ?
								targets.index( cur ) > -1 :

								// Don't pass non-elements to Sizzle
								cur.nodeType === 1 &&
									jQuery.find.matchesSelector( cur, selectors ) ) ) {

								matched.push( cur );
								break;
							}
						}
					}
				}

				return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
			},

			// Determine the position of an element within the set
			index: function( elem ) {

				// No argument, return index in parent
				if ( !elem ) {
					return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
				}

				// Index in selector
				if ( typeof elem === "string" ) {
					return indexOf.call( jQuery( elem ), this[ 0 ] );
				}

				// Locate the position of the desired element
				return indexOf.call( this,

					// If it receives a jQuery object, the first element is used
					elem.jquery ? elem[ 0 ] : elem
				);
			},

			add: function( selector, context ) {
				return this.pushStack(
					jQuery.uniqueSort(
						jQuery.merge( this.get(), jQuery( selector, context ) )
					)
				);
			},

			addBack: function( selector ) {
				return this.add( selector == null ?
					this.prevObject : this.prevObject.filter( selector )
				);
			}
		} );

		function sibling( cur, dir ) {
			while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
			return cur;
		}

		jQuery.each( {
			parent: function( elem ) {
				var parent = elem.parentNode;
				return parent && parent.nodeType !== 11 ? parent : null;
			},
			parents: function( elem ) {
				return dir( elem, "parentNode" );
			},
			parentsUntil: function( elem, _i, until ) {
				return dir( elem, "parentNode", until );
			},
			next: function( elem ) {
				return sibling( elem, "nextSibling" );
			},
			prev: function( elem ) {
				return sibling( elem, "previousSibling" );
			},
			nextAll: function( elem ) {
				return dir( elem, "nextSibling" );
			},
			prevAll: function( elem ) {
				return dir( elem, "previousSibling" );
			},
			nextUntil: function( elem, _i, until ) {
				return dir( elem, "nextSibling", until );
			},
			prevUntil: function( elem, _i, until ) {
				return dir( elem, "previousSibling", until );
			},
			siblings: function( elem ) {
				return siblings( ( elem.parentNode || {} ).firstChild, elem );
			},
			children: function( elem ) {
				return siblings( elem.firstChild );
			},
			contents: function( elem ) {
				if ( elem.contentDocument != null &&

					// Support: IE 11+
					// <object> elements with no `data` attribute has an object
					// `contentDocument` with a `null` prototype.
					getProto( elem.contentDocument ) ) {

					return elem.contentDocument;
				}

				// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
				// Treat the template element as a regular one in browsers that
				// don't support it.
				if ( nodeName( elem, "template" ) ) {
					elem = elem.content || elem;
				}

				return jQuery.merge( [], elem.childNodes );
			}
		}, function( name, fn ) {
			jQuery.fn[ name ] = function( until, selector ) {
				var matched = jQuery.map( this, fn, until );

				if ( name.slice( -5 ) !== "Until" ) {
					selector = until;
				}

				if ( selector && typeof selector === "string" ) {
					matched = jQuery.filter( selector, matched );
				}

				if ( this.length > 1 ) {

					// Remove duplicates
					if ( !guaranteedUnique[ name ] ) {
						jQuery.uniqueSort( matched );
					}

					// Reverse order for parents* and prev-derivatives
					if ( rparentsprev.test( name ) ) {
						matched.reverse();
					}
				}

				return this.pushStack( matched );
			};
		} );
		var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



		// Convert String-formatted options into Object-formatted ones
		function createOptions( options ) {
			var object = {};
			jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
				object[ flag ] = true;
			} );
			return object;
		}

		/*
		 * Create a callback list using the following parameters:
		 *
		 *	options: an optional list of space-separated options that will change how
		 *			the callback list behaves or a more traditional option object
		 *
		 * By default a callback list will act like an event callback list and can be
		 * "fired" multiple times.
		 *
		 * Possible options:
		 *
		 *	once:			will ensure the callback list can only be fired once (like a Deferred)
		 *
		 *	memory:			will keep track of previous values and will call any callback added
		 *					after the list has been fired right away with the latest "memorized"
		 *					values (like a Deferred)
		 *
		 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
		 *
		 *	stopOnFalse:	interrupt callings when a callback returns false
		 *
		 */
		jQuery.Callbacks = function( options ) {

			// Convert options from String-formatted to Object-formatted if needed
			// (we check in cache first)
			options = typeof options === "string" ?
				createOptions( options ) :
				jQuery.extend( {}, options );

			var // Flag to know if list is currently firing
				firing,

				// Last fire value for non-forgettable lists
				memory,

				// Flag to know if list was already fired
				fired,

				// Flag to prevent firing
				locked,

				// Actual callback list
				list = [],

				// Queue of execution data for repeatable lists
				queue = [],

				// Index of currently firing callback (modified by add/remove as needed)
				firingIndex = -1,

				// Fire callbacks
				fire = function() {

					// Enforce single-firing
					locked = locked || options.once;

					// Execute callbacks for all pending executions,
					// respecting firingIndex overrides and runtime changes
					fired = firing = true;
					for ( ; queue.length; firingIndex = -1 ) {
						memory = queue.shift();
						while ( ++firingIndex < list.length ) {

							// Run callback and check for early termination
							if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
								options.stopOnFalse ) {

								// Jump to end and forget the data so .add doesn't re-fire
								firingIndex = list.length;
								memory = false;
							}
						}
					}

					// Forget the data if we're done with it
					if ( !options.memory ) {
						memory = false;
					}

					firing = false;

					// Clean up if we're done firing for good
					if ( locked ) {

						// Keep an empty list if we have data for future add calls
						if ( memory ) {
							list = [];

						// Otherwise, this object is spent
						} else {
							list = "";
						}
					}
				},

				// Actual Callbacks object
				self = {

					// Add a callback or a collection of callbacks to the list
					add: function() {
						if ( list ) {

							// If we have memory from a past run, we should fire after adding
							if ( memory && !firing ) {
								firingIndex = list.length - 1;
								queue.push( memory );
							}

							( function add( args ) {
								jQuery.each( args, function( _, arg ) {
									if ( isFunction( arg ) ) {
										if ( !options.unique || !self.has( arg ) ) {
											list.push( arg );
										}
									} else if ( arg && arg.length && toType( arg ) !== "string" ) {

										// Inspect recursively
										add( arg );
									}
								} );
							} )( arguments );

							if ( memory && !firing ) {
								fire();
							}
						}
						return this;
					},

					// Remove a callback from the list
					remove: function() {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );

								// Handle firing indexes
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						} );
						return this;
					},

					// Check if a given callback is in the list.
					// If no argument is given, return whether or not list has callbacks attached.
					has: function( fn ) {
						return fn ?
							jQuery.inArray( fn, list ) > -1 :
							list.length > 0;
					},

					// Remove all callbacks from the list
					empty: function() {
						if ( list ) {
							list = [];
						}
						return this;
					},

					// Disable .fire and .add
					// Abort any current/pending executions
					// Clear all callbacks and values
					disable: function() {
						locked = queue = [];
						list = memory = "";
						return this;
					},
					disabled: function() {
						return !list;
					},

					// Disable .fire
					// Also disable .add unless we have memory (since it would have no effect)
					// Abort any pending executions
					lock: function() {
						locked = queue = [];
						if ( !memory && !firing ) {
							list = memory = "";
						}
						return this;
					},
					locked: function() {
						return !!locked;
					},

					// Call all callbacks with the given context and arguments
					fireWith: function( context, args ) {
						if ( !locked ) {
							args = args || [];
							args = [ context, args.slice ? args.slice() : args ];
							queue.push( args );
							if ( !firing ) {
								fire();
							}
						}
						return this;
					},

					// Call all the callbacks with the given arguments
					fire: function() {
						self.fireWith( this, arguments );
						return this;
					},

					// To know if the callbacks have already been called at least once
					fired: function() {
						return !!fired;
					}
				};

			return self;
		};


		function Identity( v ) {
			return v;
		}
		function Thrower( ex ) {
			throw ex;
		}

		function adoptValue( value, resolve, reject, noValue ) {
			var method;

			try {

				// Check for promise aspect first to privilege synchronous behavior
				if ( value && isFunction( ( method = value.promise ) ) ) {
					method.call( value ).done( resolve ).fail( reject );

				// Other thenables
				} else if ( value && isFunction( ( method = value.then ) ) ) {
					method.call( value, resolve, reject );

				// Other non-thenables
				} else {

					// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
					// * false: [ value ].slice( 0 ) => resolve( value )
					// * true: [ value ].slice( 1 ) => resolve()
					resolve.apply( undefined, [ value ].slice( noValue ) );
				}

			// For Promises/A+, convert exceptions into rejections
			// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
			// Deferred#then to conditionally suppress rejection.
			} catch ( value ) {

				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				reject.apply( undefined, [ value ] );
			}
		}

		jQuery.extend( {

			Deferred: function( func ) {
				var tuples = [

						// action, add listener, callbacks,
						// ... .then handlers, argument index, [final state]
						[ "notify", "progress", jQuery.Callbacks( "memory" ),
							jQuery.Callbacks( "memory" ), 2 ],
						[ "resolve", "done", jQuery.Callbacks( "once memory" ),
							jQuery.Callbacks( "once memory" ), 0, "resolved" ],
						[ "reject", "fail", jQuery.Callbacks( "once memory" ),
							jQuery.Callbacks( "once memory" ), 1, "rejected" ]
					],
					state = "pending",
					promise = {
						state: function() {
							return state;
						},
						always: function() {
							deferred.done( arguments ).fail( arguments );
							return this;
						},
						"catch": function( fn ) {
							return promise.then( null, fn );
						},

						// Keep pipe for back-compat
						pipe: function( /* fnDone, fnFail, fnProgress */ ) {
							var fns = arguments;

							return jQuery.Deferred( function( newDefer ) {
								jQuery.each( tuples, function( _i, tuple ) {

									// Map tuples (progress, done, fail) to arguments (done, fail, progress)
									var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

									// deferred.progress(function() { bind to newDefer or newDefer.notify })
									// deferred.done(function() { bind to newDefer or newDefer.resolve })
									// deferred.fail(function() { bind to newDefer or newDefer.reject })
									deferred[ tuple[ 1 ] ]( function() {
										var returned = fn && fn.apply( this, arguments );
										if ( returned && isFunction( returned.promise ) ) {
											returned.promise()
												.progress( newDefer.notify )
												.done( newDefer.resolve )
												.fail( newDefer.reject );
										} else {
											newDefer[ tuple[ 0 ] + "With" ](
												this,
												fn ? [ returned ] : arguments
											);
										}
									} );
								} );
								fns = null;
							} ).promise();
						},
						then: function( onFulfilled, onRejected, onProgress ) {
							var maxDepth = 0;
							function resolve( depth, deferred, handler, special ) {
								return function() {
									var that = this,
										args = arguments,
										mightThrow = function() {
											var returned, then;

											// Support: Promises/A+ section 2.3.3.3.3
											// https://promisesaplus.com/#point-59
											// Ignore double-resolution attempts
											if ( depth < maxDepth ) {
												return;
											}

											returned = handler.apply( that, args );

											// Support: Promises/A+ section 2.3.1
											// https://promisesaplus.com/#point-48
											if ( returned === deferred.promise() ) {
												throw new TypeError( "Thenable self-resolution" );
											}

											// Support: Promises/A+ sections 2.3.3.1, 3.5
											// https://promisesaplus.com/#point-54
											// https://promisesaplus.com/#point-75
											// Retrieve `then` only once
											then = returned &&

												// Support: Promises/A+ section 2.3.4
												// https://promisesaplus.com/#point-64
												// Only check objects and functions for thenability
												( typeof returned === "object" ||
													typeof returned === "function" ) &&
												returned.then;

											// Handle a returned thenable
											if ( isFunction( then ) ) {

												// Special processors (notify) just wait for resolution
												if ( special ) {
													then.call(
														returned,
														resolve( maxDepth, deferred, Identity, special ),
														resolve( maxDepth, deferred, Thrower, special )
													);

												// Normal processors (resolve) also hook into progress
												} else {

													// ...and disregard older resolution values
													maxDepth++;

													then.call(
														returned,
														resolve( maxDepth, deferred, Identity, special ),
														resolve( maxDepth, deferred, Thrower, special ),
														resolve( maxDepth, deferred, Identity,
															deferred.notifyWith )
													);
												}

											// Handle all other returned values
											} else {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Identity ) {
													that = undefined;
													args = [ returned ];
												}

												// Process the value(s)
												// Default process is resolve
												( special || deferred.resolveWith )( that, args );
											}
										},

										// Only normal processors (resolve) catch and reject exceptions
										process = special ?
											mightThrow :
											function() {
												try {
													mightThrow();
												} catch ( e ) {

													if ( jQuery.Deferred.exceptionHook ) {
														jQuery.Deferred.exceptionHook( e,
															process.stackTrace );
													}

													// Support: Promises/A+ section 2.3.3.3.4.1
													// https://promisesaplus.com/#point-61
													// Ignore post-resolution exceptions
													if ( depth + 1 >= maxDepth ) {

														// Only substitute handlers pass on context
														// and multiple values (non-spec behavior)
														if ( handler !== Thrower ) {
															that = undefined;
															args = [ e ];
														}

														deferred.rejectWith( that, args );
													}
												}
											};

									// Support: Promises/A+ section 2.3.3.3.1
									// https://promisesaplus.com/#point-57
									// Re-resolve promises immediately to dodge false rejection from
									// subsequent errors
									if ( depth ) {
										process();
									} else {

										// Call an optional hook to record the stack, in case of exception
										// since it's otherwise lost when execution goes async
										if ( jQuery.Deferred.getStackHook ) {
											process.stackTrace = jQuery.Deferred.getStackHook();
										}
										window.setTimeout( process );
									}
								};
							}

							return jQuery.Deferred( function( newDefer ) {

								// progress_handlers.add( ... )
								tuples[ 0 ][ 3 ].add(
									resolve(
										0,
										newDefer,
										isFunction( onProgress ) ?
											onProgress :
											Identity,
										newDefer.notifyWith
									)
								);

								// fulfilled_handlers.add( ... )
								tuples[ 1 ][ 3 ].add(
									resolve(
										0,
										newDefer,
										isFunction( onFulfilled ) ?
											onFulfilled :
											Identity
									)
								);

								// rejected_handlers.add( ... )
								tuples[ 2 ][ 3 ].add(
									resolve(
										0,
										newDefer,
										isFunction( onRejected ) ?
											onRejected :
											Thrower
									)
								);
							} ).promise();
						},

						// Get a promise for this deferred
						// If obj is provided, the promise aspect is added to the object
						promise: function( obj ) {
							return obj != null ? jQuery.extend( obj, promise ) : promise;
						}
					},
					deferred = {};

				// Add list-specific methods
				jQuery.each( tuples, function( i, tuple ) {
					var list = tuple[ 2 ],
						stateString = tuple[ 5 ];

					// promise.progress = list.add
					// promise.done = list.add
					// promise.fail = list.add
					promise[ tuple[ 1 ] ] = list.add;

					// Handle state
					if ( stateString ) {
						list.add(
							function() {

								// state = "resolved" (i.e., fulfilled)
								// state = "rejected"
								state = stateString;
							},

							// rejected_callbacks.disable
							// fulfilled_callbacks.disable
							tuples[ 3 - i ][ 2 ].disable,

							// rejected_handlers.disable
							// fulfilled_handlers.disable
							tuples[ 3 - i ][ 3 ].disable,

							// progress_callbacks.lock
							tuples[ 0 ][ 2 ].lock,

							// progress_handlers.lock
							tuples[ 0 ][ 3 ].lock
						);
					}

					// progress_handlers.fire
					// fulfilled_handlers.fire
					// rejected_handlers.fire
					list.add( tuple[ 3 ].fire );

					// deferred.notify = function() { deferred.notifyWith(...) }
					// deferred.resolve = function() { deferred.resolveWith(...) }
					// deferred.reject = function() { deferred.rejectWith(...) }
					deferred[ tuple[ 0 ] ] = function() {
						deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
						return this;
					};

					// deferred.notifyWith = list.fireWith
					// deferred.resolveWith = list.fireWith
					// deferred.rejectWith = list.fireWith
					deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
				} );

				// Make the deferred a promise
				promise.promise( deferred );

				// Call given func if any
				if ( func ) {
					func.call( deferred, deferred );
				}

				// All done!
				return deferred;
			},

			// Deferred helper
			when: function( singleValue ) {
				var

					// count of uncompleted subordinates
					remaining = arguments.length,

					// count of unprocessed arguments
					i = remaining,

					// subordinate fulfillment data
					resolveContexts = Array( i ),
					resolveValues = slice.call( arguments ),

					// the primary Deferred
					primary = jQuery.Deferred(),

					// subordinate callback factory
					updateFunc = function( i ) {
						return function( value ) {
							resolveContexts[ i ] = this;
							resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
							if ( !( --remaining ) ) {
								primary.resolveWith( resolveContexts, resolveValues );
							}
						};
					};

				// Single- and empty arguments are adopted like Promise.resolve
				if ( remaining <= 1 ) {
					adoptValue( singleValue, primary.done( updateFunc( i ) ).resolve, primary.reject,
						!remaining );

					// Use .then() to unwrap secondary thenables (cf. gh-3000)
					if ( primary.state() === "pending" ||
						isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

						return primary.then();
					}
				}

				// Multiple arguments are aggregated like Promise.all array elements
				while ( i-- ) {
					adoptValue( resolveValues[ i ], updateFunc( i ), primary.reject );
				}

				return primary.promise();
			}
		} );


		// These usually indicate a programmer mistake during development,
		// warn about them ASAP rather than swallowing them by default.
		var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

		jQuery.Deferred.exceptionHook = function( error, stack ) {

			// Support: IE 8 - 9 only
			// Console exists when dev tools are open, which can happen at any time
			if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
				window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
			}
		};




		jQuery.readyException = function( error ) {
			window.setTimeout( function() {
				throw error;
			} );
		};




		// The deferred used on DOM ready
		var readyList = jQuery.Deferred();

		jQuery.fn.ready = function( fn ) {

			readyList
				.then( fn )

				// Wrap jQuery.readyException in a function so that the lookup
				// happens at the time of error handling instead of callback
				// registration.
				.catch( function( error ) {
					jQuery.readyException( error );
				} );

			return this;
		};

		jQuery.extend( {

			// Is the DOM ready to be used? Set to true once it occurs.
			isReady: false,

			// A counter to track how many items to wait for before
			// the ready event fires. See #6781
			readyWait: 1,

			// Handle when the DOM is ready
			ready: function( wait ) {

				// Abort if there are pending holds or we're already ready
				if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
					return;
				}

				// Remember that the DOM is ready
				jQuery.isReady = true;

				// If a normal DOM Ready event fired, decrement, and wait if need be
				if ( wait !== true && --jQuery.readyWait > 0 ) {
					return;
				}

				// If there are functions bound, to execute
				readyList.resolveWith( document, [ jQuery ] );
			}
		} );

		jQuery.ready.then = readyList.then;

		// The ready event handler and self cleanup method
		function completed() {
			document.removeEventListener( "DOMContentLoaded", completed );
			window.removeEventListener( "load", completed );
			jQuery.ready();
		}

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE <=9 - 10 only
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );
		}




		// Multifunctional method to get and set values of a collection
		// The value/s can optionally be executed if it's a function
		var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
			var i = 0,
				len = elems.length,
				bulk = key == null;

			// Sets many values
			if ( toType( key ) === "object" ) {
				chainable = true;
				for ( i in key ) {
					access( elems, fn, i, key[ i ], true, emptyGet, raw );
				}

			// Sets one value
			} else if ( value !== undefined ) {
				chainable = true;

				if ( !isFunction( value ) ) {
					raw = true;
				}

				if ( bulk ) {

					// Bulk operations run against the entire set
					if ( raw ) {
						fn.call( elems, value );
						fn = null;

					// ...except when executing function values
					} else {
						bulk = fn;
						fn = function( elem, _key, value ) {
							return bulk.call( jQuery( elem ), value );
						};
					}
				}

				if ( fn ) {
					for ( ; i < len; i++ ) {
						fn(
							elems[ i ], key, raw ?
								value :
								value.call( elems[ i ], i, fn( elems[ i ], key ) )
						);
					}
				}
			}

			if ( chainable ) {
				return elems;
			}

			// Gets
			if ( bulk ) {
				return fn.call( elems );
			}

			return len ? fn( elems[ 0 ], key ) : emptyGet;
		};


		// Matches dashed string for camelizing
		var rmsPrefix = /^-ms-/,
			rdashAlpha = /-([a-z])/g;

		// Used by camelCase as callback to replace()
		function fcamelCase( _all, letter ) {
			return letter.toUpperCase();
		}

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 15
		// Microsoft forgot to hump their vendor prefix (#9572)
		function camelCase( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		}
		var acceptData = function( owner ) {

			// Accepts only:
			//  - Node
			//    - Node.ELEMENT_NODE
			//    - Node.DOCUMENT_NODE
			//  - Object
			//    - Any
			return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
		};




		function Data() {
			this.expando = jQuery.expando + Data.uid++;
		}

		Data.uid = 1;

		Data.prototype = {

			cache: function( owner ) {

				// Check if the owner object already has a cache
				var value = owner[ this.expando ];

				// If not, create one
				if ( !value ) {
					value = {};

					// We can accept data for non-element nodes in modern browsers,
					// but we should not, see #8335.
					// Always return an empty object.
					if ( acceptData( owner ) ) {

						// If it is a node unlikely to be stringify-ed or looped over
						// use plain assignment
						if ( owner.nodeType ) {
							owner[ this.expando ] = value;

						// Otherwise secure it in a non-enumerable property
						// configurable must be true to allow the property to be
						// deleted when data is removed
						} else {
							Object.defineProperty( owner, this.expando, {
								value: value,
								configurable: true
							} );
						}
					}
				}

				return value;
			},
			set: function( owner, data, value ) {
				var prop,
					cache = this.cache( owner );

				// Handle: [ owner, key, value ] args
				// Always use camelCase key (gh-2257)
				if ( typeof data === "string" ) {
					cache[ camelCase( data ) ] = value;

				// Handle: [ owner, { properties } ] args
				} else {

					// Copy the properties one-by-one to the cache object
					for ( prop in data ) {
						cache[ camelCase( prop ) ] = data[ prop ];
					}
				}
				return cache;
			},
			get: function( owner, key ) {
				return key === undefined ?
					this.cache( owner ) :

					// Always use camelCase key (gh-2257)
					owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
			},
			access: function( owner, key, value ) {

				// In cases where either:
				//
				//   1. No key was specified
				//   2. A string key was specified, but no value provided
				//
				// Take the "read" path and allow the get method to determine
				// which value to return, respectively either:
				//
				//   1. The entire cache object
				//   2. The data stored at the key
				//
				if ( key === undefined ||
						( ( key && typeof key === "string" ) && value === undefined ) ) {

					return this.get( owner, key );
				}

				// When the key is not a string, or both a key and value
				// are specified, set or extend (existing objects) with either:
				//
				//   1. An object of properties
				//   2. A key and value
				//
				this.set( owner, key, value );

				// Since the "set" path can have two possible entry points
				// return the expected data based on which path was taken[*]
				return value !== undefined ? value : key;
			},
			remove: function( owner, key ) {
				var i,
					cache = owner[ this.expando ];

				if ( cache === undefined ) {
					return;
				}

				if ( key !== undefined ) {

					// Support array or space separated string of keys
					if ( Array.isArray( key ) ) {

						// If key is an array of keys...
						// We always set camelCase keys, so remove that.
						key = key.map( camelCase );
					} else {
						key = camelCase( key );

						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						key = key in cache ?
							[ key ] :
							( key.match( rnothtmlwhite ) || [] );
					}

					i = key.length;

					while ( i-- ) {
						delete cache[ key[ i ] ];
					}
				}

				// Remove the expando if there's no more data
				if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

					// Support: Chrome <=35 - 45
					// Webkit & Blink performance suffers when deleting properties
					// from DOM nodes, so set to undefined instead
					// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
					if ( owner.nodeType ) {
						owner[ this.expando ] = undefined;
					} else {
						delete owner[ this.expando ];
					}
				}
			},
			hasData: function( owner ) {
				var cache = owner[ this.expando ];
				return cache !== undefined && !jQuery.isEmptyObject( cache );
			}
		};
		var dataPriv = new Data();

		var dataUser = new Data();



		//	Implementation Summary
		//
		//	1. Enforce API surface and semantic compatibility with 1.9.x branch
		//	2. Improve the module's maintainability by reducing the storage
		//		paths to a single mechanism.
		//	3. Use the same single mechanism to support "private" and "user" data.
		//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
		//	5. Avoid exposing implementation details on user objects (eg. expando properties)
		//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

		var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
			rmultiDash = /[A-Z]/g;

		function getData( data ) {
			if ( data === "true" ) {
				return true;
			}

			if ( data === "false" ) {
				return false;
			}

			if ( data === "null" ) {
				return null;
			}

			// Only convert to a number if it doesn't change the string
			if ( data === +data + "" ) {
				return +data;
			}

			if ( rbrace.test( data ) ) {
				return JSON.parse( data );
			}

			return data;
		}

		function dataAttr( elem, key, data ) {
			var name;

			// If nothing was found internally, try to fetch any
			// data from the HTML5 data-* attribute
			if ( data === undefined && elem.nodeType === 1 ) {
				name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
				data = elem.getAttribute( name );

				if ( typeof data === "string" ) {
					try {
						data = getData( data );
					} catch ( e ) {}

					// Make sure we set the data so it isn't changed later
					dataUser.set( elem, key, data );
				} else {
					data = undefined;
				}
			}
			return data;
		}

		jQuery.extend( {
			hasData: function( elem ) {
				return dataUser.hasData( elem ) || dataPriv.hasData( elem );
			},

			data: function( elem, name, data ) {
				return dataUser.access( elem, name, data );
			},

			removeData: function( elem, name ) {
				dataUser.remove( elem, name );
			},

			// TODO: Now that all calls to _data and _removeData have been replaced
			// with direct calls to dataPriv methods, these can be deprecated.
			_data: function( elem, name, data ) {
				return dataPriv.access( elem, name, data );
			},

			_removeData: function( elem, name ) {
				dataPriv.remove( elem, name );
			}
		} );

		jQuery.fn.extend( {
			data: function( key, value ) {
				var i, name, data,
					elem = this[ 0 ],
					attrs = elem && elem.attributes;

				// Gets all values
				if ( key === undefined ) {
					if ( this.length ) {
						data = dataUser.get( elem );

						if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
							i = attrs.length;
							while ( i-- ) {

								// Support: IE 11 only
								// The attrs elements can be null (#14894)
								if ( attrs[ i ] ) {
									name = attrs[ i ].name;
									if ( name.indexOf( "data-" ) === 0 ) {
										name = camelCase( name.slice( 5 ) );
										dataAttr( elem, name, data[ name ] );
									}
								}
							}
							dataPriv.set( elem, "hasDataAttrs", true );
						}
					}

					return data;
				}

				// Sets multiple values
				if ( typeof key === "object" ) {
					return this.each( function() {
						dataUser.set( this, key );
					} );
				}

				return access( this, function( value ) {
					var data;

					// The calling jQuery object (element matches) is not empty
					// (and therefore has an element appears at this[ 0 ]) and the
					// `value` parameter was not undefined. An empty jQuery object
					// will result in `undefined` for elem = this[ 0 ] which will
					// throw an exception if an attempt to read a data cache is made.
					if ( elem && value === undefined ) {

						// Attempt to get data from the cache
						// The key will always be camelCased in Data
						data = dataUser.get( elem, key );
						if ( data !== undefined ) {
							return data;
						}

						// Attempt to "discover" the data in
						// HTML5 custom data-* attrs
						data = dataAttr( elem, key );
						if ( data !== undefined ) {
							return data;
						}

						// We tried really hard, but the data doesn't exist.
						return;
					}

					// Set the data...
					this.each( function() {

						// We always store the camelCased key
						dataUser.set( this, key, value );
					} );
				}, null, value, arguments.length > 1, null, true );
			},

			removeData: function( key ) {
				return this.each( function() {
					dataUser.remove( this, key );
				} );
			}
		} );


		jQuery.extend( {
			queue: function( elem, type, data ) {
				var queue;

				if ( elem ) {
					type = ( type || "fx" ) + "queue";
					queue = dataPriv.get( elem, type );

					// Speed up dequeue by getting out quickly if this is just a lookup
					if ( data ) {
						if ( !queue || Array.isArray( data ) ) {
							queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
						} else {
							queue.push( data );
						}
					}
					return queue || [];
				}
			},

			dequeue: function( elem, type ) {
				type = type || "fx";

				var queue = jQuery.queue( elem, type ),
					startLength = queue.length,
					fn = queue.shift(),
					hooks = jQuery._queueHooks( elem, type ),
					next = function() {
						jQuery.dequeue( elem, type );
					};

				// If the fx queue is dequeued, always remove the progress sentinel
				if ( fn === "inprogress" ) {
					fn = queue.shift();
					startLength--;
				}

				if ( fn ) {

					// Add a progress sentinel to prevent the fx queue from being
					// automatically dequeued
					if ( type === "fx" ) {
						queue.unshift( "inprogress" );
					}

					// Clear up the last queue stop function
					delete hooks.stop;
					fn.call( elem, next, hooks );
				}

				if ( !startLength && hooks ) {
					hooks.empty.fire();
				}
			},

			// Not public - generate a queueHooks object, or return the current one
			_queueHooks: function( elem, type ) {
				var key = type + "queueHooks";
				return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
					empty: jQuery.Callbacks( "once memory" ).add( function() {
						dataPriv.remove( elem, [ type + "queue", key ] );
					} )
				} );
			}
		} );

		jQuery.fn.extend( {
			queue: function( type, data ) {
				var setter = 2;

				if ( typeof type !== "string" ) {
					data = type;
					type = "fx";
					setter--;
				}

				if ( arguments.length < setter ) {
					return jQuery.queue( this[ 0 ], type );
				}

				return data === undefined ?
					this :
					this.each( function() {
						var queue = jQuery.queue( this, type, data );

						// Ensure a hooks for this queue
						jQuery._queueHooks( this, type );

						if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
							jQuery.dequeue( this, type );
						}
					} );
			},
			dequeue: function( type ) {
				return this.each( function() {
					jQuery.dequeue( this, type );
				} );
			},
			clearQueue: function( type ) {
				return this.queue( type || "fx", [] );
			},

			// Get a promise resolved when queues of a certain type
			// are emptied (fx is the type by default)
			promise: function( type, obj ) {
				var tmp,
					count = 1,
					defer = jQuery.Deferred(),
					elements = this,
					i = this.length,
					resolve = function() {
						if ( !( --count ) ) {
							defer.resolveWith( elements, [ elements ] );
						}
					};

				if ( typeof type !== "string" ) {
					obj = type;
					type = undefined;
				}
				type = type || "fx";

				while ( i-- ) {
					tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
					if ( tmp && tmp.empty ) {
						count++;
						tmp.empty.add( resolve );
					}
				}
				resolve();
				return defer.promise( obj );
			}
		} );
		var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

		var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


		var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

		var documentElement = document.documentElement;



			var isAttached = function( elem ) {
					return jQuery.contains( elem.ownerDocument, elem );
				},
				composed = { composed: true };

			// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
			// Check attachment across shadow DOM boundaries when possible (gh-3504)
			// Support: iOS 10.0-10.2 only
			// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
			// leading to errors. We need to check for `getRootNode`.
			if ( documentElement.getRootNode ) {
				isAttached = function( elem ) {
					return jQuery.contains( elem.ownerDocument, elem ) ||
						elem.getRootNode( composed ) === elem.ownerDocument;
				};
			}
		var isHiddenWithinTree = function( elem, el ) {

				// isHiddenWithinTree might be called from jQuery#filter function;
				// in that case, element will be second argument
				elem = el || elem;

				// Inline style trumps all
				return elem.style.display === "none" ||
					elem.style.display === "" &&

					// Otherwise, check computed style
					// Support: Firefox <=43 - 45
					// Disconnected elements can have computed display: none, so first confirm that elem is
					// in the document.
					isAttached( elem ) &&

					jQuery.css( elem, "display" ) === "none";
			};



		function adjustCSS( elem, prop, valueParts, tween ) {
			var adjusted, scale,
				maxIterations = 20,
				currentValue = tween ?
					function() {
						return tween.cur();
					} :
					function() {
						return jQuery.css( elem, prop, "" );
					},
				initial = currentValue(),
				unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				initialInUnit = elem.nodeType &&
					( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
					rcssNum.exec( jQuery.css( elem, prop ) );

			if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

				// Support: Firefox <=54
				// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
				initial = initial / 2;

				// Trust units reported by jQuery.css
				unit = unit || initialInUnit[ 3 ];

				// Iteratively approximate from a nonzero starting point
				initialInUnit = +initial || 1;

				while ( maxIterations-- ) {

					// Evaluate and update our best guess (doubling guesses that zero out).
					// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
					jQuery.style( elem, prop, initialInUnit + unit );
					if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
						maxIterations = 0;
					}
					initialInUnit = initialInUnit / scale;

				}

				initialInUnit = initialInUnit * 2;
				jQuery.style( elem, prop, initialInUnit + unit );

				// Make sure we update the tween properties later on
				valueParts = valueParts || [];
			}

			if ( valueParts ) {
				initialInUnit = +initialInUnit || +initial || 0;

				// Apply relative offset (+=/-=) if specified
				adjusted = valueParts[ 1 ] ?
					initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
					+valueParts[ 2 ];
				if ( tween ) {
					tween.unit = unit;
					tween.start = initialInUnit;
					tween.end = adjusted;
				}
			}
			return adjusted;
		}


		var defaultDisplayMap = {};

		function getDefaultDisplay( elem ) {
			var temp,
				doc = elem.ownerDocument,
				nodeName = elem.nodeName,
				display = defaultDisplayMap[ nodeName ];

			if ( display ) {
				return display;
			}

			temp = doc.body.appendChild( doc.createElement( nodeName ) );
			display = jQuery.css( temp, "display" );

			temp.parentNode.removeChild( temp );

			if ( display === "none" ) {
				display = "block";
			}
			defaultDisplayMap[ nodeName ] = display;

			return display;
		}

		function showHide( elements, show ) {
			var display, elem,
				values = [],
				index = 0,
				length = elements.length;

			// Determine new display value for elements that need to change
			for ( ; index < length; index++ ) {
				elem = elements[ index ];
				if ( !elem.style ) {
					continue;
				}

				display = elem.style.display;
				if ( show ) {

					// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
					// check is required in this first loop unless we have a nonempty display value (either
					// inline or about-to-be-restored)
					if ( display === "none" ) {
						values[ index ] = dataPriv.get( elem, "display" ) || null;
						if ( !values[ index ] ) {
							elem.style.display = "";
						}
					}
					if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
						values[ index ] = getDefaultDisplay( elem );
					}
				} else {
					if ( display !== "none" ) {
						values[ index ] = "none";

						// Remember what we're overwriting
						dataPriv.set( elem, "display", display );
					}
				}
			}

			// Set the display of the elements in a second loop to avoid constant reflow
			for ( index = 0; index < length; index++ ) {
				if ( values[ index ] != null ) {
					elements[ index ].style.display = values[ index ];
				}
			}

			return elements;
		}

		jQuery.fn.extend( {
			show: function() {
				return showHide( this, true );
			},
			hide: function() {
				return showHide( this );
			},
			toggle: function( state ) {
				if ( typeof state === "boolean" ) {
					return state ? this.show() : this.hide();
				}

				return this.each( function() {
					if ( isHiddenWithinTree( this ) ) {
						jQuery( this ).show();
					} else {
						jQuery( this ).hide();
					}
				} );
			}
		} );
		var rcheckableType = ( /^(?:checkbox|radio)$/i );

		var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

		var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



		( function() {
			var fragment = document.createDocumentFragment(),
				div = fragment.appendChild( document.createElement( "div" ) ),
				input = document.createElement( "input" );

			// Support: Android 4.0 - 4.3 only
			// Check state lost if the name is set (#11217)
			// Support: Windows Web Apps (WWA)
			// `name` and `type` must use .setAttribute for WWA (#14901)
			input.setAttribute( "type", "radio" );
			input.setAttribute( "checked", "checked" );
			input.setAttribute( "name", "t" );

			div.appendChild( input );

			// Support: Android <=4.1 only
			// Older WebKit doesn't clone checked state correctly in fragments
			support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

			// Support: IE <=11 only
			// Make sure textarea (and checkbox) defaultValue is properly cloned
			div.innerHTML = "<textarea>x</textarea>";
			support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

			// Support: IE <=9 only
			// IE <=9 replaces <option> tags with their contents when inserted outside of
			// the select element.
			div.innerHTML = "<option></option>";
			support.option = !!div.lastChild;
		} )();


		// We have to close these tags to support XHTML (#13200)
		var wrapMap = {

			// XHTML parsers do not magically insert elements in the
			// same way that tag soup parsers do. So we cannot shorten
			// this by omitting <tbody> or other required elements.
			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

		wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
		wrapMap.th = wrapMap.td;

		// Support: IE <=9 only
		if ( !support.option ) {
			wrapMap.optgroup = wrapMap.option = [ 1, "<select multiple='multiple'>", "</select>" ];
		}


		function getAll( context, tag ) {

			// Support: IE <=9 - 11 only
			// Use typeof to avoid zero-argument method invocation on host objects (#15151)
			var ret;

			if ( typeof context.getElementsByTagName !== "undefined" ) {
				ret = context.getElementsByTagName( tag || "*" );

			} else if ( typeof context.querySelectorAll !== "undefined" ) {
				ret = context.querySelectorAll( tag || "*" );

			} else {
				ret = [];
			}

			if ( tag === undefined || tag && nodeName( context, tag ) ) {
				return jQuery.merge( [ context ], ret );
			}

			return ret;
		}


		// Mark scripts as having already been evaluated
		function setGlobalEval( elems, refElements ) {
			var i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				dataPriv.set(
					elems[ i ],
					"globalEval",
					!refElements || dataPriv.get( refElements[ i ], "globalEval" )
				);
			}
		}


		var rhtml = /<|&#?\w+;/;

		function buildFragment( elems, context, scripts, selection, ignored ) {
			var elem, tmp, tag, wrap, attached, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( toType( elem ) === "object" ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( ( elem = nodes[ i++ ] ) ) {

				// Skip elements already in the context collection (trac-4087)
				if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
					if ( ignored ) {
						ignored.push( elem );
					}
					continue;
				}

				attached = isAttached( elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( attached ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( ( elem = tmp[ j++ ] ) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		}


		var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

		function returnTrue() {
			return true;
		}

		function returnFalse() {
			return false;
		}

		// Support: IE <=9 - 11+
		// focus() and blur() are asynchronous, except when they are no-op.
		// So expect focus to be synchronous when the element is already active,
		// and blur to be synchronous when the element is not already active.
		// (focus and blur are always synchronous in other supported browsers,
		// this just defines when we can count on it).
		function expectSync( elem, type ) {
			return ( elem === safeActiveElement() ) === ( type === "focus" );
		}

		// Support: IE <=9 only
		// Accessing document.activeElement can throw unexpectedly
		// https://bugs.jquery.com/ticket/13393
		function safeActiveElement() {
			try {
				return document.activeElement;
			} catch ( err ) { }
		}

		function on( elem, types, selector, data, fn, one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {

				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {

					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					on( elem, type, selector, data, types[ type ], one );
				}
				return elem;
			}

			if ( data == null && fn == null ) {

				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {

					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {

					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return elem;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {

					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};

				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return elem.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			} );
		}

		/*
		 * Helper functions for managing events -- not part of the public interface.
		 * Props to Dean Edwards' addEvent library for many of the ideas.
		 */
		jQuery.event = {

			global: {},

			add: function( elem, types, handler, data, selector ) {

				var handleObjIn, eventHandle, tmp,
					events, t, handleObj,
					special, handlers, type, namespaces, origType,
					elemData = dataPriv.get( elem );

				// Only attach events to objects that accept data
				if ( !acceptData( elem ) ) {
					return;
				}

				// Caller can pass in an object of custom data in lieu of the handler
				if ( handler.handler ) {
					handleObjIn = handler;
					handler = handleObjIn.handler;
					selector = handleObjIn.selector;
				}

				// Ensure that invalid selectors throw exceptions at attach time
				// Evaluate against documentElement in case elem is a non-element node (e.g., document)
				if ( selector ) {
					jQuery.find.matchesSelector( documentElement, selector );
				}

				// Make sure that the handler has a unique ID, used to find/remove it later
				if ( !handler.guid ) {
					handler.guid = jQuery.guid++;
				}

				// Init the element's event structure and main handler, if this is the first
				if ( !( events = elemData.events ) ) {
					events = elemData.events = Object.create( null );
				}
				if ( !( eventHandle = elemData.handle ) ) {
					eventHandle = elemData.handle = function( e ) {

						// Discard the second event of a jQuery.event.trigger() and
						// when an event is called after a page has unloaded
						return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
							jQuery.event.dispatch.apply( elem, arguments ) : undefined;
					};
				}

				// Handle multiple events separated by a space
				types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
				t = types.length;
				while ( t-- ) {
					tmp = rtypenamespace.exec( types[ t ] ) || [];
					type = origType = tmp[ 1 ];
					namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

					// There *must* be a type, no attaching namespace-only handlers
					if ( !type ) {
						continue;
					}

					// If event changes its type, use the special event handlers for the changed type
					special = jQuery.event.special[ type ] || {};

					// If selector defined, determine special event api type, otherwise given type
					type = ( selector ? special.delegateType : special.bindType ) || type;

					// Update special based on newly reset type
					special = jQuery.event.special[ type ] || {};

					// handleObj is passed to all event handlers
					handleObj = jQuery.extend( {
						type: type,
						origType: origType,
						data: data,
						handler: handler,
						guid: handler.guid,
						selector: selector,
						needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
						namespace: namespaces.join( "." )
					}, handleObjIn );

					// Init the event handler queue if we're the first
					if ( !( handlers = events[ type ] ) ) {
						handlers = events[ type ] = [];
						handlers.delegateCount = 0;

						// Only use addEventListener if the special events handler returns false
						if ( !special.setup ||
							special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

							if ( elem.addEventListener ) {
								elem.addEventListener( type, eventHandle );
							}
						}
					}

					if ( special.add ) {
						special.add.call( elem, handleObj );

						if ( !handleObj.handler.guid ) {
							handleObj.handler.guid = handler.guid;
						}
					}

					// Add to the element's handler list, delegates in front
					if ( selector ) {
						handlers.splice( handlers.delegateCount++, 0, handleObj );
					} else {
						handlers.push( handleObj );
					}

					// Keep track of which events have ever been used, for event optimization
					jQuery.event.global[ type ] = true;
				}

			},

			// Detach an event or set of events from an element
			remove: function( elem, types, handler, selector, mappedTypes ) {

				var j, origCount, tmp,
					events, t, handleObj,
					special, handlers, type, namespaces, origType,
					elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

				if ( !elemData || !( events = elemData.events ) ) {
					return;
				}

				// Once for each type.namespace in types; type may be omitted
				types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
				t = types.length;
				while ( t-- ) {
					tmp = rtypenamespace.exec( types[ t ] ) || [];
					type = origType = tmp[ 1 ];
					namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

					// Unbind all events (on this namespace, if provided) for the element
					if ( !type ) {
						for ( type in events ) {
							jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
						}
						continue;
					}

					special = jQuery.event.special[ type ] || {};
					type = ( selector ? special.delegateType : special.bindType ) || type;
					handlers = events[ type ] || [];
					tmp = tmp[ 2 ] &&
						new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

					// Remove matching events
					origCount = j = handlers.length;
					while ( j-- ) {
						handleObj = handlers[ j ];

						if ( ( mappedTypes || origType === handleObj.origType ) &&
							( !handler || handler.guid === handleObj.guid ) &&
							( !tmp || tmp.test( handleObj.namespace ) ) &&
							( !selector || selector === handleObj.selector ||
								selector === "**" && handleObj.selector ) ) {
							handlers.splice( j, 1 );

							if ( handleObj.selector ) {
								handlers.delegateCount--;
							}
							if ( special.remove ) {
								special.remove.call( elem, handleObj );
							}
						}
					}

					// Remove generic event handler if we removed something and no more handlers exist
					// (avoids potential for endless recursion during removal of special event handlers)
					if ( origCount && !handlers.length ) {
						if ( !special.teardown ||
							special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

							jQuery.removeEvent( elem, type, elemData.handle );
						}

						delete events[ type ];
					}
				}

				// Remove data and the expando if it's no longer used
				if ( jQuery.isEmptyObject( events ) ) {
					dataPriv.remove( elem, "handle events" );
				}
			},

			dispatch: function( nativeEvent ) {

				var i, j, ret, matched, handleObj, handlerQueue,
					args = new Array( arguments.length ),

					// Make a writable jQuery.Event from the native event object
					event = jQuery.event.fix( nativeEvent ),

					handlers = (
						dataPriv.get( this, "events" ) || Object.create( null )
					)[ event.type ] || [],
					special = jQuery.event.special[ event.type ] || {};

				// Use the fix-ed jQuery.Event rather than the (read-only) native event
				args[ 0 ] = event;

				for ( i = 1; i < arguments.length; i++ ) {
					args[ i ] = arguments[ i ];
				}

				event.delegateTarget = this;

				// Call the preDispatch hook for the mapped type, and let it bail if desired
				if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
					return;
				}

				// Determine handlers
				handlerQueue = jQuery.event.handlers.call( this, event, handlers );

				// Run delegates first; they may want to stop propagation beneath us
				i = 0;
				while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
					event.currentTarget = matched.elem;

					j = 0;
					while ( ( handleObj = matched.handlers[ j++ ] ) &&
						!event.isImmediatePropagationStopped() ) {

						// If the event is namespaced, then each handler is only invoked if it is
						// specially universal or its namespaces are a superset of the event's.
						if ( !event.rnamespace || handleObj.namespace === false ||
							event.rnamespace.test( handleObj.namespace ) ) {

							event.handleObj = handleObj;
							event.data = handleObj.data;

							ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
								handleObj.handler ).apply( matched.elem, args );

							if ( ret !== undefined ) {
								if ( ( event.result = ret ) === false ) {
									event.preventDefault();
									event.stopPropagation();
								}
							}
						}
					}
				}

				// Call the postDispatch hook for the mapped type
				if ( special.postDispatch ) {
					special.postDispatch.call( this, event );
				}

				return event.result;
			},

			handlers: function( event, handlers ) {
				var i, handleObj, sel, matchedHandlers, matchedSelectors,
					handlerQueue = [],
					delegateCount = handlers.delegateCount,
					cur = event.target;

				// Find delegate handlers
				if ( delegateCount &&

					// Support: IE <=9
					// Black-hole SVG <use> instance trees (trac-13180)
					cur.nodeType &&

					// Support: Firefox <=42
					// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
					// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
					// Support: IE 11 only
					// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
					!( event.type === "click" && event.button >= 1 ) ) {

					for ( ; cur !== this; cur = cur.parentNode || this ) {

						// Don't check non-elements (#13208)
						// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
						if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
							matchedHandlers = [];
							matchedSelectors = {};
							for ( i = 0; i < delegateCount; i++ ) {
								handleObj = handlers[ i ];

								// Don't conflict with Object.prototype properties (#13203)
								sel = handleObj.selector + " ";

								if ( matchedSelectors[ sel ] === undefined ) {
									matchedSelectors[ sel ] = handleObj.needsContext ?
										jQuery( sel, this ).index( cur ) > -1 :
										jQuery.find( sel, this, null, [ cur ] ).length;
								}
								if ( matchedSelectors[ sel ] ) {
									matchedHandlers.push( handleObj );
								}
							}
							if ( matchedHandlers.length ) {
								handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
							}
						}
					}
				}

				// Add the remaining (directly-bound) handlers
				cur = this;
				if ( delegateCount < handlers.length ) {
					handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
				}

				return handlerQueue;
			},

			addProp: function( name, hook ) {
				Object.defineProperty( jQuery.Event.prototype, name, {
					enumerable: true,
					configurable: true,

					get: isFunction( hook ) ?
						function() {
							if ( this.originalEvent ) {
								return hook( this.originalEvent );
							}
						} :
						function() {
							if ( this.originalEvent ) {
								return this.originalEvent[ name ];
							}
						},

					set: function( value ) {
						Object.defineProperty( this, name, {
							enumerable: true,
							configurable: true,
							writable: true,
							value: value
						} );
					}
				} );
			},

			fix: function( originalEvent ) {
				return originalEvent[ jQuery.expando ] ?
					originalEvent :
					new jQuery.Event( originalEvent );
			},

			special: {
				load: {

					// Prevent triggered image.load events from bubbling to window.load
					noBubble: true
				},
				click: {

					// Utilize native event to ensure correct state for checkable inputs
					setup: function( data ) {

						// For mutual compressibility with _default, replace `this` access with a local var.
						// `|| data` is dead code meant only to preserve the variable through minification.
						var el = this || data;

						// Claim the first handler
						if ( rcheckableType.test( el.type ) &&
							el.click && nodeName( el, "input" ) ) {

							// dataPriv.set( el, "click", ... )
							leverageNative( el, "click", returnTrue );
						}

						// Return false to allow normal processing in the caller
						return false;
					},
					trigger: function( data ) {

						// For mutual compressibility with _default, replace `this` access with a local var.
						// `|| data` is dead code meant only to preserve the variable through minification.
						var el = this || data;

						// Force setup before triggering a click
						if ( rcheckableType.test( el.type ) &&
							el.click && nodeName( el, "input" ) ) {

							leverageNative( el, "click" );
						}

						// Return non-false to allow normal event-path propagation
						return true;
					},

					// For cross-browser consistency, suppress native .click() on links
					// Also prevent it if we're currently inside a leveraged native-event stack
					_default: function( event ) {
						var target = event.target;
						return rcheckableType.test( target.type ) &&
							target.click && nodeName( target, "input" ) &&
							dataPriv.get( target, "click" ) ||
							nodeName( target, "a" );
					}
				},

				beforeunload: {
					postDispatch: function( event ) {

						// Support: Firefox 20+
						// Firefox doesn't alert if the returnValue field is not set.
						if ( event.result !== undefined && event.originalEvent ) {
							event.originalEvent.returnValue = event.result;
						}
					}
				}
			}
		};

		// Ensure the presence of an event listener that handles manually-triggered
		// synthetic events by interrupting progress until reinvoked in response to
		// *native* events that it fires directly, ensuring that state changes have
		// already occurred before other listeners are invoked.
		function leverageNative( el, type, expectSync ) {

			// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
			if ( !expectSync ) {
				if ( dataPriv.get( el, type ) === undefined ) {
					jQuery.event.add( el, type, returnTrue );
				}
				return;
			}

			// Register the controller as a special universal handler for all event namespaces
			dataPriv.set( el, type, false );
			jQuery.event.add( el, type, {
				namespace: false,
				handler: function( event ) {
					var notAsync, result,
						saved = dataPriv.get( this, type );

					if ( ( event.isTrigger & 1 ) && this[ type ] ) {

						// Interrupt processing of the outer synthetic .trigger()ed event
						// Saved data should be false in such cases, but might be a leftover capture object
						// from an async native handler (gh-4350)
						if ( !saved.length ) {

							// Store arguments for use when handling the inner native event
							// There will always be at least one argument (an event object), so this array
							// will not be confused with a leftover capture object.
							saved = slice.call( arguments );
							dataPriv.set( this, type, saved );

							// Trigger the native event and capture its result
							// Support: IE <=9 - 11+
							// focus() and blur() are asynchronous
							notAsync = expectSync( this, type );
							this[ type ]();
							result = dataPriv.get( this, type );
							if ( saved !== result || notAsync ) {
								dataPriv.set( this, type, false );
							} else {
								result = {};
							}
							if ( saved !== result ) {

								// Cancel the outer synthetic event
								event.stopImmediatePropagation();
								event.preventDefault();

								// Support: Chrome 86+
								// In Chrome, if an element having a focusout handler is blurred by
								// clicking outside of it, it invokes the handler synchronously. If
								// that handler calls `.remove()` on the element, the data is cleared,
								// leaving `result` undefined. We need to guard against this.
								return result && result.value;
							}

						// If this is an inner synthetic event for an event with a bubbling surrogate
						// (focus or blur), assume that the surrogate already propagated from triggering the
						// native event and prevent that from happening again here.
						// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
						// bubbling surrogate propagates *after* the non-bubbling base), but that seems
						// less bad than duplication.
						} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
							event.stopPropagation();
						}

					// If this is a native event triggered above, everything is now in order
					// Fire an inner synthetic event with the original arguments
					} else if ( saved.length ) {

						// ...and capture the result
						dataPriv.set( this, type, {
							value: jQuery.event.trigger(

								// Support: IE <=9 - 11+
								// Extend with the prototype to reset the above stopImmediatePropagation()
								jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
								saved.slice( 1 ),
								this
							)
						} );

						// Abort handling of the native event
						event.stopImmediatePropagation();
					}
				}
			} );
		}

		jQuery.removeEvent = function( elem, type, handle ) {

			// This "if" is needed for plain objects
			if ( elem.removeEventListener ) {
				elem.removeEventListener( type, handle );
			}
		};

		jQuery.Event = function( src, props ) {

			// Allow instantiation without the 'new' keyword
			if ( !( this instanceof jQuery.Event ) ) {
				return new jQuery.Event( src, props );
			}

			// Event object
			if ( src && src.type ) {
				this.originalEvent = src;
				this.type = src.type;

				// Events bubbling up the document may have been marked as prevented
				// by a handler lower down the tree; reflect the correct value.
				this.isDefaultPrevented = src.defaultPrevented ||
						src.defaultPrevented === undefined &&

						// Support: Android <=2.3 only
						src.returnValue === false ?
					returnTrue :
					returnFalse;

				// Create target properties
				// Support: Safari <=6 - 7 only
				// Target should not be a text node (#504, #13143)
				this.target = ( src.target && src.target.nodeType === 3 ) ?
					src.target.parentNode :
					src.target;

				this.currentTarget = src.currentTarget;
				this.relatedTarget = src.relatedTarget;

			// Event type
			} else {
				this.type = src;
			}

			// Put explicitly provided properties onto the event object
			if ( props ) {
				jQuery.extend( this, props );
			}

			// Create a timestamp if incoming event doesn't have one
			this.timeStamp = src && src.timeStamp || Date.now();

			// Mark it as fixed
			this[ jQuery.expando ] = true;
		};

		// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
		// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
		jQuery.Event.prototype = {
			constructor: jQuery.Event,
			isDefaultPrevented: returnFalse,
			isPropagationStopped: returnFalse,
			isImmediatePropagationStopped: returnFalse,
			isSimulated: false,

			preventDefault: function() {
				var e = this.originalEvent;

				this.isDefaultPrevented = returnTrue;

				if ( e && !this.isSimulated ) {
					e.preventDefault();
				}
			},
			stopPropagation: function() {
				var e = this.originalEvent;

				this.isPropagationStopped = returnTrue;

				if ( e && !this.isSimulated ) {
					e.stopPropagation();
				}
			},
			stopImmediatePropagation: function() {
				var e = this.originalEvent;

				this.isImmediatePropagationStopped = returnTrue;

				if ( e && !this.isSimulated ) {
					e.stopImmediatePropagation();
				}

				this.stopPropagation();
			}
		};

		// Includes all common event props including KeyEvent and MouseEvent specific props
		jQuery.each( {
			altKey: true,
			bubbles: true,
			cancelable: true,
			changedTouches: true,
			ctrlKey: true,
			detail: true,
			eventPhase: true,
			metaKey: true,
			pageX: true,
			pageY: true,
			shiftKey: true,
			view: true,
			"char": true,
			code: true,
			charCode: true,
			key: true,
			keyCode: true,
			button: true,
			buttons: true,
			clientX: true,
			clientY: true,
			offsetX: true,
			offsetY: true,
			pointerId: true,
			pointerType: true,
			screenX: true,
			screenY: true,
			targetTouches: true,
			toElement: true,
			touches: true,
			which: true
		}, jQuery.event.addProp );

		jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
			jQuery.event.special[ type ] = {

				// Utilize native event if possible so blur/focus sequence is correct
				setup: function() {

					// Claim the first handler
					// dataPriv.set( this, "focus", ... )
					// dataPriv.set( this, "blur", ... )
					leverageNative( this, type, expectSync );

					// Return false to allow normal processing in the caller
					return false;
				},
				trigger: function() {

					// Force setup before trigger
					leverageNative( this, type );

					// Return non-false to allow normal event-path propagation
					return true;
				},

				// Suppress native focus or blur as it's already being fired
				// in leverageNative.
				_default: function() {
					return true;
				},

				delegateType: delegateType
			};
		} );

		// Create mouseenter/leave events using mouseover/out and event-time checks
		// so that event delegation works in jQuery.
		// Do the same for pointerenter/pointerleave and pointerover/pointerout
		//
		// Support: Safari 7 only
		// Safari sends mouseenter too often; see:
		// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
		// for the description of the bug (it existed in older Chrome versions as well).
		jQuery.each( {
			mouseenter: "mouseover",
			mouseleave: "mouseout",
			pointerenter: "pointerover",
			pointerleave: "pointerout"
		}, function( orig, fix ) {
			jQuery.event.special[ orig ] = {
				delegateType: fix,
				bindType: fix,

				handle: function( event ) {
					var ret,
						target = this,
						related = event.relatedTarget,
						handleObj = event.handleObj;

					// For mouseenter/leave call the handler if related is outside the target.
					// NB: No relatedTarget if the mouse left/entered the browser window
					if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
						event.type = handleObj.origType;
						ret = handleObj.handler.apply( this, arguments );
						event.type = fix;
					}
					return ret;
				}
			};
		} );

		jQuery.fn.extend( {

			on: function( types, selector, data, fn ) {
				return on( this, types, selector, data, fn );
			},
			one: function( types, selector, data, fn ) {
				return on( this, types, selector, data, fn, 1 );
			},
			off: function( types, selector, fn ) {
				var handleObj, type;
				if ( types && types.preventDefault && types.handleObj ) {

					// ( event )  dispatched jQuery.Event
					handleObj = types.handleObj;
					jQuery( types.delegateTarget ).off(
						handleObj.namespace ?
							handleObj.origType + "." + handleObj.namespace :
							handleObj.origType,
						handleObj.selector,
						handleObj.handler
					);
					return this;
				}
				if ( typeof types === "object" ) {

					// ( types-object [, selector] )
					for ( type in types ) {
						this.off( type, selector, types[ type ] );
					}
					return this;
				}
				if ( selector === false || typeof selector === "function" ) {

					// ( types [, fn] )
					fn = selector;
					selector = undefined;
				}
				if ( fn === false ) {
					fn = returnFalse;
				}
				return this.each( function() {
					jQuery.event.remove( this, types, fn, selector );
				} );
			}
		} );


		var

			// Support: IE <=10 - 11, Edge 12 - 13 only
			// In IE/Edge using regex groups here causes severe slowdowns.
			// See https://connect.microsoft.com/IE/feedback/details/1736512/
			rnoInnerhtml = /<script|<style|<link/i,

			// checked="checked" or checked
			rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
			rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

		// Prefer a tbody over its parent table for containing new rows
		function manipulationTarget( elem, content ) {
			if ( nodeName( elem, "table" ) &&
				nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

				return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
			}

			return elem;
		}

		// Replace/restore the type attribute of script elements for safe DOM manipulation
		function disableScript( elem ) {
			elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
			return elem;
		}
		function restoreScript( elem ) {
			if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
				elem.type = elem.type.slice( 5 );
			} else {
				elem.removeAttribute( "type" );
			}

			return elem;
		}

		function cloneCopyEvent( src, dest ) {
			var i, l, type, pdataOld, udataOld, udataCur, events;

			if ( dest.nodeType !== 1 ) {
				return;
			}

			// 1. Copy private data: events, handlers, etc.
			if ( dataPriv.hasData( src ) ) {
				pdataOld = dataPriv.get( src );
				events = pdataOld.events;

				if ( events ) {
					dataPriv.remove( dest, "handle events" );

					for ( type in events ) {
						for ( i = 0, l = events[ type ].length; i < l; i++ ) {
							jQuery.event.add( dest, type, events[ type ][ i ] );
						}
					}
				}
			}

			// 2. Copy user data
			if ( dataUser.hasData( src ) ) {
				udataOld = dataUser.access( src );
				udataCur = jQuery.extend( {}, udataOld );

				dataUser.set( dest, udataCur );
			}
		}

		// Fix IE bugs, see support tests
		function fixInput( src, dest ) {
			var nodeName = dest.nodeName.toLowerCase();

			// Fails to persist the checked state of a cloned checkbox or radio button.
			if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
				dest.checked = src.checked;

			// Fails to return the selected option to the default selected state when cloning options
			} else if ( nodeName === "input" || nodeName === "textarea" ) {
				dest.defaultValue = src.defaultValue;
			}
		}

		function domManip( collection, args, callback, ignored ) {

			// Flatten any nested arrays
			args = flat( args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = collection.length,
				iNoClone = l - 1,
				value = args[ 0 ],
				valueIsFunction = isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( valueIsFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return collection.each( function( index ) {
					var self = collection.eq( index );
					if ( valueIsFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					domManip( self, args, callback, ignored );
				} );
			}

			if ( l ) {
				fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				// Require either new content or an interest in ignored elements to invoke the callback
				if ( first || ignored ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item
					// instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {

								// Support: Android <=4.0 only, PhantomJS 1 only
								// push.apply(_, arraylike) throws on ancient WebKit
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( collection[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!dataPriv.access( node, "globalEval" ) &&
								jQuery.contains( doc, node ) ) {

								if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl && !node.noModule ) {
										jQuery._evalUrl( node.src, {
											nonce: node.nonce || node.getAttribute( "nonce" )
										}, doc );
									}
								} else {
									DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
								}
							}
						}
					}
				}
			}

			return collection;
		}

		function remove( elem, selector, keepData ) {
			var node,
				nodes = selector ? jQuery.filter( selector, elem ) : elem,
				i = 0;

			for ( ; ( node = nodes[ i ] ) != null; i++ ) {
				if ( !keepData && node.nodeType === 1 ) {
					jQuery.cleanData( getAll( node ) );
				}

				if ( node.parentNode ) {
					if ( keepData && isAttached( node ) ) {
						setGlobalEval( getAll( node, "script" ) );
					}
					node.parentNode.removeChild( node );
				}
			}

			return elem;
		}

		jQuery.extend( {
			htmlPrefilter: function( html ) {
				return html;
			},

			clone: function( elem, dataAndEvents, deepDataAndEvents ) {
				var i, l, srcElements, destElements,
					clone = elem.cloneNode( true ),
					inPage = isAttached( elem );

				// Fix IE cloning issues
				if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
						!jQuery.isXMLDoc( elem ) ) {

					// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
					destElements = getAll( clone );
					srcElements = getAll( elem );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						fixInput( srcElements[ i ], destElements[ i ] );
					}
				}

				// Copy the events from the original to the clone
				if ( dataAndEvents ) {
					if ( deepDataAndEvents ) {
						srcElements = srcElements || getAll( elem );
						destElements = destElements || getAll( clone );

						for ( i = 0, l = srcElements.length; i < l; i++ ) {
							cloneCopyEvent( srcElements[ i ], destElements[ i ] );
						}
					} else {
						cloneCopyEvent( elem, clone );
					}
				}

				// Preserve script evaluation history
				destElements = getAll( clone, "script" );
				if ( destElements.length > 0 ) {
					setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
				}

				// Return the cloned set
				return clone;
			},

			cleanData: function( elems ) {
				var data, elem, type,
					special = jQuery.event.special,
					i = 0;

				for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
					if ( acceptData( elem ) ) {
						if ( ( data = elem[ dataPriv.expando ] ) ) {
							if ( data.events ) {
								for ( type in data.events ) {
									if ( special[ type ] ) {
										jQuery.event.remove( elem, type );

									// This is a shortcut to avoid jQuery.event.remove's overhead
									} else {
										jQuery.removeEvent( elem, type, data.handle );
									}
								}
							}

							// Support: Chrome <=35 - 45+
							// Assign undefined instead of using delete, see Data#remove
							elem[ dataPriv.expando ] = undefined;
						}
						if ( elem[ dataUser.expando ] ) {

							// Support: Chrome <=35 - 45+
							// Assign undefined instead of using delete, see Data#remove
							elem[ dataUser.expando ] = undefined;
						}
					}
				}
			}
		} );

		jQuery.fn.extend( {
			detach: function( selector ) {
				return remove( this, selector, true );
			},

			remove: function( selector ) {
				return remove( this, selector );
			},

			text: function( value ) {
				return access( this, function( value ) {
					return value === undefined ?
						jQuery.text( this ) :
						this.empty().each( function() {
							if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
								this.textContent = value;
							}
						} );
				}, null, value, arguments.length );
			},

			append: function() {
				return domManip( this, arguments, function( elem ) {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						var target = manipulationTarget( this, elem );
						target.appendChild( elem );
					}
				} );
			},

			prepend: function() {
				return domManip( this, arguments, function( elem ) {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						var target = manipulationTarget( this, elem );
						target.insertBefore( elem, target.firstChild );
					}
				} );
			},

			before: function() {
				return domManip( this, arguments, function( elem ) {
					if ( this.parentNode ) {
						this.parentNode.insertBefore( elem, this );
					}
				} );
			},

			after: function() {
				return domManip( this, arguments, function( elem ) {
					if ( this.parentNode ) {
						this.parentNode.insertBefore( elem, this.nextSibling );
					}
				} );
			},

			empty: function() {
				var elem,
					i = 0;

				for ( ; ( elem = this[ i ] ) != null; i++ ) {
					if ( elem.nodeType === 1 ) {

						// Prevent memory leaks
						jQuery.cleanData( getAll( elem, false ) );

						// Remove any remaining nodes
						elem.textContent = "";
					}
				}

				return this;
			},

			clone: function( dataAndEvents, deepDataAndEvents ) {
				dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
				deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

				return this.map( function() {
					return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
				} );
			},

			html: function( value ) {
				return access( this, function( value ) {
					var elem = this[ 0 ] || {},
						i = 0,
						l = this.length;

					if ( value === undefined && elem.nodeType === 1 ) {
						return elem.innerHTML;
					}

					// See if we can take a shortcut and just use innerHTML
					if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
						!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

						value = jQuery.htmlPrefilter( value );

						try {
							for ( ; i < l; i++ ) {
								elem = this[ i ] || {};

								// Remove element nodes and prevent memory leaks
								if ( elem.nodeType === 1 ) {
									jQuery.cleanData( getAll( elem, false ) );
									elem.innerHTML = value;
								}
							}

							elem = 0;

						// If using innerHTML throws an exception, use the fallback method
						} catch ( e ) {}
					}

					if ( elem ) {
						this.empty().append( value );
					}
				}, null, value, arguments.length );
			},

			replaceWith: function() {
				var ignored = [];

				// Make the changes, replacing each non-ignored context element with the new content
				return domManip( this, arguments, function( elem ) {
					var parent = this.parentNode;

					if ( jQuery.inArray( this, ignored ) < 0 ) {
						jQuery.cleanData( getAll( this ) );
						if ( parent ) {
							parent.replaceChild( elem, this );
						}
					}

				// Force callback invocation
				}, ignored );
			}
		} );

		jQuery.each( {
			appendTo: "append",
			prependTo: "prepend",
			insertBefore: "before",
			insertAfter: "after",
			replaceAll: "replaceWith"
		}, function( name, original ) {
			jQuery.fn[ name ] = function( selector ) {
				var elems,
					ret = [],
					insert = jQuery( selector ),
					last = insert.length - 1,
					i = 0;

				for ( ; i <= last; i++ ) {
					elems = i === last ? this : this.clone( true );
					jQuery( insert[ i ] )[ original ]( elems );

					// Support: Android <=4.0 only, PhantomJS 1 only
					// .get() because push.apply(_, arraylike) throws on ancient WebKit
					push.apply( ret, elems.get() );
				}

				return this.pushStack( ret );
			};
		} );
		var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

		var getStyles = function( elem ) {

				// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
				// IE throws on elements created in popups
				// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
				var view = elem.ownerDocument.defaultView;

				if ( !view || !view.opener ) {
					view = window;
				}

				return view.getComputedStyle( elem );
			};

		var swap = function( elem, options, callback ) {
			var ret, name,
				old = {};

			// Remember the old values, and insert the new ones
			for ( name in options ) {
				old[ name ] = elem.style[ name ];
				elem.style[ name ] = options[ name ];
			}

			ret = callback.call( elem );

			// Revert the old values
			for ( name in options ) {
				elem.style[ name ] = old[ name ];
			}

			return ret;
		};


		var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



		( function() {

			// Executing both pixelPosition & boxSizingReliable tests require only one layout
			// so they're executed at the same time to save the second computation.
			function computeStyleTests() {

				// This is a singleton, we need to execute it only once
				if ( !div ) {
					return;
				}

				container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
					"margin-top:1px;padding:0;border:0";
				div.style.cssText =
					"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
					"margin:auto;border:1px;padding:1px;" +
					"width:60%;top:1%";
				documentElement.appendChild( container ).appendChild( div );

				var divStyle = window.getComputedStyle( div );
				pixelPositionVal = divStyle.top !== "1%";

				// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
				reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

				// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
				// Some styles come back with percentage values, even though they shouldn't
				div.style.right = "60%";
				pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

				// Support: IE 9 - 11 only
				// Detect misreporting of content dimensions for box-sizing:border-box elements
				boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

				// Support: IE 9 only
				// Detect overflow:scroll screwiness (gh-3699)
				// Support: Chrome <=64
				// Don't get tricked when zoom affects offsetWidth (gh-4029)
				div.style.position = "absolute";
				scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

				documentElement.removeChild( container );

				// Nullify the div so it wouldn't be stored in the memory and
				// it will also be a sign that checks already performed
				div = null;
			}

			function roundPixelMeasures( measure ) {
				return Math.round( parseFloat( measure ) );
			}

			var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
				reliableTrDimensionsVal, reliableMarginLeftVal,
				container = document.createElement( "div" ),
				div = document.createElement( "div" );

			// Finish early in limited (non-browser) environments
			if ( !div.style ) {
				return;
			}

			// Support: IE <=9 - 11 only
			// Style of cloned element affects source element cloned (#8908)
			div.style.backgroundClip = "content-box";
			div.cloneNode( true ).style.backgroundClip = "";
			support.clearCloneStyle = div.style.backgroundClip === "content-box";

			jQuery.extend( support, {
				boxSizingReliable: function() {
					computeStyleTests();
					return boxSizingReliableVal;
				},
				pixelBoxStyles: function() {
					computeStyleTests();
					return pixelBoxStylesVal;
				},
				pixelPosition: function() {
					computeStyleTests();
					return pixelPositionVal;
				},
				reliableMarginLeft: function() {
					computeStyleTests();
					return reliableMarginLeftVal;
				},
				scrollboxSize: function() {
					computeStyleTests();
					return scrollboxSizeVal;
				},

				// Support: IE 9 - 11+, Edge 15 - 18+
				// IE/Edge misreport `getComputedStyle` of table rows with width/height
				// set in CSS while `offset*` properties report correct values.
				// Behavior in IE 9 is more subtle than in newer versions & it passes
				// some versions of this test; make sure not to make it pass there!
				//
				// Support: Firefox 70+
				// Only Firefox includes border widths
				// in computed dimensions. (gh-4529)
				reliableTrDimensions: function() {
					var table, tr, trChild, trStyle;
					if ( reliableTrDimensionsVal == null ) {
						table = document.createElement( "table" );
						tr = document.createElement( "tr" );
						trChild = document.createElement( "div" );

						table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
						tr.style.cssText = "border:1px solid";

						// Support: Chrome 86+
						// Height set through cssText does not get applied.
						// Computed height then comes back as 0.
						tr.style.height = "1px";
						trChild.style.height = "9px";

						// Support: Android 8 Chrome 86+
						// In our bodyBackground.html iframe,
						// display for all div elements is set to "inline",
						// which causes a problem only in Android 8 Chrome 86.
						// Ensuring the div is display: block
						// gets around this issue.
						trChild.style.display = "block";

						documentElement
							.appendChild( table )
							.appendChild( tr )
							.appendChild( trChild );

						trStyle = window.getComputedStyle( tr );
						reliableTrDimensionsVal = ( parseInt( trStyle.height, 10 ) +
							parseInt( trStyle.borderTopWidth, 10 ) +
							parseInt( trStyle.borderBottomWidth, 10 ) ) === tr.offsetHeight;

						documentElement.removeChild( table );
					}
					return reliableTrDimensionsVal;
				}
			} );
		} )();


		function curCSS( elem, name, computed ) {
			var width, minWidth, maxWidth, ret,

				// Support: Firefox 51+
				// Retrieving style before computed somehow
				// fixes an issue with getting wrong values
				// on detached elements
				style = elem.style;

			computed = computed || getStyles( elem );

			// getPropertyValue is needed for:
			//   .css('filter') (IE 9 only, #12537)
			//   .css('--customProperty) (#3144)
			if ( computed ) {
				ret = computed.getPropertyValue( name ) || computed[ name ];

				if ( ret === "" && !isAttached( elem ) ) {
					ret = jQuery.style( elem, name );
				}

				// A tribute to the "awesome hack by Dean Edwards"
				// Android Browser returns percentage for some values,
				// but width seems to be reliably pixels.
				// This is against the CSSOM draft spec:
				// https://drafts.csswg.org/cssom/#resolved-values
				if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

					// Remember the original values
					width = style.width;
					minWidth = style.minWidth;
					maxWidth = style.maxWidth;

					// Put in the new values to get a computed value out
					style.minWidth = style.maxWidth = style.width = ret;
					ret = computed.width;

					// Revert the changed values
					style.width = width;
					style.minWidth = minWidth;
					style.maxWidth = maxWidth;
				}
			}

			return ret !== undefined ?

				// Support: IE <=9 - 11 only
				// IE returns zIndex value as an integer.
				ret + "" :
				ret;
		}


		function addGetHookIf( conditionFn, hookFn ) {

			// Define the hook, we'll check on the first run if it's really needed.
			return {
				get: function() {
					if ( conditionFn() ) {

						// Hook not needed (or it's not possible to use it due
						// to missing dependency), remove it.
						delete this.get;
						return;
					}

					// Hook needed; redefine it so that the support test is not executed again.
					return ( this.get = hookFn ).apply( this, arguments );
				}
			};
		}


		var cssPrefixes = [ "Webkit", "Moz", "ms" ],
			emptyStyle = document.createElement( "div" ).style,
			vendorProps = {};

		// Return a vendor-prefixed property or undefined
		function vendorPropName( name ) {

			// Check for vendor prefixed names
			var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
				i = cssPrefixes.length;

			while ( i-- ) {
				name = cssPrefixes[ i ] + capName;
				if ( name in emptyStyle ) {
					return name;
				}
			}
		}

		// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
		function finalPropName( name ) {
			var final = jQuery.cssProps[ name ] || vendorProps[ name ];

			if ( final ) {
				return final;
			}
			if ( name in emptyStyle ) {
				return name;
			}
			return vendorProps[ name ] = vendorPropName( name ) || name;
		}


		var

			// Swappable if display is none or starts with table
			// except "table", "table-cell", or "table-caption"
			// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
			rdisplayswap = /^(none|table(?!-c[ea]).+)/,
			rcustomProp = /^--/,
			cssShow = { position: "absolute", visibility: "hidden", display: "block" },
			cssNormalTransform = {
				letterSpacing: "0",
				fontWeight: "400"
			};

		function setPositiveNumber( _elem, value, subtract ) {

			// Any relative (+/-) values have already been
			// normalized at this point
			var matches = rcssNum.exec( value );
			return matches ?

				// Guard against undefined "subtract", e.g., when used as in cssHooks
				Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
				value;
		}

		function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
			var i = dimension === "width" ? 1 : 0,
				extra = 0,
				delta = 0;

			// Adjustment may not be necessary
			if ( box === ( isBorderBox ? "border" : "content" ) ) {
				return 0;
			}

			for ( ; i < 4; i += 2 ) {

				// Both box models exclude margin
				if ( box === "margin" ) {
					delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
				}

				// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
				if ( !isBorderBox ) {

					// Add padding
					delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

					// For "border" or "margin", add border
					if ( box !== "padding" ) {
						delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

					// But still keep track of it otherwise
					} else {
						extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
					}

				// If we get here with a border-box (content + padding + border), we're seeking "content" or
				// "padding" or "margin"
				} else {

					// For "content", subtract padding
					if ( box === "content" ) {
						delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
					}

					// For "content" or "padding", subtract border
					if ( box !== "margin" ) {
						delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
					}
				}
			}

			// Account for positive content-box scroll gutter when requested by providing computedVal
			if ( !isBorderBox && computedVal >= 0 ) {

				// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
				// Assuming integer scroll gutter, subtract the rest and round down
				delta += Math.max( 0, Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					computedVal -
					delta -
					extra -
					0.5

				// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
				// Use an explicit zero to avoid NaN (gh-3964)
				) ) || 0;
			}

			return delta;
		}

		function getWidthOrHeight( elem, dimension, extra ) {

			// Start with computed style
			var styles = getStyles( elem ),

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
				// Fake content-box until we know it's needed to know the true value.
				boxSizingNeeded = !support.boxSizingReliable() || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				valueIsBorderBox = isBorderBox,

				val = curCSS( elem, dimension, styles ),
				offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

			// Support: Firefox <=54
			// Return a confounding non-pixel value or feign ignorance, as appropriate.
			if ( rnumnonpx.test( val ) ) {
				if ( !extra ) {
					return val;
				}
				val = "auto";
			}


			// Support: IE 9 - 11 only
			// Use offsetWidth/offsetHeight for when box sizing is unreliable.
			// In those cases, the computed value can be trusted to be border-box.
			if ( ( !support.boxSizingReliable() && isBorderBox ||

				// Support: IE 10 - 11+, Edge 15 - 18+
				// IE/Edge misreport `getComputedStyle` of table rows with width/height
				// set in CSS while `offset*` properties report correct values.
				// Interestingly, in some cases IE 9 doesn't suffer from this issue.
				!support.reliableTrDimensions() && nodeName( elem, "tr" ) ||

				// Fall back to offsetWidth/offsetHeight when value is "auto"
				// This happens for inline elements with no explicit setting (gh-3571)
				val === "auto" ||

				// Support: Android <=4.1 - 4.3 only
				// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
				!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&

				// Make sure the element is visible & connected
				elem.getClientRects().length ) {

				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

				// Where available, offsetWidth/offsetHeight approximate border box dimensions.
				// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
				// retrieved value as a content box dimension.
				valueIsBorderBox = offsetProp in elem;
				if ( valueIsBorderBox ) {
					val = elem[ offsetProp ];
				}
			}

			// Normalize "" and auto
			val = parseFloat( val ) || 0;

			// Adjust for the element's box model
			return ( val +
				boxModelAdjustment(
					elem,
					dimension,
					extra || ( isBorderBox ? "border" : "content" ),
					valueIsBorderBox,
					styles,

					// Provide the current computed size to request scroll gutter calculation (gh-3589)
					val
				)
			) + "px";
		}

		jQuery.extend( {

			// Add in style property hooks for overriding the default
			// behavior of getting and setting a style property
			cssHooks: {
				opacity: {
					get: function( elem, computed ) {
						if ( computed ) {

							// We should always get a number back from opacity
							var ret = curCSS( elem, "opacity" );
							return ret === "" ? "1" : ret;
						}
					}
				}
			},

			// Don't automatically add "px" to these possibly-unitless properties
			cssNumber: {
				"animationIterationCount": true,
				"columnCount": true,
				"fillOpacity": true,
				"flexGrow": true,
				"flexShrink": true,
				"fontWeight": true,
				"gridArea": true,
				"gridColumn": true,
				"gridColumnEnd": true,
				"gridColumnStart": true,
				"gridRow": true,
				"gridRowEnd": true,
				"gridRowStart": true,
				"lineHeight": true,
				"opacity": true,
				"order": true,
				"orphans": true,
				"widows": true,
				"zIndex": true,
				"zoom": true
			},

			// Add in properties whose names you wish to fix before
			// setting or getting the value
			cssProps: {},

			// Get and set the style property on a DOM Node
			style: function( elem, name, value, extra ) {

				// Don't set styles on text and comment nodes
				if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
					return;
				}

				// Make sure that we're working with the right name
				var ret, type, hooks,
					origName = camelCase( name ),
					isCustomProp = rcustomProp.test( name ),
					style = elem.style;

				// Make sure that we're working with the right name. We don't
				// want to query the value if it is a CSS custom property
				// since they are user-defined.
				if ( !isCustomProp ) {
					name = finalPropName( origName );
				}

				// Gets hook for the prefixed version, then unprefixed version
				hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

				// Check if we're setting a value
				if ( value !== undefined ) {
					type = typeof value;

					// Convert "+=" or "-=" to relative numbers (#7345)
					if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
						value = adjustCSS( elem, name, ret );

						// Fixes bug #9237
						type = "number";
					}

					// Make sure that null and NaN values aren't set (#7116)
					if ( value == null || value !== value ) {
						return;
					}

					// If a number was passed in, add the unit (except for certain CSS properties)
					// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
					// "px" to a few hardcoded values.
					if ( type === "number" && !isCustomProp ) {
						value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
					}

					// background-* props affect original clone's values
					if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
						style[ name ] = "inherit";
					}

					// If a hook was provided, use that value, otherwise just set the specified value
					if ( !hooks || !( "set" in hooks ) ||
						( value = hooks.set( elem, value, extra ) ) !== undefined ) {

						if ( isCustomProp ) {
							style.setProperty( name, value );
						} else {
							style[ name ] = value;
						}
					}

				} else {

					// If a hook was provided get the non-computed value from there
					if ( hooks && "get" in hooks &&
						( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

						return ret;
					}

					// Otherwise just get the value from the style object
					return style[ name ];
				}
			},

			css: function( elem, name, extra, styles ) {
				var val, num, hooks,
					origName = camelCase( name ),
					isCustomProp = rcustomProp.test( name );

				// Make sure that we're working with the right name. We don't
				// want to modify the value if it is a CSS custom property
				// since they are user-defined.
				if ( !isCustomProp ) {
					name = finalPropName( origName );
				}

				// Try prefixed name followed by the unprefixed name
				hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

				// If a hook was provided get the computed value from there
				if ( hooks && "get" in hooks ) {
					val = hooks.get( elem, true, extra );
				}

				// Otherwise, if a way to get the computed value exists, use that
				if ( val === undefined ) {
					val = curCSS( elem, name, styles );
				}

				// Convert "normal" to computed value
				if ( val === "normal" && name in cssNormalTransform ) {
					val = cssNormalTransform[ name ];
				}

				// Make numeric if forced or a qualifier was provided and val looks numeric
				if ( extra === "" || extra ) {
					num = parseFloat( val );
					return extra === true || isFinite( num ) ? num || 0 : val;
				}

				return val;
			}
		} );

		jQuery.each( [ "height", "width" ], function( _i, dimension ) {
			jQuery.cssHooks[ dimension ] = {
				get: function( elem, computed, extra ) {
					if ( computed ) {

						// Certain elements can have dimension info if we invisibly show them
						// but it must have a current display style that would benefit
						return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

							// Support: Safari 8+
							// Table columns in Safari have non-zero offsetWidth & zero
							// getBoundingClientRect().width unless display is changed.
							// Support: IE <=11 only
							// Running getBoundingClientRect on a disconnected node
							// in IE throws an error.
							( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, dimension, extra );
							} ) :
							getWidthOrHeight( elem, dimension, extra );
					}
				},

				set: function( elem, value, extra ) {
					var matches,
						styles = getStyles( elem ),

						// Only read styles.position if the test has a chance to fail
						// to avoid forcing a reflow.
						scrollboxSizeBuggy = !support.scrollboxSize() &&
							styles.position === "absolute",

						// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
						boxSizingNeeded = scrollboxSizeBuggy || extra,
						isBorderBox = boxSizingNeeded &&
							jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						subtract = extra ?
							boxModelAdjustment(
								elem,
								dimension,
								extra,
								isBorderBox,
								styles
							) :
							0;

					// Account for unreliable border-box dimensions by comparing offset* to computed and
					// faking a content-box to get border and padding (gh-3699)
					if ( isBorderBox && scrollboxSizeBuggy ) {
						subtract -= Math.ceil(
							elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
							parseFloat( styles[ dimension ] ) -
							boxModelAdjustment( elem, dimension, "border", false, styles ) -
							0.5
						);
					}

					// Convert to pixels if value adjustment is needed
					if ( subtract && ( matches = rcssNum.exec( value ) ) &&
						( matches[ 3 ] || "px" ) !== "px" ) {

						elem.style[ dimension ] = value;
						value = jQuery.css( elem, dimension );
					}

					return setPositiveNumber( elem, value, subtract );
				}
			};
		} );

		jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
			function( elem, computed ) {
				if ( computed ) {
					return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
						elem.getBoundingClientRect().left -
							swap( elem, { marginLeft: 0 }, function() {
								return elem.getBoundingClientRect().left;
							} )
					) + "px";
				}
			}
		);

		// These hooks are used by animate to expand properties
		jQuery.each( {
			margin: "",
			padding: "",
			border: "Width"
		}, function( prefix, suffix ) {
			jQuery.cssHooks[ prefix + suffix ] = {
				expand: function( value ) {
					var i = 0,
						expanded = {},

						// Assumes a single number if not a string
						parts = typeof value === "string" ? value.split( " " ) : [ value ];

					for ( ; i < 4; i++ ) {
						expanded[ prefix + cssExpand[ i ] + suffix ] =
							parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
					}

					return expanded;
				}
			};

			if ( prefix !== "margin" ) {
				jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
			}
		} );

		jQuery.fn.extend( {
			css: function( name, value ) {
				return access( this, function( elem, name, value ) {
					var styles, len,
						map = {},
						i = 0;

					if ( Array.isArray( name ) ) {
						styles = getStyles( elem );
						len = name.length;

						for ( ; i < len; i++ ) {
							map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
						}

						return map;
					}

					return value !== undefined ?
						jQuery.style( elem, name, value ) :
						jQuery.css( elem, name );
				}, name, value, arguments.length > 1 );
			}
		} );


		function Tween( elem, options, prop, end, easing ) {
			return new Tween.prototype.init( elem, options, prop, end, easing );
		}
		jQuery.Tween = Tween;

		Tween.prototype = {
			constructor: Tween,
			init: function( elem, options, prop, end, easing, unit ) {
				this.elem = elem;
				this.prop = prop;
				this.easing = easing || jQuery.easing._default;
				this.options = options;
				this.start = this.now = this.cur();
				this.end = end;
				this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
			},
			cur: function() {
				var hooks = Tween.propHooks[ this.prop ];

				return hooks && hooks.get ?
					hooks.get( this ) :
					Tween.propHooks._default.get( this );
			},
			run: function( percent ) {
				var eased,
					hooks = Tween.propHooks[ this.prop ];

				if ( this.options.duration ) {
					this.pos = eased = jQuery.easing[ this.easing ](
						percent, this.options.duration * percent, 0, 1, this.options.duration
					);
				} else {
					this.pos = eased = percent;
				}
				this.now = ( this.end - this.start ) * eased + this.start;

				if ( this.options.step ) {
					this.options.step.call( this.elem, this.now, this );
				}

				if ( hooks && hooks.set ) {
					hooks.set( this );
				} else {
					Tween.propHooks._default.set( this );
				}
				return this;
			}
		};

		Tween.prototype.init.prototype = Tween.prototype;

		Tween.propHooks = {
			_default: {
				get: function( tween ) {
					var result;

					// Use a property on the element directly when it is not a DOM element,
					// or when there is no matching style property that exists.
					if ( tween.elem.nodeType !== 1 ||
						tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
						return tween.elem[ tween.prop ];
					}

					// Passing an empty string as a 3rd parameter to .css will automatically
					// attempt a parseFloat and fallback to a string if the parse fails.
					// Simple values such as "10px" are parsed to Float;
					// complex values such as "rotate(1rad)" are returned as-is.
					result = jQuery.css( tween.elem, tween.prop, "" );

					// Empty strings, null, undefined and "auto" are converted to 0.
					return !result || result === "auto" ? 0 : result;
				},
				set: function( tween ) {

					// Use step hook for back compat.
					// Use cssHook if its there.
					// Use .style if available and use plain properties where available.
					if ( jQuery.fx.step[ tween.prop ] ) {
						jQuery.fx.step[ tween.prop ]( tween );
					} else if ( tween.elem.nodeType === 1 && (
						jQuery.cssHooks[ tween.prop ] ||
							tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
						jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
					} else {
						tween.elem[ tween.prop ] = tween.now;
					}
				}
			}
		};

		// Support: IE <=9 only
		// Panic based approach to setting things on disconnected nodes
		Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
			set: function( tween ) {
				if ( tween.elem.nodeType && tween.elem.parentNode ) {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		};

		jQuery.easing = {
			linear: function( p ) {
				return p;
			},
			swing: function( p ) {
				return 0.5 - Math.cos( p * Math.PI ) / 2;
			},
			_default: "swing"
		};

		jQuery.fx = Tween.prototype.init;

		// Back compat <1.8 extension point
		jQuery.fx.step = {};




		var
			fxNow, inProgress,
			rfxtypes = /^(?:toggle|show|hide)$/,
			rrun = /queueHooks$/;

		function schedule() {
			if ( inProgress ) {
				if ( document.hidden === false && window.requestAnimationFrame ) {
					window.requestAnimationFrame( schedule );
				} else {
					window.setTimeout( schedule, jQuery.fx.interval );
				}

				jQuery.fx.tick();
			}
		}

		// Animations created synchronously will run synchronously
		function createFxNow() {
			window.setTimeout( function() {
				fxNow = undefined;
			} );
			return ( fxNow = Date.now() );
		}

		// Generate parameters to create a standard animation
		function genFx( type, includeWidth ) {
			var which,
				i = 0,
				attrs = { height: type };

			// If we include width, step value is 1 to do all cssExpand values,
			// otherwise step value is 2 to skip over Left and Right
			includeWidth = includeWidth ? 1 : 0;
			for ( ; i < 4; i += 2 - includeWidth ) {
				which = cssExpand[ i ];
				attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
			}

			if ( includeWidth ) {
				attrs.opacity = attrs.width = type;
			}

			return attrs;
		}

		function createTween( value, prop, animation ) {
			var tween,
				collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
				index = 0,
				length = collection.length;
			for ( ; index < length; index++ ) {
				if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

					// We're done with this property
					return tween;
				}
			}
		}

		function defaultPrefilter( elem, props, opts ) {
			var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
				isBox = "width" in props || "height" in props,
				anim = this,
				orig = {},
				style = elem.style,
				hidden = elem.nodeType && isHiddenWithinTree( elem ),
				dataShow = dataPriv.get( elem, "fxshow" );

			// Queue-skipping animations hijack the fx hooks
			if ( !opts.queue ) {
				hooks = jQuery._queueHooks( elem, "fx" );
				if ( hooks.unqueued == null ) {
					hooks.unqueued = 0;
					oldfire = hooks.empty.fire;
					hooks.empty.fire = function() {
						if ( !hooks.unqueued ) {
							oldfire();
						}
					};
				}
				hooks.unqueued++;

				anim.always( function() {

					// Ensure the complete handler is called before this completes
					anim.always( function() {
						hooks.unqueued--;
						if ( !jQuery.queue( elem, "fx" ).length ) {
							hooks.empty.fire();
						}
					} );
				} );
			}

			// Detect show/hide animations
			for ( prop in props ) {
				value = props[ prop ];
				if ( rfxtypes.test( value ) ) {
					delete props[ prop ];
					toggle = toggle || value === "toggle";
					if ( value === ( hidden ? "hide" : "show" ) ) {

						// Pretend to be hidden if this is a "show" and
						// there is still data from a stopped show/hide
						if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
							hidden = true;

						// Ignore all other no-op show/hide data
						} else {
							continue;
						}
					}
					orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
				}
			}

			// Bail out if this is a no-op like .hide().hide()
			propTween = !jQuery.isEmptyObject( props );
			if ( !propTween && jQuery.isEmptyObject( orig ) ) {
				return;
			}

			// Restrict "overflow" and "display" styles during box animations
			if ( isBox && elem.nodeType === 1 ) {

				// Support: IE <=9 - 11, Edge 12 - 15
				// Record all 3 overflow attributes because IE does not infer the shorthand
				// from identically-valued overflowX and overflowY and Edge just mirrors
				// the overflowX value there.
				opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

				// Identify a display type, preferring old show/hide data over the CSS cascade
				restoreDisplay = dataShow && dataShow.display;
				if ( restoreDisplay == null ) {
					restoreDisplay = dataPriv.get( elem, "display" );
				}
				display = jQuery.css( elem, "display" );
				if ( display === "none" ) {
					if ( restoreDisplay ) {
						display = restoreDisplay;
					} else {

						// Get nonempty value(s) by temporarily forcing visibility
						showHide( [ elem ], true );
						restoreDisplay = elem.style.display || restoreDisplay;
						display = jQuery.css( elem, "display" );
						showHide( [ elem ] );
					}
				}

				// Animate inline elements as inline-block
				if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
					if ( jQuery.css( elem, "float" ) === "none" ) {

						// Restore the original display value at the end of pure show/hide animations
						if ( !propTween ) {
							anim.done( function() {
								style.display = restoreDisplay;
							} );
							if ( restoreDisplay == null ) {
								display = style.display;
								restoreDisplay = display === "none" ? "" : display;
							}
						}
						style.display = "inline-block";
					}
				}
			}

			if ( opts.overflow ) {
				style.overflow = "hidden";
				anim.always( function() {
					style.overflow = opts.overflow[ 0 ];
					style.overflowX = opts.overflow[ 1 ];
					style.overflowY = opts.overflow[ 2 ];
				} );
			}

			// Implement show/hide animations
			propTween = false;
			for ( prop in orig ) {

				// General show/hide setup for this element animation
				if ( !propTween ) {
					if ( dataShow ) {
						if ( "hidden" in dataShow ) {
							hidden = dataShow.hidden;
						}
					} else {
						dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
					}

					// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
					if ( toggle ) {
						dataShow.hidden = !hidden;
					}

					// Show elements before animating them
					if ( hidden ) {
						showHide( [ elem ], true );
					}

					/* eslint-disable no-loop-func */

					anim.done( function() {

						/* eslint-enable no-loop-func */

						// The final step of a "hide" animation is actually hiding the element
						if ( !hidden ) {
							showHide( [ elem ] );
						}
						dataPriv.remove( elem, "fxshow" );
						for ( prop in orig ) {
							jQuery.style( elem, prop, orig[ prop ] );
						}
					} );
				}

				// Per-property setup
				propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = propTween.start;
					if ( hidden ) {
						propTween.end = propTween.start;
						propTween.start = 0;
					}
				}
			}
		}

		function propFilter( props, specialEasing ) {
			var index, name, easing, value, hooks;

			// camelCase, specialEasing and expand cssHook pass
			for ( index in props ) {
				name = camelCase( index );
				easing = specialEasing[ name ];
				value = props[ index ];
				if ( Array.isArray( value ) ) {
					easing = value[ 1 ];
					value = props[ index ] = value[ 0 ];
				}

				if ( index !== name ) {
					props[ name ] = value;
					delete props[ index ];
				}

				hooks = jQuery.cssHooks[ name ];
				if ( hooks && "expand" in hooks ) {
					value = hooks.expand( value );
					delete props[ name ];

					// Not quite $.extend, this won't overwrite existing keys.
					// Reusing 'index' because we have the correct "name"
					for ( index in value ) {
						if ( !( index in props ) ) {
							props[ index ] = value[ index ];
							specialEasing[ index ] = easing;
						}
					}
				} else {
					specialEasing[ name ] = easing;
				}
			}
		}

		function Animation( elem, properties, options ) {
			var result,
				stopped,
				index = 0,
				length = Animation.prefilters.length,
				deferred = jQuery.Deferred().always( function() {

					// Don't match elem in the :animated selector
					delete tick.elem;
				} ),
				tick = function() {
					if ( stopped ) {
						return false;
					}
					var currentTime = fxNow || createFxNow(),
						remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

						// Support: Android 2.3 only
						// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
						temp = remaining / animation.duration || 0,
						percent = 1 - temp,
						index = 0,
						length = animation.tweens.length;

					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( percent );
					}

					deferred.notifyWith( elem, [ animation, percent, remaining ] );

					// If there's more to do, yield
					if ( percent < 1 && length ) {
						return remaining;
					}

					// If this was an empty animation, synthesize a final progress notification
					if ( !length ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
					}

					// Resolve the animation and report its conclusion
					deferred.resolveWith( elem, [ animation ] );
					return false;
				},
				animation = deferred.promise( {
					elem: elem,
					props: jQuery.extend( {}, properties ),
					opts: jQuery.extend( true, {
						specialEasing: {},
						easing: jQuery.easing._default
					}, options ),
					originalProperties: properties,
					originalOptions: options,
					startTime: fxNow || createFxNow(),
					duration: options.duration,
					tweens: [],
					createTween: function( prop, end ) {
						var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
						animation.tweens.push( tween );
						return tween;
					},
					stop: function( gotoEnd ) {
						var index = 0,

							// If we are going to the end, we want to run all the tweens
							// otherwise we skip this part
							length = gotoEnd ? animation.tweens.length : 0;
						if ( stopped ) {
							return this;
						}
						stopped = true;
						for ( ; index < length; index++ ) {
							animation.tweens[ index ].run( 1 );
						}

						// Resolve when we played the last frame; otherwise, reject
						if ( gotoEnd ) {
							deferred.notifyWith( elem, [ animation, 1, 0 ] );
							deferred.resolveWith( elem, [ animation, gotoEnd ] );
						} else {
							deferred.rejectWith( elem, [ animation, gotoEnd ] );
						}
						return this;
					}
				} ),
				props = animation.props;

			propFilter( props, animation.opts.specialEasing );

			for ( ; index < length; index++ ) {
				result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
				if ( result ) {
					if ( isFunction( result.stop ) ) {
						jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
							result.stop.bind( result );
					}
					return result;
				}
			}

			jQuery.map( props, createTween, animation );

			if ( isFunction( animation.opts.start ) ) {
				animation.opts.start.call( elem, animation );
			}

			// Attach callbacks from options
			animation
				.progress( animation.opts.progress )
				.done( animation.opts.done, animation.opts.complete )
				.fail( animation.opts.fail )
				.always( animation.opts.always );

			jQuery.fx.timer(
				jQuery.extend( tick, {
					elem: elem,
					anim: animation,
					queue: animation.opts.queue
				} )
			);

			return animation;
		}

		jQuery.Animation = jQuery.extend( Animation, {

			tweeners: {
				"*": [ function( prop, value ) {
					var tween = this.createTween( prop, value );
					adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
					return tween;
				} ]
			},

			tweener: function( props, callback ) {
				if ( isFunction( props ) ) {
					callback = props;
					props = [ "*" ];
				} else {
					props = props.match( rnothtmlwhite );
				}

				var prop,
					index = 0,
					length = props.length;

				for ( ; index < length; index++ ) {
					prop = props[ index ];
					Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
					Animation.tweeners[ prop ].unshift( callback );
				}
			},

			prefilters: [ defaultPrefilter ],

			prefilter: function( callback, prepend ) {
				if ( prepend ) {
					Animation.prefilters.unshift( callback );
				} else {
					Animation.prefilters.push( callback );
				}
			}
		} );

		jQuery.speed = function( speed, easing, fn ) {
			var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
				complete: fn || !fn && easing ||
					isFunction( speed ) && speed,
				duration: speed,
				easing: fn && easing || easing && !isFunction( easing ) && easing
			};

			// Go to the end state if fx are off
			if ( jQuery.fx.off ) {
				opt.duration = 0;

			} else {
				if ( typeof opt.duration !== "number" ) {
					if ( opt.duration in jQuery.fx.speeds ) {
						opt.duration = jQuery.fx.speeds[ opt.duration ];

					} else {
						opt.duration = jQuery.fx.speeds._default;
					}
				}
			}

			// Normalize opt.queue - true/undefined/null -> "fx"
			if ( opt.queue == null || opt.queue === true ) {
				opt.queue = "fx";
			}

			// Queueing
			opt.old = opt.complete;

			opt.complete = function() {
				if ( isFunction( opt.old ) ) {
					opt.old.call( this );
				}

				if ( opt.queue ) {
					jQuery.dequeue( this, opt.queue );
				}
			};

			return opt;
		};

		jQuery.fn.extend( {
			fadeTo: function( speed, to, easing, callback ) {

				// Show any hidden elements after setting opacity to 0
				return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

					// Animate to the value specified
					.end().animate( { opacity: to }, speed, easing, callback );
			},
			animate: function( prop, speed, easing, callback ) {
				var empty = jQuery.isEmptyObject( prop ),
					optall = jQuery.speed( speed, easing, callback ),
					doAnimation = function() {

						// Operate on a copy of prop so per-property easing won't be lost
						var anim = Animation( this, jQuery.extend( {}, prop ), optall );

						// Empty animations, or finishing resolves immediately
						if ( empty || dataPriv.get( this, "finish" ) ) {
							anim.stop( true );
						}
					};

				doAnimation.finish = doAnimation;

				return empty || optall.queue === false ?
					this.each( doAnimation ) :
					this.queue( optall.queue, doAnimation );
			},
			stop: function( type, clearQueue, gotoEnd ) {
				var stopQueue = function( hooks ) {
					var stop = hooks.stop;
					delete hooks.stop;
					stop( gotoEnd );
				};

				if ( typeof type !== "string" ) {
					gotoEnd = clearQueue;
					clearQueue = type;
					type = undefined;
				}
				if ( clearQueue ) {
					this.queue( type || "fx", [] );
				}

				return this.each( function() {
					var dequeue = true,
						index = type != null && type + "queueHooks",
						timers = jQuery.timers,
						data = dataPriv.get( this );

					if ( index ) {
						if ( data[ index ] && data[ index ].stop ) {
							stopQueue( data[ index ] );
						}
					} else {
						for ( index in data ) {
							if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
								stopQueue( data[ index ] );
							}
						}
					}

					for ( index = timers.length; index--; ) {
						if ( timers[ index ].elem === this &&
							( type == null || timers[ index ].queue === type ) ) {

							timers[ index ].anim.stop( gotoEnd );
							dequeue = false;
							timers.splice( index, 1 );
						}
					}

					// Start the next in the queue if the last step wasn't forced.
					// Timers currently will call their complete callbacks, which
					// will dequeue but only if they were gotoEnd.
					if ( dequeue || !gotoEnd ) {
						jQuery.dequeue( this, type );
					}
				} );
			},
			finish: function( type ) {
				if ( type !== false ) {
					type = type || "fx";
				}
				return this.each( function() {
					var index,
						data = dataPriv.get( this ),
						queue = data[ type + "queue" ],
						hooks = data[ type + "queueHooks" ],
						timers = jQuery.timers,
						length = queue ? queue.length : 0;

					// Enable finishing flag on private data
					data.finish = true;

					// Empty the queue first
					jQuery.queue( this, type, [] );

					if ( hooks && hooks.stop ) {
						hooks.stop.call( this, true );
					}

					// Look for any active animations, and finish them
					for ( index = timers.length; index--; ) {
						if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
							timers[ index ].anim.stop( true );
							timers.splice( index, 1 );
						}
					}

					// Look for any animations in the old queue and finish them
					for ( index = 0; index < length; index++ ) {
						if ( queue[ index ] && queue[ index ].finish ) {
							queue[ index ].finish.call( this );
						}
					}

					// Turn off finishing flag
					delete data.finish;
				} );
			}
		} );

		jQuery.each( [ "toggle", "show", "hide" ], function( _i, name ) {
			var cssFn = jQuery.fn[ name ];
			jQuery.fn[ name ] = function( speed, easing, callback ) {
				return speed == null || typeof speed === "boolean" ?
					cssFn.apply( this, arguments ) :
					this.animate( genFx( name, true ), speed, easing, callback );
			};
		} );

		// Generate shortcuts for custom animations
		jQuery.each( {
			slideDown: genFx( "show" ),
			slideUp: genFx( "hide" ),
			slideToggle: genFx( "toggle" ),
			fadeIn: { opacity: "show" },
			fadeOut: { opacity: "hide" },
			fadeToggle: { opacity: "toggle" }
		}, function( name, props ) {
			jQuery.fn[ name ] = function( speed, easing, callback ) {
				return this.animate( props, speed, easing, callback );
			};
		} );

		jQuery.timers = [];
		jQuery.fx.tick = function() {
			var timer,
				i = 0,
				timers = jQuery.timers;

			fxNow = Date.now();

			for ( ; i < timers.length; i++ ) {
				timer = timers[ i ];

				// Run the timer and safely remove it when done (allowing for external removal)
				if ( !timer() && timers[ i ] === timer ) {
					timers.splice( i--, 1 );
				}
			}

			if ( !timers.length ) {
				jQuery.fx.stop();
			}
			fxNow = undefined;
		};

		jQuery.fx.timer = function( timer ) {
			jQuery.timers.push( timer );
			jQuery.fx.start();
		};

		jQuery.fx.interval = 13;
		jQuery.fx.start = function() {
			if ( inProgress ) {
				return;
			}

			inProgress = true;
			schedule();
		};

		jQuery.fx.stop = function() {
			inProgress = null;
		};

		jQuery.fx.speeds = {
			slow: 600,
			fast: 200,

			// Default speed
			_default: 400
		};


		// Based off of the plugin by Clint Helfers, with permission.
		// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
		jQuery.fn.delay = function( time, type ) {
			time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
			type = type || "fx";

			return this.queue( type, function( next, hooks ) {
				var timeout = window.setTimeout( next, time );
				hooks.stop = function() {
					window.clearTimeout( timeout );
				};
			} );
		};


		( function() {
			var input = document.createElement( "input" ),
				select = document.createElement( "select" ),
				opt = select.appendChild( document.createElement( "option" ) );

			input.type = "checkbox";

			// Support: Android <=4.3 only
			// Default value for a checkbox should be "on"
			support.checkOn = input.value !== "";

			// Support: IE <=11 only
			// Must access selectedIndex to make default options select
			support.optSelected = opt.selected;

			// Support: IE <=11 only
			// An input loses its value after becoming a radio
			input = document.createElement( "input" );
			input.value = "t";
			input.type = "radio";
			support.radioValue = input.value === "t";
		} )();


		var boolHook,
			attrHandle = jQuery.expr.attrHandle;

		jQuery.fn.extend( {
			attr: function( name, value ) {
				return access( this, jQuery.attr, name, value, arguments.length > 1 );
			},

			removeAttr: function( name ) {
				return this.each( function() {
					jQuery.removeAttr( this, name );
				} );
			}
		} );

		jQuery.extend( {
			attr: function( elem, name, value ) {
				var ret, hooks,
					nType = elem.nodeType;

				// Don't get/set attributes on text, comment and attribute nodes
				if ( nType === 3 || nType === 8 || nType === 2 ) {
					return;
				}

				// Fallback to prop when attributes are not supported
				if ( typeof elem.getAttribute === "undefined" ) {
					return jQuery.prop( elem, name, value );
				}

				// Attribute hooks are determined by the lowercase version
				// Grab necessary hook if one is defined
				if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
					hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
						( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
				}

				if ( value !== undefined ) {
					if ( value === null ) {
						jQuery.removeAttr( elem, name );
						return;
					}

					if ( hooks && "set" in hooks &&
						( ret = hooks.set( elem, value, name ) ) !== undefined ) {
						return ret;
					}

					elem.setAttribute( name, value + "" );
					return value;
				}

				if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
					return ret;
				}

				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ? undefined : ret;
			},

			attrHooks: {
				type: {
					set: function( elem, value ) {
						if ( !support.radioValue && value === "radio" &&
							nodeName( elem, "input" ) ) {
							var val = elem.value;
							elem.setAttribute( "type", value );
							if ( val ) {
								elem.value = val;
							}
							return value;
						}
					}
				}
			},

			removeAttr: function( elem, value ) {
				var name,
					i = 0,

					// Attribute names can contain non-HTML whitespace characters
					// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
					attrNames = value && value.match( rnothtmlwhite );

				if ( attrNames && elem.nodeType === 1 ) {
					while ( ( name = attrNames[ i++ ] ) ) {
						elem.removeAttribute( name );
					}
				}
			}
		} );

		// Hooks for boolean attributes
		boolHook = {
			set: function( elem, value, name ) {
				if ( value === false ) {

					// Remove boolean attributes when set to false
					jQuery.removeAttr( elem, name );
				} else {
					elem.setAttribute( name, name );
				}
				return name;
			}
		};

		jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( _i, name ) {
			var getter = attrHandle[ name ] || jQuery.find.attr;

			attrHandle[ name ] = function( elem, name, isXML ) {
				var ret, handle,
					lowercaseName = name.toLowerCase();

				if ( !isXML ) {

					// Avoid an infinite loop by temporarily removing this function from the getter
					handle = attrHandle[ lowercaseName ];
					attrHandle[ lowercaseName ] = ret;
					ret = getter( elem, name, isXML ) != null ?
						lowercaseName :
						null;
					attrHandle[ lowercaseName ] = handle;
				}
				return ret;
			};
		} );




		var rfocusable = /^(?:input|select|textarea|button)$/i,
			rclickable = /^(?:a|area)$/i;

		jQuery.fn.extend( {
			prop: function( name, value ) {
				return access( this, jQuery.prop, name, value, arguments.length > 1 );
			},

			removeProp: function( name ) {
				return this.each( function() {
					delete this[ jQuery.propFix[ name ] || name ];
				} );
			}
		} );

		jQuery.extend( {
			prop: function( elem, name, value ) {
				var ret, hooks,
					nType = elem.nodeType;

				// Don't get/set properties on text, comment and attribute nodes
				if ( nType === 3 || nType === 8 || nType === 2 ) {
					return;
				}

				if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

					// Fix name and attach hooks
					name = jQuery.propFix[ name ] || name;
					hooks = jQuery.propHooks[ name ];
				}

				if ( value !== undefined ) {
					if ( hooks && "set" in hooks &&
						( ret = hooks.set( elem, value, name ) ) !== undefined ) {
						return ret;
					}

					return ( elem[ name ] = value );
				}

				if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
					return ret;
				}

				return elem[ name ];
			},

			propHooks: {
				tabIndex: {
					get: function( elem ) {

						// Support: IE <=9 - 11 only
						// elem.tabIndex doesn't always return the
						// correct value when it hasn't been explicitly set
						// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
						// Use proper attribute retrieval(#12072)
						var tabindex = jQuery.find.attr( elem, "tabindex" );

						if ( tabindex ) {
							return parseInt( tabindex, 10 );
						}

						if (
							rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) &&
							elem.href
						) {
							return 0;
						}

						return -1;
					}
				}
			},

			propFix: {
				"for": "htmlFor",
				"class": "className"
			}
		} );

		// Support: IE <=11 only
		// Accessing the selectedIndex property
		// forces the browser to respect setting selected
		// on the option
		// The getter ensures a default option is selected
		// when in an optgroup
		// eslint rule "no-unused-expressions" is disabled for this code
		// since it considers such accessions noop
		if ( !support.optSelected ) {
			jQuery.propHooks.selected = {
				get: function( elem ) {

					/* eslint no-unused-expressions: "off" */

					var parent = elem.parentNode;
					if ( parent && parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
					return null;
				},
				set: function( elem ) {

					/* eslint no-unused-expressions: "off" */

					var parent = elem.parentNode;
					if ( parent ) {
						parent.selectedIndex;

						if ( parent.parentNode ) {
							parent.parentNode.selectedIndex;
						}
					}
				}
			};
		}

		jQuery.each( [
			"tabIndex",
			"readOnly",
			"maxLength",
			"cellSpacing",
			"cellPadding",
			"rowSpan",
			"colSpan",
			"useMap",
			"frameBorder",
			"contentEditable"
		], function() {
			jQuery.propFix[ this.toLowerCase() ] = this;
		} );




			// Strip and collapse whitespace according to HTML spec
			// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
			function stripAndCollapse( value ) {
				var tokens = value.match( rnothtmlwhite ) || [];
				return tokens.join( " " );
			}


		function getClass( elem ) {
			return elem.getAttribute && elem.getAttribute( "class" ) || "";
		}

		function classesToArray( value ) {
			if ( Array.isArray( value ) ) {
				return value;
			}
			if ( typeof value === "string" ) {
				return value.match( rnothtmlwhite ) || [];
			}
			return [];
		}

		jQuery.fn.extend( {
			addClass: function( value ) {
				var classes, elem, cur, curValue, clazz, j, finalValue,
					i = 0;

				if ( isFunction( value ) ) {
					return this.each( function( j ) {
						jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
					} );
				}

				classes = classesToArray( value );

				if ( classes.length ) {
					while ( ( elem = this[ i++ ] ) ) {
						curValue = getClass( elem );
						cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

						if ( cur ) {
							j = 0;
							while ( ( clazz = classes[ j++ ] ) ) {
								if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
									cur += clazz + " ";
								}
							}

							// Only assign if different to avoid unneeded rendering.
							finalValue = stripAndCollapse( cur );
							if ( curValue !== finalValue ) {
								elem.setAttribute( "class", finalValue );
							}
						}
					}
				}

				return this;
			},

			removeClass: function( value ) {
				var classes, elem, cur, curValue, clazz, j, finalValue,
					i = 0;

				if ( isFunction( value ) ) {
					return this.each( function( j ) {
						jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
					} );
				}

				if ( !arguments.length ) {
					return this.attr( "class", "" );
				}

				classes = classesToArray( value );

				if ( classes.length ) {
					while ( ( elem = this[ i++ ] ) ) {
						curValue = getClass( elem );

						// This expression is here for better compressibility (see addClass)
						cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

						if ( cur ) {
							j = 0;
							while ( ( clazz = classes[ j++ ] ) ) {

								// Remove *all* instances
								while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
									cur = cur.replace( " " + clazz + " ", " " );
								}
							}

							// Only assign if different to avoid unneeded rendering.
							finalValue = stripAndCollapse( cur );
							if ( curValue !== finalValue ) {
								elem.setAttribute( "class", finalValue );
							}
						}
					}
				}

				return this;
			},

			toggleClass: function( value, stateVal ) {
				var type = typeof value,
					isValidValue = type === "string" || Array.isArray( value );

				if ( typeof stateVal === "boolean" && isValidValue ) {
					return stateVal ? this.addClass( value ) : this.removeClass( value );
				}

				if ( isFunction( value ) ) {
					return this.each( function( i ) {
						jQuery( this ).toggleClass(
							value.call( this, i, getClass( this ), stateVal ),
							stateVal
						);
					} );
				}

				return this.each( function() {
					var className, i, self, classNames;

					if ( isValidValue ) {

						// Toggle individual class names
						i = 0;
						self = jQuery( this );
						classNames = classesToArray( value );

						while ( ( className = classNames[ i++ ] ) ) {

							// Check each className given, space separated list
							if ( self.hasClass( className ) ) {
								self.removeClass( className );
							} else {
								self.addClass( className );
							}
						}

					// Toggle whole class name
					} else if ( value === undefined || type === "boolean" ) {
						className = getClass( this );
						if ( className ) {

							// Store className if set
							dataPriv.set( this, "__className__", className );
						}

						// If the element has a class name or if we're passed `false`,
						// then remove the whole classname (if there was one, the above saved it).
						// Otherwise bring back whatever was previously saved (if anything),
						// falling back to the empty string if nothing was stored.
						if ( this.setAttribute ) {
							this.setAttribute( "class",
								className || value === false ?
									"" :
									dataPriv.get( this, "__className__" ) || ""
							);
						}
					}
				} );
			},

			hasClass: function( selector ) {
				var className, elem,
					i = 0;

				className = " " + selector + " ";
				while ( ( elem = this[ i++ ] ) ) {
					if ( elem.nodeType === 1 &&
						( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
					}
				}

				return false;
			}
		} );




		var rreturn = /\r/g;

		jQuery.fn.extend( {
			val: function( value ) {
				var hooks, ret, valueIsFunction,
					elem = this[ 0 ];

				if ( !arguments.length ) {
					if ( elem ) {
						hooks = jQuery.valHooks[ elem.type ] ||
							jQuery.valHooks[ elem.nodeName.toLowerCase() ];

						if ( hooks &&
							"get" in hooks &&
							( ret = hooks.get( elem, "value" ) ) !== undefined
						) {
							return ret;
						}

						ret = elem.value;

						// Handle most common string cases
						if ( typeof ret === "string" ) {
							return ret.replace( rreturn, "" );
						}

						// Handle cases where value is null/undef or number
						return ret == null ? "" : ret;
					}

					return;
				}

				valueIsFunction = isFunction( value );

				return this.each( function( i ) {
					var val;

					if ( this.nodeType !== 1 ) {
						return;
					}

					if ( valueIsFunction ) {
						val = value.call( this, i, jQuery( this ).val() );
					} else {
						val = value;
					}

					// Treat null/undefined as ""; convert numbers to string
					if ( val == null ) {
						val = "";

					} else if ( typeof val === "number" ) {
						val += "";

					} else if ( Array.isArray( val ) ) {
						val = jQuery.map( val, function( value ) {
							return value == null ? "" : value + "";
						} );
					}

					hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

					// If set returns undefined, fall back to normal setting
					if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
						this.value = val;
					}
				} );
			}
		} );

		jQuery.extend( {
			valHooks: {
				option: {
					get: function( elem ) {

						var val = jQuery.find.attr( elem, "value" );
						return val != null ?
							val :

							// Support: IE <=10 - 11 only
							// option.text throws exceptions (#14686, #14858)
							// Strip and collapse whitespace
							// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
							stripAndCollapse( jQuery.text( elem ) );
					}
				},
				select: {
					get: function( elem ) {
						var value, option, i,
							options = elem.options,
							index = elem.selectedIndex,
							one = elem.type === "select-one",
							values = one ? null : [],
							max = one ? index + 1 : options.length;

						if ( index < 0 ) {
							i = max;

						} else {
							i = one ? index : 0;
						}

						// Loop through all the selected options
						for ( ; i < max; i++ ) {
							option = options[ i ];

							// Support: IE <=9 only
							// IE8-9 doesn't update selected after form reset (#2551)
							if ( ( option.selected || i === index ) &&

									// Don't return options that are disabled or in a disabled optgroup
									!option.disabled &&
									( !option.parentNode.disabled ||
										!nodeName( option.parentNode, "optgroup" ) ) ) {

								// Get the specific value for the option
								value = jQuery( option ).val();

								// We don't need an array for one selects
								if ( one ) {
									return value;
								}

								// Multi-Selects return an array
								values.push( value );
							}
						}

						return values;
					},

					set: function( elem, value ) {
						var optionSet, option,
							options = elem.options,
							values = jQuery.makeArray( value ),
							i = options.length;

						while ( i-- ) {
							option = options[ i ];

							/* eslint-disable no-cond-assign */

							if ( option.selected =
								jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
							) {
								optionSet = true;
							}

							/* eslint-enable no-cond-assign */
						}

						// Force browsers to behave consistently when non-matching value is set
						if ( !optionSet ) {
							elem.selectedIndex = -1;
						}
						return values;
					}
				}
			}
		} );

		// Radios and checkboxes getter/setter
		jQuery.each( [ "radio", "checkbox" ], function() {
			jQuery.valHooks[ this ] = {
				set: function( elem, value ) {
					if ( Array.isArray( value ) ) {
						return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
					}
				}
			};
			if ( !support.checkOn ) {
				jQuery.valHooks[ this ].get = function( elem ) {
					return elem.getAttribute( "value" ) === null ? "on" : elem.value;
				};
			}
		} );




		// Return jQuery for attributes-only inclusion


		support.focusin = "onfocusin" in window;


		var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
			stopPropagationCallback = function( e ) {
				e.stopPropagation();
			};

		jQuery.extend( jQuery.event, {

			trigger: function( event, data, elem, onlyHandlers ) {

				var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
					eventPath = [ elem || document ],
					type = hasOwn.call( event, "type" ) ? event.type : event,
					namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

				cur = lastElement = tmp = elem = elem || document;

				// Don't do events on text and comment nodes
				if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
					return;
				}

				// focus/blur morphs to focusin/out; ensure we're not firing them right now
				if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
					return;
				}

				if ( type.indexOf( "." ) > -1 ) {

					// Namespaced trigger; create a regexp to match event type in handle()
					namespaces = type.split( "." );
					type = namespaces.shift();
					namespaces.sort();
				}
				ontype = type.indexOf( ":" ) < 0 && "on" + type;

				// Caller can pass in a jQuery.Event object, Object, or just an event type string
				event = event[ jQuery.expando ] ?
					event :
					new jQuery.Event( type, typeof event === "object" && event );

				// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
				event.isTrigger = onlyHandlers ? 2 : 3;
				event.namespace = namespaces.join( "." );
				event.rnamespace = event.namespace ?
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
					null;

				// Clean up the event in case it is being reused
				event.result = undefined;
				if ( !event.target ) {
					event.target = elem;
				}

				// Clone any incoming data and prepend the event, creating the handler arg list
				data = data == null ?
					[ event ] :
					jQuery.makeArray( data, [ event ] );

				// Allow special events to draw outside the lines
				special = jQuery.event.special[ type ] || {};
				if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
					return;
				}

				// Determine event propagation path in advance, per W3C events spec (#9951)
				// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
				if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

					bubbleType = special.delegateType || type;
					if ( !rfocusMorph.test( bubbleType + type ) ) {
						cur = cur.parentNode;
					}
					for ( ; cur; cur = cur.parentNode ) {
						eventPath.push( cur );
						tmp = cur;
					}

					// Only add window if we got to document (e.g., not plain obj or detached DOM)
					if ( tmp === ( elem.ownerDocument || document ) ) {
						eventPath.push( tmp.defaultView || tmp.parentWindow || window );
					}
				}

				// Fire handlers on the event path
				i = 0;
				while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
					lastElement = cur;
					event.type = i > 1 ?
						bubbleType :
						special.bindType || type;

					// jQuery handler
					handle = ( dataPriv.get( cur, "events" ) || Object.create( null ) )[ event.type ] &&
						dataPriv.get( cur, "handle" );
					if ( handle ) {
						handle.apply( cur, data );
					}

					// Native handler
					handle = ontype && cur[ ontype ];
					if ( handle && handle.apply && acceptData( cur ) ) {
						event.result = handle.apply( cur, data );
						if ( event.result === false ) {
							event.preventDefault();
						}
					}
				}
				event.type = type;

				// If nobody prevented the default action, do it now
				if ( !onlyHandlers && !event.isDefaultPrevented() ) {

					if ( ( !special._default ||
						special._default.apply( eventPath.pop(), data ) === false ) &&
						acceptData( elem ) ) {

						// Call a native DOM method on the target with the same name as the event.
						// Don't do default actions on window, that's where global variables be (#6170)
						if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

							// Don't re-trigger an onFOO event when we call its FOO() method
							tmp = elem[ ontype ];

							if ( tmp ) {
								elem[ ontype ] = null;
							}

							// Prevent re-triggering of the same event, since we already bubbled it above
							jQuery.event.triggered = type;

							if ( event.isPropagationStopped() ) {
								lastElement.addEventListener( type, stopPropagationCallback );
							}

							elem[ type ]();

							if ( event.isPropagationStopped() ) {
								lastElement.removeEventListener( type, stopPropagationCallback );
							}

							jQuery.event.triggered = undefined;

							if ( tmp ) {
								elem[ ontype ] = tmp;
							}
						}
					}
				}

				return event.result;
			},

			// Piggyback on a donor event to simulate a different one
			// Used only for `focus(in | out)` events
			simulate: function( type, elem, event ) {
				var e = jQuery.extend(
					new jQuery.Event(),
					event,
					{
						type: type,
						isSimulated: true
					}
				);

				jQuery.event.trigger( e, null, elem );
			}

		} );

		jQuery.fn.extend( {

			trigger: function( type, data ) {
				return this.each( function() {
					jQuery.event.trigger( type, data, this );
				} );
			},
			triggerHandler: function( type, data ) {
				var elem = this[ 0 ];
				if ( elem ) {
					return jQuery.event.trigger( type, data, elem, true );
				}
			}
		} );


		// Support: Firefox <=44
		// Firefox doesn't have focus(in | out) events
		// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
		//
		// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
		// focus(in | out) events fire after focus & blur events,
		// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
		// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
		if ( !support.focusin ) {
			jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

				// Attach a single capturing handler on the document while someone wants focusin/focusout
				var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
				};

				jQuery.event.special[ fix ] = {
					setup: function() {

						// Handle: regular nodes (via `this.ownerDocument`), window
						// (via `this.document`) & document (via `this`).
						var doc = this.ownerDocument || this.document || this,
							attaches = dataPriv.access( doc, fix );

						if ( !attaches ) {
							doc.addEventListener( orig, handler, true );
						}
						dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
					},
					teardown: function() {
						var doc = this.ownerDocument || this.document || this,
							attaches = dataPriv.access( doc, fix ) - 1;

						if ( !attaches ) {
							doc.removeEventListener( orig, handler, true );
							dataPriv.remove( doc, fix );

						} else {
							dataPriv.access( doc, fix, attaches );
						}
					}
				};
			} );
		}
		var location = window.location;

		var nonce = { guid: Date.now() };

		var rquery = ( /\?/ );



		// Cross-browser xml parsing
		jQuery.parseXML = function( data ) {
			var xml, parserErrorElem;
			if ( !data || typeof data !== "string" ) {
				return null;
			}

			// Support: IE 9 - 11 only
			// IE throws on parseFromString with invalid input.
			try {
				xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
			} catch ( e ) {}

			parserErrorElem = xml && xml.getElementsByTagName( "parsererror" )[ 0 ];
			if ( !xml || parserErrorElem ) {
				jQuery.error( "Invalid XML: " + (
					parserErrorElem ?
						jQuery.map( parserErrorElem.childNodes, function( el ) {
							return el.textContent;
						} ).join( "\n" ) :
						data
				) );
			}
			return xml;
		};


		var
			rbracket = /\[\]$/,
			rCRLF = /\r?\n/g,
			rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
			rsubmittable = /^(?:input|select|textarea|keygen)/i;

		function buildParams( prefix, obj, traditional, add ) {
			var name;

			if ( Array.isArray( obj ) ) {

				// Serialize array item.
				jQuery.each( obj, function( i, v ) {
					if ( traditional || rbracket.test( prefix ) ) {

						// Treat each array item as a scalar.
						add( prefix, v );

					} else {

						// Item is non-scalar (array or object), encode its numeric index.
						buildParams(
							prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
							v,
							traditional,
							add
						);
					}
				} );

			} else if ( !traditional && toType( obj ) === "object" ) {

				// Serialize object item.
				for ( name in obj ) {
					buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
				}

			} else {

				// Serialize scalar item.
				add( prefix, obj );
			}
		}

		// Serialize an array of form elements or a set of
		// key/values into a query string
		jQuery.param = function( a, traditional ) {
			var prefix,
				s = [],
				add = function( key, valueOrFunction ) {

					// If value is a function, invoke it and use its return value
					var value = isFunction( valueOrFunction ) ?
						valueOrFunction() :
						valueOrFunction;

					s[ s.length ] = encodeURIComponent( key ) + "=" +
						encodeURIComponent( value == null ? "" : value );
				};

			if ( a == null ) {
				return "";
			}

			// If an array was passed in, assume that it is an array of form elements.
			if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

				// Serialize the form elements
				jQuery.each( a, function() {
					add( this.name, this.value );
				} );

			} else {

				// If traditional, encode the "old" way (the way 1.3.2 or older
				// did it), otherwise encode params recursively.
				for ( prefix in a ) {
					buildParams( prefix, a[ prefix ], traditional, add );
				}
			}

			// Return the resulting serialization
			return s.join( "&" );
		};

		jQuery.fn.extend( {
			serialize: function() {
				return jQuery.param( this.serializeArray() );
			},
			serializeArray: function() {
				return this.map( function() {

					// Can add propHook for "elements" to filter or add form elements
					var elements = jQuery.prop( this, "elements" );
					return elements ? jQuery.makeArray( elements ) : this;
				} ).filter( function() {
					var type = this.type;

					// Use .is( ":disabled" ) so that fieldset[disabled] works
					return this.name && !jQuery( this ).is( ":disabled" ) &&
						rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
						( this.checked || !rcheckableType.test( type ) );
				} ).map( function( _i, elem ) {
					var val = jQuery( this ).val();

					if ( val == null ) {
						return null;
					}

					if ( Array.isArray( val ) ) {
						return jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} );
					}

					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} ).get();
			}
		} );


		var
			r20 = /%20/g,
			rhash = /#.*$/,
			rantiCache = /([?&])_=[^&]*/,
			rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

			// #7653, #8125, #8152: local protocol detection
			rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
			rnoContent = /^(?:GET|HEAD)$/,
			rprotocol = /^\/\//,

			/* Prefilters
			 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
			 * 2) These are called:
			 *    - BEFORE asking for a transport
			 *    - AFTER param serialization (s.data is a string if s.processData is true)
			 * 3) key is the dataType
			 * 4) the catchall symbol "*" can be used
			 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
			 */
			prefilters = {},

			/* Transports bindings
			 * 1) key is the dataType
			 * 2) the catchall symbol "*" can be used
			 * 3) selection will start with transport dataType and THEN go to "*" if needed
			 */
			transports = {},

			// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
			allTypes = "*/".concat( "*" ),

			// Anchor tag for parsing the document origin
			originAnchor = document.createElement( "a" );

		originAnchor.href = location.href;

		// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
		function addToPrefiltersOrTransports( structure ) {

			// dataTypeExpression is optional and defaults to "*"
			return function( dataTypeExpression, func ) {

				if ( typeof dataTypeExpression !== "string" ) {
					func = dataTypeExpression;
					dataTypeExpression = "*";
				}

				var dataType,
					i = 0,
					dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

				if ( isFunction( func ) ) {

					// For each dataType in the dataTypeExpression
					while ( ( dataType = dataTypes[ i++ ] ) ) {

						// Prepend if requested
						if ( dataType[ 0 ] === "+" ) {
							dataType = dataType.slice( 1 ) || "*";
							( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

						// Otherwise append
						} else {
							( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
						}
					}
				}
			};
		}

		// Base inspection function for prefilters and transports
		function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

			var inspected = {},
				seekingTransport = ( structure === transports );

			function inspect( dataType ) {
				var selected;
				inspected[ dataType ] = true;
				jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
					var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
					if ( typeof dataTypeOrTransport === "string" &&
						!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

						options.dataTypes.unshift( dataTypeOrTransport );
						inspect( dataTypeOrTransport );
						return false;
					} else if ( seekingTransport ) {
						return !( selected = dataTypeOrTransport );
					}
				} );
				return selected;
			}

			return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
		}

		// A special extend for ajax options
		// that takes "flat" options (not to be deep extended)
		// Fixes #9887
		function ajaxExtend( target, src ) {
			var key, deep,
				flatOptions = jQuery.ajaxSettings.flatOptions || {};

			for ( key in src ) {
				if ( src[ key ] !== undefined ) {
					( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
				}
			}
			if ( deep ) {
				jQuery.extend( true, target, deep );
			}

			return target;
		}

		/* Handles responses to an ajax request:
		 * - finds the right dataType (mediates between content-type and expected dataType)
		 * - returns the corresponding response
		 */
		function ajaxHandleResponses( s, jqXHR, responses ) {

			var ct, type, finalDataType, firstDataType,
				contents = s.contents,
				dataTypes = s.dataTypes;

			// Remove auto dataType and get content-type in the process
			while ( dataTypes[ 0 ] === "*" ) {
				dataTypes.shift();
				if ( ct === undefined ) {
					ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
				}
			}

			// Check if we're dealing with a known content-type
			if ( ct ) {
				for ( type in contents ) {
					if ( contents[ type ] && contents[ type ].test( ct ) ) {
						dataTypes.unshift( type );
						break;
					}
				}
			}

			// Check to see if we have a response for the expected dataType
			if ( dataTypes[ 0 ] in responses ) {
				finalDataType = dataTypes[ 0 ];
			} else {

				// Try convertible dataTypes
				for ( type in responses ) {
					if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
						finalDataType = type;
						break;
					}
					if ( !firstDataType ) {
						firstDataType = type;
					}
				}

				// Or just use first one
				finalDataType = finalDataType || firstDataType;
			}

			// If we found a dataType
			// We add the dataType to the list if needed
			// and return the corresponding response
			if ( finalDataType ) {
				if ( finalDataType !== dataTypes[ 0 ] ) {
					dataTypes.unshift( finalDataType );
				}
				return responses[ finalDataType ];
			}
		}

		/* Chain conversions given the request and the original response
		 * Also sets the responseXXX fields on the jqXHR instance
		 */
		function ajaxConvert( s, response, jqXHR, isSuccess ) {
			var conv2, current, conv, tmp, prev,
				converters = {},

				// Work with a copy of dataTypes in case we need to modify it for conversion
				dataTypes = s.dataTypes.slice();

			// Create converters map with lowercased keys
			if ( dataTypes[ 1 ] ) {
				for ( conv in s.converters ) {
					converters[ conv.toLowerCase() ] = s.converters[ conv ];
				}
			}

			current = dataTypes.shift();

			// Convert to each sequential dataType
			while ( current ) {

				if ( s.responseFields[ current ] ) {
					jqXHR[ s.responseFields[ current ] ] = response;
				}

				// Apply the dataFilter if provided
				if ( !prev && isSuccess && s.dataFilter ) {
					response = s.dataFilter( response, s.dataType );
				}

				prev = current;
				current = dataTypes.shift();

				if ( current ) {

					// There's only work to do if current dataType is non-auto
					if ( current === "*" ) {

						current = prev;

					// Convert response if prev dataType is non-auto and differs from current
					} else if ( prev !== "*" && prev !== current ) {

						// Seek a direct converter
						conv = converters[ prev + " " + current ] || converters[ "* " + current ];

						// If none found, seek a pair
						if ( !conv ) {
							for ( conv2 in converters ) {

								// If conv2 outputs current
								tmp = conv2.split( " " );
								if ( tmp[ 1 ] === current ) {

									// If prev can be converted to accepted input
									conv = converters[ prev + " " + tmp[ 0 ] ] ||
										converters[ "* " + tmp[ 0 ] ];
									if ( conv ) {

										// Condense equivalence converters
										if ( conv === true ) {
											conv = converters[ conv2 ];

										// Otherwise, insert the intermediate dataType
										} else if ( converters[ conv2 ] !== true ) {
											current = tmp[ 0 ];
											dataTypes.unshift( tmp[ 1 ] );
										}
										break;
									}
								}
							}
						}

						// Apply converter (if not an equivalence)
						if ( conv !== true ) {

							// Unless errors are allowed to bubble, catch and return them
							if ( conv && s.throws ) {
								response = conv( response );
							} else {
								try {
									response = conv( response );
								} catch ( e ) {
									return {
										state: "parsererror",
										error: conv ? e : "No conversion from " + prev + " to " + current
									};
								}
							}
						}
					}
				}
			}

			return { state: "success", data: response };
		}

		jQuery.extend( {

			// Counter for holding the number of active queries
			active: 0,

			// Last-Modified header cache for next request
			lastModified: {},
			etag: {},

			ajaxSettings: {
				url: location.href,
				type: "GET",
				isLocal: rlocalProtocol.test( location.protocol ),
				global: true,
				processData: true,
				async: true,
				contentType: "application/x-www-form-urlencoded; charset=UTF-8",

				/*
				timeout: 0,
				data: null,
				dataType: null,
				username: null,
				password: null,
				cache: null,
				throws: false,
				traditional: false,
				headers: {},
				*/

				accepts: {
					"*": allTypes,
					text: "text/plain",
					html: "text/html",
					xml: "application/xml, text/xml",
					json: "application/json, text/javascript"
				},

				contents: {
					xml: /\bxml\b/,
					html: /\bhtml/,
					json: /\bjson\b/
				},

				responseFields: {
					xml: "responseXML",
					text: "responseText",
					json: "responseJSON"
				},

				// Data converters
				// Keys separate source (or catchall "*") and destination types with a single space
				converters: {

					// Convert anything to text
					"* text": String,

					// Text to html (true = no transformation)
					"text html": true,

					// Evaluate text as a json expression
					"text json": JSON.parse,

					// Parse text as xml
					"text xml": jQuery.parseXML
				},

				// For options that shouldn't be deep extended:
				// you can add your own custom options here if
				// and when you create one that shouldn't be
				// deep extended (see ajaxExtend)
				flatOptions: {
					url: true,
					context: true
				}
			},

			// Creates a full fledged settings object into target
			// with both ajaxSettings and settings fields.
			// If target is omitted, writes into ajaxSettings.
			ajaxSetup: function( target, settings ) {
				return settings ?

					// Building a settings object
					ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

					// Extending ajaxSettings
					ajaxExtend( jQuery.ajaxSettings, target );
			},

			ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
			ajaxTransport: addToPrefiltersOrTransports( transports ),

			// Main method
			ajax: function( url, options ) {

				// If url is an object, simulate pre-1.5 signature
				if ( typeof url === "object" ) {
					options = url;
					url = undefined;
				}

				// Force options to be an object
				options = options || {};

				var transport,

					// URL without anti-cache param
					cacheURL,

					// Response headers
					responseHeadersString,
					responseHeaders,

					// timeout handle
					timeoutTimer,

					// Url cleanup var
					urlAnchor,

					// Request state (becomes false upon send and true upon completion)
					completed,

					// To know if global events are to be dispatched
					fireGlobals,

					// Loop variable
					i,

					// uncached part of the url
					uncached,

					// Create the final options object
					s = jQuery.ajaxSetup( {}, options ),

					// Callbacks context
					callbackContext = s.context || s,

					// Context for global events is callbackContext if it is a DOM node or jQuery collection
					globalEventContext = s.context &&
						( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,

					// Deferreds
					deferred = jQuery.Deferred(),
					completeDeferred = jQuery.Callbacks( "once memory" ),

					// Status-dependent callbacks
					statusCode = s.statusCode || {},

					// Headers (they are sent all at once)
					requestHeaders = {},
					requestHeadersNames = {},

					// Default abort message
					strAbort = "canceled",

					// Fake xhr
					jqXHR = {
						readyState: 0,

						// Builds headers hashtable if needed
						getResponseHeader: function( key ) {
							var match;
							if ( completed ) {
								if ( !responseHeaders ) {
									responseHeaders = {};
									while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
										responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
											( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
												.concat( match[ 2 ] );
									}
								}
								match = responseHeaders[ key.toLowerCase() + " " ];
							}
							return match == null ? null : match.join( ", " );
						},

						// Raw string
						getAllResponseHeaders: function() {
							return completed ? responseHeadersString : null;
						},

						// Caches the header
						setRequestHeader: function( name, value ) {
							if ( completed == null ) {
								name = requestHeadersNames[ name.toLowerCase() ] =
									requestHeadersNames[ name.toLowerCase() ] || name;
								requestHeaders[ name ] = value;
							}
							return this;
						},

						// Overrides response content-type header
						overrideMimeType: function( type ) {
							if ( completed == null ) {
								s.mimeType = type;
							}
							return this;
						},

						// Status-dependent callbacks
						statusCode: function( map ) {
							var code;
							if ( map ) {
								if ( completed ) {

									// Execute the appropriate callbacks
									jqXHR.always( map[ jqXHR.status ] );
								} else {

									// Lazy-add the new callbacks in a way that preserves old ones
									for ( code in map ) {
										statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
									}
								}
							}
							return this;
						},

						// Cancel the request
						abort: function( statusText ) {
							var finalText = statusText || strAbort;
							if ( transport ) {
								transport.abort( finalText );
							}
							done( 0, finalText );
							return this;
						}
					};

				// Attach deferreds
				deferred.promise( jqXHR );

				// Add protocol if not provided (prefilters might expect it)
				// Handle falsy url in the settings object (#10093: consistency with old signature)
				// We also use the url parameter if available
				s.url = ( ( url || s.url || location.href ) + "" )
					.replace( rprotocol, location.protocol + "//" );

				// Alias method option to type as per ticket #12004
				s.type = options.method || options.type || s.method || s.type;

				// Extract dataTypes list
				s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

				// A cross-domain request is in order when the origin doesn't match the current origin.
				if ( s.crossDomain == null ) {
					urlAnchor = document.createElement( "a" );

					// Support: IE <=8 - 11, Edge 12 - 15
					// IE throws exception on accessing the href property if url is malformed,
					// e.g. http://example.com:80x/
					try {
						urlAnchor.href = s.url;

						// Support: IE <=8 - 11 only
						// Anchor's host property isn't correctly set when s.url is relative
						urlAnchor.href = urlAnchor.href;
						s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
							urlAnchor.protocol + "//" + urlAnchor.host;
					} catch ( e ) {

						// If there is an error parsing the URL, assume it is crossDomain,
						// it can be rejected by the transport if it is invalid
						s.crossDomain = true;
					}
				}

				// Convert data if not already a string
				if ( s.data && s.processData && typeof s.data !== "string" ) {
					s.data = jQuery.param( s.data, s.traditional );
				}

				// Apply prefilters
				inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

				// If request was aborted inside a prefilter, stop there
				if ( completed ) {
					return jqXHR;
				}

				// We can fire global events as of now if asked to
				// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
				fireGlobals = jQuery.event && s.global;

				// Watch for a new set of requests
				if ( fireGlobals && jQuery.active++ === 0 ) {
					jQuery.event.trigger( "ajaxStart" );
				}

				// Uppercase the type
				s.type = s.type.toUpperCase();

				// Determine if request has content
				s.hasContent = !rnoContent.test( s.type );

				// Save the URL in case we're toying with the If-Modified-Since
				// and/or If-None-Match header later on
				// Remove hash to simplify url manipulation
				cacheURL = s.url.replace( rhash, "" );

				// More options handling for requests with no content
				if ( !s.hasContent ) {

					// Remember the hash so we can put it back
					uncached = s.url.slice( cacheURL.length );

					// If data is available and should be processed, append data to url
					if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
						cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

						// #9682: remove data so that it's not used in an eventual retry
						delete s.data;
					}

					// Add or update anti-cache param if needed
					if ( s.cache === false ) {
						cacheURL = cacheURL.replace( rantiCache, "$1" );
						uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce.guid++ ) +
							uncached;
					}

					// Put hash and anti-cache on the URL that will be requested (gh-1732)
					s.url = cacheURL + uncached;

				// Change '%20' to '+' if this is encoded form body content (gh-2658)
				} else if ( s.data && s.processData &&
					( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
					s.data = s.data.replace( r20, "+" );
				}

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					if ( jQuery.lastModified[ cacheURL ] ) {
						jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
					}
					if ( jQuery.etag[ cacheURL ] ) {
						jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
					}
				}

				// Set the correct header, if data is being sent
				if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
					jqXHR.setRequestHeader( "Content-Type", s.contentType );
				}

				// Set the Accepts header for the server, depending on the dataType
				jqXHR.setRequestHeader(
					"Accept",
					s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
						s.accepts[ s.dataTypes[ 0 ] ] +
							( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
						s.accepts[ "*" ]
				);

				// Check for headers option
				for ( i in s.headers ) {
					jqXHR.setRequestHeader( i, s.headers[ i ] );
				}

				// Allow custom headers/mimetypes and early abort
				if ( s.beforeSend &&
					( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

					// Abort if not done already and return
					return jqXHR.abort();
				}

				// Aborting is no longer a cancellation
				strAbort = "abort";

				// Install callbacks on deferreds
				completeDeferred.add( s.complete );
				jqXHR.done( s.success );
				jqXHR.fail( s.error );

				// Get transport
				transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

				// If no transport, we auto-abort
				if ( !transport ) {
					done( -1, "No Transport" );
				} else {
					jqXHR.readyState = 1;

					// Send global event
					if ( fireGlobals ) {
						globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
					}

					// If request was aborted inside ajaxSend, stop there
					if ( completed ) {
						return jqXHR;
					}

					// Timeout
					if ( s.async && s.timeout > 0 ) {
						timeoutTimer = window.setTimeout( function() {
							jqXHR.abort( "timeout" );
						}, s.timeout );
					}

					try {
						completed = false;
						transport.send( requestHeaders, done );
					} catch ( e ) {

						// Rethrow post-completion exceptions
						if ( completed ) {
							throw e;
						}

						// Propagate others as results
						done( -1, e );
					}
				}

				// Callback for when everything is done
				function done( status, nativeStatusText, responses, headers ) {
					var isSuccess, success, error, response, modified,
						statusText = nativeStatusText;

					// Ignore repeat invocations
					if ( completed ) {
						return;
					}

					completed = true;

					// Clear timeout if it exists
					if ( timeoutTimer ) {
						window.clearTimeout( timeoutTimer );
					}

					// Dereference transport for early garbage collection
					// (no matter how long the jqXHR object will be used)
					transport = undefined;

					// Cache response headers
					responseHeadersString = headers || "";

					// Set readyState
					jqXHR.readyState = status > 0 ? 4 : 0;

					// Determine if successful
					isSuccess = status >= 200 && status < 300 || status === 304;

					// Get response data
					if ( responses ) {
						response = ajaxHandleResponses( s, jqXHR, responses );
					}

					// Use a noop converter for missing script but not if jsonp
					if ( !isSuccess &&
						jQuery.inArray( "script", s.dataTypes ) > -1 &&
						jQuery.inArray( "json", s.dataTypes ) < 0 ) {
						s.converters[ "text script" ] = function() {};
					}

					// Convert no matter what (that way responseXXX fields are always set)
					response = ajaxConvert( s, response, jqXHR, isSuccess );

					// If successful, handle type chaining
					if ( isSuccess ) {

						// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
						if ( s.ifModified ) {
							modified = jqXHR.getResponseHeader( "Last-Modified" );
							if ( modified ) {
								jQuery.lastModified[ cacheURL ] = modified;
							}
							modified = jqXHR.getResponseHeader( "etag" );
							if ( modified ) {
								jQuery.etag[ cacheURL ] = modified;
							}
						}

						// if no content
						if ( status === 204 || s.type === "HEAD" ) {
							statusText = "nocontent";

						// if not modified
						} else if ( status === 304 ) {
							statusText = "notmodified";

						// If we have data, let's convert it
						} else {
							statusText = response.state;
							success = response.data;
							error = response.error;
							isSuccess = !error;
						}
					} else {

						// Extract error from statusText and normalize for non-aborts
						error = statusText;
						if ( status || !statusText ) {
							statusText = "error";
							if ( status < 0 ) {
								status = 0;
							}
						}
					}

					// Set data for the fake xhr object
					jqXHR.status = status;
					jqXHR.statusText = ( nativeStatusText || statusText ) + "";

					// Success/Error
					if ( isSuccess ) {
						deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
					} else {
						deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
					}

					// Status-dependent callbacks
					jqXHR.statusCode( statusCode );
					statusCode = undefined;

					if ( fireGlobals ) {
						globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
							[ jqXHR, s, isSuccess ? success : error ] );
					}

					// Complete
					completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

					if ( fireGlobals ) {
						globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

						// Handle the global AJAX counter
						if ( !( --jQuery.active ) ) {
							jQuery.event.trigger( "ajaxStop" );
						}
					}
				}

				return jqXHR;
			},

			getJSON: function( url, data, callback ) {
				return jQuery.get( url, data, callback, "json" );
			},

			getScript: function( url, callback ) {
				return jQuery.get( url, undefined, callback, "script" );
			}
		} );

		jQuery.each( [ "get", "post" ], function( _i, method ) {
			jQuery[ method ] = function( url, data, callback, type ) {

				// Shift arguments if data argument was omitted
				if ( isFunction( data ) ) {
					type = type || callback;
					callback = data;
					data = undefined;
				}

				// The url can be an options object (which then must have .url)
				return jQuery.ajax( jQuery.extend( {
					url: url,
					type: method,
					dataType: type,
					data: data,
					success: callback
				}, jQuery.isPlainObject( url ) && url ) );
			};
		} );

		jQuery.ajaxPrefilter( function( s ) {
			var i;
			for ( i in s.headers ) {
				if ( i.toLowerCase() === "content-type" ) {
					s.contentType = s.headers[ i ] || "";
				}
			}
		} );


		jQuery._evalUrl = function( url, options, doc ) {
			return jQuery.ajax( {
				url: url,

				// Make this explicit, since user can override this through ajaxSetup (#11264)
				type: "GET",
				dataType: "script",
				cache: true,
				async: false,
				global: false,

				// Only evaluate the response if it is successful (gh-4126)
				// dataFilter is not invoked for failure responses, so using it instead
				// of the default converter is kludgy but it works.
				converters: {
					"text script": function() {}
				},
				dataFilter: function( response ) {
					jQuery.globalEval( response, options, doc );
				}
			} );
		};


		jQuery.fn.extend( {
			wrapAll: function( html ) {
				var wrap;

				if ( this[ 0 ] ) {
					if ( isFunction( html ) ) {
						html = html.call( this[ 0 ] );
					}

					// The elements to wrap the target around
					wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

					if ( this[ 0 ].parentNode ) {
						wrap.insertBefore( this[ 0 ] );
					}

					wrap.map( function() {
						var elem = this;

						while ( elem.firstElementChild ) {
							elem = elem.firstElementChild;
						}

						return elem;
					} ).append( this );
				}

				return this;
			},

			wrapInner: function( html ) {
				if ( isFunction( html ) ) {
					return this.each( function( i ) {
						jQuery( this ).wrapInner( html.call( this, i ) );
					} );
				}

				return this.each( function() {
					var self = jQuery( this ),
						contents = self.contents();

					if ( contents.length ) {
						contents.wrapAll( html );

					} else {
						self.append( html );
					}
				} );
			},

			wrap: function( html ) {
				var htmlIsFunction = isFunction( html );

				return this.each( function( i ) {
					jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
				} );
			},

			unwrap: function( selector ) {
				this.parent( selector ).not( "body" ).each( function() {
					jQuery( this ).replaceWith( this.childNodes );
				} );
				return this;
			}
		} );


		jQuery.expr.pseudos.hidden = function( elem ) {
			return !jQuery.expr.pseudos.visible( elem );
		};
		jQuery.expr.pseudos.visible = function( elem ) {
			return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
		};




		jQuery.ajaxSettings.xhr = function() {
			try {
				return new window.XMLHttpRequest();
			} catch ( e ) {}
		};

		var xhrSuccessStatus = {

				// File protocol always yields status code 0, assume 200
				0: 200,

				// Support: IE <=9 only
				// #1450: sometimes IE returns 1223 when it should be 204
				1223: 204
			},
			xhrSupported = jQuery.ajaxSettings.xhr();

		support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
		support.ajax = xhrSupported = !!xhrSupported;

		jQuery.ajaxTransport( function( options ) {
			var callback, errorCallback;

			// Cross domain only allowed if supported through XMLHttpRequest
			if ( support.cors || xhrSupported && !options.crossDomain ) {
				return {
					send: function( headers, complete ) {
						var i,
							xhr = options.xhr();

						xhr.open(
							options.type,
							options.url,
							options.async,
							options.username,
							options.password
						);

						// Apply custom fields if provided
						if ( options.xhrFields ) {
							for ( i in options.xhrFields ) {
								xhr[ i ] = options.xhrFields[ i ];
							}
						}

						// Override mime type if needed
						if ( options.mimeType && xhr.overrideMimeType ) {
							xhr.overrideMimeType( options.mimeType );
						}

						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are
						// akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup)
						// For same-domain requests, won't change header if already provided.
						if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
							headers[ "X-Requested-With" ] = "XMLHttpRequest";
						}

						// Set headers
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}

						// Callback
						callback = function( type ) {
							return function() {
								if ( callback ) {
									callback = errorCallback = xhr.onload =
										xhr.onerror = xhr.onabort = xhr.ontimeout =
											xhr.onreadystatechange = null;

									if ( type === "abort" ) {
										xhr.abort();
									} else if ( type === "error" ) {

										// Support: IE <=9 only
										// On a manual native abort, IE9 throws
										// errors on any property access that is not readyState
										if ( typeof xhr.status !== "number" ) {
											complete( 0, "error" );
										} else {
											complete(

												// File: protocol always yields status 0; see #8605, #14207
												xhr.status,
												xhr.statusText
											);
										}
									} else {
										complete(
											xhrSuccessStatus[ xhr.status ] || xhr.status,
											xhr.statusText,

											// Support: IE <=9 only
											// IE9 has no XHR2 but throws on binary (trac-11426)
											// For XHR2 non-text, let the caller handle it (gh-2498)
											( xhr.responseType || "text" ) !== "text"  ||
											typeof xhr.responseText !== "string" ?
												{ binary: xhr.response } :
												{ text: xhr.responseText },
											xhr.getAllResponseHeaders()
										);
									}
								}
							};
						};

						// Listen to events
						xhr.onload = callback();
						errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

						// Support: IE 9 only
						// Use onreadystatechange to replace onabort
						// to handle uncaught aborts
						if ( xhr.onabort !== undefined ) {
							xhr.onabort = errorCallback;
						} else {
							xhr.onreadystatechange = function() {

								// Check readyState before timeout as it changes
								if ( xhr.readyState === 4 ) {

									// Allow onerror to be called first,
									// but that will not handle a native abort
									// Also, save errorCallback to a variable
									// as xhr.onerror cannot be accessed
									window.setTimeout( function() {
										if ( callback ) {
											errorCallback();
										}
									} );
								}
							};
						}

						// Create the abort callback
						callback = callback( "abort" );

						try {

							// Do send the request (this may raise an exception)
							xhr.send( options.hasContent && options.data || null );
						} catch ( e ) {

							// #14683: Only rethrow if this hasn't been notified as an error yet
							if ( callback ) {
								throw e;
							}
						}
					},

					abort: function() {
						if ( callback ) {
							callback();
						}
					}
				};
			}
		} );




		// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
		jQuery.ajaxPrefilter( function( s ) {
			if ( s.crossDomain ) {
				s.contents.script = false;
			}
		} );

		// Install script dataType
		jQuery.ajaxSetup( {
			accepts: {
				script: "text/javascript, application/javascript, " +
					"application/ecmascript, application/x-ecmascript"
			},
			contents: {
				script: /\b(?:java|ecma)script\b/
			},
			converters: {
				"text script": function( text ) {
					jQuery.globalEval( text );
					return text;
				}
			}
		} );

		// Handle cache's special case and crossDomain
		jQuery.ajaxPrefilter( "script", function( s ) {
			if ( s.cache === undefined ) {
				s.cache = false;
			}
			if ( s.crossDomain ) {
				s.type = "GET";
			}
		} );

		// Bind script tag hack transport
		jQuery.ajaxTransport( "script", function( s ) {

			// This transport only deals with cross domain or forced-by-attrs requests
			if ( s.crossDomain || s.scriptAttrs ) {
				var script, callback;
				return {
					send: function( _, complete ) {
						script = jQuery( "<script>" )
							.attr( s.scriptAttrs || {} )
							.prop( { charset: s.scriptCharset, src: s.url } )
							.on( "load error", callback = function( evt ) {
								script.remove();
								callback = null;
								if ( evt ) {
									complete( evt.type === "error" ? 404 : 200, evt.type );
								}
							} );

						// Use native DOM manipulation to avoid our domManip AJAX trickery
						document.head.appendChild( script[ 0 ] );
					},
					abort: function() {
						if ( callback ) {
							callback();
						}
					}
				};
			}
		} );




		var oldCallbacks = [],
			rjsonp = /(=)\?(?=&|$)|\?\?/;

		// Default jsonp settings
		jQuery.ajaxSetup( {
			jsonp: "callback",
			jsonpCallback: function() {
				var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce.guid++ ) );
				this[ callback ] = true;
				return callback;
			}
		} );

		// Detect, normalize options and install callbacks for jsonp requests
		jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

			var callbackName, overwritten, responseContainer,
				jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
					"url" :
					typeof s.data === "string" &&
						( s.contentType || "" )
							.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
						rjsonp.test( s.data ) && "data"
				);

			// Handle iff the expected data type is "jsonp" or we have a parameter to set
			if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

				// Get callback name, remembering preexisting value associated with it
				callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
					s.jsonpCallback() :
					s.jsonpCallback;

				// Insert callback into url or form data
				if ( jsonProp ) {
					s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
				} else if ( s.jsonp !== false ) {
					s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
				}

				// Use data converter to retrieve json after script execution
				s.converters[ "script json" ] = function() {
					if ( !responseContainer ) {
						jQuery.error( callbackName + " was not called" );
					}
					return responseContainer[ 0 ];
				};

				// Force json dataType
				s.dataTypes[ 0 ] = "json";

				// Install callback
				overwritten = window[ callbackName ];
				window[ callbackName ] = function() {
					responseContainer = arguments;
				};

				// Clean-up function (fires after converters)
				jqXHR.always( function() {

					// If previous value didn't exist - remove it
					if ( overwritten === undefined ) {
						jQuery( window ).removeProp( callbackName );

					// Otherwise restore preexisting value
					} else {
						window[ callbackName ] = overwritten;
					}

					// Save back as free
					if ( s[ callbackName ] ) {

						// Make sure that re-using the options doesn't screw things around
						s.jsonpCallback = originalSettings.jsonpCallback;

						// Save the callback name for future use
						oldCallbacks.push( callbackName );
					}

					// Call if it was a function and we have a response
					if ( responseContainer && isFunction( overwritten ) ) {
						overwritten( responseContainer[ 0 ] );
					}

					responseContainer = overwritten = undefined;
				} );

				// Delegate to script
				return "script";
			}
		} );




		// Support: Safari 8 only
		// In Safari 8 documents created via document.implementation.createHTMLDocument
		// collapse sibling forms: the second one becomes a child of the first one.
		// Because of that, this security measure has to be disabled in Safari 8.
		// https://bugs.webkit.org/show_bug.cgi?id=137337
		support.createHTMLDocument = ( function() {
			var body = document.implementation.createHTMLDocument( "" ).body;
			body.innerHTML = "<form></form><form></form>";
			return body.childNodes.length === 2;
		} )();


		// Argument "data" should be string of html
		// context (optional): If specified, the fragment will be created in this context,
		// defaults to document
		// keepScripts (optional): If true, will include scripts passed in the html string
		jQuery.parseHTML = function( data, context, keepScripts ) {
			if ( typeof data !== "string" ) {
				return [];
			}
			if ( typeof context === "boolean" ) {
				keepScripts = context;
				context = false;
			}

			var base, parsed, scripts;

			if ( !context ) {

				// Stop scripts or inline event handlers from being executed immediately
				// by using document.implementation
				if ( support.createHTMLDocument ) {
					context = document.implementation.createHTMLDocument( "" );

					// Set the base href for the created document
					// so any parsed elements with URLs
					// are based on the document's URL (gh-2965)
					base = context.createElement( "base" );
					base.href = document.location.href;
					context.head.appendChild( base );
				} else {
					context = document;
				}
			}

			parsed = rsingleTag.exec( data );
			scripts = !keepScripts && [];

			// Single tag
			if ( parsed ) {
				return [ context.createElement( parsed[ 1 ] ) ];
			}

			parsed = buildFragment( [ data ], context, scripts );

			if ( scripts && scripts.length ) {
				jQuery( scripts ).remove();
			}

			return jQuery.merge( [], parsed.childNodes );
		};


		/**
		 * Load a url into a page
		 */
		jQuery.fn.load = function( url, params, callback ) {
			var selector, type, response,
				self = this,
				off = url.indexOf( " " );

			if ( off > -1 ) {
				selector = stripAndCollapse( url.slice( off ) );
				url = url.slice( 0, off );
			}

			// If it's a function
			if ( isFunction( params ) ) {

				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( params && typeof params === "object" ) {
				type = "POST";
			}

			// If we have elements to modify, make the request
			if ( self.length > 0 ) {
				jQuery.ajax( {
					url: url,

					// If "type" variable is undefined, then "GET" method will be used.
					// Make value of this field explicit since
					// user can override it through ajaxSetup method
					type: type || "GET",
					dataType: "html",
					data: params
				} ).done( function( responseText ) {

					// Save response for use in complete callback
					response = arguments;

					self.html( selector ?

						// If a selector was specified, locate the right elements in a dummy div
						// Exclude scripts to avoid IE 'Permission Denied' errors
						jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

						// Otherwise use the full result
						responseText );

				// If the request succeeds, this function gets "data", "status", "jqXHR"
				// but they are ignored because response was set above.
				// If it fails, this function gets "jqXHR", "status", "error"
				} ).always( callback && function( jqXHR, status ) {
					self.each( function() {
						callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
					} );
				} );
			}

			return this;
		};




		jQuery.expr.pseudos.animated = function( elem ) {
			return jQuery.grep( jQuery.timers, function( fn ) {
				return elem === fn.elem;
			} ).length;
		};




		jQuery.offset = {
			setOffset: function( elem, options, i ) {
				var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
					position = jQuery.css( elem, "position" ),
					curElem = jQuery( elem ),
					props = {};

				// Set position first, in-case top/left are set even on static elem
				if ( position === "static" ) {
					elem.style.position = "relative";
				}

				curOffset = curElem.offset();
				curCSSTop = jQuery.css( elem, "top" );
				curCSSLeft = jQuery.css( elem, "left" );
				calculatePosition = ( position === "absolute" || position === "fixed" ) &&
					( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

				// Need to be able to calculate position if either
				// top or left is auto and position is either absolute or fixed
				if ( calculatePosition ) {
					curPosition = curElem.position();
					curTop = curPosition.top;
					curLeft = curPosition.left;

				} else {
					curTop = parseFloat( curCSSTop ) || 0;
					curLeft = parseFloat( curCSSLeft ) || 0;
				}

				if ( isFunction( options ) ) {

					// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
					options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
				}

				if ( options.top != null ) {
					props.top = ( options.top - curOffset.top ) + curTop;
				}
				if ( options.left != null ) {
					props.left = ( options.left - curOffset.left ) + curLeft;
				}

				if ( "using" in options ) {
					options.using.call( elem, props );

				} else {
					curElem.css( props );
				}
			}
		};

		jQuery.fn.extend( {

			// offset() relates an element's border box to the document origin
			offset: function( options ) {

				// Preserve chaining for setter
				if ( arguments.length ) {
					return options === undefined ?
						this :
						this.each( function( i ) {
							jQuery.offset.setOffset( this, options, i );
						} );
				}

				var rect, win,
					elem = this[ 0 ];

				if ( !elem ) {
					return;
				}

				// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
				// Support: IE <=11 only
				// Running getBoundingClientRect on a
				// disconnected node in IE throws an error
				if ( !elem.getClientRects().length ) {
					return { top: 0, left: 0 };
				}

				// Get document-relative position by adding viewport scroll to viewport-relative gBCR
				rect = elem.getBoundingClientRect();
				win = elem.ownerDocument.defaultView;
				return {
					top: rect.top + win.pageYOffset,
					left: rect.left + win.pageXOffset
				};
			},

			// position() relates an element's margin box to its offset parent's padding box
			// This corresponds to the behavior of CSS absolute positioning
			position: function() {
				if ( !this[ 0 ] ) {
					return;
				}

				var offsetParent, offset, doc,
					elem = this[ 0 ],
					parentOffset = { top: 0, left: 0 };

				// position:fixed elements are offset from the viewport, which itself always has zero offset
				if ( jQuery.css( elem, "position" ) === "fixed" ) {

					// Assume position:fixed implies availability of getBoundingClientRect
					offset = elem.getBoundingClientRect();

				} else {
					offset = this.offset();

					// Account for the *real* offset parent, which can be the document or its root element
					// when a statically positioned element is identified
					doc = elem.ownerDocument;
					offsetParent = elem.offsetParent || doc.documentElement;
					while ( offsetParent &&
						( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
						jQuery.css( offsetParent, "position" ) === "static" ) {

						offsetParent = offsetParent.parentNode;
					}
					if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

						// Incorporate borders into its offset, since they are outside its content origin
						parentOffset = jQuery( offsetParent ).offset();
						parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
						parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
					}
				}

				// Subtract parent offsets and element margins
				return {
					top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
					left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
				};
			},

			// This method will return documentElement in the following cases:
			// 1) For the element inside the iframe without offsetParent, this method will return
			//    documentElement of the parent window
			// 2) For the hidden or detached element
			// 3) For body or html element, i.e. in case of the html node - it will return itself
			//
			// but those exceptions were never presented as a real life use-cases
			// and might be considered as more preferable results.
			//
			// This logic, however, is not guaranteed and can change at any point in the future
			offsetParent: function() {
				return this.map( function() {
					var offsetParent = this.offsetParent;

					while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
						offsetParent = offsetParent.offsetParent;
					}

					return offsetParent || documentElement;
				} );
			}
		} );

		// Create scrollLeft and scrollTop methods
		jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
			var top = "pageYOffset" === prop;

			jQuery.fn[ method ] = function( val ) {
				return access( this, function( elem, method, val ) {

					// Coalesce documents and windows
					var win;
					if ( isWindow( elem ) ) {
						win = elem;
					} else if ( elem.nodeType === 9 ) {
						win = elem.defaultView;
					}

					if ( val === undefined ) {
						return win ? win[ prop ] : elem[ method ];
					}

					if ( win ) {
						win.scrollTo(
							!top ? val : win.pageXOffset,
							top ? val : win.pageYOffset
						);

					} else {
						elem[ method ] = val;
					}
				}, method, val, arguments.length );
			};
		} );

		// Support: Safari <=7 - 9.1, Chrome <=37 - 49
		// Add the top/left cssHooks using jQuery.fn.position
		// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
		// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
		// getComputedStyle returns percent when specified for top/left/bottom/right;
		// rather than make the css module depend on the offset module, just check for it here
		jQuery.each( [ "top", "left" ], function( _i, prop ) {
			jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
				function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );

						// If curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			);
		} );


		// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
		jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
			jQuery.each( {
				padding: "inner" + name,
				content: type,
				"": "outer" + name
			}, function( defaultExtra, funcName ) {

				// Margin is only for outerHeight, outerWidth
				jQuery.fn[ funcName ] = function( margin, value ) {
					var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
						extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

					return access( this, function( elem, type, value ) {
						var doc;

						if ( isWindow( elem ) ) {

							// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
							return funcName.indexOf( "outer" ) === 0 ?
								elem[ "inner" + name ] :
								elem.document.documentElement[ "client" + name ];
						}

						// Get document width or height
						if ( elem.nodeType === 9 ) {
							doc = elem.documentElement;

							// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
							// whichever is greatest
							return Math.max(
								elem.body[ "scroll" + name ], doc[ "scroll" + name ],
								elem.body[ "offset" + name ], doc[ "offset" + name ],
								doc[ "client" + name ]
							);
						}

						return value === undefined ?

							// Get width or height on the element, requesting but not forcing parseFloat
							jQuery.css( elem, type, extra ) :

							// Set width or height on the element
							jQuery.style( elem, type, value, extra );
					}, type, chainable ? margin : undefined, chainable );
				};
			} );
		} );


		jQuery.each( [
			"ajaxStart",
			"ajaxStop",
			"ajaxComplete",
			"ajaxError",
			"ajaxSuccess",
			"ajaxSend"
		], function( _i, type ) {
			jQuery.fn[ type ] = function( fn ) {
				return this.on( type, fn );
			};
		} );




		jQuery.fn.extend( {

			bind: function( types, data, fn ) {
				return this.on( types, null, data, fn );
			},
			unbind: function( types, fn ) {
				return this.off( types, null, fn );
			},

			delegate: function( selector, types, data, fn ) {
				return this.on( types, selector, data, fn );
			},
			undelegate: function( selector, types, fn ) {

				// ( namespace ) or ( selector, types [, fn] )
				return arguments.length === 1 ?
					this.off( selector, "**" ) :
					this.off( types, selector || "**", fn );
			},

			hover: function( fnOver, fnOut ) {
				return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
			}
		} );

		jQuery.each(
			( "blur focus focusin focusout resize scroll click dblclick " +
			"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
			"change select submit keydown keypress keyup contextmenu" ).split( " " ),
			function( _i, name ) {

				// Handle event binding
				jQuery.fn[ name ] = function( data, fn ) {
					return arguments.length > 0 ?
						this.on( name, null, data, fn ) :
						this.trigger( name );
				};
			}
		);




		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

		// Bind a function to a context, optionally partially applying any
		// arguments.
		// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
		// However, it is not slated for removal any time soon
		jQuery.proxy = function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		};

		jQuery.holdReady = function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		};
		jQuery.isArray = Array.isArray;
		jQuery.parseJSON = JSON.parse;
		jQuery.nodeName = nodeName;
		jQuery.isFunction = isFunction;
		jQuery.isWindow = isWindow;
		jQuery.camelCase = camelCase;
		jQuery.type = toType;

		jQuery.now = Date.now;

		jQuery.isNumeric = function( obj ) {

			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&

				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		};

		jQuery.trim = function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		};




		var

			// Map over jQuery in case of overwrite
			_jQuery = window.jQuery,

			// Map over the $ in case of overwrite
			_$ = window.$;

		jQuery.noConflict = function( deep ) {
			if ( window.$ === jQuery ) {
				window.$ = _$;
			}

			if ( deep && window.jQuery === jQuery ) {
				window.jQuery = _jQuery;
			}

			return jQuery;
		};

		// Expose jQuery and $ identifiers, even in AMD
		// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
		// and CommonJS for browser emulators (#13566)
		if ( typeof noGlobal === "undefined" ) {
			window.jQuery = window.$ = jQuery;
		}




		return jQuery;
		} );
	} (jquery));

	var $ = jquery.exports;

	const PACKET_TYPES = Object.create(null); // no Map = no polyfill
	PACKET_TYPES["open"] = "0";
	PACKET_TYPES["close"] = "1";
	PACKET_TYPES["ping"] = "2";
	PACKET_TYPES["pong"] = "3";
	PACKET_TYPES["message"] = "4";
	PACKET_TYPES["upgrade"] = "5";
	PACKET_TYPES["noop"] = "6";
	const PACKET_TYPES_REVERSE = Object.create(null);
	Object.keys(PACKET_TYPES).forEach(key => {
	    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
	});
	const ERROR_PACKET = { type: "error", data: "parser error" };

	const withNativeBlob$1 = typeof Blob === "function" ||
	    (typeof Blob !== "undefined" &&
	        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
	const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
	// ArrayBuffer.isView method is not defined in IE10
	const isView$1 = obj => {
	    return typeof ArrayBuffer.isView === "function"
	        ? ArrayBuffer.isView(obj)
	        : obj && obj.buffer instanceof ArrayBuffer;
	};
	const encodePacket = ({ type, data }, supportsBinary, callback) => {
	    if (withNativeBlob$1 && data instanceof Blob) {
	        if (supportsBinary) {
	            return callback(data);
	        }
	        else {
	            return encodeBlobAsBase64(data, callback);
	        }
	    }
	    else if (withNativeArrayBuffer$2 &&
	        (data instanceof ArrayBuffer || isView$1(data))) {
	        if (supportsBinary) {
	            return callback(data);
	        }
	        else {
	            return encodeBlobAsBase64(new Blob([data]), callback);
	        }
	    }
	    // plain string
	    return callback(PACKET_TYPES[type] + (data || ""));
	};
	const encodeBlobAsBase64 = (data, callback) => {
	    const fileReader = new FileReader();
	    fileReader.onload = function () {
	        const content = fileReader.result.split(",")[1];
	        callback("b" + content);
	    };
	    return fileReader.readAsDataURL(data);
	};

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// Use a lookup table to find the index.
	const lookup$1 = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
	for (let i = 0; i < chars.length; i++) {
	    lookup$1[chars.charCodeAt(i)] = i;
	}
	const decode$1 = (base64) => {
	    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	    if (base64[base64.length - 1] === '=') {
	        bufferLength--;
	        if (base64[base64.length - 2] === '=') {
	            bufferLength--;
	        }
	    }
	    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
	    for (i = 0; i < len; i += 4) {
	        encoded1 = lookup$1[base64.charCodeAt(i)];
	        encoded2 = lookup$1[base64.charCodeAt(i + 1)];
	        encoded3 = lookup$1[base64.charCodeAt(i + 2)];
	        encoded4 = lookup$1[base64.charCodeAt(i + 3)];
	        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }
	    return arraybuffer;
	};

	const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
	const decodePacket = (encodedPacket, binaryType) => {
	    if (typeof encodedPacket !== "string") {
	        return {
	            type: "message",
	            data: mapBinary(encodedPacket, binaryType)
	        };
	    }
	    const type = encodedPacket.charAt(0);
	    if (type === "b") {
	        return {
	            type: "message",
	            data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
	        };
	    }
	    const packetType = PACKET_TYPES_REVERSE[type];
	    if (!packetType) {
	        return ERROR_PACKET;
	    }
	    return encodedPacket.length > 1
	        ? {
	            type: PACKET_TYPES_REVERSE[type],
	            data: encodedPacket.substring(1)
	        }
	        : {
	            type: PACKET_TYPES_REVERSE[type]
	        };
	};
	const decodeBase64Packet = (data, binaryType) => {
	    if (withNativeArrayBuffer$1) {
	        const decoded = decode$1(data);
	        return mapBinary(decoded, binaryType);
	    }
	    else {
	        return { base64: true, data }; // fallback for old browsers
	    }
	};
	const mapBinary = (data, binaryType) => {
	    switch (binaryType) {
	        case "blob":
	            return data instanceof ArrayBuffer ? new Blob([data]) : data;
	        case "arraybuffer":
	        default:
	            return data; // assuming the data is already an ArrayBuffer
	    }
	};

	const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
	const encodePayload = (packets, callback) => {
	    // some packets may be added to the array while encoding, so the initial length must be saved
	    const length = packets.length;
	    const encodedPackets = new Array(length);
	    let count = 0;
	    packets.forEach((packet, i) => {
	        // force base64 encoding for binary packets
	        encodePacket(packet, false, encodedPacket => {
	            encodedPackets[i] = encodedPacket;
	            if (++count === length) {
	                callback(encodedPackets.join(SEPARATOR));
	            }
	        });
	    });
	};
	const decodePayload = (encodedPayload, binaryType) => {
	    const encodedPackets = encodedPayload.split(SEPARATOR);
	    const packets = [];
	    for (let i = 0; i < encodedPackets.length; i++) {
	        const decodedPacket = decodePacket(encodedPackets[i], binaryType);
	        packets.push(decodedPacket);
	        if (decodedPacket.type === "error") {
	            break;
	        }
	    }
	    return packets;
	};
	const protocol$1 = 4;

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }

	  // Remove event specific arrays for event types that no
	  // one is subscribed for to avoid memory leak.
	  if (callbacks.length === 0) {
	    delete this._callbacks['$' + event];
	  }

	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};

	  var args = new Array(arguments.length - 1)
	    , callbacks = this._callbacks['$' + event];

	  for (var i = 1; i < arguments.length; i++) {
	    args[i - 1] = arguments[i];
	  }

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	// alias used for reserved events (protected method)
	Emitter.prototype.emitReserved = Emitter.prototype.emit;

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};

	const globalThisShim = (() => {
	    if (typeof self !== "undefined") {
	        return self;
	    }
	    else if (typeof window !== "undefined") {
	        return window;
	    }
	    else {
	        return Function("return this")();
	    }
	})();

	function pick(obj, ...attr) {
	    return attr.reduce((acc, k) => {
	        if (obj.hasOwnProperty(k)) {
	            acc[k] = obj[k];
	        }
	        return acc;
	    }, {});
	}
	// Keep a reference to the real timeout functions so they can be used when overridden
	const NATIVE_SET_TIMEOUT = setTimeout;
	const NATIVE_CLEAR_TIMEOUT = clearTimeout;
	function installTimerFunctions(obj, opts) {
	    if (opts.useNativeTimers) {
	        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
	        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
	    }
	    else {
	        obj.setTimeoutFn = setTimeout.bind(globalThisShim);
	        obj.clearTimeoutFn = clearTimeout.bind(globalThisShim);
	    }
	}
	// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
	const BASE64_OVERHEAD = 1.33;
	// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
	function byteLength(obj) {
	    if (typeof obj === "string") {
	        return utf8Length(obj);
	    }
	    // arraybuffer or blob
	    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
	}
	function utf8Length(str) {
	    let c = 0, length = 0;
	    for (let i = 0, l = str.length; i < l; i++) {
	        c = str.charCodeAt(i);
	        if (c < 0x80) {
	            length += 1;
	        }
	        else if (c < 0x800) {
	            length += 2;
	        }
	        else if (c < 0xd800 || c >= 0xe000) {
	            length += 3;
	        }
	        else {
	            i++;
	            length += 4;
	        }
	    }
	    return length;
	}

	class TransportError extends Error {
	    constructor(reason, description, context) {
	        super(reason);
	        this.description = description;
	        this.context = context;
	        this.type = "TransportError";
	    }
	}
	class Transport extends Emitter {
	    /**
	     * Transport abstract constructor.
	     *
	     * @param {Object} options.
	     * @api private
	     */
	    constructor(opts) {
	        super();
	        this.writable = false;
	        installTimerFunctions(this, opts);
	        this.opts = opts;
	        this.query = opts.query;
	        this.readyState = "";
	        this.socket = opts.socket;
	    }
	    /**
	     * Emits an error.
	     *
	     * @param {String} reason
	     * @param description
	     * @param context - the error context
	     * @return {Transport} for chaining
	     * @api protected
	     */
	    onError(reason, description, context) {
	        super.emitReserved("error", new TransportError(reason, description, context));
	        return this;
	    }
	    /**
	     * Opens the transport.
	     *
	     * @api public
	     */
	    open() {
	        if ("closed" === this.readyState || "" === this.readyState) {
	            this.readyState = "opening";
	            this.doOpen();
	        }
	        return this;
	    }
	    /**
	     * Closes the transport.
	     *
	     * @api public
	     */
	    close() {
	        if ("opening" === this.readyState || "open" === this.readyState) {
	            this.doClose();
	            this.onClose();
	        }
	        return this;
	    }
	    /**
	     * Sends multiple packets.
	     *
	     * @param {Array} packets
	     * @api public
	     */
	    send(packets) {
	        if ("open" === this.readyState) {
	            this.write(packets);
	        }
	    }
	    /**
	     * Called upon open
	     *
	     * @api protected
	     */
	    onOpen() {
	        this.readyState = "open";
	        this.writable = true;
	        super.emitReserved("open");
	    }
	    /**
	     * Called with data.
	     *
	     * @param {String} data
	     * @api protected
	     */
	    onData(data) {
	        const packet = decodePacket(data, this.socket.binaryType);
	        this.onPacket(packet);
	    }
	    /**
	     * Called with a decoded packet.
	     *
	     * @api protected
	     */
	    onPacket(packet) {
	        super.emitReserved("packet", packet);
	    }
	    /**
	     * Called upon close.
	     *
	     * @api protected
	     */
	    onClose(details) {
	        this.readyState = "closed";
	        super.emitReserved("close", details);
	    }
	}

	// imported from https://github.com/unshiftio/yeast
	const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''), length = 64, map = {};
	let seed = 0, i = 0, prev;
	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode$1(num) {
	    let encoded = '';
	    do {
	        encoded = alphabet[num % length] + encoded;
	        num = Math.floor(num / length);
	    } while (num > 0);
	    return encoded;
	}
	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	    const now = encode$1(+new Date());
	    if (now !== prev)
	        return seed = 0, prev = now;
	    return now + '.' + encode$1(seed++);
	}
	//
	// Map each character to its index.
	//
	for (; i < length; i++)
	    map[alphabet[i]] = i;

	// imported from https://github.com/galkn/querystring
	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */
	function encode(obj) {
	    let str = '';
	    for (let i in obj) {
	        if (obj.hasOwnProperty(i)) {
	            if (str.length)
	                str += '&';
	            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	        }
	    }
	    return str;
	}
	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */
	function decode(qs) {
	    let qry = {};
	    let pairs = qs.split('&');
	    for (let i = 0, l = pairs.length; i < l; i++) {
	        let pair = pairs[i].split('=');
	        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	    }
	    return qry;
	}

	// imported from https://github.com/component/has-cors
	let value = false;
	try {
	    value = typeof XMLHttpRequest !== 'undefined' &&
	        'withCredentials' in new XMLHttpRequest();
	}
	catch (err) {
	    // if XMLHttp support is disabled in IE then it will throw
	    // when trying to create
	}
	const hasCORS = value;

	// browser shim for xmlhttprequest module
	function XHR(opts) {
	    const xdomain = opts.xdomain;
	    // XMLHttpRequest can be disabled on IE
	    try {
	        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	            return new XMLHttpRequest();
	        }
	    }
	    catch (e) { }
	    if (!xdomain) {
	        try {
	            return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
	        }
	        catch (e) { }
	    }
	}

	function empty() { }
	const hasXHR2 = (function () {
	    const xhr = new XHR({
	        xdomain: false
	    });
	    return null != xhr.responseType;
	})();
	class Polling extends Transport {
	    /**
	     * XHR Polling constructor.
	     *
	     * @param {Object} opts
	     * @api public
	     */
	    constructor(opts) {
	        super(opts);
	        this.polling = false;
	        if (typeof location !== "undefined") {
	            const isSSL = "https:" === location.protocol;
	            let port = location.port;
	            // some user agents have empty `location.port`
	            if (!port) {
	                port = isSSL ? "443" : "80";
	            }
	            this.xd =
	                (typeof location !== "undefined" &&
	                    opts.hostname !== location.hostname) ||
	                    port !== opts.port;
	            this.xs = opts.secure !== isSSL;
	        }
	        /**
	         * XHR supports binary
	         */
	        const forceBase64 = opts && opts.forceBase64;
	        this.supportsBinary = hasXHR2 && !forceBase64;
	    }
	    /**
	     * Transport name.
	     */
	    get name() {
	        return "polling";
	    }
	    /**
	     * Opens the socket (triggers polling). We write a PING message to determine
	     * when the transport is open.
	     *
	     * @api private
	     */
	    doOpen() {
	        this.poll();
	    }
	    /**
	     * Pauses polling.
	     *
	     * @param {Function} callback upon buffers are flushed and transport is paused
	     * @api private
	     */
	    pause(onPause) {
	        this.readyState = "pausing";
	        const pause = () => {
	            this.readyState = "paused";
	            onPause();
	        };
	        if (this.polling || !this.writable) {
	            let total = 0;
	            if (this.polling) {
	                total++;
	                this.once("pollComplete", function () {
	                    --total || pause();
	                });
	            }
	            if (!this.writable) {
	                total++;
	                this.once("drain", function () {
	                    --total || pause();
	                });
	            }
	        }
	        else {
	            pause();
	        }
	    }
	    /**
	     * Starts polling cycle.
	     *
	     * @api public
	     */
	    poll() {
	        this.polling = true;
	        this.doPoll();
	        this.emitReserved("poll");
	    }
	    /**
	     * Overloads onData to detect payloads.
	     *
	     * @api private
	     */
	    onData(data) {
	        const callback = packet => {
	            // if its the first message we consider the transport open
	            if ("opening" === this.readyState && packet.type === "open") {
	                this.onOpen();
	            }
	            // if its a close packet, we close the ongoing requests
	            if ("close" === packet.type) {
	                this.onClose({ description: "transport closed by the server" });
	                return false;
	            }
	            // otherwise bypass onData and handle the message
	            this.onPacket(packet);
	        };
	        // decode payload
	        decodePayload(data, this.socket.binaryType).forEach(callback);
	        // if an event did not trigger closing
	        if ("closed" !== this.readyState) {
	            // if we got data we're not polling
	            this.polling = false;
	            this.emitReserved("pollComplete");
	            if ("open" === this.readyState) {
	                this.poll();
	            }
	        }
	    }
	    /**
	     * For polling, send a close packet.
	     *
	     * @api private
	     */
	    doClose() {
	        const close = () => {
	            this.write([{ type: "close" }]);
	        };
	        if ("open" === this.readyState) {
	            close();
	        }
	        else {
	            // in case we're trying to close while
	            // handshaking is in progress (GH-164)
	            this.once("open", close);
	        }
	    }
	    /**
	     * Writes a packets payload.
	     *
	     * @param {Array} data packets
	     * @param {Function} drain callback
	     * @api private
	     */
	    write(packets) {
	        this.writable = false;
	        encodePayload(packets, data => {
	            this.doWrite(data, () => {
	                this.writable = true;
	                this.emitReserved("drain");
	            });
	        });
	    }
	    /**
	     * Generates uri for connection.
	     *
	     * @api private
	     */
	    uri() {
	        let query = this.query || {};
	        const schema = this.opts.secure ? "https" : "http";
	        let port = "";
	        // cache busting is forced
	        if (false !== this.opts.timestampRequests) {
	            query[this.opts.timestampParam] = yeast();
	        }
	        if (!this.supportsBinary && !query.sid) {
	            query.b64 = 1;
	        }
	        // avoid port if default for schema
	        if (this.opts.port &&
	            (("https" === schema && Number(this.opts.port) !== 443) ||
	                ("http" === schema && Number(this.opts.port) !== 80))) {
	            port = ":" + this.opts.port;
	        }
	        const encodedQuery = encode(query);
	        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
	        return (schema +
	            "://" +
	            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
	            port +
	            this.opts.path +
	            (encodedQuery.length ? "?" + encodedQuery : ""));
	    }
	    /**
	     * Creates a request.
	     *
	     * @param {String} method
	     * @api private
	     */
	    request(opts = {}) {
	        Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
	        return new Request(this.uri(), opts);
	    }
	    /**
	     * Sends data.
	     *
	     * @param {String} data to send.
	     * @param {Function} called upon flush.
	     * @api private
	     */
	    doWrite(data, fn) {
	        const req = this.request({
	            method: "POST",
	            data: data
	        });
	        req.on("success", fn);
	        req.on("error", (xhrStatus, context) => {
	            this.onError("xhr post error", xhrStatus, context);
	        });
	    }
	    /**
	     * Starts a poll cycle.
	     *
	     * @api private
	     */
	    doPoll() {
	        const req = this.request();
	        req.on("data", this.onData.bind(this));
	        req.on("error", (xhrStatus, context) => {
	            this.onError("xhr poll error", xhrStatus, context);
	        });
	        this.pollXhr = req;
	    }
	}
	class Request extends Emitter {
	    /**
	     * Request constructor
	     *
	     * @param {Object} options
	     * @api public
	     */
	    constructor(uri, opts) {
	        super();
	        installTimerFunctions(this, opts);
	        this.opts = opts;
	        this.method = opts.method || "GET";
	        this.uri = uri;
	        this.async = false !== opts.async;
	        this.data = undefined !== opts.data ? opts.data : null;
	        this.create();
	    }
	    /**
	     * Creates the XHR object and sends the request.
	     *
	     * @api private
	     */
	    create() {
	        const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
	        opts.xdomain = !!this.opts.xd;
	        opts.xscheme = !!this.opts.xs;
	        const xhr = (this.xhr = new XHR(opts));
	        try {
	            xhr.open(this.method, this.uri, this.async);
	            try {
	                if (this.opts.extraHeaders) {
	                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
	                    for (let i in this.opts.extraHeaders) {
	                        if (this.opts.extraHeaders.hasOwnProperty(i)) {
	                            xhr.setRequestHeader(i, this.opts.extraHeaders[i]);
	                        }
	                    }
	                }
	            }
	            catch (e) { }
	            if ("POST" === this.method) {
	                try {
	                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
	                }
	                catch (e) { }
	            }
	            try {
	                xhr.setRequestHeader("Accept", "*/*");
	            }
	            catch (e) { }
	            // ie6 check
	            if ("withCredentials" in xhr) {
	                xhr.withCredentials = this.opts.withCredentials;
	            }
	            if (this.opts.requestTimeout) {
	                xhr.timeout = this.opts.requestTimeout;
	            }
	            xhr.onreadystatechange = () => {
	                if (4 !== xhr.readyState)
	                    return;
	                if (200 === xhr.status || 1223 === xhr.status) {
	                    this.onLoad();
	                }
	                else {
	                    // make sure the `error` event handler that's user-set
	                    // does not throw in the same tick and gets caught here
	                    this.setTimeoutFn(() => {
	                        this.onError(typeof xhr.status === "number" ? xhr.status : 0);
	                    }, 0);
	                }
	            };
	            xhr.send(this.data);
	        }
	        catch (e) {
	            // Need to defer since .create() is called directly from the constructor
	            // and thus the 'error' event can only be only bound *after* this exception
	            // occurs.  Therefore, also, we cannot throw here at all.
	            this.setTimeoutFn(() => {
	                this.onError(e);
	            }, 0);
	            return;
	        }
	        if (typeof document !== "undefined") {
	            this.index = Request.requestsCount++;
	            Request.requests[this.index] = this;
	        }
	    }
	    /**
	     * Called upon error.
	     *
	     * @api private
	     */
	    onError(err) {
	        this.emitReserved("error", err, this.xhr);
	        this.cleanup(true);
	    }
	    /**
	     * Cleans up house.
	     *
	     * @api private
	     */
	    cleanup(fromError) {
	        if ("undefined" === typeof this.xhr || null === this.xhr) {
	            return;
	        }
	        this.xhr.onreadystatechange = empty;
	        if (fromError) {
	            try {
	                this.xhr.abort();
	            }
	            catch (e) { }
	        }
	        if (typeof document !== "undefined") {
	            delete Request.requests[this.index];
	        }
	        this.xhr = null;
	    }
	    /**
	     * Called upon load.
	     *
	     * @api private
	     */
	    onLoad() {
	        const data = this.xhr.responseText;
	        if (data !== null) {
	            this.emitReserved("data", data);
	            this.emitReserved("success");
	            this.cleanup();
	        }
	    }
	    /**
	     * Aborts the request.
	     *
	     * @api public
	     */
	    abort() {
	        this.cleanup();
	    }
	}
	Request.requestsCount = 0;
	Request.requests = {};
	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */
	if (typeof document !== "undefined") {
	    // @ts-ignore
	    if (typeof attachEvent === "function") {
	        // @ts-ignore
	        attachEvent("onunload", unloadHandler);
	    }
	    else if (typeof addEventListener === "function") {
	        const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
	        addEventListener(terminationEvent, unloadHandler, false);
	    }
	}
	function unloadHandler() {
	    for (let i in Request.requests) {
	        if (Request.requests.hasOwnProperty(i)) {
	            Request.requests[i].abort();
	        }
	    }
	}

	const nextTick = (() => {
	    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
	    if (isPromiseAvailable) {
	        return cb => Promise.resolve().then(cb);
	    }
	    else {
	        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
	    }
	})();
	const WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
	const usingBrowserWebSocket = true;
	const defaultBinaryType = "arraybuffer";

	// detect ReactNative environment
	const isReactNative = typeof navigator !== "undefined" &&
	    typeof navigator.product === "string" &&
	    navigator.product.toLowerCase() === "reactnative";
	class WS extends Transport {
	    /**
	     * WebSocket transport constructor.
	     *
	     * @api {Object} connection options
	     * @api public
	     */
	    constructor(opts) {
	        super(opts);
	        this.supportsBinary = !opts.forceBase64;
	    }
	    /**
	     * Transport name.
	     *
	     * @api public
	     */
	    get name() {
	        return "websocket";
	    }
	    /**
	     * Opens socket.
	     *
	     * @api private
	     */
	    doOpen() {
	        if (!this.check()) {
	            // let probe timeout
	            return;
	        }
	        const uri = this.uri();
	        const protocols = this.opts.protocols;
	        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
	        const opts = isReactNative
	            ? {}
	            : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
	        if (this.opts.extraHeaders) {
	            opts.headers = this.opts.extraHeaders;
	        }
	        try {
	            this.ws =
	                usingBrowserWebSocket && !isReactNative
	                    ? protocols
	                        ? new WebSocket(uri, protocols)
	                        : new WebSocket(uri)
	                    : new WebSocket(uri, protocols, opts);
	        }
	        catch (err) {
	            return this.emitReserved("error", err);
	        }
	        this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
	        this.addEventListeners();
	    }
	    /**
	     * Adds event listeners to the socket
	     *
	     * @api private
	     */
	    addEventListeners() {
	        this.ws.onopen = () => {
	            if (this.opts.autoUnref) {
	                this.ws._socket.unref();
	            }
	            this.onOpen();
	        };
	        this.ws.onclose = closeEvent => this.onClose({
	            description: "websocket connection closed",
	            context: closeEvent
	        });
	        this.ws.onmessage = ev => this.onData(ev.data);
	        this.ws.onerror = e => this.onError("websocket error", e);
	    }
	    /**
	     * Writes data to socket.
	     *
	     * @param {Array} array of packets.
	     * @api private
	     */
	    write(packets) {
	        this.writable = false;
	        // encodePacket efficient as it uses WS framing
	        // no need for encodePayload
	        for (let i = 0; i < packets.length; i++) {
	            const packet = packets[i];
	            const lastPacket = i === packets.length - 1;
	            encodePacket(packet, this.supportsBinary, data => {
	                // always create a new object (GH-437)
	                const opts = {};
	                // Sometimes the websocket has already been closed but the browser didn't
	                // have a chance of informing us about it yet, in that case send will
	                // throw an error
	                try {
	                    if (usingBrowserWebSocket) {
	                        // TypeError is thrown when passing the second argument on Safari
	                        this.ws.send(data);
	                    }
	                }
	                catch (e) {
	                }
	                if (lastPacket) {
	                    // fake drain
	                    // defer to next tick to allow Socket to clear writeBuffer
	                    nextTick(() => {
	                        this.writable = true;
	                        this.emitReserved("drain");
	                    }, this.setTimeoutFn);
	                }
	            });
	        }
	    }
	    /**
	     * Closes socket.
	     *
	     * @api private
	     */
	    doClose() {
	        if (typeof this.ws !== "undefined") {
	            this.ws.close();
	            this.ws = null;
	        }
	    }
	    /**
	     * Generates uri for connection.
	     *
	     * @api private
	     */
	    uri() {
	        let query = this.query || {};
	        const schema = this.opts.secure ? "wss" : "ws";
	        let port = "";
	        // avoid port if default for schema
	        if (this.opts.port &&
	            (("wss" === schema && Number(this.opts.port) !== 443) ||
	                ("ws" === schema && Number(this.opts.port) !== 80))) {
	            port = ":" + this.opts.port;
	        }
	        // append timestamp to URI
	        if (this.opts.timestampRequests) {
	            query[this.opts.timestampParam] = yeast();
	        }
	        // communicate binary support capabilities
	        if (!this.supportsBinary) {
	            query.b64 = 1;
	        }
	        const encodedQuery = encode(query);
	        const ipv6 = this.opts.hostname.indexOf(":") !== -1;
	        return (schema +
	            "://" +
	            (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) +
	            port +
	            this.opts.path +
	            (encodedQuery.length ? "?" + encodedQuery : ""));
	    }
	    /**
	     * Feature detection for WebSocket.
	     *
	     * @return {Boolean} whether this transport is available.
	     * @api public
	     */
	    check() {
	        return !!WebSocket;
	    }
	}

	const transports = {
	    websocket: WS,
	    polling: Polling
	};

	// imported from https://github.com/galkn/parseuri
	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	const re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	const parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	function parse(str) {
	    const src = str, b = str.indexOf('['), e = str.indexOf(']');
	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }
	    let m = re.exec(str || ''), uri = {}, i = 14;
	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }
	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }
	    uri.pathNames = pathNames(uri, uri['path']);
	    uri.queryKey = queryKey(uri, uri['query']);
	    return uri;
	}
	function pathNames(obj, path) {
	    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
	    if (path.substr(0, 1) == '/' || path.length === 0) {
	        names.splice(0, 1);
	    }
	    if (path.substr(path.length - 1, 1) == '/') {
	        names.splice(names.length - 1, 1);
	    }
	    return names;
	}
	function queryKey(uri, query) {
	    const data = {};
	    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
	        if ($1) {
	            data[$1] = $2;
	        }
	    });
	    return data;
	}

	class Socket$1 extends Emitter {
	    /**
	     * Socket constructor.
	     *
	     * @param {String|Object} uri or options
	     * @param {Object} opts - options
	     * @api public
	     */
	    constructor(uri, opts = {}) {
	        super();
	        if (uri && "object" === typeof uri) {
	            opts = uri;
	            uri = null;
	        }
	        if (uri) {
	            uri = parse(uri);
	            opts.hostname = uri.host;
	            opts.secure = uri.protocol === "https" || uri.protocol === "wss";
	            opts.port = uri.port;
	            if (uri.query)
	                opts.query = uri.query;
	        }
	        else if (opts.host) {
	            opts.hostname = parse(opts.host).host;
	        }
	        installTimerFunctions(this, opts);
	        this.secure =
	            null != opts.secure
	                ? opts.secure
	                : typeof location !== "undefined" && "https:" === location.protocol;
	        if (opts.hostname && !opts.port) {
	            // if no port is specified manually, use the protocol default
	            opts.port = this.secure ? "443" : "80";
	        }
	        this.hostname =
	            opts.hostname ||
	                (typeof location !== "undefined" ? location.hostname : "localhost");
	        this.port =
	            opts.port ||
	                (typeof location !== "undefined" && location.port
	                    ? location.port
	                    : this.secure
	                        ? "443"
	                        : "80");
	        this.transports = opts.transports || ["polling", "websocket"];
	        this.readyState = "";
	        this.writeBuffer = [];
	        this.prevBufferLen = 0;
	        this.opts = Object.assign({
	            path: "/engine.io",
	            agent: false,
	            withCredentials: false,
	            upgrade: true,
	            timestampParam: "t",
	            rememberUpgrade: false,
	            rejectUnauthorized: true,
	            perMessageDeflate: {
	                threshold: 1024
	            },
	            transportOptions: {},
	            closeOnBeforeunload: true
	        }, opts);
	        this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
	        if (typeof this.opts.query === "string") {
	            this.opts.query = decode(this.opts.query);
	        }
	        // set on handshake
	        this.id = null;
	        this.upgrades = null;
	        this.pingInterval = null;
	        this.pingTimeout = null;
	        // set on heartbeat
	        this.pingTimeoutTimer = null;
	        if (typeof addEventListener === "function") {
	            if (this.opts.closeOnBeforeunload) {
	                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
	                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
	                // closed/reloaded)
	                addEventListener("beforeunload", () => {
	                    if (this.transport) {
	                        // silently close the transport
	                        this.transport.removeAllListeners();
	                        this.transport.close();
	                    }
	                }, false);
	            }
	            if (this.hostname !== "localhost") {
	                this.offlineEventListener = () => {
	                    this.onClose("transport close", {
	                        description: "network connection lost"
	                    });
	                };
	                addEventListener("offline", this.offlineEventListener, false);
	            }
	        }
	        this.open();
	    }
	    /**
	     * Creates transport of the given type.
	     *
	     * @param {String} transport name
	     * @return {Transport}
	     * @api private
	     */
	    createTransport(name) {
	        const query = Object.assign({}, this.opts.query);
	        // append engine.io protocol identifier
	        query.EIO = protocol$1;
	        // transport name
	        query.transport = name;
	        // session id if we already have one
	        if (this.id)
	            query.sid = this.id;
	        const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
	            query,
	            socket: this,
	            hostname: this.hostname,
	            secure: this.secure,
	            port: this.port
	        });
	        return new transports[name](opts);
	    }
	    /**
	     * Initializes transport to use and starts probe.
	     *
	     * @api private
	     */
	    open() {
	        let transport;
	        if (this.opts.rememberUpgrade &&
	            Socket$1.priorWebsocketSuccess &&
	            this.transports.indexOf("websocket") !== -1) {
	            transport = "websocket";
	        }
	        else if (0 === this.transports.length) {
	            // Emit error on next tick so it can be listened to
	            this.setTimeoutFn(() => {
	                this.emitReserved("error", "No transports available");
	            }, 0);
	            return;
	        }
	        else {
	            transport = this.transports[0];
	        }
	        this.readyState = "opening";
	        // Retry with the next transport if the transport is disabled (jsonp: false)
	        try {
	            transport = this.createTransport(transport);
	        }
	        catch (e) {
	            this.transports.shift();
	            this.open();
	            return;
	        }
	        transport.open();
	        this.setTransport(transport);
	    }
	    /**
	     * Sets the current transport. Disables the existing one (if any).
	     *
	     * @api private
	     */
	    setTransport(transport) {
	        if (this.transport) {
	            this.transport.removeAllListeners();
	        }
	        // set up transport
	        this.transport = transport;
	        // set up transport listeners
	        transport
	            .on("drain", this.onDrain.bind(this))
	            .on("packet", this.onPacket.bind(this))
	            .on("error", this.onError.bind(this))
	            .on("close", reason => this.onClose("transport close", reason));
	    }
	    /**
	     * Probes a transport.
	     *
	     * @param {String} transport name
	     * @api private
	     */
	    probe(name) {
	        let transport = this.createTransport(name);
	        let failed = false;
	        Socket$1.priorWebsocketSuccess = false;
	        const onTransportOpen = () => {
	            if (failed)
	                return;
	            transport.send([{ type: "ping", data: "probe" }]);
	            transport.once("packet", msg => {
	                if (failed)
	                    return;
	                if ("pong" === msg.type && "probe" === msg.data) {
	                    this.upgrading = true;
	                    this.emitReserved("upgrading", transport);
	                    if (!transport)
	                        return;
	                    Socket$1.priorWebsocketSuccess = "websocket" === transport.name;
	                    this.transport.pause(() => {
	                        if (failed)
	                            return;
	                        if ("closed" === this.readyState)
	                            return;
	                        cleanup();
	                        this.setTransport(transport);
	                        transport.send([{ type: "upgrade" }]);
	                        this.emitReserved("upgrade", transport);
	                        transport = null;
	                        this.upgrading = false;
	                        this.flush();
	                    });
	                }
	                else {
	                    const err = new Error("probe error");
	                    // @ts-ignore
	                    err.transport = transport.name;
	                    this.emitReserved("upgradeError", err);
	                }
	            });
	        };
	        function freezeTransport() {
	            if (failed)
	                return;
	            // Any callback called by transport should be ignored since now
	            failed = true;
	            cleanup();
	            transport.close();
	            transport = null;
	        }
	        // Handle any error that happens while probing
	        const onerror = err => {
	            const error = new Error("probe error: " + err);
	            // @ts-ignore
	            error.transport = transport.name;
	            freezeTransport();
	            this.emitReserved("upgradeError", error);
	        };
	        function onTransportClose() {
	            onerror("transport closed");
	        }
	        // When the socket is closed while we're probing
	        function onclose() {
	            onerror("socket closed");
	        }
	        // When the socket is upgraded while we're probing
	        function onupgrade(to) {
	            if (transport && to.name !== transport.name) {
	                freezeTransport();
	            }
	        }
	        // Remove all listeners on the transport and on self
	        const cleanup = () => {
	            transport.removeListener("open", onTransportOpen);
	            transport.removeListener("error", onerror);
	            transport.removeListener("close", onTransportClose);
	            this.off("close", onclose);
	            this.off("upgrading", onupgrade);
	        };
	        transport.once("open", onTransportOpen);
	        transport.once("error", onerror);
	        transport.once("close", onTransportClose);
	        this.once("close", onclose);
	        this.once("upgrading", onupgrade);
	        transport.open();
	    }
	    /**
	     * Called when connection is deemed open.
	     *
	     * @api private
	     */
	    onOpen() {
	        this.readyState = "open";
	        Socket$1.priorWebsocketSuccess = "websocket" === this.transport.name;
	        this.emitReserved("open");
	        this.flush();
	        // we check for `readyState` in case an `open`
	        // listener already closed the socket
	        if ("open" === this.readyState &&
	            this.opts.upgrade &&
	            this.transport.pause) {
	            let i = 0;
	            const l = this.upgrades.length;
	            for (; i < l; i++) {
	                this.probe(this.upgrades[i]);
	            }
	        }
	    }
	    /**
	     * Handles a packet.
	     *
	     * @api private
	     */
	    onPacket(packet) {
	        if ("opening" === this.readyState ||
	            "open" === this.readyState ||
	            "closing" === this.readyState) {
	            this.emitReserved("packet", packet);
	            // Socket is live - any packet counts
	            this.emitReserved("heartbeat");
	            switch (packet.type) {
	                case "open":
	                    this.onHandshake(JSON.parse(packet.data));
	                    break;
	                case "ping":
	                    this.resetPingTimeout();
	                    this.sendPacket("pong");
	                    this.emitReserved("ping");
	                    this.emitReserved("pong");
	                    break;
	                case "error":
	                    const err = new Error("server error");
	                    // @ts-ignore
	                    err.code = packet.data;
	                    this.onError(err);
	                    break;
	                case "message":
	                    this.emitReserved("data", packet.data);
	                    this.emitReserved("message", packet.data);
	                    break;
	            }
	        }
	    }
	    /**
	     * Called upon handshake completion.
	     *
	     * @param {Object} data - handshake obj
	     * @api private
	     */
	    onHandshake(data) {
	        this.emitReserved("handshake", data);
	        this.id = data.sid;
	        this.transport.query.sid = data.sid;
	        this.upgrades = this.filterUpgrades(data.upgrades);
	        this.pingInterval = data.pingInterval;
	        this.pingTimeout = data.pingTimeout;
	        this.maxPayload = data.maxPayload;
	        this.onOpen();
	        // In case open handler closes socket
	        if ("closed" === this.readyState)
	            return;
	        this.resetPingTimeout();
	    }
	    /**
	     * Sets and resets ping timeout timer based on server pings.
	     *
	     * @api private
	     */
	    resetPingTimeout() {
	        this.clearTimeoutFn(this.pingTimeoutTimer);
	        this.pingTimeoutTimer = this.setTimeoutFn(() => {
	            this.onClose("ping timeout");
	        }, this.pingInterval + this.pingTimeout);
	        if (this.opts.autoUnref) {
	            this.pingTimeoutTimer.unref();
	        }
	    }
	    /**
	     * Called on `drain` event
	     *
	     * @api private
	     */
	    onDrain() {
	        this.writeBuffer.splice(0, this.prevBufferLen);
	        // setting prevBufferLen = 0 is very important
	        // for example, when upgrading, upgrade packet is sent over,
	        // and a nonzero prevBufferLen could cause problems on `drain`
	        this.prevBufferLen = 0;
	        if (0 === this.writeBuffer.length) {
	            this.emitReserved("drain");
	        }
	        else {
	            this.flush();
	        }
	    }
	    /**
	     * Flush write buffers.
	     *
	     * @api private
	     */
	    flush() {
	        if ("closed" !== this.readyState &&
	            this.transport.writable &&
	            !this.upgrading &&
	            this.writeBuffer.length) {
	            const packets = this.getWritablePackets();
	            this.transport.send(packets);
	            // keep track of current length of writeBuffer
	            // splice writeBuffer and callbackBuffer on `drain`
	            this.prevBufferLen = packets.length;
	            this.emitReserved("flush");
	        }
	    }
	    /**
	     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
	     * long-polling)
	     *
	     * @private
	     */
	    getWritablePackets() {
	        const shouldCheckPayloadSize = this.maxPayload &&
	            this.transport.name === "polling" &&
	            this.writeBuffer.length > 1;
	        if (!shouldCheckPayloadSize) {
	            return this.writeBuffer;
	        }
	        let payloadSize = 1; // first packet type
	        for (let i = 0; i < this.writeBuffer.length; i++) {
	            const data = this.writeBuffer[i].data;
	            if (data) {
	                payloadSize += byteLength(data);
	            }
	            if (i > 0 && payloadSize > this.maxPayload) {
	                return this.writeBuffer.slice(0, i);
	            }
	            payloadSize += 2; // separator + packet type
	        }
	        return this.writeBuffer;
	    }
	    /**
	     * Sends a message.
	     *
	     * @param {String} message.
	     * @param {Function} callback function.
	     * @param {Object} options.
	     * @return {Socket} for chaining.
	     * @api public
	     */
	    write(msg, options, fn) {
	        this.sendPacket("message", msg, options, fn);
	        return this;
	    }
	    send(msg, options, fn) {
	        this.sendPacket("message", msg, options, fn);
	        return this;
	    }
	    /**
	     * Sends a packet.
	     *
	     * @param {String} packet type.
	     * @param {String} data.
	     * @param {Object} options.
	     * @param {Function} callback function.
	     * @api private
	     */
	    sendPacket(type, data, options, fn) {
	        if ("function" === typeof data) {
	            fn = data;
	            data = undefined;
	        }
	        if ("function" === typeof options) {
	            fn = options;
	            options = null;
	        }
	        if ("closing" === this.readyState || "closed" === this.readyState) {
	            return;
	        }
	        options = options || {};
	        options.compress = false !== options.compress;
	        const packet = {
	            type: type,
	            data: data,
	            options: options
	        };
	        this.emitReserved("packetCreate", packet);
	        this.writeBuffer.push(packet);
	        if (fn)
	            this.once("flush", fn);
	        this.flush();
	    }
	    /**
	     * Closes the connection.
	     *
	     * @api public
	     */
	    close() {
	        const close = () => {
	            this.onClose("forced close");
	            this.transport.close();
	        };
	        const cleanupAndClose = () => {
	            this.off("upgrade", cleanupAndClose);
	            this.off("upgradeError", cleanupAndClose);
	            close();
	        };
	        const waitForUpgrade = () => {
	            // wait for upgrade to finish since we can't send packets while pausing a transport
	            this.once("upgrade", cleanupAndClose);
	            this.once("upgradeError", cleanupAndClose);
	        };
	        if ("opening" === this.readyState || "open" === this.readyState) {
	            this.readyState = "closing";
	            if (this.writeBuffer.length) {
	                this.once("drain", () => {
	                    if (this.upgrading) {
	                        waitForUpgrade();
	                    }
	                    else {
	                        close();
	                    }
	                });
	            }
	            else if (this.upgrading) {
	                waitForUpgrade();
	            }
	            else {
	                close();
	            }
	        }
	        return this;
	    }
	    /**
	     * Called upon transport error
	     *
	     * @api private
	     */
	    onError(err) {
	        Socket$1.priorWebsocketSuccess = false;
	        this.emitReserved("error", err);
	        this.onClose("transport error", err);
	    }
	    /**
	     * Called upon transport close.
	     *
	     * @api private
	     */
	    onClose(reason, description) {
	        if ("opening" === this.readyState ||
	            "open" === this.readyState ||
	            "closing" === this.readyState) {
	            // clear timers
	            this.clearTimeoutFn(this.pingTimeoutTimer);
	            // stop event from firing again for transport
	            this.transport.removeAllListeners("close");
	            // ensure transport won't stay open
	            this.transport.close();
	            // ignore further transport communication
	            this.transport.removeAllListeners();
	            if (typeof removeEventListener === "function") {
	                removeEventListener("offline", this.offlineEventListener, false);
	            }
	            // set ready state
	            this.readyState = "closed";
	            // clear session id
	            this.id = null;
	            // emit close event
	            this.emitReserved("close", reason, description);
	            // clean buffers after, so users can still
	            // grab the buffers on `close` event
	            this.writeBuffer = [];
	            this.prevBufferLen = 0;
	        }
	    }
	    /**
	     * Filters upgrades, returning only those matching client transports.
	     *
	     * @param {Array} server upgrades
	     * @api private
	     *
	     */
	    filterUpgrades(upgrades) {
	        const filteredUpgrades = [];
	        let i = 0;
	        const j = upgrades.length;
	        for (; i < j; i++) {
	            if (~this.transports.indexOf(upgrades[i]))
	                filteredUpgrades.push(upgrades[i]);
	        }
	        return filteredUpgrades;
	    }
	}
	Socket$1.protocol = protocol$1;

	/**
	 * URL parser.
	 *
	 * @param uri - url
	 * @param path - the request path of the connection
	 * @param loc - An object meant to mimic window.location.
	 *        Defaults to window.location.
	 * @public
	 */
	function url(uri, path = "", loc) {
	    let obj = uri;
	    // default to window.location
	    loc = loc || (typeof location !== "undefined" && location);
	    if (null == uri)
	        uri = loc.protocol + "//" + loc.host;
	    // relative path support
	    if (typeof uri === "string") {
	        if ("/" === uri.charAt(0)) {
	            if ("/" === uri.charAt(1)) {
	                uri = loc.protocol + uri;
	            }
	            else {
	                uri = loc.host + uri;
	            }
	        }
	        if (!/^(https?|wss?):\/\//.test(uri)) {
	            if ("undefined" !== typeof loc) {
	                uri = loc.protocol + "//" + uri;
	            }
	            else {
	                uri = "https://" + uri;
	            }
	        }
	        // parse
	        obj = parse(uri);
	    }
	    // make sure we treat `localhost:80` and `localhost` equally
	    if (!obj.port) {
	        if (/^(http|ws)$/.test(obj.protocol)) {
	            obj.port = "80";
	        }
	        else if (/^(http|ws)s$/.test(obj.protocol)) {
	            obj.port = "443";
	        }
	    }
	    obj.path = obj.path || "/";
	    const ipv6 = obj.host.indexOf(":") !== -1;
	    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
	    // define unique id
	    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
	    // define href
	    obj.href =
	        obj.protocol +
	            "://" +
	            host +
	            (loc && loc.port === obj.port ? "" : ":" + obj.port);
	    return obj;
	}

	const withNativeArrayBuffer = typeof ArrayBuffer === "function";
	const isView = (obj) => {
	    return typeof ArrayBuffer.isView === "function"
	        ? ArrayBuffer.isView(obj)
	        : obj.buffer instanceof ArrayBuffer;
	};
	const toString = Object.prototype.toString;
	const withNativeBlob = typeof Blob === "function" ||
	    (typeof Blob !== "undefined" &&
	        toString.call(Blob) === "[object BlobConstructor]");
	const withNativeFile = typeof File === "function" ||
	    (typeof File !== "undefined" &&
	        toString.call(File) === "[object FileConstructor]");
	/**
	 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
	 *
	 * @private
	 */
	function isBinary(obj) {
	    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
	        (withNativeBlob && obj instanceof Blob) ||
	        (withNativeFile && obj instanceof File));
	}
	function hasBinary(obj, toJSON) {
	    if (!obj || typeof obj !== "object") {
	        return false;
	    }
	    if (Array.isArray(obj)) {
	        for (let i = 0, l = obj.length; i < l; i++) {
	            if (hasBinary(obj[i])) {
	                return true;
	            }
	        }
	        return false;
	    }
	    if (isBinary(obj)) {
	        return true;
	    }
	    if (obj.toJSON &&
	        typeof obj.toJSON === "function" &&
	        arguments.length === 1) {
	        return hasBinary(obj.toJSON(), true);
	    }
	    for (const key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
	            return true;
	        }
	    }
	    return false;
	}

	/**
	 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @public
	 */
	function deconstructPacket(packet) {
	    const buffers = [];
	    const packetData = packet.data;
	    const pack = packet;
	    pack.data = _deconstructPacket(packetData, buffers);
	    pack.attachments = buffers.length; // number of binary 'attachments'
	    return { packet: pack, buffers: buffers };
	}
	function _deconstructPacket(data, buffers) {
	    if (!data)
	        return data;
	    if (isBinary(data)) {
	        const placeholder = { _placeholder: true, num: buffers.length };
	        buffers.push(data);
	        return placeholder;
	    }
	    else if (Array.isArray(data)) {
	        const newData = new Array(data.length);
	        for (let i = 0; i < data.length; i++) {
	            newData[i] = _deconstructPacket(data[i], buffers);
	        }
	        return newData;
	    }
	    else if (typeof data === "object" && !(data instanceof Date)) {
	        const newData = {};
	        for (const key in data) {
	            if (Object.prototype.hasOwnProperty.call(data, key)) {
	                newData[key] = _deconstructPacket(data[key], buffers);
	            }
	        }
	        return newData;
	    }
	    return data;
	}
	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @public
	 */
	function reconstructPacket(packet, buffers) {
	    packet.data = _reconstructPacket(packet.data, buffers);
	    packet.attachments = undefined; // no longer useful
	    return packet;
	}
	function _reconstructPacket(data, buffers) {
	    if (!data)
	        return data;
	    if (data && data._placeholder) {
	        return buffers[data.num]; // appropriate buffer (should be natural order anyway)
	    }
	    else if (Array.isArray(data)) {
	        for (let i = 0; i < data.length; i++) {
	            data[i] = _reconstructPacket(data[i], buffers);
	        }
	    }
	    else if (typeof data === "object") {
	        for (const key in data) {
	            if (Object.prototype.hasOwnProperty.call(data, key)) {
	                data[key] = _reconstructPacket(data[key], buffers);
	            }
	        }
	    }
	    return data;
	}

	/**
	 * Protocol version.
	 *
	 * @public
	 */
	const protocol = 5;
	var PacketType;
	(function (PacketType) {
	    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
	    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
	    PacketType[PacketType["EVENT"] = 2] = "EVENT";
	    PacketType[PacketType["ACK"] = 3] = "ACK";
	    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
	    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
	    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
	})(PacketType || (PacketType = {}));
	/**
	 * A socket.io Encoder instance
	 */
	class Encoder {
	    /**
	     * Encoder constructor
	     *
	     * @param {function} replacer - custom replacer to pass down to JSON.parse
	     */
	    constructor(replacer) {
	        this.replacer = replacer;
	    }
	    /**
	     * Encode a packet as a single string if non-binary, or as a
	     * buffer sequence, depending on packet type.
	     *
	     * @param {Object} obj - packet object
	     */
	    encode(obj) {
	        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
	            if (hasBinary(obj)) {
	                obj.type =
	                    obj.type === PacketType.EVENT
	                        ? PacketType.BINARY_EVENT
	                        : PacketType.BINARY_ACK;
	                return this.encodeAsBinary(obj);
	            }
	        }
	        return [this.encodeAsString(obj)];
	    }
	    /**
	     * Encode packet as string.
	     */
	    encodeAsString(obj) {
	        // first is type
	        let str = "" + obj.type;
	        // attachments if we have them
	        if (obj.type === PacketType.BINARY_EVENT ||
	            obj.type === PacketType.BINARY_ACK) {
	            str += obj.attachments + "-";
	        }
	        // if we have a namespace other than `/`
	        // we append it followed by a comma `,`
	        if (obj.nsp && "/" !== obj.nsp) {
	            str += obj.nsp + ",";
	        }
	        // immediately followed by the id
	        if (null != obj.id) {
	            str += obj.id;
	        }
	        // json data
	        if (null != obj.data) {
	            str += JSON.stringify(obj.data, this.replacer);
	        }
	        return str;
	    }
	    /**
	     * Encode packet as 'buffer sequence' by removing blobs, and
	     * deconstructing packet into object with placeholders and
	     * a list of buffers.
	     */
	    encodeAsBinary(obj) {
	        const deconstruction = deconstructPacket(obj);
	        const pack = this.encodeAsString(deconstruction.packet);
	        const buffers = deconstruction.buffers;
	        buffers.unshift(pack); // add packet info to beginning of data list
	        return buffers; // write all the buffers
	    }
	}
	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 */
	class Decoder extends Emitter {
	    /**
	     * Decoder constructor
	     *
	     * @param {function} reviver - custom reviver to pass down to JSON.stringify
	     */
	    constructor(reviver) {
	        super();
	        this.reviver = reviver;
	    }
	    /**
	     * Decodes an encoded packet string into packet JSON.
	     *
	     * @param {String} obj - encoded packet
	     */
	    add(obj) {
	        let packet;
	        if (typeof obj === "string") {
	            packet = this.decodeString(obj);
	            if (packet.type === PacketType.BINARY_EVENT ||
	                packet.type === PacketType.BINARY_ACK) {
	                // binary packet's json
	                this.reconstructor = new BinaryReconstructor(packet);
	                // no attachments, labeled binary but no binary data to follow
	                if (packet.attachments === 0) {
	                    super.emitReserved("decoded", packet);
	                }
	            }
	            else {
	                // non-binary full packet
	                super.emitReserved("decoded", packet);
	            }
	        }
	        else if (isBinary(obj) || obj.base64) {
	            // raw binary data
	            if (!this.reconstructor) {
	                throw new Error("got binary data when not reconstructing a packet");
	            }
	            else {
	                packet = this.reconstructor.takeBinaryData(obj);
	                if (packet) {
	                    // received final buffer
	                    this.reconstructor = null;
	                    super.emitReserved("decoded", packet);
	                }
	            }
	        }
	        else {
	            throw new Error("Unknown type: " + obj);
	        }
	    }
	    /**
	     * Decode a packet String (JSON data)
	     *
	     * @param {String} str
	     * @return {Object} packet
	     */
	    decodeString(str) {
	        let i = 0;
	        // look up type
	        const p = {
	            type: Number(str.charAt(0)),
	        };
	        if (PacketType[p.type] === undefined) {
	            throw new Error("unknown packet type " + p.type);
	        }
	        // look up attachments if type binary
	        if (p.type === PacketType.BINARY_EVENT ||
	            p.type === PacketType.BINARY_ACK) {
	            const start = i + 1;
	            while (str.charAt(++i) !== "-" && i != str.length) { }
	            const buf = str.substring(start, i);
	            if (buf != Number(buf) || str.charAt(i) !== "-") {
	                throw new Error("Illegal attachments");
	            }
	            p.attachments = Number(buf);
	        }
	        // look up namespace (if any)
	        if ("/" === str.charAt(i + 1)) {
	            const start = i + 1;
	            while (++i) {
	                const c = str.charAt(i);
	                if ("," === c)
	                    break;
	                if (i === str.length)
	                    break;
	            }
	            p.nsp = str.substring(start, i);
	        }
	        else {
	            p.nsp = "/";
	        }
	        // look up id
	        const next = str.charAt(i + 1);
	        if ("" !== next && Number(next) == next) {
	            const start = i + 1;
	            while (++i) {
	                const c = str.charAt(i);
	                if (null == c || Number(c) != c) {
	                    --i;
	                    break;
	                }
	                if (i === str.length)
	                    break;
	            }
	            p.id = Number(str.substring(start, i + 1));
	        }
	        // look up json data
	        if (str.charAt(++i)) {
	            const payload = this.tryParse(str.substr(i));
	            if (Decoder.isPayloadValid(p.type, payload)) {
	                p.data = payload;
	            }
	            else {
	                throw new Error("invalid payload");
	            }
	        }
	        return p;
	    }
	    tryParse(str) {
	        try {
	            return JSON.parse(str, this.reviver);
	        }
	        catch (e) {
	            return false;
	        }
	    }
	    static isPayloadValid(type, payload) {
	        switch (type) {
	            case PacketType.CONNECT:
	                return typeof payload === "object";
	            case PacketType.DISCONNECT:
	                return payload === undefined;
	            case PacketType.CONNECT_ERROR:
	                return typeof payload === "string" || typeof payload === "object";
	            case PacketType.EVENT:
	            case PacketType.BINARY_EVENT:
	                return Array.isArray(payload) && payload.length > 0;
	            case PacketType.ACK:
	            case PacketType.BINARY_ACK:
	                return Array.isArray(payload);
	        }
	    }
	    /**
	     * Deallocates a parser's resources
	     */
	    destroy() {
	        if (this.reconstructor) {
	            this.reconstructor.finishedReconstruction();
	        }
	    }
	}
	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 */
	class BinaryReconstructor {
	    constructor(packet) {
	        this.packet = packet;
	        this.buffers = [];
	        this.reconPack = packet;
	    }
	    /**
	     * Method to be called when binary data received from connection
	     * after a BINARY_EVENT packet.
	     *
	     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	     * @return {null | Object} returns null if more binary data is expected or
	     *   a reconstructed packet object if all buffers have been received.
	     */
	    takeBinaryData(binData) {
	        this.buffers.push(binData);
	        if (this.buffers.length === this.reconPack.attachments) {
	            // done with buffer list
	            const packet = reconstructPacket(this.reconPack, this.buffers);
	            this.finishedReconstruction();
	            return packet;
	        }
	        return null;
	    }
	    /**
	     * Cleans up binary packet reconstruction variables.
	     */
	    finishedReconstruction() {
	        this.reconPack = null;
	        this.buffers = [];
	    }
	}

	var parser = /*#__PURE__*/Object.freeze({
		__proto__: null,
		protocol: protocol,
		get PacketType () { return PacketType; },
		Encoder: Encoder,
		Decoder: Decoder
	});

	function on(obj, ev, fn) {
	    obj.on(ev, fn);
	    return function subDestroy() {
	        obj.off(ev, fn);
	    };
	}

	/**
	 * Internal events.
	 * These events can't be emitted by the user.
	 */
	const RESERVED_EVENTS = Object.freeze({
	    connect: 1,
	    connect_error: 1,
	    disconnect: 1,
	    disconnecting: 1,
	    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
	    newListener: 1,
	    removeListener: 1,
	});
	class Socket extends Emitter {
	    /**
	     * `Socket` constructor.
	     *
	     * @public
	     */
	    constructor(io, nsp, opts) {
	        super();
	        this.connected = false;
	        this.receiveBuffer = [];
	        this.sendBuffer = [];
	        this.ids = 0;
	        this.acks = {};
	        this.flags = {};
	        this.io = io;
	        this.nsp = nsp;
	        if (opts && opts.auth) {
	            this.auth = opts.auth;
	        }
	        if (this.io._autoConnect)
	            this.open();
	    }
	    /**
	     * Whether the socket is currently disconnected
	     */
	    get disconnected() {
	        return !this.connected;
	    }
	    /**
	     * Subscribe to open, close and packet events
	     *
	     * @private
	     */
	    subEvents() {
	        if (this.subs)
	            return;
	        const io = this.io;
	        this.subs = [
	            on(io, "open", this.onopen.bind(this)),
	            on(io, "packet", this.onpacket.bind(this)),
	            on(io, "error", this.onerror.bind(this)),
	            on(io, "close", this.onclose.bind(this)),
	        ];
	    }
	    /**
	     * Whether the Socket will try to reconnect when its Manager connects or reconnects
	     */
	    get active() {
	        return !!this.subs;
	    }
	    /**
	     * "Opens" the socket.
	     *
	     * @public
	     */
	    connect() {
	        if (this.connected)
	            return this;
	        this.subEvents();
	        if (!this.io["_reconnecting"])
	            this.io.open(); // ensure open
	        if ("open" === this.io._readyState)
	            this.onopen();
	        return this;
	    }
	    /**
	     * Alias for connect()
	     */
	    open() {
	        return this.connect();
	    }
	    /**
	     * Sends a `message` event.
	     *
	     * @return self
	     * @public
	     */
	    send(...args) {
	        args.unshift("message");
	        this.emit.apply(this, args);
	        return this;
	    }
	    /**
	     * Override `emit`.
	     * If the event is in `events`, it's emitted normally.
	     *
	     * @return self
	     * @public
	     */
	    emit(ev, ...args) {
	        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
	            throw new Error('"' + ev + '" is a reserved event name');
	        }
	        args.unshift(ev);
	        const packet = {
	            type: PacketType.EVENT,
	            data: args,
	        };
	        packet.options = {};
	        packet.options.compress = this.flags.compress !== false;
	        // event ack callback
	        if ("function" === typeof args[args.length - 1]) {
	            const id = this.ids++;
	            const ack = args.pop();
	            this._registerAckCallback(id, ack);
	            packet.id = id;
	        }
	        const isTransportWritable = this.io.engine &&
	            this.io.engine.transport &&
	            this.io.engine.transport.writable;
	        const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
	        if (discardPacket) ;
	        else if (this.connected) {
	            this.notifyOutgoingListeners(packet);
	            this.packet(packet);
	        }
	        else {
	            this.sendBuffer.push(packet);
	        }
	        this.flags = {};
	        return this;
	    }
	    /**
	     * @private
	     */
	    _registerAckCallback(id, ack) {
	        const timeout = this.flags.timeout;
	        if (timeout === undefined) {
	            this.acks[id] = ack;
	            return;
	        }
	        // @ts-ignore
	        const timer = this.io.setTimeoutFn(() => {
	            delete this.acks[id];
	            for (let i = 0; i < this.sendBuffer.length; i++) {
	                if (this.sendBuffer[i].id === id) {
	                    this.sendBuffer.splice(i, 1);
	                }
	            }
	            ack.call(this, new Error("operation has timed out"));
	        }, timeout);
	        this.acks[id] = (...args) => {
	            // @ts-ignore
	            this.io.clearTimeoutFn(timer);
	            ack.apply(this, [null, ...args]);
	        };
	    }
	    /**
	     * Sends a packet.
	     *
	     * @param packet
	     * @private
	     */
	    packet(packet) {
	        packet.nsp = this.nsp;
	        this.io._packet(packet);
	    }
	    /**
	     * Called upon engine `open`.
	     *
	     * @private
	     */
	    onopen() {
	        if (typeof this.auth == "function") {
	            this.auth((data) => {
	                this.packet({ type: PacketType.CONNECT, data });
	            });
	        }
	        else {
	            this.packet({ type: PacketType.CONNECT, data: this.auth });
	        }
	    }
	    /**
	     * Called upon engine or manager `error`.
	     *
	     * @param err
	     * @private
	     */
	    onerror(err) {
	        if (!this.connected) {
	            this.emitReserved("connect_error", err);
	        }
	    }
	    /**
	     * Called upon engine `close`.
	     *
	     * @param reason
	     * @param description
	     * @private
	     */
	    onclose(reason, description) {
	        this.connected = false;
	        delete this.id;
	        this.emitReserved("disconnect", reason, description);
	    }
	    /**
	     * Called with socket packet.
	     *
	     * @param packet
	     * @private
	     */
	    onpacket(packet) {
	        const sameNamespace = packet.nsp === this.nsp;
	        if (!sameNamespace)
	            return;
	        switch (packet.type) {
	            case PacketType.CONNECT:
	                if (packet.data && packet.data.sid) {
	                    const id = packet.data.sid;
	                    this.onconnect(id);
	                }
	                else {
	                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
	                }
	                break;
	            case PacketType.EVENT:
	            case PacketType.BINARY_EVENT:
	                this.onevent(packet);
	                break;
	            case PacketType.ACK:
	            case PacketType.BINARY_ACK:
	                this.onack(packet);
	                break;
	            case PacketType.DISCONNECT:
	                this.ondisconnect();
	                break;
	            case PacketType.CONNECT_ERROR:
	                this.destroy();
	                const err = new Error(packet.data.message);
	                // @ts-ignore
	                err.data = packet.data.data;
	                this.emitReserved("connect_error", err);
	                break;
	        }
	    }
	    /**
	     * Called upon a server event.
	     *
	     * @param packet
	     * @private
	     */
	    onevent(packet) {
	        const args = packet.data || [];
	        if (null != packet.id) {
	            args.push(this.ack(packet.id));
	        }
	        if (this.connected) {
	            this.emitEvent(args);
	        }
	        else {
	            this.receiveBuffer.push(Object.freeze(args));
	        }
	    }
	    emitEvent(args) {
	        if (this._anyListeners && this._anyListeners.length) {
	            const listeners = this._anyListeners.slice();
	            for (const listener of listeners) {
	                listener.apply(this, args);
	            }
	        }
	        super.emit.apply(this, args);
	    }
	    /**
	     * Produces an ack callback to emit with an event.
	     *
	     * @private
	     */
	    ack(id) {
	        const self = this;
	        let sent = false;
	        return function (...args) {
	            // prevent double callbacks
	            if (sent)
	                return;
	            sent = true;
	            self.packet({
	                type: PacketType.ACK,
	                id: id,
	                data: args,
	            });
	        };
	    }
	    /**
	     * Called upon a server acknowlegement.
	     *
	     * @param packet
	     * @private
	     */
	    onack(packet) {
	        const ack = this.acks[packet.id];
	        if ("function" === typeof ack) {
	            ack.apply(this, packet.data);
	            delete this.acks[packet.id];
	        }
	    }
	    /**
	     * Called upon server connect.
	     *
	     * @private
	     */
	    onconnect(id) {
	        this.id = id;
	        this.connected = true;
	        this.emitBuffered();
	        this.emitReserved("connect");
	    }
	    /**
	     * Emit buffered events (received and emitted).
	     *
	     * @private
	     */
	    emitBuffered() {
	        this.receiveBuffer.forEach((args) => this.emitEvent(args));
	        this.receiveBuffer = [];
	        this.sendBuffer.forEach((packet) => {
	            this.notifyOutgoingListeners(packet);
	            this.packet(packet);
	        });
	        this.sendBuffer = [];
	    }
	    /**
	     * Called upon server disconnect.
	     *
	     * @private
	     */
	    ondisconnect() {
	        this.destroy();
	        this.onclose("io server disconnect");
	    }
	    /**
	     * Called upon forced client/server side disconnections,
	     * this method ensures the manager stops tracking us and
	     * that reconnections don't get triggered for this.
	     *
	     * @private
	     */
	    destroy() {
	        if (this.subs) {
	            // clean subscriptions to avoid reconnections
	            this.subs.forEach((subDestroy) => subDestroy());
	            this.subs = undefined;
	        }
	        this.io["_destroy"](this);
	    }
	    /**
	     * Disconnects the socket manually.
	     *
	     * @return self
	     * @public
	     */
	    disconnect() {
	        if (this.connected) {
	            this.packet({ type: PacketType.DISCONNECT });
	        }
	        // remove socket from pool
	        this.destroy();
	        if (this.connected) {
	            // fire events
	            this.onclose("io client disconnect");
	        }
	        return this;
	    }
	    /**
	     * Alias for disconnect()
	     *
	     * @return self
	     * @public
	     */
	    close() {
	        return this.disconnect();
	    }
	    /**
	     * Sets the compress flag.
	     *
	     * @param compress - if `true`, compresses the sending data
	     * @return self
	     * @public
	     */
	    compress(compress) {
	        this.flags.compress = compress;
	        return this;
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
	     * ready to send messages.
	     *
	     * @returns self
	     * @public
	     */
	    get volatile() {
	        this.flags.volatile = true;
	        return this;
	    }
	    /**
	     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
	     * given number of milliseconds have elapsed without an acknowledgement from the server:
	     *
	     * ```
	     * socket.timeout(5000).emit("my-event", (err) => {
	     *   if (err) {
	     *     // the server did not acknowledge the event in the given delay
	     *   }
	     * });
	     * ```
	     *
	     * @returns self
	     * @public
	     */
	    timeout(timeout) {
	        this.flags.timeout = timeout;
	        return this;
	    }
	    /**
	     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	     * callback.
	     *
	     * @param listener
	     * @public
	     */
	    onAny(listener) {
	        this._anyListeners = this._anyListeners || [];
	        this._anyListeners.push(listener);
	        return this;
	    }
	    /**
	     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	     * callback. The listener is added to the beginning of the listeners array.
	     *
	     * @param listener
	     * @public
	     */
	    prependAny(listener) {
	        this._anyListeners = this._anyListeners || [];
	        this._anyListeners.unshift(listener);
	        return this;
	    }
	    /**
	     * Removes the listener that will be fired when any event is emitted.
	     *
	     * @param listener
	     * @public
	     */
	    offAny(listener) {
	        if (!this._anyListeners) {
	            return this;
	        }
	        if (listener) {
	            const listeners = this._anyListeners;
	            for (let i = 0; i < listeners.length; i++) {
	                if (listener === listeners[i]) {
	                    listeners.splice(i, 1);
	                    return this;
	                }
	            }
	        }
	        else {
	            this._anyListeners = [];
	        }
	        return this;
	    }
	    /**
	     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	     * e.g. to remove listeners.
	     *
	     * @public
	     */
	    listenersAny() {
	        return this._anyListeners || [];
	    }
	    /**
	     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	     * callback.
	     *
	     * @param listener
	     *
	     * <pre><code>
	     *
	     * socket.onAnyOutgoing((event, ...args) => {
	     *   console.log(event);
	     * });
	     *
	     * </pre></code>
	     *
	     * @public
	     */
	    onAnyOutgoing(listener) {
	        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
	        this._anyOutgoingListeners.push(listener);
	        return this;
	    }
	    /**
	     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	     * callback. The listener is added to the beginning of the listeners array.
	     *
	     * @param listener
	     *
	     * <pre><code>
	     *
	     * socket.prependAnyOutgoing((event, ...args) => {
	     *   console.log(event);
	     * });
	     *
	     * </pre></code>
	     *
	     * @public
	     */
	    prependAnyOutgoing(listener) {
	        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
	        this._anyOutgoingListeners.unshift(listener);
	        return this;
	    }
	    /**
	     * Removes the listener that will be fired when any event is emitted.
	     *
	     * @param listener
	     *
	     * <pre><code>
	     *
	     * const handler = (event, ...args) => {
	     *   console.log(event);
	     * }
	     *
	     * socket.onAnyOutgoing(handler);
	     *
	     * // then later
	     * socket.offAnyOutgoing(handler);
	     *
	     * </pre></code>
	     *
	     * @public
	     */
	    offAnyOutgoing(listener) {
	        if (!this._anyOutgoingListeners) {
	            return this;
	        }
	        if (listener) {
	            const listeners = this._anyOutgoingListeners;
	            for (let i = 0; i < listeners.length; i++) {
	                if (listener === listeners[i]) {
	                    listeners.splice(i, 1);
	                    return this;
	                }
	            }
	        }
	        else {
	            this._anyOutgoingListeners = [];
	        }
	        return this;
	    }
	    /**
	     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	     * e.g. to remove listeners.
	     *
	     * @public
	     */
	    listenersAnyOutgoing() {
	        return this._anyOutgoingListeners || [];
	    }
	    /**
	     * Notify the listeners for each packet sent
	     *
	     * @param packet
	     *
	     * @private
	     */
	    notifyOutgoingListeners(packet) {
	        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
	            const listeners = this._anyOutgoingListeners.slice();
	            for (const listener of listeners) {
	                listener.apply(this, packet.data);
	            }
	        }
	    }
	}

	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */
	function Backoff(opts) {
	    opts = opts || {};
	    this.ms = opts.min || 100;
	    this.max = opts.max || 10000;
	    this.factor = opts.factor || 2;
	    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	    this.attempts = 0;
	}
	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */
	Backoff.prototype.duration = function () {
	    var ms = this.ms * Math.pow(this.factor, this.attempts++);
	    if (this.jitter) {
	        var rand = Math.random();
	        var deviation = Math.floor(rand * this.jitter * ms);
	        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	    }
	    return Math.min(ms, this.max) | 0;
	};
	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */
	Backoff.prototype.reset = function () {
	    this.attempts = 0;
	};
	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */
	Backoff.prototype.setMin = function (min) {
	    this.ms = min;
	};
	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */
	Backoff.prototype.setMax = function (max) {
	    this.max = max;
	};
	/**
	 * Set the jitter
	 *
	 * @api public
	 */
	Backoff.prototype.setJitter = function (jitter) {
	    this.jitter = jitter;
	};

	class Manager extends Emitter {
	    constructor(uri, opts) {
	        var _a;
	        super();
	        this.nsps = {};
	        this.subs = [];
	        if (uri && "object" === typeof uri) {
	            opts = uri;
	            uri = undefined;
	        }
	        opts = opts || {};
	        opts.path = opts.path || "/socket.io";
	        this.opts = opts;
	        installTimerFunctions(this, opts);
	        this.reconnection(opts.reconnection !== false);
	        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	        this.reconnectionDelay(opts.reconnectionDelay || 1000);
	        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
	        this.backoff = new Backoff({
	            min: this.reconnectionDelay(),
	            max: this.reconnectionDelayMax(),
	            jitter: this.randomizationFactor(),
	        });
	        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	        this._readyState = "closed";
	        this.uri = uri;
	        const _parser = opts.parser || parser;
	        this.encoder = new _parser.Encoder();
	        this.decoder = new _parser.Decoder();
	        this._autoConnect = opts.autoConnect !== false;
	        if (this._autoConnect)
	            this.open();
	    }
	    reconnection(v) {
	        if (!arguments.length)
	            return this._reconnection;
	        this._reconnection = !!v;
	        return this;
	    }
	    reconnectionAttempts(v) {
	        if (v === undefined)
	            return this._reconnectionAttempts;
	        this._reconnectionAttempts = v;
	        return this;
	    }
	    reconnectionDelay(v) {
	        var _a;
	        if (v === undefined)
	            return this._reconnectionDelay;
	        this._reconnectionDelay = v;
	        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
	        return this;
	    }
	    randomizationFactor(v) {
	        var _a;
	        if (v === undefined)
	            return this._randomizationFactor;
	        this._randomizationFactor = v;
	        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
	        return this;
	    }
	    reconnectionDelayMax(v) {
	        var _a;
	        if (v === undefined)
	            return this._reconnectionDelayMax;
	        this._reconnectionDelayMax = v;
	        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
	        return this;
	    }
	    timeout(v) {
	        if (!arguments.length)
	            return this._timeout;
	        this._timeout = v;
	        return this;
	    }
	    /**
	     * Starts trying to reconnect if reconnection is enabled and we have not
	     * started reconnecting yet
	     *
	     * @private
	     */
	    maybeReconnectOnOpen() {
	        // Only try to reconnect if it's the first time we're connecting
	        if (!this._reconnecting &&
	            this._reconnection &&
	            this.backoff.attempts === 0) {
	            // keeps reconnection from firing twice for the same reconnection loop
	            this.reconnect();
	        }
	    }
	    /**
	     * Sets the current transport `socket`.
	     *
	     * @param {Function} fn - optional, callback
	     * @return self
	     * @public
	     */
	    open(fn) {
	        if (~this._readyState.indexOf("open"))
	            return this;
	        this.engine = new Socket$1(this.uri, this.opts);
	        const socket = this.engine;
	        const self = this;
	        this._readyState = "opening";
	        this.skipReconnect = false;
	        // emit `open`
	        const openSubDestroy = on(socket, "open", function () {
	            self.onopen();
	            fn && fn();
	        });
	        // emit `error`
	        const errorSub = on(socket, "error", (err) => {
	            self.cleanup();
	            self._readyState = "closed";
	            this.emitReserved("error", err);
	            if (fn) {
	                fn(err);
	            }
	            else {
	                // Only do this if there is no fn to handle the error
	                self.maybeReconnectOnOpen();
	            }
	        });
	        if (false !== this._timeout) {
	            const timeout = this._timeout;
	            if (timeout === 0) {
	                openSubDestroy(); // prevents a race condition with the 'open' event
	            }
	            // set timer
	            const timer = this.setTimeoutFn(() => {
	                openSubDestroy();
	                socket.close();
	                // @ts-ignore
	                socket.emit("error", new Error("timeout"));
	            }, timeout);
	            if (this.opts.autoUnref) {
	                timer.unref();
	            }
	            this.subs.push(function subDestroy() {
	                clearTimeout(timer);
	            });
	        }
	        this.subs.push(openSubDestroy);
	        this.subs.push(errorSub);
	        return this;
	    }
	    /**
	     * Alias for open()
	     *
	     * @return self
	     * @public
	     */
	    connect(fn) {
	        return this.open(fn);
	    }
	    /**
	     * Called upon transport open.
	     *
	     * @private
	     */
	    onopen() {
	        // clear old subs
	        this.cleanup();
	        // mark as open
	        this._readyState = "open";
	        this.emitReserved("open");
	        // add new subs
	        const socket = this.engine;
	        this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
	    }
	    /**
	     * Called upon a ping.
	     *
	     * @private
	     */
	    onping() {
	        this.emitReserved("ping");
	    }
	    /**
	     * Called with data.
	     *
	     * @private
	     */
	    ondata(data) {
	        this.decoder.add(data);
	    }
	    /**
	     * Called when parser fully decodes a packet.
	     *
	     * @private
	     */
	    ondecoded(packet) {
	        this.emitReserved("packet", packet);
	    }
	    /**
	     * Called upon socket error.
	     *
	     * @private
	     */
	    onerror(err) {
	        this.emitReserved("error", err);
	    }
	    /**
	     * Creates a new socket for the given `nsp`.
	     *
	     * @return {Socket}
	     * @public
	     */
	    socket(nsp, opts) {
	        let socket = this.nsps[nsp];
	        if (!socket) {
	            socket = new Socket(this, nsp, opts);
	            this.nsps[nsp] = socket;
	        }
	        return socket;
	    }
	    /**
	     * Called upon a socket close.
	     *
	     * @param socket
	     * @private
	     */
	    _destroy(socket) {
	        const nsps = Object.keys(this.nsps);
	        for (const nsp of nsps) {
	            const socket = this.nsps[nsp];
	            if (socket.active) {
	                return;
	            }
	        }
	        this._close();
	    }
	    /**
	     * Writes a packet.
	     *
	     * @param packet
	     * @private
	     */
	    _packet(packet) {
	        const encodedPackets = this.encoder.encode(packet);
	        for (let i = 0; i < encodedPackets.length; i++) {
	            this.engine.write(encodedPackets[i], packet.options);
	        }
	    }
	    /**
	     * Clean up transport subscriptions and packet buffer.
	     *
	     * @private
	     */
	    cleanup() {
	        this.subs.forEach((subDestroy) => subDestroy());
	        this.subs.length = 0;
	        this.decoder.destroy();
	    }
	    /**
	     * Close the current socket.
	     *
	     * @private
	     */
	    _close() {
	        this.skipReconnect = true;
	        this._reconnecting = false;
	        this.onclose("forced close");
	        if (this.engine)
	            this.engine.close();
	    }
	    /**
	     * Alias for close()
	     *
	     * @private
	     */
	    disconnect() {
	        return this._close();
	    }
	    /**
	     * Called upon engine close.
	     *
	     * @private
	     */
	    onclose(reason, description) {
	        this.cleanup();
	        this.backoff.reset();
	        this._readyState = "closed";
	        this.emitReserved("close", reason, description);
	        if (this._reconnection && !this.skipReconnect) {
	            this.reconnect();
	        }
	    }
	    /**
	     * Attempt a reconnection.
	     *
	     * @private
	     */
	    reconnect() {
	        if (this._reconnecting || this.skipReconnect)
	            return this;
	        const self = this;
	        if (this.backoff.attempts >= this._reconnectionAttempts) {
	            this.backoff.reset();
	            this.emitReserved("reconnect_failed");
	            this._reconnecting = false;
	        }
	        else {
	            const delay = this.backoff.duration();
	            this._reconnecting = true;
	            const timer = this.setTimeoutFn(() => {
	                if (self.skipReconnect)
	                    return;
	                this.emitReserved("reconnect_attempt", self.backoff.attempts);
	                // check again for the case socket closed in above events
	                if (self.skipReconnect)
	                    return;
	                self.open((err) => {
	                    if (err) {
	                        self._reconnecting = false;
	                        self.reconnect();
	                        this.emitReserved("reconnect_error", err);
	                    }
	                    else {
	                        self.onreconnect();
	                    }
	                });
	            }, delay);
	            if (this.opts.autoUnref) {
	                timer.unref();
	            }
	            this.subs.push(function subDestroy() {
	                clearTimeout(timer);
	            });
	        }
	    }
	    /**
	     * Called upon successful reconnect.
	     *
	     * @private
	     */
	    onreconnect() {
	        const attempt = this.backoff.attempts;
	        this._reconnecting = false;
	        this.backoff.reset();
	        this.emitReserved("reconnect", attempt);
	    }
	}

	/**
	 * Managers cache.
	 */
	const cache = {};
	function lookup(uri, opts) {
	    if (typeof uri === "object") {
	        opts = uri;
	        uri = undefined;
	    }
	    opts = opts || {};
	    const parsed = url(uri, opts.path || "/socket.io");
	    const source = parsed.source;
	    const id = parsed.id;
	    const path = parsed.path;
	    const sameNamespace = cache[id] && path in cache[id]["nsps"];
	    const newConnection = opts.forceNew ||
	        opts["force new connection"] ||
	        false === opts.multiplex ||
	        sameNamespace;
	    let io;
	    if (newConnection) {
	        io = new Manager(source, opts);
	    }
	    else {
	        if (!cache[id]) {
	            cache[id] = new Manager(source, opts);
	        }
	        io = cache[id];
	    }
	    if (parsed.query && !opts.query) {
	        opts.query = parsed.queryKey;
	    }
	    return io.socket(parsed.path, opts);
	}
	// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
	// namespace (e.g. `io.connect(...)`), for backward compatibility
	Object.assign(lookup, {
	    Manager,
	    Socket,
	    io: lookup,
	    connect: lookup,
	});

	var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

	var css = "@charset \"UTF-8\";\n/*!\n * Bootstrap v5.1.3 (https://getbootstrap.com/)\n * Copyright 2011-2021 The Bootstrap Authors\n * Copyright 2011-2021 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n */\n:root {\n  --bs-blue: #0d6efd;\n  --bs-indigo: #6610f2;\n  --bs-purple: #6f42c1;\n  --bs-pink: #d63384;\n  --bs-red: #dc3545;\n  --bs-orange: #fd7e14;\n  --bs-yellow: #ffc107;\n  --bs-green: #198754;\n  --bs-teal: #20c997;\n  --bs-cyan: #0dcaf0;\n  --bs-white: #fff;\n  --bs-gray: #6c757d;\n  --bs-gray-dark: #343a40;\n  --bs-gray-100: #f8f9fa;\n  --bs-gray-200: #e9ecef;\n  --bs-gray-300: #dee2e6;\n  --bs-gray-400: #ced4da;\n  --bs-gray-500: #adb5bd;\n  --bs-gray-600: #6c757d;\n  --bs-gray-700: #495057;\n  --bs-gray-800: #343a40;\n  --bs-gray-900: #212529;\n  --bs-primary: #0d6efd;\n  --bs-secondary: #6c757d;\n  --bs-success: #198754;\n  --bs-info: #0dcaf0;\n  --bs-warning: #ffc107;\n  --bs-danger: #dc3545;\n  --bs-light: #f8f9fa;\n  --bs-dark: #212529;\n  --bs-primary-rgb: 13, 110, 253;\n  --bs-secondary-rgb: 108, 117, 125;\n  --bs-success-rgb: 25, 135, 84;\n  --bs-info-rgb: 13, 202, 240;\n  --bs-warning-rgb: 255, 193, 7;\n  --bs-danger-rgb: 220, 53, 69;\n  --bs-light-rgb: 248, 249, 250;\n  --bs-dark-rgb: 33, 37, 41;\n  --bs-white-rgb: 255, 255, 255;\n  --bs-black-rgb: 0, 0, 0;\n  --bs-body-color-rgb: 33, 37, 41;\n  --bs-body-bg-rgb: 255, 255, 255;\n  --bs-font-sans-serif: system-ui, -apple-system, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", \"Liberation Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n  --bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0));\n  --bs-body-font-family: var(--bs-font-sans-serif);\n  --bs-body-font-size: 1rem;\n  --bs-body-font-weight: 400;\n  --bs-body-line-height: 1.5;\n  --bs-body-color: #212529;\n  --bs-body-bg: #fff;\n}\n\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  :root {\n    scroll-behavior: smooth;\n  }\n}\n\nbody {\n  margin: 0;\n  font-family: var(--bs-body-font-family);\n  font-size: var(--bs-body-font-size);\n  font-weight: var(--bs-body-font-weight);\n  line-height: var(--bs-body-line-height);\n  color: var(--bs-body-color);\n  text-align: var(--bs-body-text-align);\n  background-color: var(--bs-body-bg);\n  -webkit-text-size-adjust: 100%;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\n\nhr {\n  margin: 1rem 0;\n  color: inherit;\n  background-color: currentColor;\n  border: 0;\n  opacity: 0.25;\n}\n\nhr:not([size]) {\n  height: 1px;\n}\n\nh6, .h6, h5, .h5, h4, .h4, h3, .h3, h2, .h2, h1, .h1 {\n  margin-top: 0;\n  margin-bottom: 0.5rem;\n  font-weight: 500;\n  line-height: 1.2;\n}\n\nh1, .h1 {\n  font-size: calc(1.375rem + 1.5vw);\n}\n@media (min-width: 1200px) {\n  h1, .h1 {\n    font-size: 2.5rem;\n  }\n}\n\nh2, .h2 {\n  font-size: calc(1.325rem + 0.9vw);\n}\n@media (min-width: 1200px) {\n  h2, .h2 {\n    font-size: 2rem;\n  }\n}\n\nh3, .h3 {\n  font-size: calc(1.3rem + 0.6vw);\n}\n@media (min-width: 1200px) {\n  h3, .h3 {\n    font-size: 1.75rem;\n  }\n}\n\nh4, .h4 {\n  font-size: calc(1.275rem + 0.3vw);\n}\n@media (min-width: 1200px) {\n  h4, .h4 {\n    font-size: 1.5rem;\n  }\n}\n\nh5, .h5 {\n  font-size: 1.25rem;\n}\n\nh6, .h6 {\n  font-size: 1rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nabbr[title],\nabbr[data-bs-original-title] {\n  -webkit-text-decoration: underline dotted;\n  text-decoration: underline dotted;\n  cursor: help;\n  -webkit-text-decoration-skip-ink: none;\n  text-decoration-skip-ink: none;\n}\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n\nol,\nul {\n  padding-left: 2rem;\n}\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0;\n}\n\ndt {\n  font-weight: 700;\n}\n\ndd {\n  margin-bottom: 0.5rem;\n  margin-left: 0;\n}\n\nblockquote {\n  margin: 0 0 1rem;\n}\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\nsmall, .small {\n  font-size: 0.875em;\n}\n\nmark, .mark {\n  padding: 0.2em;\n  background-color: #fcf8e3;\n}\n\nsub,\nsup {\n  position: relative;\n  font-size: 0.75em;\n  line-height: 0;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\na {\n  color: #0d6efd;\n  text-decoration: underline;\n}\na:hover {\n  color: #0a58ca;\n}\n\na:not([href]):not([class]), a:not([href]):not([class]):hover {\n  color: inherit;\n  text-decoration: none;\n}\n\npre,\ncode,\nkbd,\nsamp {\n  font-family: var(--bs-font-monospace);\n  font-size: 1em;\n  direction: ltr /* rtl:ignore */;\n  unicode-bidi: bidi-override;\n}\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n  font-size: 0.875em;\n}\npre code {\n  font-size: inherit;\n  color: inherit;\n  word-break: normal;\n}\n\ncode {\n  font-size: 0.875em;\n  color: #d63384;\n  word-wrap: break-word;\n}\na > code {\n  color: inherit;\n}\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 0.875em;\n  color: #fff;\n  background-color: #212529;\n  border-radius: 0.2rem;\n}\nkbd kbd {\n  padding: 0;\n  font-size: 1em;\n  font-weight: 700;\n}\n\nfigure {\n  margin: 0 0 1rem;\n}\n\nimg,\nsvg {\n  vertical-align: middle;\n}\n\ntable {\n  caption-side: bottom;\n  border-collapse: collapse;\n}\n\ncaption {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  color: #6c757d;\n  text-align: left;\n}\n\nth {\n  text-align: inherit;\n  text-align: -webkit-match-parent;\n}\n\nthead,\ntbody,\ntfoot,\ntr,\ntd,\nth {\n  border-color: inherit;\n  border-style: solid;\n  border-width: 0;\n}\n\nlabel {\n  display: inline-block;\n}\n\nbutton {\n  border-radius: 0;\n}\n\nbutton:focus:not(:focus-visible) {\n  outline: 0;\n}\n\ninput,\nbutton,\nselect,\noptgroup,\ntextarea {\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n[role=button] {\n  cursor: pointer;\n}\n\nselect {\n  word-wrap: normal;\n}\nselect:disabled {\n  opacity: 1;\n}\n\n[list]::-webkit-calendar-picker-indicator {\n  display: none;\n}\n\nbutton,\n[type=button],\n[type=reset],\n[type=submit] {\n  -webkit-appearance: button;\n}\nbutton:not(:disabled),\n[type=button]:not(:disabled),\n[type=reset]:not(:disabled),\n[type=submit]:not(:disabled) {\n  cursor: pointer;\n}\n\n::-moz-focus-inner {\n  padding: 0;\n  border-style: none;\n}\n\ntextarea {\n  resize: vertical;\n}\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\nlegend {\n  float: left;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 0.5rem;\n  font-size: calc(1.275rem + 0.3vw);\n  line-height: inherit;\n}\n@media (min-width: 1200px) {\n  legend {\n    font-size: 1.5rem;\n  }\n}\nlegend + * {\n  clear: left;\n}\n\n::-webkit-datetime-edit-fields-wrapper,\n::-webkit-datetime-edit-text,\n::-webkit-datetime-edit-minute,\n::-webkit-datetime-edit-hour-field,\n::-webkit-datetime-edit-day-field,\n::-webkit-datetime-edit-month-field,\n::-webkit-datetime-edit-year-field {\n  padding: 0;\n}\n\n::-webkit-inner-spin-button {\n  height: auto;\n}\n\n[type=search] {\n  outline-offset: -2px;\n  -webkit-appearance: textfield;\n}\n\n/* rtl:raw:\n[type=\"tel\"],\n[type=\"url\"],\n[type=\"email\"],\n[type=\"number\"] {\n  direction: ltr;\n}\n*/\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-color-swatch-wrapper {\n  padding: 0;\n}\n\n::-webkit-file-upload-button {\n  font: inherit;\n}\n\n::file-selector-button {\n  font: inherit;\n}\n\n::-webkit-file-upload-button {\n  font: inherit;\n  -webkit-appearance: button;\n}\n\noutput {\n  display: inline-block;\n}\n\niframe {\n  border: 0;\n}\n\nsummary {\n  display: list-item;\n  cursor: pointer;\n}\n\nprogress {\n  vertical-align: baseline;\n}\n\n[hidden] {\n  display: none !important;\n}\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300;\n}\n\n.display-1 {\n  font-size: calc(1.625rem + 4.5vw);\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (min-width: 1200px) {\n  .display-1 {\n    font-size: 5rem;\n  }\n}\n\n.display-2 {\n  font-size: calc(1.575rem + 3.9vw);\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (min-width: 1200px) {\n  .display-2 {\n    font-size: 4.5rem;\n  }\n}\n\n.display-3 {\n  font-size: calc(1.525rem + 3.3vw);\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (min-width: 1200px) {\n  .display-3 {\n    font-size: 4rem;\n  }\n}\n\n.display-4 {\n  font-size: calc(1.475rem + 2.7vw);\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (min-width: 1200px) {\n  .display-4 {\n    font-size: 3.5rem;\n  }\n}\n\n.display-5 {\n  font-size: calc(1.425rem + 2.1vw);\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (min-width: 1200px) {\n  .display-5 {\n    font-size: 3rem;\n  }\n}\n\n.display-6 {\n  font-size: calc(1.375rem + 1.5vw);\n  font-weight: 300;\n  line-height: 1.2;\n}\n@media (min-width: 1200px) {\n  .display-6 {\n    font-size: 2.5rem;\n  }\n}\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline-item {\n  display: inline-block;\n}\n.list-inline-item:not(:last-child) {\n  margin-right: 0.5rem;\n}\n\n.initialism {\n  font-size: 0.875em;\n  text-transform: uppercase;\n}\n\n.blockquote {\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n}\n.blockquote > :last-child {\n  margin-bottom: 0;\n}\n\n.blockquote-footer {\n  margin-top: -1rem;\n  margin-bottom: 1rem;\n  font-size: 0.875em;\n  color: #6c757d;\n}\n.blockquote-footer::before {\n  content: \"— \";\n}\n\n.img-fluid {\n  max-width: 100%;\n  height: auto;\n}\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  border-radius: 0.25rem;\n  max-width: 100%;\n  height: auto;\n}\n\n.figure {\n  display: inline-block;\n}\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n\n.figure-caption {\n  font-size: 0.875em;\n  color: #6c757d;\n}\n\n.container,\n.container-fluid,\n.container-xxl,\n.container-xl,\n.container-lg,\n.container-md,\n.container-sm {\n  width: 100%;\n  padding-right: var(--bs-gutter-x, 0.75rem);\n  padding-left: var(--bs-gutter-x, 0.75rem);\n  margin-right: auto;\n  margin-left: auto;\n}\n\n@media (min-width: 576px) {\n  .container-sm, .container {\n    max-width: 540px;\n  }\n}\n@media (min-width: 768px) {\n  .container-md, .container-sm, .container {\n    max-width: 720px;\n  }\n}\n@media (min-width: 992px) {\n  .container-lg, .container-md, .container-sm, .container {\n    max-width: 960px;\n  }\n}\n@media (min-width: 1200px) {\n  .container-xl, .container-lg, .container-md, .container-sm, .container {\n    max-width: 1140px;\n  }\n}\n@media (min-width: 1400px) {\n  .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {\n    max-width: 1320px;\n  }\n}\n.row {\n  --bs-gutter-x: 1.5rem;\n  --bs-gutter-y: 0;\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: calc(-1 * var(--bs-gutter-y));\n  margin-right: calc(-0.5 * var(--bs-gutter-x));\n  margin-left: calc(-0.5 * var(--bs-gutter-x));\n}\n.row > * {\n  flex-shrink: 0;\n  width: 100%;\n  max-width: 100%;\n  padding-right: calc(var(--bs-gutter-x) * 0.5);\n  padding-left: calc(var(--bs-gutter-x) * 0.5);\n  margin-top: var(--bs-gutter-y);\n}\n\n.col {\n  flex: 1 0 0%;\n}\n\n.row-cols-auto > * {\n  flex: 0 0 auto;\n  width: auto;\n}\n\n.row-cols-1 > * {\n  flex: 0 0 auto;\n  width: 100%;\n}\n\n.row-cols-2 > * {\n  flex: 0 0 auto;\n  width: 50%;\n}\n\n.row-cols-3 > * {\n  flex: 0 0 auto;\n  width: 33.3333333333%;\n}\n\n.row-cols-4 > * {\n  flex: 0 0 auto;\n  width: 25%;\n}\n\n.row-cols-5 > * {\n  flex: 0 0 auto;\n  width: 20%;\n}\n\n.row-cols-6 > * {\n  flex: 0 0 auto;\n  width: 16.6666666667%;\n}\n\n.col-auto {\n  flex: 0 0 auto;\n  width: auto;\n}\n\n.col-1 {\n  flex: 0 0 auto;\n  width: 8.33333333%;\n}\n\n.col-2 {\n  flex: 0 0 auto;\n  width: 16.66666667%;\n}\n\n.col-3 {\n  flex: 0 0 auto;\n  width: 25%;\n}\n\n.col-4 {\n  flex: 0 0 auto;\n  width: 33.33333333%;\n}\n\n.col-5 {\n  flex: 0 0 auto;\n  width: 41.66666667%;\n}\n\n.col-6 {\n  flex: 0 0 auto;\n  width: 50%;\n}\n\n.col-7 {\n  flex: 0 0 auto;\n  width: 58.33333333%;\n}\n\n.col-8 {\n  flex: 0 0 auto;\n  width: 66.66666667%;\n}\n\n.col-9 {\n  flex: 0 0 auto;\n  width: 75%;\n}\n\n.col-10 {\n  flex: 0 0 auto;\n  width: 83.33333333%;\n}\n\n.col-11 {\n  flex: 0 0 auto;\n  width: 91.66666667%;\n}\n\n.col-12 {\n  flex: 0 0 auto;\n  width: 100%;\n}\n\n.offset-1 {\n  margin-left: 8.33333333%;\n}\n\n.offset-2 {\n  margin-left: 16.66666667%;\n}\n\n.offset-3 {\n  margin-left: 25%;\n}\n\n.offset-4 {\n  margin-left: 33.33333333%;\n}\n\n.offset-5 {\n  margin-left: 41.66666667%;\n}\n\n.offset-6 {\n  margin-left: 50%;\n}\n\n.offset-7 {\n  margin-left: 58.33333333%;\n}\n\n.offset-8 {\n  margin-left: 66.66666667%;\n}\n\n.offset-9 {\n  margin-left: 75%;\n}\n\n.offset-10 {\n  margin-left: 83.33333333%;\n}\n\n.offset-11 {\n  margin-left: 91.66666667%;\n}\n\n.g-0,\n.gx-0 {\n  --bs-gutter-x: 0;\n}\n\n.g-0,\n.gy-0 {\n  --bs-gutter-y: 0;\n}\n\n.g-1,\n.gx-1 {\n  --bs-gutter-x: 0.25rem;\n}\n\n.g-1,\n.gy-1 {\n  --bs-gutter-y: 0.25rem;\n}\n\n.g-2,\n.gx-2 {\n  --bs-gutter-x: 0.5rem;\n}\n\n.g-2,\n.gy-2 {\n  --bs-gutter-y: 0.5rem;\n}\n\n.g-3,\n.gx-3 {\n  --bs-gutter-x: 1rem;\n}\n\n.g-3,\n.gy-3 {\n  --bs-gutter-y: 1rem;\n}\n\n.g-4,\n.gx-4 {\n  --bs-gutter-x: 1.5rem;\n}\n\n.g-4,\n.gy-4 {\n  --bs-gutter-y: 1.5rem;\n}\n\n.g-5,\n.gx-5 {\n  --bs-gutter-x: 3rem;\n}\n\n.g-5,\n.gy-5 {\n  --bs-gutter-y: 3rem;\n}\n\n@media (min-width: 576px) {\n  .col-sm {\n    flex: 1 0 0%;\n  }\n\n  .row-cols-sm-auto > * {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .row-cols-sm-1 > * {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .row-cols-sm-2 > * {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .row-cols-sm-3 > * {\n    flex: 0 0 auto;\n    width: 33.3333333333%;\n  }\n\n  .row-cols-sm-4 > * {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .row-cols-sm-5 > * {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n\n  .row-cols-sm-6 > * {\n    flex: 0 0 auto;\n    width: 16.6666666667%;\n  }\n\n  .col-sm-auto {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .col-sm-1 {\n    flex: 0 0 auto;\n    width: 8.33333333%;\n  }\n\n  .col-sm-2 {\n    flex: 0 0 auto;\n    width: 16.66666667%;\n  }\n\n  .col-sm-3 {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .col-sm-4 {\n    flex: 0 0 auto;\n    width: 33.33333333%;\n  }\n\n  .col-sm-5 {\n    flex: 0 0 auto;\n    width: 41.66666667%;\n  }\n\n  .col-sm-6 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .col-sm-7 {\n    flex: 0 0 auto;\n    width: 58.33333333%;\n  }\n\n  .col-sm-8 {\n    flex: 0 0 auto;\n    width: 66.66666667%;\n  }\n\n  .col-sm-9 {\n    flex: 0 0 auto;\n    width: 75%;\n  }\n\n  .col-sm-10 {\n    flex: 0 0 auto;\n    width: 83.33333333%;\n  }\n\n  .col-sm-11 {\n    flex: 0 0 auto;\n    width: 91.66666667%;\n  }\n\n  .col-sm-12 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .offset-sm-0 {\n    margin-left: 0;\n  }\n\n  .offset-sm-1 {\n    margin-left: 8.33333333%;\n  }\n\n  .offset-sm-2 {\n    margin-left: 16.66666667%;\n  }\n\n  .offset-sm-3 {\n    margin-left: 25%;\n  }\n\n  .offset-sm-4 {\n    margin-left: 33.33333333%;\n  }\n\n  .offset-sm-5 {\n    margin-left: 41.66666667%;\n  }\n\n  .offset-sm-6 {\n    margin-left: 50%;\n  }\n\n  .offset-sm-7 {\n    margin-left: 58.33333333%;\n  }\n\n  .offset-sm-8 {\n    margin-left: 66.66666667%;\n  }\n\n  .offset-sm-9 {\n    margin-left: 75%;\n  }\n\n  .offset-sm-10 {\n    margin-left: 83.33333333%;\n  }\n\n  .offset-sm-11 {\n    margin-left: 91.66666667%;\n  }\n\n  .g-sm-0,\n.gx-sm-0 {\n    --bs-gutter-x: 0;\n  }\n\n  .g-sm-0,\n.gy-sm-0 {\n    --bs-gutter-y: 0;\n  }\n\n  .g-sm-1,\n.gx-sm-1 {\n    --bs-gutter-x: 0.25rem;\n  }\n\n  .g-sm-1,\n.gy-sm-1 {\n    --bs-gutter-y: 0.25rem;\n  }\n\n  .g-sm-2,\n.gx-sm-2 {\n    --bs-gutter-x: 0.5rem;\n  }\n\n  .g-sm-2,\n.gy-sm-2 {\n    --bs-gutter-y: 0.5rem;\n  }\n\n  .g-sm-3,\n.gx-sm-3 {\n    --bs-gutter-x: 1rem;\n  }\n\n  .g-sm-3,\n.gy-sm-3 {\n    --bs-gutter-y: 1rem;\n  }\n\n  .g-sm-4,\n.gx-sm-4 {\n    --bs-gutter-x: 1.5rem;\n  }\n\n  .g-sm-4,\n.gy-sm-4 {\n    --bs-gutter-y: 1.5rem;\n  }\n\n  .g-sm-5,\n.gx-sm-5 {\n    --bs-gutter-x: 3rem;\n  }\n\n  .g-sm-5,\n.gy-sm-5 {\n    --bs-gutter-y: 3rem;\n  }\n}\n@media (min-width: 768px) {\n  .col-md {\n    flex: 1 0 0%;\n  }\n\n  .row-cols-md-auto > * {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .row-cols-md-1 > * {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .row-cols-md-2 > * {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .row-cols-md-3 > * {\n    flex: 0 0 auto;\n    width: 33.3333333333%;\n  }\n\n  .row-cols-md-4 > * {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .row-cols-md-5 > * {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n\n  .row-cols-md-6 > * {\n    flex: 0 0 auto;\n    width: 16.6666666667%;\n  }\n\n  .col-md-auto {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .col-md-1 {\n    flex: 0 0 auto;\n    width: 8.33333333%;\n  }\n\n  .col-md-2 {\n    flex: 0 0 auto;\n    width: 16.66666667%;\n  }\n\n  .col-md-3 {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .col-md-4 {\n    flex: 0 0 auto;\n    width: 33.33333333%;\n  }\n\n  .col-md-5 {\n    flex: 0 0 auto;\n    width: 41.66666667%;\n  }\n\n  .col-md-6 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .col-md-7 {\n    flex: 0 0 auto;\n    width: 58.33333333%;\n  }\n\n  .col-md-8 {\n    flex: 0 0 auto;\n    width: 66.66666667%;\n  }\n\n  .col-md-9 {\n    flex: 0 0 auto;\n    width: 75%;\n  }\n\n  .col-md-10 {\n    flex: 0 0 auto;\n    width: 83.33333333%;\n  }\n\n  .col-md-11 {\n    flex: 0 0 auto;\n    width: 91.66666667%;\n  }\n\n  .col-md-12 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .offset-md-0 {\n    margin-left: 0;\n  }\n\n  .offset-md-1 {\n    margin-left: 8.33333333%;\n  }\n\n  .offset-md-2 {\n    margin-left: 16.66666667%;\n  }\n\n  .offset-md-3 {\n    margin-left: 25%;\n  }\n\n  .offset-md-4 {\n    margin-left: 33.33333333%;\n  }\n\n  .offset-md-5 {\n    margin-left: 41.66666667%;\n  }\n\n  .offset-md-6 {\n    margin-left: 50%;\n  }\n\n  .offset-md-7 {\n    margin-left: 58.33333333%;\n  }\n\n  .offset-md-8 {\n    margin-left: 66.66666667%;\n  }\n\n  .offset-md-9 {\n    margin-left: 75%;\n  }\n\n  .offset-md-10 {\n    margin-left: 83.33333333%;\n  }\n\n  .offset-md-11 {\n    margin-left: 91.66666667%;\n  }\n\n  .g-md-0,\n.gx-md-0 {\n    --bs-gutter-x: 0;\n  }\n\n  .g-md-0,\n.gy-md-0 {\n    --bs-gutter-y: 0;\n  }\n\n  .g-md-1,\n.gx-md-1 {\n    --bs-gutter-x: 0.25rem;\n  }\n\n  .g-md-1,\n.gy-md-1 {\n    --bs-gutter-y: 0.25rem;\n  }\n\n  .g-md-2,\n.gx-md-2 {\n    --bs-gutter-x: 0.5rem;\n  }\n\n  .g-md-2,\n.gy-md-2 {\n    --bs-gutter-y: 0.5rem;\n  }\n\n  .g-md-3,\n.gx-md-3 {\n    --bs-gutter-x: 1rem;\n  }\n\n  .g-md-3,\n.gy-md-3 {\n    --bs-gutter-y: 1rem;\n  }\n\n  .g-md-4,\n.gx-md-4 {\n    --bs-gutter-x: 1.5rem;\n  }\n\n  .g-md-4,\n.gy-md-4 {\n    --bs-gutter-y: 1.5rem;\n  }\n\n  .g-md-5,\n.gx-md-5 {\n    --bs-gutter-x: 3rem;\n  }\n\n  .g-md-5,\n.gy-md-5 {\n    --bs-gutter-y: 3rem;\n  }\n}\n@media (min-width: 992px) {\n  .col-lg {\n    flex: 1 0 0%;\n  }\n\n  .row-cols-lg-auto > * {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .row-cols-lg-1 > * {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .row-cols-lg-2 > * {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .row-cols-lg-3 > * {\n    flex: 0 0 auto;\n    width: 33.3333333333%;\n  }\n\n  .row-cols-lg-4 > * {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .row-cols-lg-5 > * {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n\n  .row-cols-lg-6 > * {\n    flex: 0 0 auto;\n    width: 16.6666666667%;\n  }\n\n  .col-lg-auto {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .col-lg-1 {\n    flex: 0 0 auto;\n    width: 8.33333333%;\n  }\n\n  .col-lg-2 {\n    flex: 0 0 auto;\n    width: 16.66666667%;\n  }\n\n  .col-lg-3 {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .col-lg-4 {\n    flex: 0 0 auto;\n    width: 33.33333333%;\n  }\n\n  .col-lg-5 {\n    flex: 0 0 auto;\n    width: 41.66666667%;\n  }\n\n  .col-lg-6 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .col-lg-7 {\n    flex: 0 0 auto;\n    width: 58.33333333%;\n  }\n\n  .col-lg-8 {\n    flex: 0 0 auto;\n    width: 66.66666667%;\n  }\n\n  .col-lg-9 {\n    flex: 0 0 auto;\n    width: 75%;\n  }\n\n  .col-lg-10 {\n    flex: 0 0 auto;\n    width: 83.33333333%;\n  }\n\n  .col-lg-11 {\n    flex: 0 0 auto;\n    width: 91.66666667%;\n  }\n\n  .col-lg-12 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .offset-lg-0 {\n    margin-left: 0;\n  }\n\n  .offset-lg-1 {\n    margin-left: 8.33333333%;\n  }\n\n  .offset-lg-2 {\n    margin-left: 16.66666667%;\n  }\n\n  .offset-lg-3 {\n    margin-left: 25%;\n  }\n\n  .offset-lg-4 {\n    margin-left: 33.33333333%;\n  }\n\n  .offset-lg-5 {\n    margin-left: 41.66666667%;\n  }\n\n  .offset-lg-6 {\n    margin-left: 50%;\n  }\n\n  .offset-lg-7 {\n    margin-left: 58.33333333%;\n  }\n\n  .offset-lg-8 {\n    margin-left: 66.66666667%;\n  }\n\n  .offset-lg-9 {\n    margin-left: 75%;\n  }\n\n  .offset-lg-10 {\n    margin-left: 83.33333333%;\n  }\n\n  .offset-lg-11 {\n    margin-left: 91.66666667%;\n  }\n\n  .g-lg-0,\n.gx-lg-0 {\n    --bs-gutter-x: 0;\n  }\n\n  .g-lg-0,\n.gy-lg-0 {\n    --bs-gutter-y: 0;\n  }\n\n  .g-lg-1,\n.gx-lg-1 {\n    --bs-gutter-x: 0.25rem;\n  }\n\n  .g-lg-1,\n.gy-lg-1 {\n    --bs-gutter-y: 0.25rem;\n  }\n\n  .g-lg-2,\n.gx-lg-2 {\n    --bs-gutter-x: 0.5rem;\n  }\n\n  .g-lg-2,\n.gy-lg-2 {\n    --bs-gutter-y: 0.5rem;\n  }\n\n  .g-lg-3,\n.gx-lg-3 {\n    --bs-gutter-x: 1rem;\n  }\n\n  .g-lg-3,\n.gy-lg-3 {\n    --bs-gutter-y: 1rem;\n  }\n\n  .g-lg-4,\n.gx-lg-4 {\n    --bs-gutter-x: 1.5rem;\n  }\n\n  .g-lg-4,\n.gy-lg-4 {\n    --bs-gutter-y: 1.5rem;\n  }\n\n  .g-lg-5,\n.gx-lg-5 {\n    --bs-gutter-x: 3rem;\n  }\n\n  .g-lg-5,\n.gy-lg-5 {\n    --bs-gutter-y: 3rem;\n  }\n}\n@media (min-width: 1200px) {\n  .col-xl {\n    flex: 1 0 0%;\n  }\n\n  .row-cols-xl-auto > * {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .row-cols-xl-1 > * {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .row-cols-xl-2 > * {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .row-cols-xl-3 > * {\n    flex: 0 0 auto;\n    width: 33.3333333333%;\n  }\n\n  .row-cols-xl-4 > * {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .row-cols-xl-5 > * {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n\n  .row-cols-xl-6 > * {\n    flex: 0 0 auto;\n    width: 16.6666666667%;\n  }\n\n  .col-xl-auto {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .col-xl-1 {\n    flex: 0 0 auto;\n    width: 8.33333333%;\n  }\n\n  .col-xl-2 {\n    flex: 0 0 auto;\n    width: 16.66666667%;\n  }\n\n  .col-xl-3 {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .col-xl-4 {\n    flex: 0 0 auto;\n    width: 33.33333333%;\n  }\n\n  .col-xl-5 {\n    flex: 0 0 auto;\n    width: 41.66666667%;\n  }\n\n  .col-xl-6 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .col-xl-7 {\n    flex: 0 0 auto;\n    width: 58.33333333%;\n  }\n\n  .col-xl-8 {\n    flex: 0 0 auto;\n    width: 66.66666667%;\n  }\n\n  .col-xl-9 {\n    flex: 0 0 auto;\n    width: 75%;\n  }\n\n  .col-xl-10 {\n    flex: 0 0 auto;\n    width: 83.33333333%;\n  }\n\n  .col-xl-11 {\n    flex: 0 0 auto;\n    width: 91.66666667%;\n  }\n\n  .col-xl-12 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .offset-xl-0 {\n    margin-left: 0;\n  }\n\n  .offset-xl-1 {\n    margin-left: 8.33333333%;\n  }\n\n  .offset-xl-2 {\n    margin-left: 16.66666667%;\n  }\n\n  .offset-xl-3 {\n    margin-left: 25%;\n  }\n\n  .offset-xl-4 {\n    margin-left: 33.33333333%;\n  }\n\n  .offset-xl-5 {\n    margin-left: 41.66666667%;\n  }\n\n  .offset-xl-6 {\n    margin-left: 50%;\n  }\n\n  .offset-xl-7 {\n    margin-left: 58.33333333%;\n  }\n\n  .offset-xl-8 {\n    margin-left: 66.66666667%;\n  }\n\n  .offset-xl-9 {\n    margin-left: 75%;\n  }\n\n  .offset-xl-10 {\n    margin-left: 83.33333333%;\n  }\n\n  .offset-xl-11 {\n    margin-left: 91.66666667%;\n  }\n\n  .g-xl-0,\n.gx-xl-0 {\n    --bs-gutter-x: 0;\n  }\n\n  .g-xl-0,\n.gy-xl-0 {\n    --bs-gutter-y: 0;\n  }\n\n  .g-xl-1,\n.gx-xl-1 {\n    --bs-gutter-x: 0.25rem;\n  }\n\n  .g-xl-1,\n.gy-xl-1 {\n    --bs-gutter-y: 0.25rem;\n  }\n\n  .g-xl-2,\n.gx-xl-2 {\n    --bs-gutter-x: 0.5rem;\n  }\n\n  .g-xl-2,\n.gy-xl-2 {\n    --bs-gutter-y: 0.5rem;\n  }\n\n  .g-xl-3,\n.gx-xl-3 {\n    --bs-gutter-x: 1rem;\n  }\n\n  .g-xl-3,\n.gy-xl-3 {\n    --bs-gutter-y: 1rem;\n  }\n\n  .g-xl-4,\n.gx-xl-4 {\n    --bs-gutter-x: 1.5rem;\n  }\n\n  .g-xl-4,\n.gy-xl-4 {\n    --bs-gutter-y: 1.5rem;\n  }\n\n  .g-xl-5,\n.gx-xl-5 {\n    --bs-gutter-x: 3rem;\n  }\n\n  .g-xl-5,\n.gy-xl-5 {\n    --bs-gutter-y: 3rem;\n  }\n}\n@media (min-width: 1400px) {\n  .col-xxl {\n    flex: 1 0 0%;\n  }\n\n  .row-cols-xxl-auto > * {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .row-cols-xxl-1 > * {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .row-cols-xxl-2 > * {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .row-cols-xxl-3 > * {\n    flex: 0 0 auto;\n    width: 33.3333333333%;\n  }\n\n  .row-cols-xxl-4 > * {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .row-cols-xxl-5 > * {\n    flex: 0 0 auto;\n    width: 20%;\n  }\n\n  .row-cols-xxl-6 > * {\n    flex: 0 0 auto;\n    width: 16.6666666667%;\n  }\n\n  .col-xxl-auto {\n    flex: 0 0 auto;\n    width: auto;\n  }\n\n  .col-xxl-1 {\n    flex: 0 0 auto;\n    width: 8.33333333%;\n  }\n\n  .col-xxl-2 {\n    flex: 0 0 auto;\n    width: 16.66666667%;\n  }\n\n  .col-xxl-3 {\n    flex: 0 0 auto;\n    width: 25%;\n  }\n\n  .col-xxl-4 {\n    flex: 0 0 auto;\n    width: 33.33333333%;\n  }\n\n  .col-xxl-5 {\n    flex: 0 0 auto;\n    width: 41.66666667%;\n  }\n\n  .col-xxl-6 {\n    flex: 0 0 auto;\n    width: 50%;\n  }\n\n  .col-xxl-7 {\n    flex: 0 0 auto;\n    width: 58.33333333%;\n  }\n\n  .col-xxl-8 {\n    flex: 0 0 auto;\n    width: 66.66666667%;\n  }\n\n  .col-xxl-9 {\n    flex: 0 0 auto;\n    width: 75%;\n  }\n\n  .col-xxl-10 {\n    flex: 0 0 auto;\n    width: 83.33333333%;\n  }\n\n  .col-xxl-11 {\n    flex: 0 0 auto;\n    width: 91.66666667%;\n  }\n\n  .col-xxl-12 {\n    flex: 0 0 auto;\n    width: 100%;\n  }\n\n  .offset-xxl-0 {\n    margin-left: 0;\n  }\n\n  .offset-xxl-1 {\n    margin-left: 8.33333333%;\n  }\n\n  .offset-xxl-2 {\n    margin-left: 16.66666667%;\n  }\n\n  .offset-xxl-3 {\n    margin-left: 25%;\n  }\n\n  .offset-xxl-4 {\n    margin-left: 33.33333333%;\n  }\n\n  .offset-xxl-5 {\n    margin-left: 41.66666667%;\n  }\n\n  .offset-xxl-6 {\n    margin-left: 50%;\n  }\n\n  .offset-xxl-7 {\n    margin-left: 58.33333333%;\n  }\n\n  .offset-xxl-8 {\n    margin-left: 66.66666667%;\n  }\n\n  .offset-xxl-9 {\n    margin-left: 75%;\n  }\n\n  .offset-xxl-10 {\n    margin-left: 83.33333333%;\n  }\n\n  .offset-xxl-11 {\n    margin-left: 91.66666667%;\n  }\n\n  .g-xxl-0,\n.gx-xxl-0 {\n    --bs-gutter-x: 0;\n  }\n\n  .g-xxl-0,\n.gy-xxl-0 {\n    --bs-gutter-y: 0;\n  }\n\n  .g-xxl-1,\n.gx-xxl-1 {\n    --bs-gutter-x: 0.25rem;\n  }\n\n  .g-xxl-1,\n.gy-xxl-1 {\n    --bs-gutter-y: 0.25rem;\n  }\n\n  .g-xxl-2,\n.gx-xxl-2 {\n    --bs-gutter-x: 0.5rem;\n  }\n\n  .g-xxl-2,\n.gy-xxl-2 {\n    --bs-gutter-y: 0.5rem;\n  }\n\n  .g-xxl-3,\n.gx-xxl-3 {\n    --bs-gutter-x: 1rem;\n  }\n\n  .g-xxl-3,\n.gy-xxl-3 {\n    --bs-gutter-y: 1rem;\n  }\n\n  .g-xxl-4,\n.gx-xxl-4 {\n    --bs-gutter-x: 1.5rem;\n  }\n\n  .g-xxl-4,\n.gy-xxl-4 {\n    --bs-gutter-y: 1.5rem;\n  }\n\n  .g-xxl-5,\n.gx-xxl-5 {\n    --bs-gutter-x: 3rem;\n  }\n\n  .g-xxl-5,\n.gy-xxl-5 {\n    --bs-gutter-y: 3rem;\n  }\n}\n.table {\n  --bs-table-bg: transparent;\n  --bs-table-accent-bg: transparent;\n  --bs-table-striped-color: #212529;\n  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);\n  --bs-table-active-color: #212529;\n  --bs-table-active-bg: rgba(0, 0, 0, 0.1);\n  --bs-table-hover-color: #212529;\n  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);\n  width: 100%;\n  margin-bottom: 1rem;\n  color: #212529;\n  vertical-align: top;\n  border-color: #dee2e6;\n}\n.table > :not(caption) > * > * {\n  padding: 0.5rem 0.5rem;\n  background-color: var(--bs-table-bg);\n  border-bottom-width: 1px;\n  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);\n}\n.table > tbody {\n  vertical-align: inherit;\n}\n.table > thead {\n  vertical-align: bottom;\n}\n.table > :not(:first-child) {\n  border-top: 2px solid currentColor;\n}\n\n.caption-top {\n  caption-side: top;\n}\n\n.table-sm > :not(caption) > * > * {\n  padding: 0.25rem 0.25rem;\n}\n\n.table-bordered > :not(caption) > * {\n  border-width: 1px 0;\n}\n.table-bordered > :not(caption) > * > * {\n  border-width: 0 1px;\n}\n\n.table-borderless > :not(caption) > * > * {\n  border-bottom-width: 0;\n}\n.table-borderless > :not(:first-child) {\n  border-top-width: 0;\n}\n\n.table-striped > tbody > tr:nth-of-type(odd) > * {\n  --bs-table-accent-bg: var(--bs-table-striped-bg);\n  color: var(--bs-table-striped-color);\n}\n\n.table-active {\n  --bs-table-accent-bg: var(--bs-table-active-bg);\n  color: var(--bs-table-active-color);\n}\n\n.table-hover > tbody > tr:hover > * {\n  --bs-table-accent-bg: var(--bs-table-hover-bg);\n  color: var(--bs-table-hover-color);\n}\n\n.table-primary {\n  --bs-table-bg: #cfe2ff;\n  --bs-table-striped-bg: #c5d7f2;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #bacbe6;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #bfd1ec;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #bacbe6;\n}\n\n.table-secondary {\n  --bs-table-bg: #e2e3e5;\n  --bs-table-striped-bg: #d7d8da;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #cbccce;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #d1d2d4;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #cbccce;\n}\n\n.table-success {\n  --bs-table-bg: #d1e7dd;\n  --bs-table-striped-bg: #c7dbd2;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #bcd0c7;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #c1d6cc;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #bcd0c7;\n}\n\n.table-info {\n  --bs-table-bg: #cff4fc;\n  --bs-table-striped-bg: #c5e8ef;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #badce3;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #bfe2e9;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #badce3;\n}\n\n.table-warning {\n  --bs-table-bg: #fff3cd;\n  --bs-table-striped-bg: #f2e7c3;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #e6dbb9;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #ece1be;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #e6dbb9;\n}\n\n.table-danger {\n  --bs-table-bg: #f8d7da;\n  --bs-table-striped-bg: #eccccf;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #dfc2c4;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #e5c7ca;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #dfc2c4;\n}\n\n.table-light {\n  --bs-table-bg: #f8f9fa;\n  --bs-table-striped-bg: #ecedee;\n  --bs-table-striped-color: #000;\n  --bs-table-active-bg: #dfe0e1;\n  --bs-table-active-color: #000;\n  --bs-table-hover-bg: #e5e6e7;\n  --bs-table-hover-color: #000;\n  color: #000;\n  border-color: #dfe0e1;\n}\n\n.table-dark {\n  --bs-table-bg: #212529;\n  --bs-table-striped-bg: #2c3034;\n  --bs-table-striped-color: #fff;\n  --bs-table-active-bg: #373b3e;\n  --bs-table-active-color: #fff;\n  --bs-table-hover-bg: #323539;\n  --bs-table-hover-color: #fff;\n  color: #fff;\n  border-color: #373b3e;\n}\n\n.table-responsive {\n  overflow-x: auto;\n  -webkit-overflow-scrolling: touch;\n}\n\n@media (max-width: 575.98px) {\n  .table-responsive-sm {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n@media (max-width: 767.98px) {\n  .table-responsive-md {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n@media (max-width: 991.98px) {\n  .table-responsive-lg {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n@media (max-width: 1199.98px) {\n  .table-responsive-xl {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n@media (max-width: 1399.98px) {\n  .table-responsive-xxl {\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n  }\n}\n.form-label {\n  margin-bottom: 0.5rem;\n}\n\n.col-form-label {\n  padding-top: calc(0.375rem + 1px);\n  padding-bottom: calc(0.375rem + 1px);\n  margin-bottom: 0;\n  font-size: inherit;\n  line-height: 1.5;\n}\n\n.col-form-label-lg {\n  padding-top: calc(0.5rem + 1px);\n  padding-bottom: calc(0.5rem + 1px);\n  font-size: 1.25rem;\n}\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem + 1px);\n  padding-bottom: calc(0.25rem + 1px);\n  font-size: 0.875rem;\n}\n\n.form-text {\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #6c757d;\n}\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid #ced4da;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-control {\n    transition: none;\n  }\n}\n.form-control[type=file] {\n  overflow: hidden;\n}\n.form-control[type=file]:not(:disabled):not([readonly]) {\n  cursor: pointer;\n}\n.form-control:focus {\n  color: #212529;\n  background-color: #fff;\n  border-color: #86b7fe;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-control::-webkit-date-and-time-value {\n  height: 1.5em;\n}\n.form-control::-moz-placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n.form-control::placeholder {\n  color: #6c757d;\n  opacity: 1;\n}\n.form-control:disabled, .form-control[readonly] {\n  background-color: #e9ecef;\n  opacity: 1;\n}\n.form-control::-webkit-file-upload-button {\n  padding: 0.375rem 0.75rem;\n  margin: -0.375rem -0.75rem;\n  -webkit-margin-end: 0.75rem;\n  margin-inline-end: 0.75rem;\n  color: #212529;\n  background-color: #e9ecef;\n  pointer-events: none;\n  border-color: inherit;\n  border-style: solid;\n  border-width: 0;\n  border-inline-end-width: 1px;\n  border-radius: 0;\n  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n.form-control::file-selector-button {\n  padding: 0.375rem 0.75rem;\n  margin: -0.375rem -0.75rem;\n  -webkit-margin-end: 0.75rem;\n  margin-inline-end: 0.75rem;\n  color: #212529;\n  background-color: #e9ecef;\n  pointer-events: none;\n  border-color: inherit;\n  border-style: solid;\n  border-width: 0;\n  border-inline-end-width: 1px;\n  border-radius: 0;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-control::-webkit-file-upload-button {\n    -webkit-transition: none;\n    transition: none;\n  }\n  .form-control::file-selector-button {\n    transition: none;\n  }\n}\n.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {\n  background-color: #dde0e3;\n}\n.form-control:hover:not(:disabled):not([readonly])::file-selector-button {\n  background-color: #dde0e3;\n}\n.form-control::-webkit-file-upload-button {\n  padding: 0.375rem 0.75rem;\n  margin: -0.375rem -0.75rem;\n  -webkit-margin-end: 0.75rem;\n  margin-inline-end: 0.75rem;\n  color: #212529;\n  background-color: #e9ecef;\n  pointer-events: none;\n  border-color: inherit;\n  border-style: solid;\n  border-width: 0;\n  border-inline-end-width: 1px;\n  border-radius: 0;\n  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-control::-webkit-file-upload-button {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.form-control:hover:not(:disabled):not([readonly])::-webkit-file-upload-button {\n  background-color: #dde0e3;\n}\n\n.form-control-plaintext {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0;\n  margin-bottom: 0;\n  line-height: 1.5;\n  color: #212529;\n  background-color: transparent;\n  border: solid transparent;\n  border-width: 1px 0;\n}\n.form-control-plaintext.form-control-sm, .form-control-plaintext.form-control-lg {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.form-control-sm {\n  min-height: calc(1.5em + 0.5rem + 2px);\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n.form-control-sm::-webkit-file-upload-button {\n  padding: 0.25rem 0.5rem;\n  margin: -0.25rem -0.5rem;\n  -webkit-margin-end: 0.5rem;\n  margin-inline-end: 0.5rem;\n}\n.form-control-sm::file-selector-button {\n  padding: 0.25rem 0.5rem;\n  margin: -0.25rem -0.5rem;\n  -webkit-margin-end: 0.5rem;\n  margin-inline-end: 0.5rem;\n}\n.form-control-sm::-webkit-file-upload-button {\n  padding: 0.25rem 0.5rem;\n  margin: -0.25rem -0.5rem;\n  -webkit-margin-end: 0.5rem;\n  margin-inline-end: 0.5rem;\n}\n\n.form-control-lg {\n  min-height: calc(1.5em + 1rem + 2px);\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n.form-control-lg::-webkit-file-upload-button {\n  padding: 0.5rem 1rem;\n  margin: -0.5rem -1rem;\n  -webkit-margin-end: 1rem;\n  margin-inline-end: 1rem;\n}\n.form-control-lg::file-selector-button {\n  padding: 0.5rem 1rem;\n  margin: -0.5rem -1rem;\n  -webkit-margin-end: 1rem;\n  margin-inline-end: 1rem;\n}\n.form-control-lg::-webkit-file-upload-button {\n  padding: 0.5rem 1rem;\n  margin: -0.5rem -1rem;\n  -webkit-margin-end: 1rem;\n  margin-inline-end: 1rem;\n}\n\ntextarea.form-control {\n  min-height: calc(1.5em + 0.75rem + 2px);\n}\ntextarea.form-control-sm {\n  min-height: calc(1.5em + 0.5rem + 2px);\n}\ntextarea.form-control-lg {\n  min-height: calc(1.5em + 1rem + 2px);\n}\n\n.form-control-color {\n  width: 3rem;\n  height: auto;\n  padding: 0.375rem;\n}\n.form-control-color:not(:disabled):not([readonly]) {\n  cursor: pointer;\n}\n.form-control-color::-moz-color-swatch {\n  height: 1.5em;\n  border-radius: 0.25rem;\n}\n.form-control-color::-webkit-color-swatch {\n  height: 1.5em;\n  border-radius: 0.25rem;\n}\n\n.form-select {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 2.25rem 0.375rem 0.75rem;\n  -moz-padding-start: calc(0.75rem - 3px);\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  background-color: #fff;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right 0.75rem center;\n  background-size: 16px 12px;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-select {\n    transition: none;\n  }\n}\n.form-select:focus {\n  border-color: #86b7fe;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-select[multiple], .form-select[size]:not([size=\"1\"]) {\n  padding-right: 0.75rem;\n  background-image: none;\n}\n.form-select:disabled {\n  background-color: #e9ecef;\n}\n.form-select:-moz-focusring {\n  color: transparent;\n  text-shadow: 0 0 0 #212529;\n}\n\n.form-select-sm {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  padding-left: 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n\n.form-select-lg {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n\n.form-check {\n  display: block;\n  min-height: 1.5rem;\n  padding-left: 1.5em;\n  margin-bottom: 0.125rem;\n}\n.form-check .form-check-input {\n  float: left;\n  margin-left: -1.5em;\n}\n\n.form-check-input {\n  width: 1em;\n  height: 1em;\n  margin-top: 0.25em;\n  vertical-align: top;\n  background-color: #fff;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: contain;\n  border: 1px solid rgba(0, 0, 0, 0.25);\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  -webkit-print-color-adjust: exact;\n  color-adjust: exact;\n}\n.form-check-input[type=checkbox] {\n  border-radius: 0.25em;\n}\n.form-check-input[type=radio] {\n  border-radius: 50%;\n}\n.form-check-input:active {\n  filter: brightness(90%);\n}\n.form-check-input:focus {\n  border-color: #86b7fe;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-check-input:checked {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.form-check-input:checked[type=checkbox] {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e\");\n}\n.form-check-input:checked[type=radio] {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e\");\n}\n.form-check-input[type=checkbox]:indeterminate {\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e\");\n}\n.form-check-input:disabled {\n  pointer-events: none;\n  filter: none;\n  opacity: 0.5;\n}\n.form-check-input[disabled] ~ .form-check-label, .form-check-input:disabled ~ .form-check-label {\n  opacity: 0.5;\n}\n\n.form-switch {\n  padding-left: 2.5em;\n}\n.form-switch .form-check-input {\n  width: 2em;\n  margin-left: -2.5em;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e\");\n  background-position: left center;\n  border-radius: 2em;\n  transition: background-position 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-switch .form-check-input {\n    transition: none;\n  }\n}\n.form-switch .form-check-input:focus {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%2386b7fe'/%3e%3c/svg%3e\");\n}\n.form-switch .form-check-input:checked {\n  background-position: right center;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\");\n}\n\n.form-check-inline {\n  display: inline-block;\n  margin-right: 1rem;\n}\n\n.btn-check {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n.btn-check[disabled] + .btn, .btn-check:disabled + .btn {\n  pointer-events: none;\n  filter: none;\n  opacity: 0.65;\n}\n\n.form-range {\n  width: 100%;\n  height: 1.5rem;\n  padding: 0;\n  background-color: transparent;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.form-range:focus {\n  outline: 0;\n}\n.form-range:focus::-webkit-slider-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-range:focus::-moz-range-thumb {\n  box-shadow: 0 0 0 1px #fff, 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.form-range::-moz-focus-outer {\n  border: 0;\n}\n.form-range::-webkit-slider-thumb {\n  width: 1rem;\n  height: 1rem;\n  margin-top: -0.25rem;\n  background-color: #0d6efd;\n  border: 0;\n  border-radius: 1rem;\n  -webkit-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -webkit-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-range::-webkit-slider-thumb {\n    -webkit-transition: none;\n    transition: none;\n  }\n}\n.form-range::-webkit-slider-thumb:active {\n  background-color: #b6d4fe;\n}\n.form-range::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: #dee2e6;\n  border-color: transparent;\n  border-radius: 1rem;\n}\n.form-range::-moz-range-thumb {\n  width: 1rem;\n  height: 1rem;\n  background-color: #0d6efd;\n  border: 0;\n  border-radius: 1rem;\n  -moz-transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  -moz-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-range::-moz-range-thumb {\n    -moz-transition: none;\n    transition: none;\n  }\n}\n.form-range::-moz-range-thumb:active {\n  background-color: #b6d4fe;\n}\n.form-range::-moz-range-track {\n  width: 100%;\n  height: 0.5rem;\n  color: transparent;\n  cursor: pointer;\n  background-color: #dee2e6;\n  border-color: transparent;\n  border-radius: 1rem;\n}\n.form-range:disabled {\n  pointer-events: none;\n}\n.form-range:disabled::-webkit-slider-thumb {\n  background-color: #adb5bd;\n}\n.form-range:disabled::-moz-range-thumb {\n  background-color: #adb5bd;\n}\n\n.form-floating {\n  position: relative;\n}\n.form-floating > .form-control,\n.form-floating > .form-select {\n  height: calc(3.5rem + 2px);\n  line-height: 1.25;\n}\n.form-floating > label {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  padding: 1rem 0.75rem;\n  pointer-events: none;\n  border: 1px solid transparent;\n  transform-origin: 0 0;\n  transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .form-floating > label {\n    transition: none;\n  }\n}\n.form-floating > .form-control {\n  padding: 1rem 0.75rem;\n}\n.form-floating > .form-control::-moz-placeholder {\n  color: transparent;\n}\n.form-floating > .form-control::placeholder {\n  color: transparent;\n}\n.form-floating > .form-control:not(:-moz-placeholder-shown) {\n  padding-top: 1.625rem;\n  padding-bottom: 0.625rem;\n}\n.form-floating > .form-control:focus, .form-floating > .form-control:not(:placeholder-shown) {\n  padding-top: 1.625rem;\n  padding-bottom: 0.625rem;\n}\n.form-floating > .form-control:-webkit-autofill {\n  padding-top: 1.625rem;\n  padding-bottom: 0.625rem;\n}\n.form-floating > .form-select {\n  padding-top: 1.625rem;\n  padding-bottom: 0.625rem;\n}\n.form-floating > .form-control:not(:-moz-placeholder-shown) ~ label {\n  opacity: 0.65;\n  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);\n}\n.form-floating > .form-control:focus ~ label,\n.form-floating > .form-control:not(:placeholder-shown) ~ label,\n.form-floating > .form-select ~ label {\n  opacity: 0.65;\n  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);\n}\n.form-floating > .form-control:-webkit-autofill ~ label {\n  opacity: 0.65;\n  transform: scale(0.85) translateY(-0.5rem) translateX(0.15rem);\n}\n\n.input-group {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: stretch;\n  width: 100%;\n}\n.input-group > .form-control,\n.input-group > .form-select {\n  position: relative;\n  flex: 1 1 auto;\n  width: 1%;\n  min-width: 0;\n}\n.input-group > .form-control:focus,\n.input-group > .form-select:focus {\n  z-index: 3;\n}\n.input-group .btn {\n  position: relative;\n  z-index: 2;\n}\n.input-group .btn:focus {\n  z-index: 3;\n}\n\n.input-group-text {\n  display: flex;\n  align-items: center;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #e9ecef;\n  border: 1px solid #ced4da;\n  border-radius: 0.25rem;\n}\n\n.input-group-lg > .form-control,\n.input-group-lg > .form-select,\n.input-group-lg > .input-group-text,\n.input-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n\n.input-group-sm > .form-control,\n.input-group-sm > .form-select,\n.input-group-sm > .input-group-text,\n.input-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n\n.input-group-lg > .form-select,\n.input-group-sm > .form-select {\n  padding-right: 3rem;\n}\n\n.input-group:not(.has-validation) > :not(:last-child):not(.dropdown-toggle):not(.dropdown-menu),\n.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.input-group.has-validation > :nth-last-child(n+3):not(.dropdown-toggle):not(.dropdown-menu),\n.input-group.has-validation > .dropdown-toggle:nth-last-child(n+4) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.input-group > :not(:first-child):not(.dropdown-menu):not(.valid-tooltip):not(.valid-feedback):not(.invalid-tooltip):not(.invalid-feedback) {\n  margin-left: -1px;\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.valid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #198754;\n}\n\n.valid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: 0.1rem;\n  font-size: 0.875rem;\n  color: #fff;\n  background-color: rgba(25, 135, 84, 0.9);\n  border-radius: 0.25rem;\n}\n\n.was-validated :valid ~ .valid-feedback,\n.was-validated :valid ~ .valid-tooltip,\n.is-valid ~ .valid-feedback,\n.is-valid ~ .valid-tooltip {\n  display: block;\n}\n\n.was-validated .form-control:valid, .form-control.is-valid {\n  border-color: #198754;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .form-control:valid:focus, .form-control.is-valid:focus {\n  border-color: #198754;\n  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);\n}\n\n.was-validated textarea.form-control:valid, textarea.form-control.is-valid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);\n}\n\n.was-validated .form-select:valid, .form-select.is-valid {\n  border-color: #198754;\n}\n.was-validated .form-select:valid:not([multiple]):not([size]), .was-validated .form-select:valid:not([multiple])[size=\"1\"], .form-select.is-valid:not([multiple]):not([size]), .form-select.is-valid:not([multiple])[size=\"1\"] {\n  padding-right: 4.125rem;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\"), url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e\");\n  background-position: right 0.75rem center, center right 2.25rem;\n  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .form-select:valid:focus, .form-select.is-valid:focus {\n  border-color: #198754;\n  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);\n}\n\n.was-validated .form-check-input:valid, .form-check-input.is-valid {\n  border-color: #198754;\n}\n.was-validated .form-check-input:valid:checked, .form-check-input.is-valid:checked {\n  background-color: #198754;\n}\n.was-validated .form-check-input:valid:focus, .form-check-input.is-valid:focus {\n  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);\n}\n.was-validated .form-check-input:valid ~ .form-check-label, .form-check-input.is-valid ~ .form-check-label {\n  color: #198754;\n}\n\n.form-check-inline .form-check-input ~ .valid-feedback {\n  margin-left: 0.5em;\n}\n\n.was-validated .input-group .form-control:valid, .input-group .form-control.is-valid,\n.was-validated .input-group .form-select:valid,\n.input-group .form-select.is-valid {\n  z-index: 1;\n}\n.was-validated .input-group .form-control:valid:focus, .input-group .form-control.is-valid:focus,\n.was-validated .input-group .form-select:valid:focus,\n.input-group .form-select.is-valid:focus {\n  z-index: 3;\n}\n\n.invalid-feedback {\n  display: none;\n  width: 100%;\n  margin-top: 0.25rem;\n  font-size: 0.875em;\n  color: #dc3545;\n}\n\n.invalid-tooltip {\n  position: absolute;\n  top: 100%;\n  z-index: 5;\n  display: none;\n  max-width: 100%;\n  padding: 0.25rem 0.5rem;\n  margin-top: 0.1rem;\n  font-size: 0.875rem;\n  color: #fff;\n  background-color: rgba(220, 53, 69, 0.9);\n  border-radius: 0.25rem;\n}\n\n.was-validated :invalid ~ .invalid-feedback,\n.was-validated :invalid ~ .invalid-tooltip,\n.is-invalid ~ .invalid-feedback,\n.is-invalid ~ .invalid-tooltip {\n  display: block;\n}\n\n.was-validated .form-control:invalid, .form-control.is-invalid {\n  border-color: #dc3545;\n  padding-right: calc(1.5em + 0.75rem);\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-position: right calc(0.375em + 0.1875rem) center;\n  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .form-control:invalid:focus, .form-control.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n\n.was-validated textarea.form-control:invalid, textarea.form-control.is-invalid {\n  padding-right: calc(1.5em + 0.75rem);\n  background-position: top calc(0.375em + 0.1875rem) right calc(0.375em + 0.1875rem);\n}\n\n.was-validated .form-select:invalid, .form-select.is-invalid {\n  border-color: #dc3545;\n}\n.was-validated .form-select:invalid:not([multiple]):not([size]), .was-validated .form-select:invalid:not([multiple])[size=\"1\"], .form-select.is-invalid:not([multiple]):not([size]), .form-select.is-invalid:not([multiple])[size=\"1\"] {\n  padding-right: 4.125rem;\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e\"), url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e\");\n  background-position: right 0.75rem center, center right 2.25rem;\n  background-size: 16px 12px, calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);\n}\n.was-validated .form-select:invalid:focus, .form-select.is-invalid:focus {\n  border-color: #dc3545;\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n\n.was-validated .form-check-input:invalid, .form-check-input.is-invalid {\n  border-color: #dc3545;\n}\n.was-validated .form-check-input:invalid:checked, .form-check-input.is-invalid:checked {\n  background-color: #dc3545;\n}\n.was-validated .form-check-input:invalid:focus, .form-check-input.is-invalid:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25);\n}\n.was-validated .form-check-input:invalid ~ .form-check-label, .form-check-input.is-invalid ~ .form-check-label {\n  color: #dc3545;\n}\n\n.form-check-inline .form-check-input ~ .invalid-feedback {\n  margin-left: 0.5em;\n}\n\n.was-validated .input-group .form-control:invalid, .input-group .form-control.is-invalid,\n.was-validated .input-group .form-select:invalid,\n.input-group .form-select.is-invalid {\n  z-index: 2;\n}\n.was-validated .input-group .form-control:invalid:focus, .input-group .form-control.is-invalid:focus,\n.was-validated .input-group .form-select:invalid:focus,\n.input-group .form-select.is-invalid:focus {\n  z-index: 3;\n}\n\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  line-height: 1.5;\n  color: #212529;\n  text-align: center;\n  text-decoration: none;\n  vertical-align: middle;\n  cursor: pointer;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  background-color: transparent;\n  border: 1px solid transparent;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .btn {\n    transition: none;\n  }\n}\n.btn:hover {\n  color: #212529;\n}\n.btn-check:focus + .btn, .btn:focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n.btn:disabled, .btn.disabled, fieldset:disabled .btn {\n  pointer-events: none;\n  opacity: 0.65;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-primary:hover {\n  color: #fff;\n  background-color: #0b5ed7;\n  border-color: #0a58ca;\n}\n.btn-check:focus + .btn-primary, .btn-primary:focus {\n  color: #fff;\n  background-color: #0b5ed7;\n  border-color: #0a58ca;\n  box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);\n}\n.btn-check:checked + .btn-primary, .btn-check:active + .btn-primary, .btn-primary:active, .btn-primary.active, .show > .btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #0a58ca;\n  border-color: #0a53be;\n}\n.btn-check:checked + .btn-primary:focus, .btn-check:active + .btn-primary:focus, .btn-primary:active:focus, .btn-primary.active:focus, .show > .btn-primary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(49, 132, 253, 0.5);\n}\n.btn-primary:disabled, .btn-primary.disabled {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n\n.btn-secondary {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-secondary:hover {\n  color: #fff;\n  background-color: #5c636a;\n  border-color: #565e64;\n}\n.btn-check:focus + .btn-secondary, .btn-secondary:focus {\n  color: #fff;\n  background-color: #5c636a;\n  border-color: #565e64;\n  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);\n}\n.btn-check:checked + .btn-secondary, .btn-check:active + .btn-secondary, .btn-secondary:active, .btn-secondary.active, .show > .btn-secondary.dropdown-toggle {\n  color: #fff;\n  background-color: #565e64;\n  border-color: #51585e;\n}\n.btn-check:checked + .btn-secondary:focus, .btn-check:active + .btn-secondary:focus, .btn-secondary:active:focus, .btn-secondary.active:focus, .show > .btn-secondary.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(130, 138, 145, 0.5);\n}\n.btn-secondary:disabled, .btn-secondary.disabled {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n\n.btn-success {\n  color: #fff;\n  background-color: #198754;\n  border-color: #198754;\n}\n.btn-success:hover {\n  color: #fff;\n  background-color: #157347;\n  border-color: #146c43;\n}\n.btn-check:focus + .btn-success, .btn-success:focus {\n  color: #fff;\n  background-color: #157347;\n  border-color: #146c43;\n  box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);\n}\n.btn-check:checked + .btn-success, .btn-check:active + .btn-success, .btn-success:active, .btn-success.active, .show > .btn-success.dropdown-toggle {\n  color: #fff;\n  background-color: #146c43;\n  border-color: #13653f;\n}\n.btn-check:checked + .btn-success:focus, .btn-check:active + .btn-success:focus, .btn-success:active:focus, .btn-success.active:focus, .show > .btn-success.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(60, 153, 110, 0.5);\n}\n.btn-success:disabled, .btn-success.disabled {\n  color: #fff;\n  background-color: #198754;\n  border-color: #198754;\n}\n\n.btn-info {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn-info:hover {\n  color: #000;\n  background-color: #31d2f2;\n  border-color: #25cff2;\n}\n.btn-check:focus + .btn-info, .btn-info:focus {\n  color: #000;\n  background-color: #31d2f2;\n  border-color: #25cff2;\n  box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);\n}\n.btn-check:checked + .btn-info, .btn-check:active + .btn-info, .btn-info:active, .btn-info.active, .show > .btn-info.dropdown-toggle {\n  color: #000;\n  background-color: #3dd5f3;\n  border-color: #25cff2;\n}\n.btn-check:checked + .btn-info:focus, .btn-check:active + .btn-info:focus, .btn-info:active:focus, .btn-info.active:focus, .show > .btn-info.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(11, 172, 204, 0.5);\n}\n.btn-info:disabled, .btn-info.disabled {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n\n.btn-warning {\n  color: #000;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.btn-warning:hover {\n  color: #000;\n  background-color: #ffca2c;\n  border-color: #ffc720;\n}\n.btn-check:focus + .btn-warning, .btn-warning:focus {\n  color: #000;\n  background-color: #ffca2c;\n  border-color: #ffc720;\n  box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);\n}\n.btn-check:checked + .btn-warning, .btn-check:active + .btn-warning, .btn-warning:active, .btn-warning.active, .show > .btn-warning.dropdown-toggle {\n  color: #000;\n  background-color: #ffcd39;\n  border-color: #ffc720;\n}\n.btn-check:checked + .btn-warning:focus, .btn-check:active + .btn-warning:focus, .btn-warning:active:focus, .btn-warning.active:focus, .show > .btn-warning.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(217, 164, 6, 0.5);\n}\n.btn-warning:disabled, .btn-warning.disabled {\n  color: #000;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n\n.btn-danger {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-danger:hover {\n  color: #fff;\n  background-color: #bb2d3b;\n  border-color: #b02a37;\n}\n.btn-check:focus + .btn-danger, .btn-danger:focus {\n  color: #fff;\n  background-color: #bb2d3b;\n  border-color: #b02a37;\n  box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);\n}\n.btn-check:checked + .btn-danger, .btn-check:active + .btn-danger, .btn-danger:active, .btn-danger.active, .show > .btn-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #b02a37;\n  border-color: #a52834;\n}\n.btn-check:checked + .btn-danger:focus, .btn-check:active + .btn-danger:focus, .btn-danger:active:focus, .btn-danger.active:focus, .show > .btn-danger.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(225, 83, 97, 0.5);\n}\n.btn-danger:disabled, .btn-danger.disabled {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n\n.btn-light {\n  color: #000;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-light:hover {\n  color: #000;\n  background-color: #f9fafb;\n  border-color: #f9fafb;\n}\n.btn-check:focus + .btn-light, .btn-light:focus {\n  color: #000;\n  background-color: #f9fafb;\n  border-color: #f9fafb;\n  box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);\n}\n.btn-check:checked + .btn-light, .btn-check:active + .btn-light, .btn-light:active, .btn-light.active, .show > .btn-light.dropdown-toggle {\n  color: #000;\n  background-color: #f9fafb;\n  border-color: #f9fafb;\n}\n.btn-check:checked + .btn-light:focus, .btn-check:active + .btn-light:focus, .btn-light:active:focus, .btn-light.active:focus, .show > .btn-light.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(211, 212, 213, 0.5);\n}\n.btn-light:disabled, .btn-light.disabled {\n  color: #000;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n\n.btn-dark {\n  color: #fff;\n  background-color: #212529;\n  border-color: #212529;\n}\n.btn-dark:hover {\n  color: #fff;\n  background-color: #1c1f23;\n  border-color: #1a1e21;\n}\n.btn-check:focus + .btn-dark, .btn-dark:focus {\n  color: #fff;\n  background-color: #1c1f23;\n  border-color: #1a1e21;\n  box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);\n}\n.btn-check:checked + .btn-dark, .btn-check:active + .btn-dark, .btn-dark:active, .btn-dark.active, .show > .btn-dark.dropdown-toggle {\n  color: #fff;\n  background-color: #1a1e21;\n  border-color: #191c1f;\n}\n.btn-check:checked + .btn-dark:focus, .btn-check:active + .btn-dark:focus, .btn-dark:active:focus, .btn-dark.active:focus, .show > .btn-dark.dropdown-toggle:focus {\n  box-shadow: 0 0 0 0.25rem rgba(66, 70, 73, 0.5);\n}\n.btn-dark:disabled, .btn-dark.disabled {\n  color: #fff;\n  background-color: #212529;\n  border-color: #212529;\n}\n\n.btn-outline-primary {\n  color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-outline-primary:hover {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-check:focus + .btn-outline-primary, .btn-outline-primary:focus {\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);\n}\n.btn-check:checked + .btn-outline-primary, .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show {\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.btn-check:checked + .btn-outline-primary:focus, .btn-check:active + .btn-outline-primary:focus, .btn-outline-primary:active:focus, .btn-outline-primary.active:focus, .btn-outline-primary.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.5);\n}\n.btn-outline-primary:disabled, .btn-outline-primary.disabled {\n  color: #0d6efd;\n  background-color: transparent;\n}\n\n.btn-outline-secondary {\n  color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-outline-secondary:hover {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-check:focus + .btn-outline-secondary, .btn-outline-secondary:focus {\n  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);\n}\n.btn-check:checked + .btn-outline-secondary, .btn-check:active + .btn-outline-secondary, .btn-outline-secondary:active, .btn-outline-secondary.active, .btn-outline-secondary.dropdown-toggle.show {\n  color: #fff;\n  background-color: #6c757d;\n  border-color: #6c757d;\n}\n.btn-check:checked + .btn-outline-secondary:focus, .btn-check:active + .btn-outline-secondary:focus, .btn-outline-secondary:active:focus, .btn-outline-secondary.active:focus, .btn-outline-secondary.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.5);\n}\n.btn-outline-secondary:disabled, .btn-outline-secondary.disabled {\n  color: #6c757d;\n  background-color: transparent;\n}\n\n.btn-outline-success {\n  color: #198754;\n  border-color: #198754;\n}\n.btn-outline-success:hover {\n  color: #fff;\n  background-color: #198754;\n  border-color: #198754;\n}\n.btn-check:focus + .btn-outline-success, .btn-outline-success:focus {\n  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);\n}\n.btn-check:checked + .btn-outline-success, .btn-check:active + .btn-outline-success, .btn-outline-success:active, .btn-outline-success.active, .btn-outline-success.dropdown-toggle.show {\n  color: #fff;\n  background-color: #198754;\n  border-color: #198754;\n}\n.btn-check:checked + .btn-outline-success:focus, .btn-check:active + .btn-outline-success:focus, .btn-outline-success:active:focus, .btn-outline-success.active:focus, .btn-outline-success.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.5);\n}\n.btn-outline-success:disabled, .btn-outline-success.disabled {\n  color: #198754;\n  background-color: transparent;\n}\n\n.btn-outline-info {\n  color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn-outline-info:hover {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn-check:focus + .btn-outline-info, .btn-outline-info:focus {\n  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);\n}\n.btn-check:checked + .btn-outline-info, .btn-check:active + .btn-outline-info, .btn-outline-info:active, .btn-outline-info.active, .btn-outline-info.dropdown-toggle.show {\n  color: #000;\n  background-color: #0dcaf0;\n  border-color: #0dcaf0;\n}\n.btn-check:checked + .btn-outline-info:focus, .btn-check:active + .btn-outline-info:focus, .btn-outline-info:active:focus, .btn-outline-info.active:focus, .btn-outline-info.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(13, 202, 240, 0.5);\n}\n.btn-outline-info:disabled, .btn-outline-info.disabled {\n  color: #0dcaf0;\n  background-color: transparent;\n}\n\n.btn-outline-warning {\n  color: #ffc107;\n  border-color: #ffc107;\n}\n.btn-outline-warning:hover {\n  color: #000;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.btn-check:focus + .btn-outline-warning, .btn-outline-warning:focus {\n  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);\n}\n.btn-check:checked + .btn-outline-warning, .btn-check:active + .btn-outline-warning, .btn-outline-warning:active, .btn-outline-warning.active, .btn-outline-warning.dropdown-toggle.show {\n  color: #000;\n  background-color: #ffc107;\n  border-color: #ffc107;\n}\n.btn-check:checked + .btn-outline-warning:focus, .btn-check:active + .btn-outline-warning:focus, .btn-outline-warning:active:focus, .btn-outline-warning.active:focus, .btn-outline-warning.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(255, 193, 7, 0.5);\n}\n.btn-outline-warning:disabled, .btn-outline-warning.disabled {\n  color: #ffc107;\n  background-color: transparent;\n}\n\n.btn-outline-danger {\n  color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-outline-danger:hover {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-check:focus + .btn-outline-danger, .btn-outline-danger:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);\n}\n.btn-check:checked + .btn-outline-danger, .btn-check:active + .btn-outline-danger, .btn-outline-danger:active, .btn-outline-danger.active, .btn-outline-danger.dropdown-toggle.show {\n  color: #fff;\n  background-color: #dc3545;\n  border-color: #dc3545;\n}\n.btn-check:checked + .btn-outline-danger:focus, .btn-check:active + .btn-outline-danger:focus, .btn-outline-danger:active:focus, .btn-outline-danger.active:focus, .btn-outline-danger.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.5);\n}\n.btn-outline-danger:disabled, .btn-outline-danger.disabled {\n  color: #dc3545;\n  background-color: transparent;\n}\n\n.btn-outline-light {\n  color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-outline-light:hover {\n  color: #000;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-check:focus + .btn-outline-light, .btn-outline-light:focus {\n  box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);\n}\n.btn-check:checked + .btn-outline-light, .btn-check:active + .btn-outline-light, .btn-outline-light:active, .btn-outline-light.active, .btn-outline-light.dropdown-toggle.show {\n  color: #000;\n  background-color: #f8f9fa;\n  border-color: #f8f9fa;\n}\n.btn-check:checked + .btn-outline-light:focus, .btn-check:active + .btn-outline-light:focus, .btn-outline-light:active:focus, .btn-outline-light.active:focus, .btn-outline-light.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(248, 249, 250, 0.5);\n}\n.btn-outline-light:disabled, .btn-outline-light.disabled {\n  color: #f8f9fa;\n  background-color: transparent;\n}\n\n.btn-outline-dark {\n  color: #212529;\n  border-color: #212529;\n}\n.btn-outline-dark:hover {\n  color: #fff;\n  background-color: #212529;\n  border-color: #212529;\n}\n.btn-check:focus + .btn-outline-dark, .btn-outline-dark:focus {\n  box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);\n}\n.btn-check:checked + .btn-outline-dark, .btn-check:active + .btn-outline-dark, .btn-outline-dark:active, .btn-outline-dark.active, .btn-outline-dark.dropdown-toggle.show {\n  color: #fff;\n  background-color: #212529;\n  border-color: #212529;\n}\n.btn-check:checked + .btn-outline-dark:focus, .btn-check:active + .btn-outline-dark:focus, .btn-outline-dark:active:focus, .btn-outline-dark.active:focus, .btn-outline-dark.dropdown-toggle.show:focus {\n  box-shadow: 0 0 0 0.25rem rgba(33, 37, 41, 0.5);\n}\n.btn-outline-dark:disabled, .btn-outline-dark.disabled {\n  color: #212529;\n  background-color: transparent;\n}\n\n.btn-link {\n  font-weight: 400;\n  color: #0d6efd;\n  text-decoration: underline;\n}\n.btn-link:hover {\n  color: #0a58ca;\n}\n.btn-link:disabled, .btn-link.disabled {\n  color: #6c757d;\n}\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.5rem 1rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n\n.fade {\n  transition: opacity 0.15s linear;\n}\n@media (prefers-reduced-motion: reduce) {\n  .fade {\n    transition: none;\n  }\n}\n.fade:not(.show) {\n  opacity: 0;\n}\n\n.collapse:not(.show) {\n  display: none;\n}\n\n.collapsing {\n  height: 0;\n  overflow: hidden;\n  transition: height 0.35s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .collapsing {\n    transition: none;\n  }\n}\n.collapsing.collapse-horizontal {\n  width: 0;\n  height: auto;\n  transition: width 0.35s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .collapsing.collapse-horizontal {\n    transition: none;\n  }\n}\n\n.dropup,\n.dropend,\n.dropdown,\n.dropstart {\n  position: relative;\n}\n\n.dropdown-toggle {\n  white-space: nowrap;\n}\n.dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0;\n  border-left: 0.3em solid transparent;\n}\n.dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n\n.dropdown-menu {\n  position: absolute;\n  z-index: 1000;\n  display: none;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n.dropdown-menu[data-bs-popper] {\n  top: 100%;\n  left: 0;\n  margin-top: 0.125rem;\n}\n\n.dropdown-menu-start {\n  --bs-position: start;\n}\n.dropdown-menu-start[data-bs-popper] {\n  right: auto;\n  left: 0;\n}\n\n.dropdown-menu-end {\n  --bs-position: end;\n}\n.dropdown-menu-end[data-bs-popper] {\n  right: 0;\n  left: auto;\n}\n\n@media (min-width: 576px) {\n  .dropdown-menu-sm-start {\n    --bs-position: start;\n  }\n  .dropdown-menu-sm-start[data-bs-popper] {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-sm-end {\n    --bs-position: end;\n  }\n  .dropdown-menu-sm-end[data-bs-popper] {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 768px) {\n  .dropdown-menu-md-start {\n    --bs-position: start;\n  }\n  .dropdown-menu-md-start[data-bs-popper] {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-md-end {\n    --bs-position: end;\n  }\n  .dropdown-menu-md-end[data-bs-popper] {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 992px) {\n  .dropdown-menu-lg-start {\n    --bs-position: start;\n  }\n  .dropdown-menu-lg-start[data-bs-popper] {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-lg-end {\n    --bs-position: end;\n  }\n  .dropdown-menu-lg-end[data-bs-popper] {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 1200px) {\n  .dropdown-menu-xl-start {\n    --bs-position: start;\n  }\n  .dropdown-menu-xl-start[data-bs-popper] {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-xl-end {\n    --bs-position: end;\n  }\n  .dropdown-menu-xl-end[data-bs-popper] {\n    right: 0;\n    left: auto;\n  }\n}\n@media (min-width: 1400px) {\n  .dropdown-menu-xxl-start {\n    --bs-position: start;\n  }\n  .dropdown-menu-xxl-start[data-bs-popper] {\n    right: auto;\n    left: 0;\n  }\n\n  .dropdown-menu-xxl-end {\n    --bs-position: end;\n  }\n  .dropdown-menu-xxl-end[data-bs-popper] {\n    right: 0;\n    left: auto;\n  }\n}\n.dropup .dropdown-menu[data-bs-popper] {\n  top: auto;\n  bottom: 100%;\n  margin-top: 0;\n  margin-bottom: 0.125rem;\n}\n.dropup .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0;\n  border-right: 0.3em solid transparent;\n  border-bottom: 0.3em solid;\n  border-left: 0.3em solid transparent;\n}\n.dropup .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n\n.dropend .dropdown-menu[data-bs-popper] {\n  top: 0;\n  right: auto;\n  left: 100%;\n  margin-top: 0;\n  margin-left: 0.125rem;\n}\n.dropend .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0;\n  border-bottom: 0.3em solid transparent;\n  border-left: 0.3em solid;\n}\n.dropend .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n.dropend .dropdown-toggle::after {\n  vertical-align: 0;\n}\n\n.dropstart .dropdown-menu[data-bs-popper] {\n  top: 0;\n  right: 100%;\n  left: auto;\n  margin-top: 0;\n  margin-right: 0.125rem;\n}\n.dropstart .dropdown-toggle::after {\n  display: inline-block;\n  margin-left: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n}\n.dropstart .dropdown-toggle::after {\n  display: none;\n}\n.dropstart .dropdown-toggle::before {\n  display: inline-block;\n  margin-right: 0.255em;\n  vertical-align: 0.255em;\n  content: \"\";\n  border-top: 0.3em solid transparent;\n  border-right: 0.3em solid;\n  border-bottom: 0.3em solid transparent;\n}\n.dropstart .dropdown-toggle:empty::after {\n  margin-left: 0;\n}\n.dropstart .dropdown-toggle::before {\n  vertical-align: 0;\n}\n\n.dropdown-divider {\n  height: 0;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  border-top: 1px solid rgba(0, 0, 0, 0.15);\n}\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 0.25rem 1rem;\n  clear: both;\n  font-weight: 400;\n  color: #212529;\n  text-align: inherit;\n  text-decoration: none;\n  white-space: nowrap;\n  background-color: transparent;\n  border: 0;\n}\n.dropdown-item:hover, .dropdown-item:focus {\n  color: #1e2125;\n  background-color: #e9ecef;\n}\n.dropdown-item.active, .dropdown-item:active {\n  color: #fff;\n  text-decoration: none;\n  background-color: #0d6efd;\n}\n.dropdown-item.disabled, .dropdown-item:disabled {\n  color: #adb5bd;\n  pointer-events: none;\n  background-color: transparent;\n}\n\n.dropdown-menu.show {\n  display: block;\n}\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #6c757d;\n  white-space: nowrap;\n}\n\n.dropdown-item-text {\n  display: block;\n  padding: 0.25rem 1rem;\n  color: #212529;\n}\n\n.dropdown-menu-dark {\n  color: #dee2e6;\n  background-color: #343a40;\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.dropdown-menu-dark .dropdown-item {\n  color: #dee2e6;\n}\n.dropdown-menu-dark .dropdown-item:hover, .dropdown-menu-dark .dropdown-item:focus {\n  color: #fff;\n  background-color: rgba(255, 255, 255, 0.15);\n}\n.dropdown-menu-dark .dropdown-item.active, .dropdown-menu-dark .dropdown-item:active {\n  color: #fff;\n  background-color: #0d6efd;\n}\n.dropdown-menu-dark .dropdown-item.disabled, .dropdown-menu-dark .dropdown-item:disabled {\n  color: #adb5bd;\n}\n.dropdown-menu-dark .dropdown-divider {\n  border-color: rgba(0, 0, 0, 0.15);\n}\n.dropdown-menu-dark .dropdown-item-text {\n  color: #dee2e6;\n}\n.dropdown-menu-dark .dropdown-header {\n  color: #adb5bd;\n}\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-flex;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  flex: 1 1 auto;\n}\n.btn-group > .btn-check:checked + .btn,\n.btn-group > .btn-check:focus + .btn,\n.btn-group > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn-check:checked + .btn,\n.btn-group-vertical > .btn-check:focus + .btn,\n.btn-group-vertical > .btn:hover,\n.btn-group-vertical > .btn:focus,\n.btn-group-vertical > .btn:active,\n.btn-group-vertical > .btn.active {\n  z-index: 1;\n}\n\n.btn-toolbar {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n}\n.btn-toolbar .input-group {\n  width: auto;\n}\n\n.btn-group > .btn:not(:first-child),\n.btn-group > .btn-group:not(:first-child) {\n  margin-left: -1px;\n}\n.btn-group > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn:nth-child(n+3),\n.btn-group > :not(.btn-check) + .btn,\n.btn-group > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.dropdown-toggle-split {\n  padding-right: 0.5625rem;\n  padding-left: 0.5625rem;\n}\n.dropdown-toggle-split::after, .dropup .dropdown-toggle-split::after, .dropend .dropdown-toggle-split::after {\n  margin-left: 0;\n}\n.dropstart .dropdown-toggle-split::before {\n  margin-right: 0;\n}\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem;\n}\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem;\n}\n\n.btn-group-vertical {\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group {\n  width: 100%;\n}\n.btn-group-vertical > .btn:not(:first-child),\n.btn-group-vertical > .btn-group:not(:first-child) {\n  margin-top: -1px;\n}\n.btn-group-vertical > .btn:not(:last-child):not(.dropdown-toggle),\n.btn-group-vertical > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn ~ .btn,\n.btn-group-vertical > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.nav {\n  display: flex;\n  flex-wrap: wrap;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.nav-link {\n  display: block;\n  padding: 0.5rem 1rem;\n  color: #0d6efd;\n  text-decoration: none;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .nav-link {\n    transition: none;\n  }\n}\n.nav-link:hover, .nav-link:focus {\n  color: #0a58ca;\n}\n.nav-link.disabled {\n  color: #6c757d;\n  pointer-events: none;\n  cursor: default;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #dee2e6;\n}\n.nav-tabs .nav-link {\n  margin-bottom: -1px;\n  background: none;\n  border: 1px solid transparent;\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n.nav-tabs .nav-link:hover, .nav-tabs .nav-link:focus {\n  border-color: #e9ecef #e9ecef #dee2e6;\n  isolation: isolate;\n}\n.nav-tabs .nav-link.disabled {\n  color: #6c757d;\n  background-color: transparent;\n  border-color: transparent;\n}\n.nav-tabs .nav-link.active,\n.nav-tabs .nav-item.show .nav-link {\n  color: #495057;\n  background-color: #fff;\n  border-color: #dee2e6 #dee2e6 #fff;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.nav-pills .nav-link {\n  background: none;\n  border: 0;\n  border-radius: 0.25rem;\n}\n.nav-pills .nav-link.active,\n.nav-pills .show > .nav-link {\n  color: #fff;\n  background-color: #0d6efd;\n}\n\n.nav-fill > .nav-link,\n.nav-fill .nav-item {\n  flex: 1 1 auto;\n  text-align: center;\n}\n\n.nav-justified > .nav-link,\n.nav-justified .nav-item {\n  flex-basis: 0;\n  flex-grow: 1;\n  text-align: center;\n}\n\n.nav-fill .nav-item .nav-link,\n.nav-justified .nav-item .nav-link {\n  width: 100%;\n}\n\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n\n.navbar {\n  position: relative;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n.navbar > .container,\n.navbar > .container-fluid,\n.navbar > .container-sm,\n.navbar > .container-md,\n.navbar > .container-lg,\n.navbar > .container-xl,\n.navbar > .container-xxl {\n  display: flex;\n  flex-wrap: inherit;\n  align-items: center;\n  justify-content: space-between;\n}\n.navbar-brand {\n  padding-top: 0.3125rem;\n  padding-bottom: 0.3125rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  text-decoration: none;\n  white-space: nowrap;\n}\n.navbar-nav {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n.navbar-nav .nav-link {\n  padding-right: 0;\n  padding-left: 0;\n}\n.navbar-nav .dropdown-menu {\n  position: static;\n}\n\n.navbar-text {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n}\n\n.navbar-collapse {\n  flex-basis: 100%;\n  flex-grow: 1;\n  align-items: center;\n}\n\n.navbar-toggler {\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background-color: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n  transition: box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .navbar-toggler {\n    transition: none;\n  }\n}\n.navbar-toggler:hover {\n  text-decoration: none;\n}\n.navbar-toggler:focus {\n  text-decoration: none;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem;\n}\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 100%;\n}\n\n.navbar-nav-scroll {\n  max-height: var(--bs-scroll-height, 75vh);\n  overflow-y: auto;\n}\n\n@media (min-width: 576px) {\n  .navbar-expand-sm {\n    flex-wrap: nowrap;\n    justify-content: flex-start;\n  }\n  .navbar-expand-sm .navbar-nav {\n    flex-direction: row;\n  }\n  .navbar-expand-sm .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-sm .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-sm .navbar-nav-scroll {\n    overflow: visible;\n  }\n  .navbar-expand-sm .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-sm .navbar-toggler {\n    display: none;\n  }\n  .navbar-expand-sm .offcanvas-header {\n    display: none;\n  }\n  .navbar-expand-sm .offcanvas {\n    position: inherit;\n    bottom: 0;\n    z-index: 1000;\n    flex-grow: 1;\n    visibility: visible !important;\n    background-color: transparent;\n    border-right: 0;\n    border-left: 0;\n    transition: none;\n    transform: none;\n  }\n  .navbar-expand-sm .offcanvas-top,\n.navbar-expand-sm .offcanvas-bottom {\n    height: auto;\n    border-top: 0;\n    border-bottom: 0;\n  }\n  .navbar-expand-sm .offcanvas-body {\n    display: flex;\n    flex-grow: 0;\n    padding: 0;\n    overflow-y: visible;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-expand-md {\n    flex-wrap: nowrap;\n    justify-content: flex-start;\n  }\n  .navbar-expand-md .navbar-nav {\n    flex-direction: row;\n  }\n  .navbar-expand-md .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-md .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-md .navbar-nav-scroll {\n    overflow: visible;\n  }\n  .navbar-expand-md .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-md .navbar-toggler {\n    display: none;\n  }\n  .navbar-expand-md .offcanvas-header {\n    display: none;\n  }\n  .navbar-expand-md .offcanvas {\n    position: inherit;\n    bottom: 0;\n    z-index: 1000;\n    flex-grow: 1;\n    visibility: visible !important;\n    background-color: transparent;\n    border-right: 0;\n    border-left: 0;\n    transition: none;\n    transform: none;\n  }\n  .navbar-expand-md .offcanvas-top,\n.navbar-expand-md .offcanvas-bottom {\n    height: auto;\n    border-top: 0;\n    border-bottom: 0;\n  }\n  .navbar-expand-md .offcanvas-body {\n    display: flex;\n    flex-grow: 0;\n    padding: 0;\n    overflow-y: visible;\n  }\n}\n@media (min-width: 992px) {\n  .navbar-expand-lg {\n    flex-wrap: nowrap;\n    justify-content: flex-start;\n  }\n  .navbar-expand-lg .navbar-nav {\n    flex-direction: row;\n  }\n  .navbar-expand-lg .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-lg .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-lg .navbar-nav-scroll {\n    overflow: visible;\n  }\n  .navbar-expand-lg .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-lg .navbar-toggler {\n    display: none;\n  }\n  .navbar-expand-lg .offcanvas-header {\n    display: none;\n  }\n  .navbar-expand-lg .offcanvas {\n    position: inherit;\n    bottom: 0;\n    z-index: 1000;\n    flex-grow: 1;\n    visibility: visible !important;\n    background-color: transparent;\n    border-right: 0;\n    border-left: 0;\n    transition: none;\n    transform: none;\n  }\n  .navbar-expand-lg .offcanvas-top,\n.navbar-expand-lg .offcanvas-bottom {\n    height: auto;\n    border-top: 0;\n    border-bottom: 0;\n  }\n  .navbar-expand-lg .offcanvas-body {\n    display: flex;\n    flex-grow: 0;\n    padding: 0;\n    overflow-y: visible;\n  }\n}\n@media (min-width: 1200px) {\n  .navbar-expand-xl {\n    flex-wrap: nowrap;\n    justify-content: flex-start;\n  }\n  .navbar-expand-xl .navbar-nav {\n    flex-direction: row;\n  }\n  .navbar-expand-xl .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-xl .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-xl .navbar-nav-scroll {\n    overflow: visible;\n  }\n  .navbar-expand-xl .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-xl .navbar-toggler {\n    display: none;\n  }\n  .navbar-expand-xl .offcanvas-header {\n    display: none;\n  }\n  .navbar-expand-xl .offcanvas {\n    position: inherit;\n    bottom: 0;\n    z-index: 1000;\n    flex-grow: 1;\n    visibility: visible !important;\n    background-color: transparent;\n    border-right: 0;\n    border-left: 0;\n    transition: none;\n    transform: none;\n  }\n  .navbar-expand-xl .offcanvas-top,\n.navbar-expand-xl .offcanvas-bottom {\n    height: auto;\n    border-top: 0;\n    border-bottom: 0;\n  }\n  .navbar-expand-xl .offcanvas-body {\n    display: flex;\n    flex-grow: 0;\n    padding: 0;\n    overflow-y: visible;\n  }\n}\n@media (min-width: 1400px) {\n  .navbar-expand-xxl {\n    flex-wrap: nowrap;\n    justify-content: flex-start;\n  }\n  .navbar-expand-xxl .navbar-nav {\n    flex-direction: row;\n  }\n  .navbar-expand-xxl .navbar-nav .dropdown-menu {\n    position: absolute;\n  }\n  .navbar-expand-xxl .navbar-nav .nav-link {\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n  }\n  .navbar-expand-xxl .navbar-nav-scroll {\n    overflow: visible;\n  }\n  .navbar-expand-xxl .navbar-collapse {\n    display: flex !important;\n    flex-basis: auto;\n  }\n  .navbar-expand-xxl .navbar-toggler {\n    display: none;\n  }\n  .navbar-expand-xxl .offcanvas-header {\n    display: none;\n  }\n  .navbar-expand-xxl .offcanvas {\n    position: inherit;\n    bottom: 0;\n    z-index: 1000;\n    flex-grow: 1;\n    visibility: visible !important;\n    background-color: transparent;\n    border-right: 0;\n    border-left: 0;\n    transition: none;\n    transform: none;\n  }\n  .navbar-expand-xxl .offcanvas-top,\n.navbar-expand-xxl .offcanvas-bottom {\n    height: auto;\n    border-top: 0;\n    border-bottom: 0;\n  }\n  .navbar-expand-xxl .offcanvas-body {\n    display: flex;\n    flex-grow: 0;\n    padding: 0;\n    overflow-y: visible;\n  }\n}\n.navbar-expand {\n  flex-wrap: nowrap;\n  justify-content: flex-start;\n}\n.navbar-expand .navbar-nav {\n  flex-direction: row;\n}\n.navbar-expand .navbar-nav .dropdown-menu {\n  position: absolute;\n}\n.navbar-expand .navbar-nav .nav-link {\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n}\n.navbar-expand .navbar-nav-scroll {\n  overflow: visible;\n}\n.navbar-expand .navbar-collapse {\n  display: flex !important;\n  flex-basis: auto;\n}\n.navbar-expand .navbar-toggler {\n  display: none;\n}\n.navbar-expand .offcanvas-header {\n  display: none;\n}\n.navbar-expand .offcanvas {\n  position: inherit;\n  bottom: 0;\n  z-index: 1000;\n  flex-grow: 1;\n  visibility: visible !important;\n  background-color: transparent;\n  border-right: 0;\n  border-left: 0;\n  transition: none;\n  transform: none;\n}\n.navbar-expand .offcanvas-top,\n.navbar-expand .offcanvas-bottom {\n  height: auto;\n  border-top: 0;\n  border-bottom: 0;\n}\n.navbar-expand .offcanvas-body {\n  display: flex;\n  flex-grow: 0;\n  padding: 0;\n  overflow-y: visible;\n}\n\n.navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-brand:hover, .navbar-light .navbar-brand:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.55);\n}\n.navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus {\n  color: rgba(0, 0, 0, 0.7);\n}\n.navbar-light .navbar-nav .nav-link.disabled {\n  color: rgba(0, 0, 0, 0.3);\n}\n.navbar-light .navbar-nav .show > .nav-link,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9);\n}\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.55);\n  border-color: rgba(0, 0, 0, 0.1);\n}\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\");\n}\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.55);\n}\n.navbar-light .navbar-text a,\n.navbar-light .navbar-text a:hover,\n.navbar-light .navbar-text a:focus {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-dark .navbar-brand {\n  color: #fff;\n}\n.navbar-dark .navbar-brand:hover, .navbar-dark .navbar-brand:focus {\n  color: #fff;\n}\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.55);\n}\n.navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {\n  color: rgba(255, 255, 255, 0.75);\n}\n.navbar-dark .navbar-nav .nav-link.disabled {\n  color: rgba(255, 255, 255, 0.25);\n}\n.navbar-dark .navbar-nav .show > .nav-link,\n.navbar-dark .navbar-nav .nav-link.active {\n  color: #fff;\n}\n.navbar-dark .navbar-toggler {\n  color: rgba(255, 255, 255, 0.55);\n  border-color: rgba(255, 255, 255, 0.1);\n}\n.navbar-dark .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e\");\n}\n.navbar-dark .navbar-text {\n  color: rgba(255, 255, 255, 0.55);\n}\n.navbar-dark .navbar-text a,\n.navbar-dark .navbar-text a:hover,\n.navbar-dark .navbar-text a:focus {\n  color: #fff;\n}\n\n.card {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem;\n}\n.card > hr {\n  margin-right: 0;\n  margin-left: 0;\n}\n.card > .list-group {\n  border-top: inherit;\n  border-bottom: inherit;\n}\n.card > .list-group:first-child {\n  border-top-width: 0;\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n.card > .list-group:last-child {\n  border-bottom-width: 0;\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n.card > .card-header + .list-group,\n.card > .list-group + .card-footer {\n  border-top: 0;\n}\n\n.card-body {\n  flex: 1 1 auto;\n  padding: 1rem 1rem;\n}\n\n.card-title {\n  margin-bottom: 0.5rem;\n}\n\n.card-subtitle {\n  margin-top: -0.25rem;\n  margin-bottom: 0;\n}\n\n.card-text:last-child {\n  margin-bottom: 0;\n}\n\n.card-link + .card-link {\n  margin-left: 1rem;\n}\n\n.card-header {\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-header:first-child {\n  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;\n}\n\n.card-footer {\n  padding: 0.5rem 1rem;\n  background-color: rgba(0, 0, 0, 0.03);\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n}\n.card-footer:last-child {\n  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);\n}\n\n.card-header-tabs {\n  margin-right: -0.5rem;\n  margin-bottom: -0.5rem;\n  margin-left: -0.5rem;\n  border-bottom: 0;\n}\n\n.card-header-pills {\n  margin-right: -0.5rem;\n  margin-left: -0.5rem;\n}\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1rem;\n  border-radius: calc(0.25rem - 1px);\n}\n\n.card-img,\n.card-img-top,\n.card-img-bottom {\n  width: 100%;\n}\n\n.card-img,\n.card-img-top {\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n\n.card-img,\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n\n.card-group > .card {\n  margin-bottom: 0.75rem;\n}\n@media (min-width: 576px) {\n  .card-group {\n    display: flex;\n    flex-flow: row wrap;\n  }\n  .card-group > .card {\n    flex: 1 0 0%;\n    margin-bottom: 0;\n  }\n  .card-group > .card + .card {\n    margin-left: 0;\n    border-left: 0;\n  }\n  .card-group > .card:not(:last-child) {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n  }\n  .card-group > .card:not(:last-child) .card-img-top,\n.card-group > .card:not(:last-child) .card-header {\n    border-top-right-radius: 0;\n  }\n  .card-group > .card:not(:last-child) .card-img-bottom,\n.card-group > .card:not(:last-child) .card-footer {\n    border-bottom-right-radius: 0;\n  }\n  .card-group > .card:not(:first-child) {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n  }\n  .card-group > .card:not(:first-child) .card-img-top,\n.card-group > .card:not(:first-child) .card-header {\n    border-top-left-radius: 0;\n  }\n  .card-group > .card:not(:first-child) .card-img-bottom,\n.card-group > .card:not(:first-child) .card-footer {\n    border-bottom-left-radius: 0;\n  }\n}\n\n.accordion-button {\n  position: relative;\n  display: flex;\n  align-items: center;\n  width: 100%;\n  padding: 1rem 1.25rem;\n  font-size: 1rem;\n  color: #212529;\n  text-align: left;\n  background-color: #fff;\n  border: 0;\n  border-radius: 0;\n  overflow-anchor: none;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .accordion-button {\n    transition: none;\n  }\n}\n.accordion-button:not(.collapsed) {\n  color: #0c63e4;\n  background-color: #e7f1ff;\n  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.125);\n}\n.accordion-button:not(.collapsed)::after {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%230c63e4'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\");\n  transform: rotate(-180deg);\n}\n.accordion-button::after {\n  flex-shrink: 0;\n  width: 1.25rem;\n  height: 1.25rem;\n  margin-left: auto;\n  content: \"\";\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\");\n  background-repeat: no-repeat;\n  background-size: 1.25rem;\n  transition: transform 0.2s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .accordion-button::after {\n    transition: none;\n  }\n}\n.accordion-button:hover {\n  z-index: 2;\n}\n.accordion-button:focus {\n  z-index: 3;\n  border-color: #86b7fe;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n\n.accordion-header {\n  margin-bottom: 0;\n}\n\n.accordion-item {\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n.accordion-item:first-of-type {\n  border-top-left-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n.accordion-item:first-of-type .accordion-button {\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n.accordion-item:not(:first-of-type) {\n  border-top: 0;\n}\n.accordion-item:last-of-type {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n.accordion-item:last-of-type .accordion-button.collapsed {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n.accordion-item:last-of-type .accordion-collapse {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.accordion-body {\n  padding: 1rem 1.25rem;\n}\n\n.accordion-flush .accordion-collapse {\n  border-width: 0;\n}\n.accordion-flush .accordion-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0;\n}\n.accordion-flush .accordion-item:first-child {\n  border-top: 0;\n}\n.accordion-flush .accordion-item:last-child {\n  border-bottom: 0;\n}\n.accordion-flush .accordion-item .accordion-button {\n  border-radius: 0;\n}\n\n.breadcrumb {\n  display: flex;\n  flex-wrap: wrap;\n  padding: 0 0;\n  margin-bottom: 1rem;\n  list-style: none;\n}\n\n.breadcrumb-item + .breadcrumb-item {\n  padding-left: 0.5rem;\n}\n.breadcrumb-item + .breadcrumb-item::before {\n  float: left;\n  padding-right: 0.5rem;\n  color: #6c757d;\n  content: var(--bs-breadcrumb-divider, \"/\") /* rtl: var(--bs-breadcrumb-divider, \"/\") */;\n}\n.breadcrumb-item.active {\n  color: #6c757d;\n}\n\n.pagination {\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n}\n\n.page-link {\n  position: relative;\n  display: block;\n  color: #0d6efd;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #dee2e6;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .page-link {\n    transition: none;\n  }\n}\n.page-link:hover {\n  z-index: 2;\n  color: #0a58ca;\n  background-color: #e9ecef;\n  border-color: #dee2e6;\n}\n.page-link:focus {\n  z-index: 3;\n  color: #0a58ca;\n  background-color: #e9ecef;\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n}\n\n.page-item:not(:first-child) .page-link {\n  margin-left: -1px;\n}\n.page-item.active .page-link {\n  z-index: 3;\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.page-item.disabled .page-link {\n  color: #6c757d;\n  pointer-events: none;\n  background-color: #fff;\n  border-color: #dee2e6;\n}\n\n.page-link {\n  padding: 0.375rem 0.75rem;\n}\n\n.page-item:first-child .page-link {\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n.page-item:last-child .page-link {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem;\n}\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n}\n.pagination-lg .page-item:first-child .page-link {\n  border-top-left-radius: 0.3rem;\n  border-bottom-left-radius: 0.3rem;\n}\n.pagination-lg .page-item:last-child .page-link {\n  border-top-right-radius: 0.3rem;\n  border-bottom-right-radius: 0.3rem;\n}\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n.pagination-sm .page-item:first-child .page-link {\n  border-top-left-radius: 0.2rem;\n  border-bottom-left-radius: 0.2rem;\n}\n.pagination-sm .page-item:last-child .page-link {\n  border-top-right-radius: 0.2rem;\n  border-bottom-right-radius: 0.2rem;\n}\n\n.badge {\n  display: inline-block;\n  padding: 0.35em 0.65em;\n  font-size: 0.75em;\n  font-weight: 700;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n}\n.badge:empty {\n  display: none;\n}\n\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n\n.alert {\n  position: relative;\n  padding: 1rem 1rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n\n.alert-heading {\n  color: inherit;\n}\n\n.alert-link {\n  font-weight: 700;\n}\n\n.alert-dismissible {\n  padding-right: 3rem;\n}\n.alert-dismissible .btn-close {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  padding: 1.25rem 1rem;\n}\n\n.alert-primary {\n  color: #084298;\n  background-color: #cfe2ff;\n  border-color: #b6d4fe;\n}\n.alert-primary .alert-link {\n  color: #06357a;\n}\n\n.alert-secondary {\n  color: #41464b;\n  background-color: #e2e3e5;\n  border-color: #d3d6d8;\n}\n.alert-secondary .alert-link {\n  color: #34383c;\n}\n\n.alert-success {\n  color: #0f5132;\n  background-color: #d1e7dd;\n  border-color: #badbcc;\n}\n.alert-success .alert-link {\n  color: #0c4128;\n}\n\n.alert-info {\n  color: #055160;\n  background-color: #cff4fc;\n  border-color: #b6effb;\n}\n.alert-info .alert-link {\n  color: #04414d;\n}\n\n.alert-warning {\n  color: #664d03;\n  background-color: #fff3cd;\n  border-color: #ffecb5;\n}\n.alert-warning .alert-link {\n  color: #523e02;\n}\n\n.alert-danger {\n  color: #842029;\n  background-color: #f8d7da;\n  border-color: #f5c2c7;\n}\n.alert-danger .alert-link {\n  color: #6a1a21;\n}\n\n.alert-light {\n  color: #636464;\n  background-color: #fefefe;\n  border-color: #fdfdfe;\n}\n.alert-light .alert-link {\n  color: #4f5050;\n}\n\n.alert-dark {\n  color: #141619;\n  background-color: #d3d3d4;\n  border-color: #bcbebf;\n}\n.alert-dark .alert-link {\n  color: #101214;\n}\n\n@-webkit-keyframes progress-bar-stripes {\n  0% {\n    background-position-x: 1rem;\n  }\n}\n\n@keyframes progress-bar-stripes {\n  0% {\n    background-position-x: 1rem;\n  }\n}\n.progress {\n  display: flex;\n  height: 1rem;\n  overflow: hidden;\n  font-size: 0.75rem;\n  background-color: #e9ecef;\n  border-radius: 0.25rem;\n}\n\n.progress-bar {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  overflow: hidden;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  background-color: #0d6efd;\n  transition: width 0.6s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .progress-bar {\n    transition: none;\n  }\n}\n\n.progress-bar-striped {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem;\n}\n\n.progress-bar-animated {\n  -webkit-animation: 1s linear infinite progress-bar-stripes;\n  animation: 1s linear infinite progress-bar-stripes;\n}\n@media (prefers-reduced-motion: reduce) {\n  .progress-bar-animated {\n    -webkit-animation: none;\n    animation: none;\n  }\n}\n\n.list-group {\n  display: flex;\n  flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  border-radius: 0.25rem;\n}\n\n.list-group-numbered {\n  list-style-type: none;\n  counter-reset: section;\n}\n.list-group-numbered > li::before {\n  content: counters(section, \".\") \". \";\n  counter-increment: section;\n}\n\n.list-group-item-action {\n  width: 100%;\n  color: #495057;\n  text-align: inherit;\n}\n.list-group-item-action:hover, .list-group-item-action:focus {\n  z-index: 1;\n  color: #495057;\n  text-decoration: none;\n  background-color: #f8f9fa;\n}\n.list-group-item-action:active {\n  color: #212529;\n  background-color: #e9ecef;\n}\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.5rem 1rem;\n  color: #212529;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n.list-group-item:first-child {\n  border-top-left-radius: inherit;\n  border-top-right-radius: inherit;\n}\n.list-group-item:last-child {\n  border-bottom-right-radius: inherit;\n  border-bottom-left-radius: inherit;\n}\n.list-group-item.disabled, .list-group-item:disabled {\n  color: #6c757d;\n  pointer-events: none;\n  background-color: #fff;\n}\n.list-group-item.active {\n  z-index: 2;\n  color: #fff;\n  background-color: #0d6efd;\n  border-color: #0d6efd;\n}\n.list-group-item + .list-group-item {\n  border-top-width: 0;\n}\n.list-group-item + .list-group-item.active {\n  margin-top: -1px;\n  border-top-width: 1px;\n}\n\n.list-group-horizontal {\n  flex-direction: row;\n}\n.list-group-horizontal > .list-group-item:first-child {\n  border-bottom-left-radius: 0.25rem;\n  border-top-right-radius: 0;\n}\n.list-group-horizontal > .list-group-item:last-child {\n  border-top-right-radius: 0.25rem;\n  border-bottom-left-radius: 0;\n}\n.list-group-horizontal > .list-group-item.active {\n  margin-top: 0;\n}\n.list-group-horizontal > .list-group-item + .list-group-item {\n  border-top-width: 1px;\n  border-left-width: 0;\n}\n.list-group-horizontal > .list-group-item + .list-group-item.active {\n  margin-left: -1px;\n  border-left-width: 1px;\n}\n\n@media (min-width: 576px) {\n  .list-group-horizontal-sm {\n    flex-direction: row;\n  }\n  .list-group-horizontal-sm > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-sm > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  .list-group-horizontal-sm > .list-group-item.active {\n    margin-top: 0;\n  }\n  .list-group-horizontal-sm > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  .list-group-horizontal-sm > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 768px) {\n  .list-group-horizontal-md {\n    flex-direction: row;\n  }\n  .list-group-horizontal-md > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-md > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  .list-group-horizontal-md > .list-group-item.active {\n    margin-top: 0;\n  }\n  .list-group-horizontal-md > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  .list-group-horizontal-md > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 992px) {\n  .list-group-horizontal-lg {\n    flex-direction: row;\n  }\n  .list-group-horizontal-lg > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-lg > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  .list-group-horizontal-lg > .list-group-item.active {\n    margin-top: 0;\n  }\n  .list-group-horizontal-lg > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  .list-group-horizontal-lg > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 1200px) {\n  .list-group-horizontal-xl {\n    flex-direction: row;\n  }\n  .list-group-horizontal-xl > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-xl > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  .list-group-horizontal-xl > .list-group-item.active {\n    margin-top: 0;\n  }\n  .list-group-horizontal-xl > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  .list-group-horizontal-xl > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n@media (min-width: 1400px) {\n  .list-group-horizontal-xxl {\n    flex-direction: row;\n  }\n  .list-group-horizontal-xxl > .list-group-item:first-child {\n    border-bottom-left-radius: 0.25rem;\n    border-top-right-radius: 0;\n  }\n  .list-group-horizontal-xxl > .list-group-item:last-child {\n    border-top-right-radius: 0.25rem;\n    border-bottom-left-radius: 0;\n  }\n  .list-group-horizontal-xxl > .list-group-item.active {\n    margin-top: 0;\n  }\n  .list-group-horizontal-xxl > .list-group-item + .list-group-item {\n    border-top-width: 1px;\n    border-left-width: 0;\n  }\n  .list-group-horizontal-xxl > .list-group-item + .list-group-item.active {\n    margin-left: -1px;\n    border-left-width: 1px;\n  }\n}\n.list-group-flush {\n  border-radius: 0;\n}\n.list-group-flush > .list-group-item {\n  border-width: 0 0 1px;\n}\n.list-group-flush > .list-group-item:last-child {\n  border-bottom-width: 0;\n}\n\n.list-group-item-primary {\n  color: #084298;\n  background-color: #cfe2ff;\n}\n.list-group-item-primary.list-group-item-action:hover, .list-group-item-primary.list-group-item-action:focus {\n  color: #084298;\n  background-color: #bacbe6;\n}\n.list-group-item-primary.list-group-item-action.active {\n  color: #fff;\n  background-color: #084298;\n  border-color: #084298;\n}\n\n.list-group-item-secondary {\n  color: #41464b;\n  background-color: #e2e3e5;\n}\n.list-group-item-secondary.list-group-item-action:hover, .list-group-item-secondary.list-group-item-action:focus {\n  color: #41464b;\n  background-color: #cbccce;\n}\n.list-group-item-secondary.list-group-item-action.active {\n  color: #fff;\n  background-color: #41464b;\n  border-color: #41464b;\n}\n\n.list-group-item-success {\n  color: #0f5132;\n  background-color: #d1e7dd;\n}\n.list-group-item-success.list-group-item-action:hover, .list-group-item-success.list-group-item-action:focus {\n  color: #0f5132;\n  background-color: #bcd0c7;\n}\n.list-group-item-success.list-group-item-action.active {\n  color: #fff;\n  background-color: #0f5132;\n  border-color: #0f5132;\n}\n\n.list-group-item-info {\n  color: #055160;\n  background-color: #cff4fc;\n}\n.list-group-item-info.list-group-item-action:hover, .list-group-item-info.list-group-item-action:focus {\n  color: #055160;\n  background-color: #badce3;\n}\n.list-group-item-info.list-group-item-action.active {\n  color: #fff;\n  background-color: #055160;\n  border-color: #055160;\n}\n\n.list-group-item-warning {\n  color: #664d03;\n  background-color: #fff3cd;\n}\n.list-group-item-warning.list-group-item-action:hover, .list-group-item-warning.list-group-item-action:focus {\n  color: #664d03;\n  background-color: #e6dbb9;\n}\n.list-group-item-warning.list-group-item-action.active {\n  color: #fff;\n  background-color: #664d03;\n  border-color: #664d03;\n}\n\n.list-group-item-danger {\n  color: #842029;\n  background-color: #f8d7da;\n}\n.list-group-item-danger.list-group-item-action:hover, .list-group-item-danger.list-group-item-action:focus {\n  color: #842029;\n  background-color: #dfc2c4;\n}\n.list-group-item-danger.list-group-item-action.active {\n  color: #fff;\n  background-color: #842029;\n  border-color: #842029;\n}\n\n.list-group-item-light {\n  color: #636464;\n  background-color: #fefefe;\n}\n.list-group-item-light.list-group-item-action:hover, .list-group-item-light.list-group-item-action:focus {\n  color: #636464;\n  background-color: #e5e5e5;\n}\n.list-group-item-light.list-group-item-action.active {\n  color: #fff;\n  background-color: #636464;\n  border-color: #636464;\n}\n\n.list-group-item-dark {\n  color: #141619;\n  background-color: #d3d3d4;\n}\n.list-group-item-dark.list-group-item-action:hover, .list-group-item-dark.list-group-item-action:focus {\n  color: #141619;\n  background-color: #bebebf;\n}\n.list-group-item-dark.list-group-item-action.active {\n  color: #fff;\n  background-color: #141619;\n  border-color: #141619;\n}\n\n.btn-close {\n  box-sizing: content-box;\n  width: 1em;\n  height: 1em;\n  padding: 0.25em 0.25em;\n  color: #000;\n  background: transparent url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e\") center/1em auto no-repeat;\n  border: 0;\n  border-radius: 0.25rem;\n  opacity: 0.5;\n}\n.btn-close:hover {\n  color: #000;\n  text-decoration: none;\n  opacity: 0.75;\n}\n.btn-close:focus {\n  outline: 0;\n  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);\n  opacity: 1;\n}\n.btn-close:disabled, .btn-close.disabled {\n  pointer-events: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  user-select: none;\n  opacity: 0.25;\n}\n\n.btn-close-white {\n  filter: invert(1) grayscale(100%) brightness(200%);\n}\n\n.toast {\n  width: 350px;\n  max-width: 100%;\n  font-size: 0.875rem;\n  pointer-events: auto;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n.toast.showing {\n  opacity: 0;\n}\n.toast:not(.show) {\n  display: none;\n}\n\n.toast-container {\n  width: -webkit-max-content;\n  width: -moz-max-content;\n  width: max-content;\n  max-width: 100%;\n  pointer-events: none;\n}\n.toast-container > :not(:last-child) {\n  margin-bottom: 0.75rem;\n}\n\n.toast-header {\n  display: flex;\n  align-items: center;\n  padding: 0.5rem 0.75rem;\n  color: #6c757d;\n  background-color: rgba(255, 255, 255, 0.85);\n  background-clip: padding-box;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  border-top-left-radius: calc(0.25rem - 1px);\n  border-top-right-radius: calc(0.25rem - 1px);\n}\n.toast-header .btn-close {\n  margin-right: -0.375rem;\n  margin-left: 0.75rem;\n}\n\n.toast-body {\n  padding: 0.75rem;\n  word-wrap: break-word;\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1055;\n  display: none;\n  width: 100%;\n  height: 100%;\n  overflow-x: hidden;\n  overflow-y: auto;\n  outline: 0;\n}\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 0.5rem;\n  pointer-events: none;\n}\n.modal.fade .modal-dialog {\n  transition: transform 0.3s ease-out;\n  transform: translate(0, -50px);\n}\n@media (prefers-reduced-motion: reduce) {\n  .modal.fade .modal-dialog {\n    transition: none;\n  }\n}\n.modal.show .modal-dialog {\n  transform: none;\n}\n.modal.modal-static .modal-dialog {\n  transform: scale(1.02);\n}\n\n.modal-dialog-scrollable {\n  height: calc(100% - 1rem);\n}\n.modal-dialog-scrollable .modal-content {\n  max-height: 100%;\n  overflow: hidden;\n}\n.modal-dialog-scrollable .modal-body {\n  overflow-y: auto;\n}\n\n.modal-dialog-centered {\n  display: flex;\n  align-items: center;\n  min-height: calc(100% - 1rem);\n}\n\n.modal-content {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  pointer-events: auto;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0;\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1050;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  opacity: 0;\n}\n.modal-backdrop.show {\n  opacity: 0.5;\n}\n\n.modal-header {\n  display: flex;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1rem;\n  border-bottom: 1px solid #dee2e6;\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px);\n}\n.modal-header .btn-close {\n  padding: 0.5rem 0.5rem;\n  margin: -0.5rem -0.5rem -0.5rem auto;\n}\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n\n.modal-body {\n  position: relative;\n  flex: 1 1 auto;\n  padding: 1rem;\n}\n\n.modal-footer {\n  display: flex;\n  flex-wrap: wrap;\n  flex-shrink: 0;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0.75rem;\n  border-top: 1px solid #dee2e6;\n  border-bottom-right-radius: calc(0.3rem - 1px);\n  border-bottom-left-radius: calc(0.3rem - 1px);\n}\n.modal-footer > * {\n  margin: 0.25rem;\n}\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 1.75rem auto;\n  }\n\n  .modal-dialog-scrollable {\n    height: calc(100% - 3.5rem);\n  }\n\n  .modal-dialog-centered {\n    min-height: calc(100% - 3.5rem);\n  }\n\n  .modal-sm {\n    max-width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg,\n.modal-xl {\n    max-width: 800px;\n  }\n}\n@media (min-width: 1200px) {\n  .modal-xl {\n    max-width: 1140px;\n  }\n}\n.modal-fullscreen {\n  width: 100vw;\n  max-width: none;\n  height: 100%;\n  margin: 0;\n}\n.modal-fullscreen .modal-content {\n  height: 100%;\n  border: 0;\n  border-radius: 0;\n}\n.modal-fullscreen .modal-header {\n  border-radius: 0;\n}\n.modal-fullscreen .modal-body {\n  overflow-y: auto;\n}\n.modal-fullscreen .modal-footer {\n  border-radius: 0;\n}\n\n@media (max-width: 575.98px) {\n  .modal-fullscreen-sm-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0;\n  }\n  .modal-fullscreen-sm-down .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n  }\n  .modal-fullscreen-sm-down .modal-header {\n    border-radius: 0;\n  }\n  .modal-fullscreen-sm-down .modal-body {\n    overflow-y: auto;\n  }\n  .modal-fullscreen-sm-down .modal-footer {\n    border-radius: 0;\n  }\n}\n@media (max-width: 767.98px) {\n  .modal-fullscreen-md-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0;\n  }\n  .modal-fullscreen-md-down .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n  }\n  .modal-fullscreen-md-down .modal-header {\n    border-radius: 0;\n  }\n  .modal-fullscreen-md-down .modal-body {\n    overflow-y: auto;\n  }\n  .modal-fullscreen-md-down .modal-footer {\n    border-radius: 0;\n  }\n}\n@media (max-width: 991.98px) {\n  .modal-fullscreen-lg-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0;\n  }\n  .modal-fullscreen-lg-down .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n  }\n  .modal-fullscreen-lg-down .modal-header {\n    border-radius: 0;\n  }\n  .modal-fullscreen-lg-down .modal-body {\n    overflow-y: auto;\n  }\n  .modal-fullscreen-lg-down .modal-footer {\n    border-radius: 0;\n  }\n}\n@media (max-width: 1199.98px) {\n  .modal-fullscreen-xl-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0;\n  }\n  .modal-fullscreen-xl-down .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n  }\n  .modal-fullscreen-xl-down .modal-header {\n    border-radius: 0;\n  }\n  .modal-fullscreen-xl-down .modal-body {\n    overflow-y: auto;\n  }\n  .modal-fullscreen-xl-down .modal-footer {\n    border-radius: 0;\n  }\n}\n@media (max-width: 1399.98px) {\n  .modal-fullscreen-xxl-down {\n    width: 100vw;\n    max-width: none;\n    height: 100%;\n    margin: 0;\n  }\n  .modal-fullscreen-xxl-down .modal-content {\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n  }\n  .modal-fullscreen-xxl-down .modal-header {\n    border-radius: 0;\n  }\n  .modal-fullscreen-xxl-down .modal-body {\n    overflow-y: auto;\n  }\n  .modal-fullscreen-xxl-down .modal-footer {\n    border-radius: 0;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1080;\n  display: block;\n  margin: 0;\n  font-family: var(--bs-font-sans-serif);\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0;\n}\n.tooltip.show {\n  opacity: 0.9;\n}\n.tooltip .tooltip-arrow {\n  position: absolute;\n  display: block;\n  width: 0.8rem;\n  height: 0.4rem;\n}\n.tooltip .tooltip-arrow::before {\n  position: absolute;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n\n.bs-tooltip-top, .bs-tooltip-auto[data-popper-placement^=top] {\n  padding: 0.4rem 0;\n}\n.bs-tooltip-top .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow {\n  bottom: 0;\n}\n.bs-tooltip-top .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=top] .tooltip-arrow::before {\n  top: -1px;\n  border-width: 0.4rem 0.4rem 0;\n  border-top-color: #000;\n}\n\n.bs-tooltip-end, .bs-tooltip-auto[data-popper-placement^=right] {\n  padding: 0 0.4rem;\n}\n.bs-tooltip-end .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow {\n  left: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n.bs-tooltip-end .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=right] .tooltip-arrow::before {\n  right: -1px;\n  border-width: 0.4rem 0.4rem 0.4rem 0;\n  border-right-color: #000;\n}\n\n.bs-tooltip-bottom, .bs-tooltip-auto[data-popper-placement^=bottom] {\n  padding: 0.4rem 0;\n}\n.bs-tooltip-bottom .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow {\n  top: 0;\n}\n.bs-tooltip-bottom .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=bottom] .tooltip-arrow::before {\n  bottom: -1px;\n  border-width: 0 0.4rem 0.4rem;\n  border-bottom-color: #000;\n}\n\n.bs-tooltip-start, .bs-tooltip-auto[data-popper-placement^=left] {\n  padding: 0 0.4rem;\n}\n.bs-tooltip-start .tooltip-arrow, .bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow {\n  right: 0;\n  width: 0.4rem;\n  height: 0.8rem;\n}\n.bs-tooltip-start .tooltip-arrow::before, .bs-tooltip-auto[data-popper-placement^=left] .tooltip-arrow::before {\n  left: -1px;\n  border-width: 0.4rem 0 0.4rem 0.4rem;\n  border-left-color: #000;\n}\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 0.25rem 0.5rem;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem;\n}\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0 /* rtl:ignore */;\n  z-index: 1070;\n  display: block;\n  max-width: 276px;\n  font-family: var(--bs-font-sans-serif);\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  white-space: normal;\n  line-break: auto;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n}\n.popover .popover-arrow {\n  position: absolute;\n  display: block;\n  width: 1rem;\n  height: 0.5rem;\n}\n.popover .popover-arrow::before, .popover .popover-arrow::after {\n  position: absolute;\n  display: block;\n  content: \"\";\n  border-color: transparent;\n  border-style: solid;\n}\n\n.bs-popover-top > .popover-arrow, .bs-popover-auto[data-popper-placement^=top] > .popover-arrow {\n  bottom: calc(-0.5rem - 1px);\n}\n.bs-popover-top > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=top] > .popover-arrow::before {\n  bottom: 0;\n  border-width: 0.5rem 0.5rem 0;\n  border-top-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-top > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=top] > .popover-arrow::after {\n  bottom: 1px;\n  border-width: 0.5rem 0.5rem 0;\n  border-top-color: #fff;\n}\n\n.bs-popover-end > .popover-arrow, .bs-popover-auto[data-popper-placement^=right] > .popover-arrow {\n  left: calc(-0.5rem - 1px);\n  width: 0.5rem;\n  height: 1rem;\n}\n.bs-popover-end > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=right] > .popover-arrow::before {\n  left: 0;\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-end > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=right] > .popover-arrow::after {\n  left: 1px;\n  border-width: 0.5rem 0.5rem 0.5rem 0;\n  border-right-color: #fff;\n}\n\n.bs-popover-bottom > .popover-arrow, .bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow {\n  top: calc(-0.5rem - 1px);\n}\n.bs-popover-bottom > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow::before {\n  top: 0;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-bottom > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=bottom] > .popover-arrow::after {\n  top: 1px;\n  border-width: 0 0.5rem 0.5rem 0.5rem;\n  border-bottom-color: #fff;\n}\n.bs-popover-bottom .popover-header::before, .bs-popover-auto[data-popper-placement^=bottom] .popover-header::before {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  display: block;\n  width: 1rem;\n  margin-left: -0.5rem;\n  content: \"\";\n  border-bottom: 1px solid #f0f0f0;\n}\n\n.bs-popover-start > .popover-arrow, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow {\n  right: calc(-0.5rem - 1px);\n  width: 0.5rem;\n  height: 1rem;\n}\n.bs-popover-start > .popover-arrow::before, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow::before {\n  right: 0;\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n.bs-popover-start > .popover-arrow::after, .bs-popover-auto[data-popper-placement^=left] > .popover-arrow::after {\n  right: 1px;\n  border-width: 0.5rem 0 0.5rem 0.5rem;\n  border-left-color: #fff;\n}\n\n.popover-header {\n  padding: 0.5rem 1rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f0f0f0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  border-top-left-radius: calc(0.3rem - 1px);\n  border-top-right-radius: calc(0.3rem - 1px);\n}\n.popover-header:empty {\n  display: none;\n}\n\n.popover-body {\n  padding: 1rem 1rem;\n  color: #212529;\n}\n\n.carousel {\n  position: relative;\n}\n\n.carousel.pointer-event {\n  touch-action: pan-y;\n}\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.carousel-inner::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n\n.carousel-item {\n  position: relative;\n  display: none;\n  float: left;\n  width: 100%;\n  margin-right: -100%;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  transition: transform 0.6s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-item {\n    transition: none;\n  }\n}\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: block;\n}\n\n/* rtl:begin:ignore */\n.carousel-item-next:not(.carousel-item-start),\n.active.carousel-item-end {\n  transform: translateX(100%);\n}\n\n.carousel-item-prev:not(.carousel-item-end),\n.active.carousel-item-start {\n  transform: translateX(-100%);\n}\n\n/* rtl:end:ignore */\n.carousel-fade .carousel-item {\n  opacity: 0;\n  transition-property: opacity;\n  transform: none;\n}\n.carousel-fade .carousel-item.active,\n.carousel-fade .carousel-item-next.carousel-item-start,\n.carousel-fade .carousel-item-prev.carousel-item-end {\n  z-index: 1;\n  opacity: 1;\n}\n.carousel-fade .active.carousel-item-start,\n.carousel-fade .active.carousel-item-end {\n  z-index: 0;\n  opacity: 0;\n  transition: opacity 0s 0.6s;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-fade .active.carousel-item-start,\n.carousel-fade .active.carousel-item-end {\n    transition: none;\n  }\n}\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 15%;\n  padding: 0;\n  color: #fff;\n  text-align: center;\n  background: none;\n  border: 0;\n  opacity: 0.5;\n  transition: opacity 0.15s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-control-prev,\n.carousel-control-next {\n    transition: none;\n  }\n}\n.carousel-control-prev:hover, .carousel-control-prev:focus,\n.carousel-control-next:hover,\n.carousel-control-next:focus {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  opacity: 0.9;\n}\n\n.carousel-control-prev {\n  left: 0;\n}\n\n.carousel-control-next {\n  right: 0;\n}\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  background-repeat: no-repeat;\n  background-position: 50%;\n  background-size: 100% 100%;\n}\n\n/* rtl:options: {\n  \"autoRename\": true,\n  \"stringMap\":[ {\n    \"name\"    : \"prev-next\",\n    \"search\"  : \"prev\",\n    \"replace\" : \"next\"\n  } ]\n} */\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e\");\n}\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e\");\n}\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 2;\n  display: flex;\n  justify-content: center;\n  padding: 0;\n  margin-right: 15%;\n  margin-bottom: 1rem;\n  margin-left: 15%;\n  list-style: none;\n}\n.carousel-indicators [data-bs-target] {\n  box-sizing: content-box;\n  flex: 0 1 auto;\n  width: 30px;\n  height: 3px;\n  padding: 0;\n  margin-right: 3px;\n  margin-left: 3px;\n  text-indent: -999px;\n  cursor: pointer;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 0;\n  border-top: 10px solid transparent;\n  border-bottom: 10px solid transparent;\n  opacity: 0.5;\n  transition: opacity 0.6s ease;\n}\n@media (prefers-reduced-motion: reduce) {\n  .carousel-indicators [data-bs-target] {\n    transition: none;\n  }\n}\n.carousel-indicators .active {\n  opacity: 1;\n}\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 1.25rem;\n  left: 15%;\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n  color: #fff;\n  text-align: center;\n}\n\n.carousel-dark .carousel-control-prev-icon,\n.carousel-dark .carousel-control-next-icon {\n  filter: invert(1) grayscale(100);\n}\n.carousel-dark .carousel-indicators [data-bs-target] {\n  background-color: #000;\n}\n.carousel-dark .carousel-caption {\n  color: #000;\n}\n\n@-webkit-keyframes spinner-border {\n  to {\n    transform: rotate(360deg) /* rtl:ignore */;\n  }\n}\n\n@keyframes spinner-border {\n  to {\n    transform: rotate(360deg) /* rtl:ignore */;\n  }\n}\n.spinner-border {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: -0.125em;\n  border: 0.25em solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  -webkit-animation: 0.75s linear infinite spinner-border;\n  animation: 0.75s linear infinite spinner-border;\n}\n\n.spinner-border-sm {\n  width: 1rem;\n  height: 1rem;\n  border-width: 0.2em;\n}\n\n@-webkit-keyframes spinner-grow {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n    transform: none;\n  }\n}\n\n@keyframes spinner-grow {\n  0% {\n    transform: scale(0);\n  }\n  50% {\n    opacity: 1;\n    transform: none;\n  }\n}\n.spinner-grow {\n  display: inline-block;\n  width: 2rem;\n  height: 2rem;\n  vertical-align: -0.125em;\n  background-color: currentColor;\n  border-radius: 50%;\n  opacity: 0;\n  -webkit-animation: 0.75s linear infinite spinner-grow;\n  animation: 0.75s linear infinite spinner-grow;\n}\n\n.spinner-grow-sm {\n  width: 1rem;\n  height: 1rem;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .spinner-border,\n.spinner-grow {\n    -webkit-animation-duration: 1.5s;\n    animation-duration: 1.5s;\n  }\n}\n.offcanvas {\n  position: fixed;\n  bottom: 0;\n  z-index: 1045;\n  display: flex;\n  flex-direction: column;\n  max-width: 100%;\n  visibility: hidden;\n  background-color: #fff;\n  background-clip: padding-box;\n  outline: 0;\n  transition: transform 0.3s ease-in-out;\n}\n@media (prefers-reduced-motion: reduce) {\n  .offcanvas {\n    transition: none;\n  }\n}\n\n.offcanvas-backdrop {\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 1040;\n  width: 100vw;\n  height: 100vh;\n  background-color: #000;\n}\n.offcanvas-backdrop.fade {\n  opacity: 0;\n}\n.offcanvas-backdrop.show {\n  opacity: 0.5;\n}\n\n.offcanvas-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 1rem 1rem;\n}\n.offcanvas-header .btn-close {\n  padding: 0.5rem 0.5rem;\n  margin-top: -0.5rem;\n  margin-right: -0.5rem;\n  margin-bottom: -0.5rem;\n}\n\n.offcanvas-title {\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n\n.offcanvas-body {\n  flex-grow: 1;\n  padding: 1rem 1rem;\n  overflow-y: auto;\n}\n\n.offcanvas-start {\n  top: 0;\n  left: 0;\n  width: 400px;\n  border-right: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateX(-100%);\n}\n\n.offcanvas-end {\n  top: 0;\n  right: 0;\n  width: 400px;\n  border-left: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateX(100%);\n}\n\n.offcanvas-top {\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 30vh;\n  max-height: 100%;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateY(-100%);\n}\n\n.offcanvas-bottom {\n  right: 0;\n  left: 0;\n  height: 30vh;\n  max-height: 100%;\n  border-top: 1px solid rgba(0, 0, 0, 0.2);\n  transform: translateY(100%);\n}\n\n.offcanvas.show {\n  transform: none;\n}\n\n.placeholder {\n  display: inline-block;\n  min-height: 1em;\n  vertical-align: middle;\n  cursor: wait;\n  background-color: currentColor;\n  opacity: 0.5;\n}\n.placeholder.btn::before {\n  display: inline-block;\n  content: \"\";\n}\n\n.placeholder-xs {\n  min-height: 0.6em;\n}\n\n.placeholder-sm {\n  min-height: 0.8em;\n}\n\n.placeholder-lg {\n  min-height: 1.2em;\n}\n\n.placeholder-glow .placeholder {\n  -webkit-animation: placeholder-glow 2s ease-in-out infinite;\n  animation: placeholder-glow 2s ease-in-out infinite;\n}\n\n@-webkit-keyframes placeholder-glow {\n  50% {\n    opacity: 0.2;\n  }\n}\n\n@keyframes placeholder-glow {\n  50% {\n    opacity: 0.2;\n  }\n}\n.placeholder-wave {\n  -webkit-mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);\n  mask-image: linear-gradient(130deg, #000 55%, rgba(0, 0, 0, 0.8) 75%, #000 95%);\n  -webkit-mask-size: 200% 100%;\n  mask-size: 200% 100%;\n  -webkit-animation: placeholder-wave 2s linear infinite;\n  animation: placeholder-wave 2s linear infinite;\n}\n\n@-webkit-keyframes placeholder-wave {\n  100% {\n    -webkit-mask-position: -200% 0%;\n    mask-position: -200% 0%;\n  }\n}\n\n@keyframes placeholder-wave {\n  100% {\n    -webkit-mask-position: -200% 0%;\n    mask-position: -200% 0%;\n  }\n}\n.clearfix::after {\n  display: block;\n  clear: both;\n  content: \"\";\n}\n\n.link-primary {\n  color: #0d6efd;\n}\n.link-primary:hover, .link-primary:focus {\n  color: #0a58ca;\n}\n\n.link-secondary {\n  color: #6c757d;\n}\n.link-secondary:hover, .link-secondary:focus {\n  color: #565e64;\n}\n\n.link-success {\n  color: #198754;\n}\n.link-success:hover, .link-success:focus {\n  color: #146c43;\n}\n\n.link-info {\n  color: #0dcaf0;\n}\n.link-info:hover, .link-info:focus {\n  color: #3dd5f3;\n}\n\n.link-warning {\n  color: #ffc107;\n}\n.link-warning:hover, .link-warning:focus {\n  color: #ffcd39;\n}\n\n.link-danger {\n  color: #dc3545;\n}\n.link-danger:hover, .link-danger:focus {\n  color: #b02a37;\n}\n\n.link-light {\n  color: #f8f9fa;\n}\n.link-light:hover, .link-light:focus {\n  color: #f9fafb;\n}\n\n.link-dark {\n  color: #212529;\n}\n.link-dark:hover, .link-dark:focus {\n  color: #1a1e21;\n}\n\n.ratio {\n  position: relative;\n  width: 100%;\n}\n.ratio::before {\n  display: block;\n  padding-top: var(--bs-aspect-ratio);\n  content: \"\";\n}\n.ratio > * {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.ratio-1x1 {\n  --bs-aspect-ratio: 100%;\n}\n\n.ratio-4x3 {\n  --bs-aspect-ratio: 75%;\n}\n\n.ratio-16x9 {\n  --bs-aspect-ratio: 56.25%;\n}\n\n.ratio-21x9 {\n  --bs-aspect-ratio: 42.8571428571%;\n}\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n.sticky-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1020;\n}\n\n@media (min-width: 576px) {\n  .sticky-sm-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n@media (min-width: 768px) {\n  .sticky-md-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n@media (min-width: 992px) {\n  .sticky-lg-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n@media (min-width: 1200px) {\n  .sticky-xl-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n@media (min-width: 1400px) {\n  .sticky-xxl-top {\n    position: -webkit-sticky;\n    position: sticky;\n    top: 0;\n    z-index: 1020;\n  }\n}\n.hstack {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  align-self: stretch;\n}\n\n.vstack {\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n  align-self: stretch;\n}\n\n.visually-hidden,\n.visually-hidden-focusable:not(:focus):not(:focus-within) {\n  position: absolute !important;\n  width: 1px !important;\n  height: 1px !important;\n  padding: 0 !important;\n  margin: -1px !important;\n  overflow: hidden !important;\n  clip: rect(0, 0, 0, 0) !important;\n  white-space: nowrap !important;\n  border: 0 !important;\n}\n\n.stretched-link::after {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1;\n  content: \"\";\n}\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.vr {\n  display: inline-block;\n  align-self: stretch;\n  width: 1px;\n  min-height: 1em;\n  background-color: currentColor;\n  opacity: 0.25;\n}\n\n.align-baseline {\n  vertical-align: baseline !important;\n}\n\n.align-top {\n  vertical-align: top !important;\n}\n\n.align-middle {\n  vertical-align: middle !important;\n}\n\n.align-bottom {\n  vertical-align: bottom !important;\n}\n\n.align-text-bottom {\n  vertical-align: text-bottom !important;\n}\n\n.align-text-top {\n  vertical-align: text-top !important;\n}\n\n.float-start {\n  float: left !important;\n}\n\n.float-end {\n  float: right !important;\n}\n\n.float-none {\n  float: none !important;\n}\n\n.opacity-0 {\n  opacity: 0 !important;\n}\n\n.opacity-25 {\n  opacity: 0.25 !important;\n}\n\n.opacity-50 {\n  opacity: 0.5 !important;\n}\n\n.opacity-75 {\n  opacity: 0.75 !important;\n}\n\n.opacity-100 {\n  opacity: 1 !important;\n}\n\n.overflow-auto {\n  overflow: auto !important;\n}\n\n.overflow-hidden {\n  overflow: hidden !important;\n}\n\n.overflow-visible {\n  overflow: visible !important;\n}\n\n.overflow-scroll {\n  overflow: scroll !important;\n}\n\n.d-inline {\n  display: inline !important;\n}\n\n.d-inline-block {\n  display: inline-block !important;\n}\n\n.d-block {\n  display: block !important;\n}\n\n.d-grid {\n  display: grid !important;\n}\n\n.d-table {\n  display: table !important;\n}\n\n.d-table-row {\n  display: table-row !important;\n}\n\n.d-table-cell {\n  display: table-cell !important;\n}\n\n.d-flex {\n  display: flex !important;\n}\n\n.d-inline-flex {\n  display: inline-flex !important;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.shadow {\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;\n}\n\n.shadow-sm {\n  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;\n}\n\n.shadow-lg {\n  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;\n}\n\n.shadow-none {\n  box-shadow: none !important;\n}\n\n.position-static {\n  position: static !important;\n}\n\n.position-relative {\n  position: relative !important;\n}\n\n.position-absolute {\n  position: absolute !important;\n}\n\n.position-fixed {\n  position: fixed !important;\n}\n\n.position-sticky {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n}\n\n.top-0 {\n  top: 0 !important;\n}\n\n.top-50 {\n  top: 50% !important;\n}\n\n.top-100 {\n  top: 100% !important;\n}\n\n.bottom-0 {\n  bottom: 0 !important;\n}\n\n.bottom-50 {\n  bottom: 50% !important;\n}\n\n.bottom-100 {\n  bottom: 100% !important;\n}\n\n.start-0 {\n  left: 0 !important;\n}\n\n.start-50 {\n  left: 50% !important;\n}\n\n.start-100 {\n  left: 100% !important;\n}\n\n.end-0 {\n  right: 0 !important;\n}\n\n.end-50 {\n  right: 50% !important;\n}\n\n.end-100 {\n  right: 100% !important;\n}\n\n.translate-middle {\n  transform: translate(-50%, -50%) !important;\n}\n\n.translate-middle-x {\n  transform: translateX(-50%) !important;\n}\n\n.translate-middle-y {\n  transform: translateY(-50%) !important;\n}\n\n.border {\n  border: 1px solid #dee2e6 !important;\n}\n\n.border-0 {\n  border: 0 !important;\n}\n\n.border-top {\n  border-top: 1px solid #dee2e6 !important;\n}\n\n.border-top-0 {\n  border-top: 0 !important;\n}\n\n.border-end {\n  border-right: 1px solid #dee2e6 !important;\n}\n\n.border-end-0 {\n  border-right: 0 !important;\n}\n\n.border-bottom {\n  border-bottom: 1px solid #dee2e6 !important;\n}\n\n.border-bottom-0 {\n  border-bottom: 0 !important;\n}\n\n.border-start {\n  border-left: 1px solid #dee2e6 !important;\n}\n\n.border-start-0 {\n  border-left: 0 !important;\n}\n\n.border-primary {\n  border-color: #0d6efd !important;\n}\n\n.border-secondary {\n  border-color: #6c757d !important;\n}\n\n.border-success {\n  border-color: #198754 !important;\n}\n\n.border-info {\n  border-color: #0dcaf0 !important;\n}\n\n.border-warning {\n  border-color: #ffc107 !important;\n}\n\n.border-danger {\n  border-color: #dc3545 !important;\n}\n\n.border-light {\n  border-color: #f8f9fa !important;\n}\n\n.border-dark {\n  border-color: #212529 !important;\n}\n\n.border-white {\n  border-color: #fff !important;\n}\n\n.border-1 {\n  border-width: 1px !important;\n}\n\n.border-2 {\n  border-width: 2px !important;\n}\n\n.border-3 {\n  border-width: 3px !important;\n}\n\n.border-4 {\n  border-width: 4px !important;\n}\n\n.border-5 {\n  border-width: 5px !important;\n}\n\n.w-25 {\n  width: 25% !important;\n}\n\n.w-50 {\n  width: 50% !important;\n}\n\n.w-75 {\n  width: 75% !important;\n}\n\n.w-100 {\n  width: 100% !important;\n}\n\n.w-auto {\n  width: auto !important;\n}\n\n.mw-100 {\n  max-width: 100% !important;\n}\n\n.vw-100 {\n  width: 100vw !important;\n}\n\n.min-vw-100 {\n  min-width: 100vw !important;\n}\n\n.h-25 {\n  height: 25% !important;\n}\n\n.h-50 {\n  height: 50% !important;\n}\n\n.h-75 {\n  height: 75% !important;\n}\n\n.h-100 {\n  height: 100% !important;\n}\n\n.h-auto {\n  height: auto !important;\n}\n\n.mh-100 {\n  max-height: 100% !important;\n}\n\n.vh-100 {\n  height: 100vh !important;\n}\n\n.min-vh-100 {\n  min-height: 100vh !important;\n}\n\n.flex-fill {\n  flex: 1 1 auto !important;\n}\n\n.flex-row {\n  flex-direction: row !important;\n}\n\n.flex-column {\n  flex-direction: column !important;\n}\n\n.flex-row-reverse {\n  flex-direction: row-reverse !important;\n}\n\n.flex-column-reverse {\n  flex-direction: column-reverse !important;\n}\n\n.flex-grow-0 {\n  flex-grow: 0 !important;\n}\n\n.flex-grow-1 {\n  flex-grow: 1 !important;\n}\n\n.flex-shrink-0 {\n  flex-shrink: 0 !important;\n}\n\n.flex-shrink-1 {\n  flex-shrink: 1 !important;\n}\n\n.flex-wrap {\n  flex-wrap: wrap !important;\n}\n\n.flex-nowrap {\n  flex-wrap: nowrap !important;\n}\n\n.flex-wrap-reverse {\n  flex-wrap: wrap-reverse !important;\n}\n\n.gap-0 {\n  gap: 0 !important;\n}\n\n.gap-1 {\n  gap: 0.25rem !important;\n}\n\n.gap-2 {\n  gap: 0.5rem !important;\n}\n\n.gap-3 {\n  gap: 1rem !important;\n}\n\n.gap-4 {\n  gap: 1.5rem !important;\n}\n\n.gap-5 {\n  gap: 3rem !important;\n}\n\n.justify-content-start {\n  justify-content: flex-start !important;\n}\n\n.justify-content-end {\n  justify-content: flex-end !important;\n}\n\n.justify-content-center {\n  justify-content: center !important;\n}\n\n.justify-content-between {\n  justify-content: space-between !important;\n}\n\n.justify-content-around {\n  justify-content: space-around !important;\n}\n\n.justify-content-evenly {\n  justify-content: space-evenly !important;\n}\n\n.align-items-start {\n  align-items: flex-start !important;\n}\n\n.align-items-end {\n  align-items: flex-end !important;\n}\n\n.align-items-center {\n  align-items: center !important;\n}\n\n.align-items-baseline {\n  align-items: baseline !important;\n}\n\n.align-items-stretch {\n  align-items: stretch !important;\n}\n\n.align-content-start {\n  align-content: flex-start !important;\n}\n\n.align-content-end {\n  align-content: flex-end !important;\n}\n\n.align-content-center {\n  align-content: center !important;\n}\n\n.align-content-between {\n  align-content: space-between !important;\n}\n\n.align-content-around {\n  align-content: space-around !important;\n}\n\n.align-content-stretch {\n  align-content: stretch !important;\n}\n\n.align-self-auto {\n  align-self: auto !important;\n}\n\n.align-self-start {\n  align-self: flex-start !important;\n}\n\n.align-self-end {\n  align-self: flex-end !important;\n}\n\n.align-self-center {\n  align-self: center !important;\n}\n\n.align-self-baseline {\n  align-self: baseline !important;\n}\n\n.align-self-stretch {\n  align-self: stretch !important;\n}\n\n.order-first {\n  order: -1 !important;\n}\n\n.order-0 {\n  order: 0 !important;\n}\n\n.order-1 {\n  order: 1 !important;\n}\n\n.order-2 {\n  order: 2 !important;\n}\n\n.order-3 {\n  order: 3 !important;\n}\n\n.order-4 {\n  order: 4 !important;\n}\n\n.order-5 {\n  order: 5 !important;\n}\n\n.order-last {\n  order: 6 !important;\n}\n\n.m-0 {\n  margin: 0 !important;\n}\n\n.m-1 {\n  margin: 0.25rem !important;\n}\n\n.m-2 {\n  margin: 0.5rem !important;\n}\n\n.m-3 {\n  margin: 1rem !important;\n}\n\n.m-4 {\n  margin: 1.5rem !important;\n}\n\n.m-5 {\n  margin: 3rem !important;\n}\n\n.m-auto {\n  margin: auto !important;\n}\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important;\n}\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important;\n}\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important;\n}\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important;\n}\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important;\n}\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important;\n}\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important;\n}\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n}\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important;\n}\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important;\n}\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important;\n}\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important;\n}\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important;\n}\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important;\n}\n\n.mt-0 {\n  margin-top: 0 !important;\n}\n\n.mt-1 {\n  margin-top: 0.25rem !important;\n}\n\n.mt-2 {\n  margin-top: 0.5rem !important;\n}\n\n.mt-3 {\n  margin-top: 1rem !important;\n}\n\n.mt-4 {\n  margin-top: 1.5rem !important;\n}\n\n.mt-5 {\n  margin-top: 3rem !important;\n}\n\n.mt-auto {\n  margin-top: auto !important;\n}\n\n.me-0 {\n  margin-right: 0 !important;\n}\n\n.me-1 {\n  margin-right: 0.25rem !important;\n}\n\n.me-2 {\n  margin-right: 0.5rem !important;\n}\n\n.me-3 {\n  margin-right: 1rem !important;\n}\n\n.me-4 {\n  margin-right: 1.5rem !important;\n}\n\n.me-5 {\n  margin-right: 3rem !important;\n}\n\n.me-auto {\n  margin-right: auto !important;\n}\n\n.mb-0 {\n  margin-bottom: 0 !important;\n}\n\n.mb-1 {\n  margin-bottom: 0.25rem !important;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem !important;\n}\n\n.mb-3 {\n  margin-bottom: 1rem !important;\n}\n\n.mb-4 {\n  margin-bottom: 1.5rem !important;\n}\n\n.mb-5 {\n  margin-bottom: 3rem !important;\n}\n\n.mb-auto {\n  margin-bottom: auto !important;\n}\n\n.ms-0 {\n  margin-left: 0 !important;\n}\n\n.ms-1 {\n  margin-left: 0.25rem !important;\n}\n\n.ms-2 {\n  margin-left: 0.5rem !important;\n}\n\n.ms-3 {\n  margin-left: 1rem !important;\n}\n\n.ms-4 {\n  margin-left: 1.5rem !important;\n}\n\n.ms-5 {\n  margin-left: 3rem !important;\n}\n\n.ms-auto {\n  margin-left: auto !important;\n}\n\n.p-0 {\n  padding: 0 !important;\n}\n\n.p-1 {\n  padding: 0.25rem !important;\n}\n\n.p-2 {\n  padding: 0.5rem !important;\n}\n\n.p-3 {\n  padding: 1rem !important;\n}\n\n.p-4 {\n  padding: 1.5rem !important;\n}\n\n.p-5 {\n  padding: 3rem !important;\n}\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important;\n}\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important;\n}\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important;\n}\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important;\n}\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important;\n}\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important;\n}\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n}\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important;\n}\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important;\n}\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important;\n}\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important;\n}\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important;\n}\n\n.pt-0 {\n  padding-top: 0 !important;\n}\n\n.pt-1 {\n  padding-top: 0.25rem !important;\n}\n\n.pt-2 {\n  padding-top: 0.5rem !important;\n}\n\n.pt-3 {\n  padding-top: 1rem !important;\n}\n\n.pt-4 {\n  padding-top: 1.5rem !important;\n}\n\n.pt-5 {\n  padding-top: 3rem !important;\n}\n\n.pe-0 {\n  padding-right: 0 !important;\n}\n\n.pe-1 {\n  padding-right: 0.25rem !important;\n}\n\n.pe-2 {\n  padding-right: 0.5rem !important;\n}\n\n.pe-3 {\n  padding-right: 1rem !important;\n}\n\n.pe-4 {\n  padding-right: 1.5rem !important;\n}\n\n.pe-5 {\n  padding-right: 3rem !important;\n}\n\n.pb-0 {\n  padding-bottom: 0 !important;\n}\n\n.pb-1 {\n  padding-bottom: 0.25rem !important;\n}\n\n.pb-2 {\n  padding-bottom: 0.5rem !important;\n}\n\n.pb-3 {\n  padding-bottom: 1rem !important;\n}\n\n.pb-4 {\n  padding-bottom: 1.5rem !important;\n}\n\n.pb-5 {\n  padding-bottom: 3rem !important;\n}\n\n.ps-0 {\n  padding-left: 0 !important;\n}\n\n.ps-1 {\n  padding-left: 0.25rem !important;\n}\n\n.ps-2 {\n  padding-left: 0.5rem !important;\n}\n\n.ps-3 {\n  padding-left: 1rem !important;\n}\n\n.ps-4 {\n  padding-left: 1.5rem !important;\n}\n\n.ps-5 {\n  padding-left: 3rem !important;\n}\n\n.font-monospace {\n  font-family: var(--bs-font-monospace) !important;\n}\n\n.fs-1 {\n  font-size: calc(1.375rem + 1.5vw) !important;\n}\n\n.fs-2 {\n  font-size: calc(1.325rem + 0.9vw) !important;\n}\n\n.fs-3 {\n  font-size: calc(1.3rem + 0.6vw) !important;\n}\n\n.fs-4 {\n  font-size: calc(1.275rem + 0.3vw) !important;\n}\n\n.fs-5 {\n  font-size: 1.25rem !important;\n}\n\n.fs-6 {\n  font-size: 1rem !important;\n}\n\n.fst-italic {\n  font-style: italic !important;\n}\n\n.fst-normal {\n  font-style: normal !important;\n}\n\n.fw-light {\n  font-weight: 300 !important;\n}\n\n.fw-lighter {\n  font-weight: lighter !important;\n}\n\n.fw-normal {\n  font-weight: 400 !important;\n}\n\n.fw-bold {\n  font-weight: 700 !important;\n}\n\n.fw-bolder {\n  font-weight: bolder !important;\n}\n\n.lh-1 {\n  line-height: 1 !important;\n}\n\n.lh-sm {\n  line-height: 1.25 !important;\n}\n\n.lh-base {\n  line-height: 1.5 !important;\n}\n\n.lh-lg {\n  line-height: 2 !important;\n}\n\n.text-start {\n  text-align: left !important;\n}\n\n.text-end {\n  text-align: right !important;\n}\n\n.text-center {\n  text-align: center !important;\n}\n\n.text-decoration-none {\n  text-decoration: none !important;\n}\n\n.text-decoration-underline {\n  text-decoration: underline !important;\n}\n\n.text-decoration-line-through {\n  text-decoration: line-through !important;\n}\n\n.text-lowercase {\n  text-transform: lowercase !important;\n}\n\n.text-uppercase {\n  text-transform: uppercase !important;\n}\n\n.text-capitalize {\n  text-transform: capitalize !important;\n}\n\n.text-wrap {\n  white-space: normal !important;\n}\n\n.text-nowrap {\n  white-space: nowrap !important;\n}\n\n/* rtl:begin:remove */\n.text-break {\n  word-wrap: break-word !important;\n  word-break: break-word !important;\n}\n\n/* rtl:end:remove */\n.text-primary {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-primary-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-secondary {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-secondary-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-success {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-success-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-info {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-info-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-warning {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-warning-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-danger {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-danger-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-light {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-light-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-dark {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-dark-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-black {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-black-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-white {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-white-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-body {\n  --bs-text-opacity: 1;\n  color: rgba(var(--bs-body-color-rgb), var(--bs-text-opacity)) !important;\n}\n\n.text-muted {\n  --bs-text-opacity: 1;\n  color: #6c757d !important;\n}\n\n.text-black-50 {\n  --bs-text-opacity: 1;\n  color: rgba(0, 0, 0, 0.5) !important;\n}\n\n.text-white-50 {\n  --bs-text-opacity: 1;\n  color: rgba(255, 255, 255, 0.5) !important;\n}\n\n.text-reset {\n  --bs-text-opacity: 1;\n  color: inherit !important;\n}\n\n.text-opacity-25 {\n  --bs-text-opacity: 0.25;\n}\n\n.text-opacity-50 {\n  --bs-text-opacity: 0.5;\n}\n\n.text-opacity-75 {\n  --bs-text-opacity: 0.75;\n}\n\n.text-opacity-100 {\n  --bs-text-opacity: 1;\n}\n\n.bg-primary {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-secondary {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-secondary-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-success {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-success-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-info {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-info-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-warning {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-warning-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-danger {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-danger-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-light {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-light-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-dark {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-black {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-black-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-white {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-white-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-body {\n  --bs-bg-opacity: 1;\n  background-color: rgba(var(--bs-body-bg-rgb), var(--bs-bg-opacity)) !important;\n}\n\n.bg-transparent {\n  --bs-bg-opacity: 1;\n  background-color: transparent !important;\n}\n\n.bg-opacity-10 {\n  --bs-bg-opacity: 0.1;\n}\n\n.bg-opacity-25 {\n  --bs-bg-opacity: 0.25;\n}\n\n.bg-opacity-50 {\n  --bs-bg-opacity: 0.5;\n}\n\n.bg-opacity-75 {\n  --bs-bg-opacity: 0.75;\n}\n\n.bg-opacity-100 {\n  --bs-bg-opacity: 1;\n}\n\n.bg-gradient {\n  background-image: var(--bs-gradient) !important;\n}\n\n.user-select-all {\n  -webkit-user-select: all !important;\n  -moz-user-select: all !important;\n  user-select: all !important;\n}\n\n.user-select-auto {\n  -webkit-user-select: auto !important;\n  -moz-user-select: auto !important;\n  user-select: auto !important;\n}\n\n.user-select-none {\n  -webkit-user-select: none !important;\n  -moz-user-select: none !important;\n  user-select: none !important;\n}\n\n.pe-none {\n  pointer-events: none !important;\n}\n\n.pe-auto {\n  pointer-events: auto !important;\n}\n\n.rounded {\n  border-radius: 0.25rem !important;\n}\n\n.rounded-0 {\n  border-radius: 0 !important;\n}\n\n.rounded-1 {\n  border-radius: 0.2rem !important;\n}\n\n.rounded-2 {\n  border-radius: 0.25rem !important;\n}\n\n.rounded-3 {\n  border-radius: 0.3rem !important;\n}\n\n.rounded-circle {\n  border-radius: 50% !important;\n}\n\n.rounded-pill {\n  border-radius: 50rem !important;\n}\n\n.rounded-top {\n  border-top-left-radius: 0.25rem !important;\n  border-top-right-radius: 0.25rem !important;\n}\n\n.rounded-end {\n  border-top-right-radius: 0.25rem !important;\n  border-bottom-right-radius: 0.25rem !important;\n}\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem !important;\n  border-bottom-left-radius: 0.25rem !important;\n}\n\n.rounded-start {\n  border-bottom-left-radius: 0.25rem !important;\n  border-top-left-radius: 0.25rem !important;\n}\n\n.visible {\n  visibility: visible !important;\n}\n\n.invisible {\n  visibility: hidden !important;\n}\n\n@media (min-width: 576px) {\n  .float-sm-start {\n    float: left !important;\n  }\n\n  .float-sm-end {\n    float: right !important;\n  }\n\n  .float-sm-none {\n    float: none !important;\n  }\n\n  .d-sm-inline {\n    display: inline !important;\n  }\n\n  .d-sm-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-sm-block {\n    display: block !important;\n  }\n\n  .d-sm-grid {\n    display: grid !important;\n  }\n\n  .d-sm-table {\n    display: table !important;\n  }\n\n  .d-sm-table-row {\n    display: table-row !important;\n  }\n\n  .d-sm-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-sm-flex {\n    display: flex !important;\n  }\n\n  .d-sm-inline-flex {\n    display: inline-flex !important;\n  }\n\n  .d-sm-none {\n    display: none !important;\n  }\n\n  .flex-sm-fill {\n    flex: 1 1 auto !important;\n  }\n\n  .flex-sm-row {\n    flex-direction: row !important;\n  }\n\n  .flex-sm-column {\n    flex-direction: column !important;\n  }\n\n  .flex-sm-row-reverse {\n    flex-direction: row-reverse !important;\n  }\n\n  .flex-sm-column-reverse {\n    flex-direction: column-reverse !important;\n  }\n\n  .flex-sm-grow-0 {\n    flex-grow: 0 !important;\n  }\n\n  .flex-sm-grow-1 {\n    flex-grow: 1 !important;\n  }\n\n  .flex-sm-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-sm-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .flex-sm-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-sm-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-sm-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .gap-sm-0 {\n    gap: 0 !important;\n  }\n\n  .gap-sm-1 {\n    gap: 0.25rem !important;\n  }\n\n  .gap-sm-2 {\n    gap: 0.5rem !important;\n  }\n\n  .gap-sm-3 {\n    gap: 1rem !important;\n  }\n\n  .gap-sm-4 {\n    gap: 1.5rem !important;\n  }\n\n  .gap-sm-5 {\n    gap: 3rem !important;\n  }\n\n  .justify-content-sm-start {\n    justify-content: flex-start !important;\n  }\n\n  .justify-content-sm-end {\n    justify-content: flex-end !important;\n  }\n\n  .justify-content-sm-center {\n    justify-content: center !important;\n  }\n\n  .justify-content-sm-between {\n    justify-content: space-between !important;\n  }\n\n  .justify-content-sm-around {\n    justify-content: space-around !important;\n  }\n\n  .justify-content-sm-evenly {\n    justify-content: space-evenly !important;\n  }\n\n  .align-items-sm-start {\n    align-items: flex-start !important;\n  }\n\n  .align-items-sm-end {\n    align-items: flex-end !important;\n  }\n\n  .align-items-sm-center {\n    align-items: center !important;\n  }\n\n  .align-items-sm-baseline {\n    align-items: baseline !important;\n  }\n\n  .align-items-sm-stretch {\n    align-items: stretch !important;\n  }\n\n  .align-content-sm-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-sm-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-sm-center {\n    align-content: center !important;\n  }\n\n  .align-content-sm-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-sm-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-sm-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-sm-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-sm-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-sm-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-sm-center {\n    align-self: center !important;\n  }\n\n  .align-self-sm-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-sm-stretch {\n    align-self: stretch !important;\n  }\n\n  .order-sm-first {\n    order: -1 !important;\n  }\n\n  .order-sm-0 {\n    order: 0 !important;\n  }\n\n  .order-sm-1 {\n    order: 1 !important;\n  }\n\n  .order-sm-2 {\n    order: 2 !important;\n  }\n\n  .order-sm-3 {\n    order: 3 !important;\n  }\n\n  .order-sm-4 {\n    order: 4 !important;\n  }\n\n  .order-sm-5 {\n    order: 5 !important;\n  }\n\n  .order-sm-last {\n    order: 6 !important;\n  }\n\n  .m-sm-0 {\n    margin: 0 !important;\n  }\n\n  .m-sm-1 {\n    margin: 0.25rem !important;\n  }\n\n  .m-sm-2 {\n    margin: 0.5rem !important;\n  }\n\n  .m-sm-3 {\n    margin: 1rem !important;\n  }\n\n  .m-sm-4 {\n    margin: 1.5rem !important;\n  }\n\n  .m-sm-5 {\n    margin: 3rem !important;\n  }\n\n  .m-sm-auto {\n    margin: auto !important;\n  }\n\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n\n  .mt-sm-0 {\n    margin-top: 0 !important;\n  }\n\n  .mt-sm-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mt-sm-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mt-sm-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mt-sm-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mt-sm-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mt-sm-auto {\n    margin-top: auto !important;\n  }\n\n  .me-sm-0 {\n    margin-right: 0 !important;\n  }\n\n  .me-sm-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .me-sm-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .me-sm-3 {\n    margin-right: 1rem !important;\n  }\n\n  .me-sm-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .me-sm-5 {\n    margin-right: 3rem !important;\n  }\n\n  .me-sm-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-sm-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .mb-sm-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .mb-sm-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .mb-sm-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ms-sm-0 {\n    margin-left: 0 !important;\n  }\n\n  .ms-sm-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .ms-sm-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .ms-sm-3 {\n    margin-left: 1rem !important;\n  }\n\n  .ms-sm-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .ms-sm-5 {\n    margin-left: 3rem !important;\n  }\n\n  .ms-sm-auto {\n    margin-left: auto !important;\n  }\n\n  .p-sm-0 {\n    padding: 0 !important;\n  }\n\n  .p-sm-1 {\n    padding: 0.25rem !important;\n  }\n\n  .p-sm-2 {\n    padding: 0.5rem !important;\n  }\n\n  .p-sm-3 {\n    padding: 1rem !important;\n  }\n\n  .p-sm-4 {\n    padding: 1.5rem !important;\n  }\n\n  .p-sm-5 {\n    padding: 3rem !important;\n  }\n\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n\n  .pt-sm-0 {\n    padding-top: 0 !important;\n  }\n\n  .pt-sm-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pt-sm-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pt-sm-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pt-sm-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pt-sm-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pe-sm-0 {\n    padding-right: 0 !important;\n  }\n\n  .pe-sm-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pe-sm-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pe-sm-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pe-sm-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pe-sm-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-sm-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pb-sm-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pb-sm-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .ps-sm-0 {\n    padding-left: 0 !important;\n  }\n\n  .ps-sm-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .ps-sm-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .ps-sm-3 {\n    padding-left: 1rem !important;\n  }\n\n  .ps-sm-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .ps-sm-5 {\n    padding-left: 3rem !important;\n  }\n\n  .text-sm-start {\n    text-align: left !important;\n  }\n\n  .text-sm-end {\n    text-align: right !important;\n  }\n\n  .text-sm-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 768px) {\n  .float-md-start {\n    float: left !important;\n  }\n\n  .float-md-end {\n    float: right !important;\n  }\n\n  .float-md-none {\n    float: none !important;\n  }\n\n  .d-md-inline {\n    display: inline !important;\n  }\n\n  .d-md-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-md-block {\n    display: block !important;\n  }\n\n  .d-md-grid {\n    display: grid !important;\n  }\n\n  .d-md-table {\n    display: table !important;\n  }\n\n  .d-md-table-row {\n    display: table-row !important;\n  }\n\n  .d-md-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-md-flex {\n    display: flex !important;\n  }\n\n  .d-md-inline-flex {\n    display: inline-flex !important;\n  }\n\n  .d-md-none {\n    display: none !important;\n  }\n\n  .flex-md-fill {\n    flex: 1 1 auto !important;\n  }\n\n  .flex-md-row {\n    flex-direction: row !important;\n  }\n\n  .flex-md-column {\n    flex-direction: column !important;\n  }\n\n  .flex-md-row-reverse {\n    flex-direction: row-reverse !important;\n  }\n\n  .flex-md-column-reverse {\n    flex-direction: column-reverse !important;\n  }\n\n  .flex-md-grow-0 {\n    flex-grow: 0 !important;\n  }\n\n  .flex-md-grow-1 {\n    flex-grow: 1 !important;\n  }\n\n  .flex-md-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-md-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .flex-md-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-md-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-md-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .gap-md-0 {\n    gap: 0 !important;\n  }\n\n  .gap-md-1 {\n    gap: 0.25rem !important;\n  }\n\n  .gap-md-2 {\n    gap: 0.5rem !important;\n  }\n\n  .gap-md-3 {\n    gap: 1rem !important;\n  }\n\n  .gap-md-4 {\n    gap: 1.5rem !important;\n  }\n\n  .gap-md-5 {\n    gap: 3rem !important;\n  }\n\n  .justify-content-md-start {\n    justify-content: flex-start !important;\n  }\n\n  .justify-content-md-end {\n    justify-content: flex-end !important;\n  }\n\n  .justify-content-md-center {\n    justify-content: center !important;\n  }\n\n  .justify-content-md-between {\n    justify-content: space-between !important;\n  }\n\n  .justify-content-md-around {\n    justify-content: space-around !important;\n  }\n\n  .justify-content-md-evenly {\n    justify-content: space-evenly !important;\n  }\n\n  .align-items-md-start {\n    align-items: flex-start !important;\n  }\n\n  .align-items-md-end {\n    align-items: flex-end !important;\n  }\n\n  .align-items-md-center {\n    align-items: center !important;\n  }\n\n  .align-items-md-baseline {\n    align-items: baseline !important;\n  }\n\n  .align-items-md-stretch {\n    align-items: stretch !important;\n  }\n\n  .align-content-md-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-md-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-md-center {\n    align-content: center !important;\n  }\n\n  .align-content-md-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-md-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-md-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-md-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-md-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-md-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-md-center {\n    align-self: center !important;\n  }\n\n  .align-self-md-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-md-stretch {\n    align-self: stretch !important;\n  }\n\n  .order-md-first {\n    order: -1 !important;\n  }\n\n  .order-md-0 {\n    order: 0 !important;\n  }\n\n  .order-md-1 {\n    order: 1 !important;\n  }\n\n  .order-md-2 {\n    order: 2 !important;\n  }\n\n  .order-md-3 {\n    order: 3 !important;\n  }\n\n  .order-md-4 {\n    order: 4 !important;\n  }\n\n  .order-md-5 {\n    order: 5 !important;\n  }\n\n  .order-md-last {\n    order: 6 !important;\n  }\n\n  .m-md-0 {\n    margin: 0 !important;\n  }\n\n  .m-md-1 {\n    margin: 0.25rem !important;\n  }\n\n  .m-md-2 {\n    margin: 0.5rem !important;\n  }\n\n  .m-md-3 {\n    margin: 1rem !important;\n  }\n\n  .m-md-4 {\n    margin: 1.5rem !important;\n  }\n\n  .m-md-5 {\n    margin: 3rem !important;\n  }\n\n  .m-md-auto {\n    margin: auto !important;\n  }\n\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n\n  .mt-md-0 {\n    margin-top: 0 !important;\n  }\n\n  .mt-md-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mt-md-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mt-md-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mt-md-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mt-md-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mt-md-auto {\n    margin-top: auto !important;\n  }\n\n  .me-md-0 {\n    margin-right: 0 !important;\n  }\n\n  .me-md-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .me-md-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .me-md-3 {\n    margin-right: 1rem !important;\n  }\n\n  .me-md-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .me-md-5 {\n    margin-right: 3rem !important;\n  }\n\n  .me-md-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-md-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .mb-md-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .mb-md-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .mb-md-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ms-md-0 {\n    margin-left: 0 !important;\n  }\n\n  .ms-md-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .ms-md-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .ms-md-3 {\n    margin-left: 1rem !important;\n  }\n\n  .ms-md-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .ms-md-5 {\n    margin-left: 3rem !important;\n  }\n\n  .ms-md-auto {\n    margin-left: auto !important;\n  }\n\n  .p-md-0 {\n    padding: 0 !important;\n  }\n\n  .p-md-1 {\n    padding: 0.25rem !important;\n  }\n\n  .p-md-2 {\n    padding: 0.5rem !important;\n  }\n\n  .p-md-3 {\n    padding: 1rem !important;\n  }\n\n  .p-md-4 {\n    padding: 1.5rem !important;\n  }\n\n  .p-md-5 {\n    padding: 3rem !important;\n  }\n\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n\n  .pt-md-0 {\n    padding-top: 0 !important;\n  }\n\n  .pt-md-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pt-md-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pt-md-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pt-md-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pt-md-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pe-md-0 {\n    padding-right: 0 !important;\n  }\n\n  .pe-md-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pe-md-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pe-md-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pe-md-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pe-md-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-md-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pb-md-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pb-md-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .ps-md-0 {\n    padding-left: 0 !important;\n  }\n\n  .ps-md-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .ps-md-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .ps-md-3 {\n    padding-left: 1rem !important;\n  }\n\n  .ps-md-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .ps-md-5 {\n    padding-left: 3rem !important;\n  }\n\n  .text-md-start {\n    text-align: left !important;\n  }\n\n  .text-md-end {\n    text-align: right !important;\n  }\n\n  .text-md-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 992px) {\n  .float-lg-start {\n    float: left !important;\n  }\n\n  .float-lg-end {\n    float: right !important;\n  }\n\n  .float-lg-none {\n    float: none !important;\n  }\n\n  .d-lg-inline {\n    display: inline !important;\n  }\n\n  .d-lg-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-lg-block {\n    display: block !important;\n  }\n\n  .d-lg-grid {\n    display: grid !important;\n  }\n\n  .d-lg-table {\n    display: table !important;\n  }\n\n  .d-lg-table-row {\n    display: table-row !important;\n  }\n\n  .d-lg-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-lg-flex {\n    display: flex !important;\n  }\n\n  .d-lg-inline-flex {\n    display: inline-flex !important;\n  }\n\n  .d-lg-none {\n    display: none !important;\n  }\n\n  .flex-lg-fill {\n    flex: 1 1 auto !important;\n  }\n\n  .flex-lg-row {\n    flex-direction: row !important;\n  }\n\n  .flex-lg-column {\n    flex-direction: column !important;\n  }\n\n  .flex-lg-row-reverse {\n    flex-direction: row-reverse !important;\n  }\n\n  .flex-lg-column-reverse {\n    flex-direction: column-reverse !important;\n  }\n\n  .flex-lg-grow-0 {\n    flex-grow: 0 !important;\n  }\n\n  .flex-lg-grow-1 {\n    flex-grow: 1 !important;\n  }\n\n  .flex-lg-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-lg-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .flex-lg-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-lg-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-lg-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .gap-lg-0 {\n    gap: 0 !important;\n  }\n\n  .gap-lg-1 {\n    gap: 0.25rem !important;\n  }\n\n  .gap-lg-2 {\n    gap: 0.5rem !important;\n  }\n\n  .gap-lg-3 {\n    gap: 1rem !important;\n  }\n\n  .gap-lg-4 {\n    gap: 1.5rem !important;\n  }\n\n  .gap-lg-5 {\n    gap: 3rem !important;\n  }\n\n  .justify-content-lg-start {\n    justify-content: flex-start !important;\n  }\n\n  .justify-content-lg-end {\n    justify-content: flex-end !important;\n  }\n\n  .justify-content-lg-center {\n    justify-content: center !important;\n  }\n\n  .justify-content-lg-between {\n    justify-content: space-between !important;\n  }\n\n  .justify-content-lg-around {\n    justify-content: space-around !important;\n  }\n\n  .justify-content-lg-evenly {\n    justify-content: space-evenly !important;\n  }\n\n  .align-items-lg-start {\n    align-items: flex-start !important;\n  }\n\n  .align-items-lg-end {\n    align-items: flex-end !important;\n  }\n\n  .align-items-lg-center {\n    align-items: center !important;\n  }\n\n  .align-items-lg-baseline {\n    align-items: baseline !important;\n  }\n\n  .align-items-lg-stretch {\n    align-items: stretch !important;\n  }\n\n  .align-content-lg-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-lg-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-lg-center {\n    align-content: center !important;\n  }\n\n  .align-content-lg-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-lg-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-lg-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-lg-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-lg-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-lg-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-lg-center {\n    align-self: center !important;\n  }\n\n  .align-self-lg-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-lg-stretch {\n    align-self: stretch !important;\n  }\n\n  .order-lg-first {\n    order: -1 !important;\n  }\n\n  .order-lg-0 {\n    order: 0 !important;\n  }\n\n  .order-lg-1 {\n    order: 1 !important;\n  }\n\n  .order-lg-2 {\n    order: 2 !important;\n  }\n\n  .order-lg-3 {\n    order: 3 !important;\n  }\n\n  .order-lg-4 {\n    order: 4 !important;\n  }\n\n  .order-lg-5 {\n    order: 5 !important;\n  }\n\n  .order-lg-last {\n    order: 6 !important;\n  }\n\n  .m-lg-0 {\n    margin: 0 !important;\n  }\n\n  .m-lg-1 {\n    margin: 0.25rem !important;\n  }\n\n  .m-lg-2 {\n    margin: 0.5rem !important;\n  }\n\n  .m-lg-3 {\n    margin: 1rem !important;\n  }\n\n  .m-lg-4 {\n    margin: 1.5rem !important;\n  }\n\n  .m-lg-5 {\n    margin: 3rem !important;\n  }\n\n  .m-lg-auto {\n    margin: auto !important;\n  }\n\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n\n  .mt-lg-0 {\n    margin-top: 0 !important;\n  }\n\n  .mt-lg-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mt-lg-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mt-lg-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mt-lg-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mt-lg-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mt-lg-auto {\n    margin-top: auto !important;\n  }\n\n  .me-lg-0 {\n    margin-right: 0 !important;\n  }\n\n  .me-lg-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .me-lg-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .me-lg-3 {\n    margin-right: 1rem !important;\n  }\n\n  .me-lg-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .me-lg-5 {\n    margin-right: 3rem !important;\n  }\n\n  .me-lg-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-lg-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .mb-lg-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .mb-lg-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .mb-lg-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ms-lg-0 {\n    margin-left: 0 !important;\n  }\n\n  .ms-lg-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .ms-lg-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .ms-lg-3 {\n    margin-left: 1rem !important;\n  }\n\n  .ms-lg-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .ms-lg-5 {\n    margin-left: 3rem !important;\n  }\n\n  .ms-lg-auto {\n    margin-left: auto !important;\n  }\n\n  .p-lg-0 {\n    padding: 0 !important;\n  }\n\n  .p-lg-1 {\n    padding: 0.25rem !important;\n  }\n\n  .p-lg-2 {\n    padding: 0.5rem !important;\n  }\n\n  .p-lg-3 {\n    padding: 1rem !important;\n  }\n\n  .p-lg-4 {\n    padding: 1.5rem !important;\n  }\n\n  .p-lg-5 {\n    padding: 3rem !important;\n  }\n\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n\n  .pt-lg-0 {\n    padding-top: 0 !important;\n  }\n\n  .pt-lg-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pt-lg-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pt-lg-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pt-lg-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pt-lg-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pe-lg-0 {\n    padding-right: 0 !important;\n  }\n\n  .pe-lg-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pe-lg-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pe-lg-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pe-lg-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pe-lg-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-lg-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pb-lg-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pb-lg-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .ps-lg-0 {\n    padding-left: 0 !important;\n  }\n\n  .ps-lg-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .ps-lg-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .ps-lg-3 {\n    padding-left: 1rem !important;\n  }\n\n  .ps-lg-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .ps-lg-5 {\n    padding-left: 3rem !important;\n  }\n\n  .text-lg-start {\n    text-align: left !important;\n  }\n\n  .text-lg-end {\n    text-align: right !important;\n  }\n\n  .text-lg-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 1200px) {\n  .float-xl-start {\n    float: left !important;\n  }\n\n  .float-xl-end {\n    float: right !important;\n  }\n\n  .float-xl-none {\n    float: none !important;\n  }\n\n  .d-xl-inline {\n    display: inline !important;\n  }\n\n  .d-xl-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-xl-block {\n    display: block !important;\n  }\n\n  .d-xl-grid {\n    display: grid !important;\n  }\n\n  .d-xl-table {\n    display: table !important;\n  }\n\n  .d-xl-table-row {\n    display: table-row !important;\n  }\n\n  .d-xl-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-xl-flex {\n    display: flex !important;\n  }\n\n  .d-xl-inline-flex {\n    display: inline-flex !important;\n  }\n\n  .d-xl-none {\n    display: none !important;\n  }\n\n  .flex-xl-fill {\n    flex: 1 1 auto !important;\n  }\n\n  .flex-xl-row {\n    flex-direction: row !important;\n  }\n\n  .flex-xl-column {\n    flex-direction: column !important;\n  }\n\n  .flex-xl-row-reverse {\n    flex-direction: row-reverse !important;\n  }\n\n  .flex-xl-column-reverse {\n    flex-direction: column-reverse !important;\n  }\n\n  .flex-xl-grow-0 {\n    flex-grow: 0 !important;\n  }\n\n  .flex-xl-grow-1 {\n    flex-grow: 1 !important;\n  }\n\n  .flex-xl-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-xl-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .flex-xl-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-xl-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-xl-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .gap-xl-0 {\n    gap: 0 !important;\n  }\n\n  .gap-xl-1 {\n    gap: 0.25rem !important;\n  }\n\n  .gap-xl-2 {\n    gap: 0.5rem !important;\n  }\n\n  .gap-xl-3 {\n    gap: 1rem !important;\n  }\n\n  .gap-xl-4 {\n    gap: 1.5rem !important;\n  }\n\n  .gap-xl-5 {\n    gap: 3rem !important;\n  }\n\n  .justify-content-xl-start {\n    justify-content: flex-start !important;\n  }\n\n  .justify-content-xl-end {\n    justify-content: flex-end !important;\n  }\n\n  .justify-content-xl-center {\n    justify-content: center !important;\n  }\n\n  .justify-content-xl-between {\n    justify-content: space-between !important;\n  }\n\n  .justify-content-xl-around {\n    justify-content: space-around !important;\n  }\n\n  .justify-content-xl-evenly {\n    justify-content: space-evenly !important;\n  }\n\n  .align-items-xl-start {\n    align-items: flex-start !important;\n  }\n\n  .align-items-xl-end {\n    align-items: flex-end !important;\n  }\n\n  .align-items-xl-center {\n    align-items: center !important;\n  }\n\n  .align-items-xl-baseline {\n    align-items: baseline !important;\n  }\n\n  .align-items-xl-stretch {\n    align-items: stretch !important;\n  }\n\n  .align-content-xl-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-xl-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-xl-center {\n    align-content: center !important;\n  }\n\n  .align-content-xl-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-xl-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-xl-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-xl-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-xl-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-xl-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-xl-center {\n    align-self: center !important;\n  }\n\n  .align-self-xl-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-xl-stretch {\n    align-self: stretch !important;\n  }\n\n  .order-xl-first {\n    order: -1 !important;\n  }\n\n  .order-xl-0 {\n    order: 0 !important;\n  }\n\n  .order-xl-1 {\n    order: 1 !important;\n  }\n\n  .order-xl-2 {\n    order: 2 !important;\n  }\n\n  .order-xl-3 {\n    order: 3 !important;\n  }\n\n  .order-xl-4 {\n    order: 4 !important;\n  }\n\n  .order-xl-5 {\n    order: 5 !important;\n  }\n\n  .order-xl-last {\n    order: 6 !important;\n  }\n\n  .m-xl-0 {\n    margin: 0 !important;\n  }\n\n  .m-xl-1 {\n    margin: 0.25rem !important;\n  }\n\n  .m-xl-2 {\n    margin: 0.5rem !important;\n  }\n\n  .m-xl-3 {\n    margin: 1rem !important;\n  }\n\n  .m-xl-4 {\n    margin: 1.5rem !important;\n  }\n\n  .m-xl-5 {\n    margin: 3rem !important;\n  }\n\n  .m-xl-auto {\n    margin: auto !important;\n  }\n\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n\n  .mt-xl-0 {\n    margin-top: 0 !important;\n  }\n\n  .mt-xl-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mt-xl-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mt-xl-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mt-xl-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mt-xl-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mt-xl-auto {\n    margin-top: auto !important;\n  }\n\n  .me-xl-0 {\n    margin-right: 0 !important;\n  }\n\n  .me-xl-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .me-xl-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .me-xl-3 {\n    margin-right: 1rem !important;\n  }\n\n  .me-xl-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .me-xl-5 {\n    margin-right: 3rem !important;\n  }\n\n  .me-xl-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-xl-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .mb-xl-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .mb-xl-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .mb-xl-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ms-xl-0 {\n    margin-left: 0 !important;\n  }\n\n  .ms-xl-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .ms-xl-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .ms-xl-3 {\n    margin-left: 1rem !important;\n  }\n\n  .ms-xl-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .ms-xl-5 {\n    margin-left: 3rem !important;\n  }\n\n  .ms-xl-auto {\n    margin-left: auto !important;\n  }\n\n  .p-xl-0 {\n    padding: 0 !important;\n  }\n\n  .p-xl-1 {\n    padding: 0.25rem !important;\n  }\n\n  .p-xl-2 {\n    padding: 0.5rem !important;\n  }\n\n  .p-xl-3 {\n    padding: 1rem !important;\n  }\n\n  .p-xl-4 {\n    padding: 1.5rem !important;\n  }\n\n  .p-xl-5 {\n    padding: 3rem !important;\n  }\n\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n\n  .pt-xl-0 {\n    padding-top: 0 !important;\n  }\n\n  .pt-xl-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pt-xl-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pt-xl-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pt-xl-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pt-xl-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pe-xl-0 {\n    padding-right: 0 !important;\n  }\n\n  .pe-xl-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pe-xl-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pe-xl-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pe-xl-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pe-xl-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-xl-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pb-xl-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pb-xl-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .ps-xl-0 {\n    padding-left: 0 !important;\n  }\n\n  .ps-xl-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .ps-xl-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .ps-xl-3 {\n    padding-left: 1rem !important;\n  }\n\n  .ps-xl-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .ps-xl-5 {\n    padding-left: 3rem !important;\n  }\n\n  .text-xl-start {\n    text-align: left !important;\n  }\n\n  .text-xl-end {\n    text-align: right !important;\n  }\n\n  .text-xl-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 1400px) {\n  .float-xxl-start {\n    float: left !important;\n  }\n\n  .float-xxl-end {\n    float: right !important;\n  }\n\n  .float-xxl-none {\n    float: none !important;\n  }\n\n  .d-xxl-inline {\n    display: inline !important;\n  }\n\n  .d-xxl-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-xxl-block {\n    display: block !important;\n  }\n\n  .d-xxl-grid {\n    display: grid !important;\n  }\n\n  .d-xxl-table {\n    display: table !important;\n  }\n\n  .d-xxl-table-row {\n    display: table-row !important;\n  }\n\n  .d-xxl-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-xxl-flex {\n    display: flex !important;\n  }\n\n  .d-xxl-inline-flex {\n    display: inline-flex !important;\n  }\n\n  .d-xxl-none {\n    display: none !important;\n  }\n\n  .flex-xxl-fill {\n    flex: 1 1 auto !important;\n  }\n\n  .flex-xxl-row {\n    flex-direction: row !important;\n  }\n\n  .flex-xxl-column {\n    flex-direction: column !important;\n  }\n\n  .flex-xxl-row-reverse {\n    flex-direction: row-reverse !important;\n  }\n\n  .flex-xxl-column-reverse {\n    flex-direction: column-reverse !important;\n  }\n\n  .flex-xxl-grow-0 {\n    flex-grow: 0 !important;\n  }\n\n  .flex-xxl-grow-1 {\n    flex-grow: 1 !important;\n  }\n\n  .flex-xxl-shrink-0 {\n    flex-shrink: 0 !important;\n  }\n\n  .flex-xxl-shrink-1 {\n    flex-shrink: 1 !important;\n  }\n\n  .flex-xxl-wrap {\n    flex-wrap: wrap !important;\n  }\n\n  .flex-xxl-nowrap {\n    flex-wrap: nowrap !important;\n  }\n\n  .flex-xxl-wrap-reverse {\n    flex-wrap: wrap-reverse !important;\n  }\n\n  .gap-xxl-0 {\n    gap: 0 !important;\n  }\n\n  .gap-xxl-1 {\n    gap: 0.25rem !important;\n  }\n\n  .gap-xxl-2 {\n    gap: 0.5rem !important;\n  }\n\n  .gap-xxl-3 {\n    gap: 1rem !important;\n  }\n\n  .gap-xxl-4 {\n    gap: 1.5rem !important;\n  }\n\n  .gap-xxl-5 {\n    gap: 3rem !important;\n  }\n\n  .justify-content-xxl-start {\n    justify-content: flex-start !important;\n  }\n\n  .justify-content-xxl-end {\n    justify-content: flex-end !important;\n  }\n\n  .justify-content-xxl-center {\n    justify-content: center !important;\n  }\n\n  .justify-content-xxl-between {\n    justify-content: space-between !important;\n  }\n\n  .justify-content-xxl-around {\n    justify-content: space-around !important;\n  }\n\n  .justify-content-xxl-evenly {\n    justify-content: space-evenly !important;\n  }\n\n  .align-items-xxl-start {\n    align-items: flex-start !important;\n  }\n\n  .align-items-xxl-end {\n    align-items: flex-end !important;\n  }\n\n  .align-items-xxl-center {\n    align-items: center !important;\n  }\n\n  .align-items-xxl-baseline {\n    align-items: baseline !important;\n  }\n\n  .align-items-xxl-stretch {\n    align-items: stretch !important;\n  }\n\n  .align-content-xxl-start {\n    align-content: flex-start !important;\n  }\n\n  .align-content-xxl-end {\n    align-content: flex-end !important;\n  }\n\n  .align-content-xxl-center {\n    align-content: center !important;\n  }\n\n  .align-content-xxl-between {\n    align-content: space-between !important;\n  }\n\n  .align-content-xxl-around {\n    align-content: space-around !important;\n  }\n\n  .align-content-xxl-stretch {\n    align-content: stretch !important;\n  }\n\n  .align-self-xxl-auto {\n    align-self: auto !important;\n  }\n\n  .align-self-xxl-start {\n    align-self: flex-start !important;\n  }\n\n  .align-self-xxl-end {\n    align-self: flex-end !important;\n  }\n\n  .align-self-xxl-center {\n    align-self: center !important;\n  }\n\n  .align-self-xxl-baseline {\n    align-self: baseline !important;\n  }\n\n  .align-self-xxl-stretch {\n    align-self: stretch !important;\n  }\n\n  .order-xxl-first {\n    order: -1 !important;\n  }\n\n  .order-xxl-0 {\n    order: 0 !important;\n  }\n\n  .order-xxl-1 {\n    order: 1 !important;\n  }\n\n  .order-xxl-2 {\n    order: 2 !important;\n  }\n\n  .order-xxl-3 {\n    order: 3 !important;\n  }\n\n  .order-xxl-4 {\n    order: 4 !important;\n  }\n\n  .order-xxl-5 {\n    order: 5 !important;\n  }\n\n  .order-xxl-last {\n    order: 6 !important;\n  }\n\n  .m-xxl-0 {\n    margin: 0 !important;\n  }\n\n  .m-xxl-1 {\n    margin: 0.25rem !important;\n  }\n\n  .m-xxl-2 {\n    margin: 0.5rem !important;\n  }\n\n  .m-xxl-3 {\n    margin: 1rem !important;\n  }\n\n  .m-xxl-4 {\n    margin: 1.5rem !important;\n  }\n\n  .m-xxl-5 {\n    margin: 3rem !important;\n  }\n\n  .m-xxl-auto {\n    margin: auto !important;\n  }\n\n  .mx-xxl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n\n  .mx-xxl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n\n  .mx-xxl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n\n  .mx-xxl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n\n  .mx-xxl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n\n  .mx-xxl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n\n  .mx-xxl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n\n  .my-xxl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n\n  .my-xxl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n\n  .my-xxl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n\n  .my-xxl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n\n  .my-xxl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n\n  .my-xxl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n\n  .my-xxl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n\n  .mt-xxl-0 {\n    margin-top: 0 !important;\n  }\n\n  .mt-xxl-1 {\n    margin-top: 0.25rem !important;\n  }\n\n  .mt-xxl-2 {\n    margin-top: 0.5rem !important;\n  }\n\n  .mt-xxl-3 {\n    margin-top: 1rem !important;\n  }\n\n  .mt-xxl-4 {\n    margin-top: 1.5rem !important;\n  }\n\n  .mt-xxl-5 {\n    margin-top: 3rem !important;\n  }\n\n  .mt-xxl-auto {\n    margin-top: auto !important;\n  }\n\n  .me-xxl-0 {\n    margin-right: 0 !important;\n  }\n\n  .me-xxl-1 {\n    margin-right: 0.25rem !important;\n  }\n\n  .me-xxl-2 {\n    margin-right: 0.5rem !important;\n  }\n\n  .me-xxl-3 {\n    margin-right: 1rem !important;\n  }\n\n  .me-xxl-4 {\n    margin-right: 1.5rem !important;\n  }\n\n  .me-xxl-5 {\n    margin-right: 3rem !important;\n  }\n\n  .me-xxl-auto {\n    margin-right: auto !important;\n  }\n\n  .mb-xxl-0 {\n    margin-bottom: 0 !important;\n  }\n\n  .mb-xxl-1 {\n    margin-bottom: 0.25rem !important;\n  }\n\n  .mb-xxl-2 {\n    margin-bottom: 0.5rem !important;\n  }\n\n  .mb-xxl-3 {\n    margin-bottom: 1rem !important;\n  }\n\n  .mb-xxl-4 {\n    margin-bottom: 1.5rem !important;\n  }\n\n  .mb-xxl-5 {\n    margin-bottom: 3rem !important;\n  }\n\n  .mb-xxl-auto {\n    margin-bottom: auto !important;\n  }\n\n  .ms-xxl-0 {\n    margin-left: 0 !important;\n  }\n\n  .ms-xxl-1 {\n    margin-left: 0.25rem !important;\n  }\n\n  .ms-xxl-2 {\n    margin-left: 0.5rem !important;\n  }\n\n  .ms-xxl-3 {\n    margin-left: 1rem !important;\n  }\n\n  .ms-xxl-4 {\n    margin-left: 1.5rem !important;\n  }\n\n  .ms-xxl-5 {\n    margin-left: 3rem !important;\n  }\n\n  .ms-xxl-auto {\n    margin-left: auto !important;\n  }\n\n  .p-xxl-0 {\n    padding: 0 !important;\n  }\n\n  .p-xxl-1 {\n    padding: 0.25rem !important;\n  }\n\n  .p-xxl-2 {\n    padding: 0.5rem !important;\n  }\n\n  .p-xxl-3 {\n    padding: 1rem !important;\n  }\n\n  .p-xxl-4 {\n    padding: 1.5rem !important;\n  }\n\n  .p-xxl-5 {\n    padding: 3rem !important;\n  }\n\n  .px-xxl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n\n  .px-xxl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n\n  .px-xxl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n\n  .px-xxl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n\n  .px-xxl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n\n  .px-xxl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n\n  .py-xxl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n\n  .py-xxl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n\n  .py-xxl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n\n  .py-xxl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n\n  .py-xxl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n\n  .py-xxl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n\n  .pt-xxl-0 {\n    padding-top: 0 !important;\n  }\n\n  .pt-xxl-1 {\n    padding-top: 0.25rem !important;\n  }\n\n  .pt-xxl-2 {\n    padding-top: 0.5rem !important;\n  }\n\n  .pt-xxl-3 {\n    padding-top: 1rem !important;\n  }\n\n  .pt-xxl-4 {\n    padding-top: 1.5rem !important;\n  }\n\n  .pt-xxl-5 {\n    padding-top: 3rem !important;\n  }\n\n  .pe-xxl-0 {\n    padding-right: 0 !important;\n  }\n\n  .pe-xxl-1 {\n    padding-right: 0.25rem !important;\n  }\n\n  .pe-xxl-2 {\n    padding-right: 0.5rem !important;\n  }\n\n  .pe-xxl-3 {\n    padding-right: 1rem !important;\n  }\n\n  .pe-xxl-4 {\n    padding-right: 1.5rem !important;\n  }\n\n  .pe-xxl-5 {\n    padding-right: 3rem !important;\n  }\n\n  .pb-xxl-0 {\n    padding-bottom: 0 !important;\n  }\n\n  .pb-xxl-1 {\n    padding-bottom: 0.25rem !important;\n  }\n\n  .pb-xxl-2 {\n    padding-bottom: 0.5rem !important;\n  }\n\n  .pb-xxl-3 {\n    padding-bottom: 1rem !important;\n  }\n\n  .pb-xxl-4 {\n    padding-bottom: 1.5rem !important;\n  }\n\n  .pb-xxl-5 {\n    padding-bottom: 3rem !important;\n  }\n\n  .ps-xxl-0 {\n    padding-left: 0 !important;\n  }\n\n  .ps-xxl-1 {\n    padding-left: 0.25rem !important;\n  }\n\n  .ps-xxl-2 {\n    padding-left: 0.5rem !important;\n  }\n\n  .ps-xxl-3 {\n    padding-left: 1rem !important;\n  }\n\n  .ps-xxl-4 {\n    padding-left: 1.5rem !important;\n  }\n\n  .ps-xxl-5 {\n    padding-left: 3rem !important;\n  }\n\n  .text-xxl-start {\n    text-align: left !important;\n  }\n\n  .text-xxl-end {\n    text-align: right !important;\n  }\n\n  .text-xxl-center {\n    text-align: center !important;\n  }\n}\n@media (min-width: 1200px) {\n  .fs-1 {\n    font-size: 2.5rem !important;\n  }\n\n  .fs-2 {\n    font-size: 2rem !important;\n  }\n\n  .fs-3 {\n    font-size: 1.75rem !important;\n  }\n\n  .fs-4 {\n    font-size: 1.5rem !important;\n  }\n}\n@media print {\n  .d-print-inline {\n    display: inline !important;\n  }\n\n  .d-print-inline-block {\n    display: inline-block !important;\n  }\n\n  .d-print-block {\n    display: block !important;\n  }\n\n  .d-print-grid {\n    display: grid !important;\n  }\n\n  .d-print-table {\n    display: table !important;\n  }\n\n  .d-print-table-row {\n    display: table-row !important;\n  }\n\n  .d-print-table-cell {\n    display: table-cell !important;\n  }\n\n  .d-print-flex {\n    display: flex !important;\n  }\n\n  .d-print-inline-flex {\n    display: inline-flex !important;\n  }\n\n  .d-print-none {\n    display: none !important;\n  }\n}\n";
	n(css,{});

	var top = 'top';
	var bottom = 'bottom';
	var right = 'right';
	var left = 'left';
	var auto = 'auto';
	var basePlacements = [top, bottom, right, left];
	var start = 'start';
	var end = 'end';
	var clippingParents = 'clippingParents';
	var viewport = 'viewport';
	var popper = 'popper';
	var reference = 'reference';
	var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
	  return acc.concat([placement + "-" + start, placement + "-" + end]);
	}, []);
	var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	}, []); // modifiers that need to read the DOM

	var beforeRead = 'beforeRead';
	var read = 'read';
	var afterRead = 'afterRead'; // pure-logic modifiers

	var beforeMain = 'beforeMain';
	var main = 'main';
	var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	var beforeWrite = 'beforeWrite';
	var write = 'write';
	var afterWrite = 'afterWrite';
	var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	function getNodeName(element) {
	  return element ? (element.nodeName || '').toLowerCase() : null;
	}

	function getWindow(node) {
	  if (node == null) {
	    return window;
	  }

	  if (node.toString() !== '[object Window]') {
	    var ownerDocument = node.ownerDocument;
	    return ownerDocument ? ownerDocument.defaultView || window : window;
	  }

	  return node;
	}

	function isElement$1(node) {
	  var OwnElement = getWindow(node).Element;
	  return node instanceof OwnElement || node instanceof Element;
	}

	function isHTMLElement(node) {
	  var OwnElement = getWindow(node).HTMLElement;
	  return node instanceof OwnElement || node instanceof HTMLElement;
	}

	function isShadowRoot(node) {
	  // IE 11 has no ShadowRoot
	  if (typeof ShadowRoot === 'undefined') {
	    return false;
	  }

	  var OwnElement = getWindow(node).ShadowRoot;
	  return node instanceof OwnElement || node instanceof ShadowRoot;
	}

	// and applies them to the HTMLElements such as popper and arrow

	function applyStyles(_ref) {
	  var state = _ref.state;
	  Object.keys(state.elements).forEach(function (name) {
	    var style = state.styles[name] || {};
	    var attributes = state.attributes[name] || {};
	    var element = state.elements[name]; // arrow is optional + virtual elements

	    if (!isHTMLElement(element) || !getNodeName(element)) {
	      return;
	    } // Flow doesn't support to extend this property, but it's the most
	    // effective way to apply styles to an HTMLElement
	    // $FlowFixMe[cannot-write]


	    Object.assign(element.style, style);
	    Object.keys(attributes).forEach(function (name) {
	      var value = attributes[name];

	      if (value === false) {
	        element.removeAttribute(name);
	      } else {
	        element.setAttribute(name, value === true ? '' : value);
	      }
	    });
	  });
	}

	function effect$2(_ref2) {
	  var state = _ref2.state;
	  var initialStyles = {
	    popper: {
	      position: state.options.strategy,
	      left: '0',
	      top: '0',
	      margin: '0'
	    },
	    arrow: {
	      position: 'absolute'
	    },
	    reference: {}
	  };
	  Object.assign(state.elements.popper.style, initialStyles.popper);
	  state.styles = initialStyles;

	  if (state.elements.arrow) {
	    Object.assign(state.elements.arrow.style, initialStyles.arrow);
	  }

	  return function () {
	    Object.keys(state.elements).forEach(function (name) {
	      var element = state.elements[name];
	      var attributes = state.attributes[name] || {};
	      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

	      var style = styleProperties.reduce(function (style, property) {
	        style[property] = '';
	        return style;
	      }, {}); // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      }

	      Object.assign(element.style, style);
	      Object.keys(attributes).forEach(function (attribute) {
	        element.removeAttribute(attribute);
	      });
	    });
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var applyStyles$1 = {
	  name: 'applyStyles',
	  enabled: true,
	  phase: 'write',
	  fn: applyStyles,
	  effect: effect$2,
	  requires: ['computeStyles']
	};

	function getBasePlacement(placement) {
	  return placement.split('-')[0];
	}

	var max = Math.max;
	var min = Math.min;
	var round = Math.round;

	function getBoundingClientRect(element, includeScale) {
	  if (includeScale === void 0) {
	    includeScale = false;
	  }

	  var rect = element.getBoundingClientRect();
	  var scaleX = 1;
	  var scaleY = 1;

	  if (isHTMLElement(element) && includeScale) {
	    var offsetHeight = element.offsetHeight;
	    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
	    // Fallback to 1 in case both values are `0`

	    if (offsetWidth > 0) {
	      scaleX = round(rect.width) / offsetWidth || 1;
	    }

	    if (offsetHeight > 0) {
	      scaleY = round(rect.height) / offsetHeight || 1;
	    }
	  }

	  return {
	    width: rect.width / scaleX,
	    height: rect.height / scaleY,
	    top: rect.top / scaleY,
	    right: rect.right / scaleX,
	    bottom: rect.bottom / scaleY,
	    left: rect.left / scaleX,
	    x: rect.left / scaleX,
	    y: rect.top / scaleY
	  };
	}

	// means it doesn't take into account transforms.

	function getLayoutRect(element) {
	  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
	  // Fixes https://github.com/popperjs/popper-core/issues/1223

	  var width = element.offsetWidth;
	  var height = element.offsetHeight;

	  if (Math.abs(clientRect.width - width) <= 1) {
	    width = clientRect.width;
	  }

	  if (Math.abs(clientRect.height - height) <= 1) {
	    height = clientRect.height;
	  }

	  return {
	    x: element.offsetLeft,
	    y: element.offsetTop,
	    width: width,
	    height: height
	  };
	}

	function contains(parent, child) {
	  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

	  if (parent.contains(child)) {
	    return true;
	  } // then fallback to custom implementation with Shadow DOM support
	  else if (rootNode && isShadowRoot(rootNode)) {
	      var next = child;

	      do {
	        if (next && parent.isSameNode(next)) {
	          return true;
	        } // $FlowFixMe[prop-missing]: need a better way to handle this...


	        next = next.parentNode || next.host;
	      } while (next);
	    } // Give up, the result is false


	  return false;
	}

	function getComputedStyle$1(element) {
	  return getWindow(element).getComputedStyle(element);
	}

	function isTableElement(element) {
	  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
	}

	function getDocumentElement(element) {
	  // $FlowFixMe[incompatible-return]: assume body is always available
	  return ((isElement$1(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
	  element.document) || window.document).documentElement;
	}

	function getParentNode(element) {
	  if (getNodeName(element) === 'html') {
	    return element;
	  }

	  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
	    // $FlowFixMe[incompatible-return]
	    // $FlowFixMe[prop-missing]
	    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
	    element.parentNode || ( // DOM Element detected
	    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
	    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
	    getDocumentElement(element) // fallback

	  );
	}

	function getTrueOffsetParent(element) {
	  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
	  getComputedStyle$1(element).position === 'fixed') {
	    return null;
	  }

	  return element.offsetParent;
	} // `.offsetParent` reports `null` for fixed elements, while absolute elements
	// return the containing block


	function getContainingBlock(element) {
	  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
	  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

	  if (isIE && isHTMLElement(element)) {
	    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
	    var elementCss = getComputedStyle$1(element);

	    if (elementCss.position === 'fixed') {
	      return null;
	    }
	  }

	  var currentNode = getParentNode(element);

	  if (isShadowRoot(currentNode)) {
	    currentNode = currentNode.host;
	  }

	  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
	    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
	    // create a containing block.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

	    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
	      return currentNode;
	    } else {
	      currentNode = currentNode.parentNode;
	    }
	  }

	  return null;
	} // Gets the closest ancestor positioned element. Handles some edge cases,
	// such as table ancestors and cross browser bugs.


	function getOffsetParent(element) {
	  var window = getWindow(element);
	  var offsetParent = getTrueOffsetParent(element);

	  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
	    offsetParent = getTrueOffsetParent(offsetParent);
	  }

	  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
	    return window;
	  }

	  return offsetParent || getContainingBlock(element) || window;
	}

	function getMainAxisFromPlacement(placement) {
	  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
	}

	function within(min$1, value, max$1) {
	  return max(min$1, min(value, max$1));
	}
	function withinMaxClamp(min, value, max) {
	  var v = within(min, value, max);
	  return v > max ? max : v;
	}

	function getFreshSideObject() {
	  return {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  };
	}

	function mergePaddingObject(paddingObject) {
	  return Object.assign({}, getFreshSideObject(), paddingObject);
	}

	function expandToHashMap(value, keys) {
	  return keys.reduce(function (hashMap, key) {
	    hashMap[key] = value;
	    return hashMap;
	  }, {});
	}

	var toPaddingObject = function toPaddingObject(padding, state) {
	  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : padding;
	  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	};

	function arrow(_ref) {
	  var _state$modifiersData$;

	  var state = _ref.state,
	      name = _ref.name,
	      options = _ref.options;
	  var arrowElement = state.elements.arrow;
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var basePlacement = getBasePlacement(state.placement);
	  var axis = getMainAxisFromPlacement(basePlacement);
	  var isVertical = [left, right].indexOf(basePlacement) >= 0;
	  var len = isVertical ? 'height' : 'width';

	  if (!arrowElement || !popperOffsets) {
	    return;
	  }

	  var paddingObject = toPaddingObject(options.padding, state);
	  var arrowRect = getLayoutRect(arrowElement);
	  var minProp = axis === 'y' ? top : left;
	  var maxProp = axis === 'y' ? bottom : right;
	  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	  var arrowOffsetParent = getOffsetParent(arrowElement);
	  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
	  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	  // outside of the popper bounds

	  var min = paddingObject[minProp];
	  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
	  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
	  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

	  var axisProp = axis;
	  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
	}

	function effect$1(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options;
	  var _options$element = options.element,
	      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

	  if (arrowElement == null) {
	    return;
	  } // CSS selector


	  if (typeof arrowElement === 'string') {
	    arrowElement = state.elements.popper.querySelector(arrowElement);

	    if (!arrowElement) {
	      return;
	    }
	  }

	  if (process.env.NODE_ENV !== "production") {
	    if (!isHTMLElement(arrowElement)) {
	      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
	    }
	  }

	  if (!contains(state.elements.popper, arrowElement)) {
	    if (process.env.NODE_ENV !== "production") {
	      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
	    }

	    return;
	  }

	  state.elements.arrow = arrowElement;
	} // eslint-disable-next-line import/no-unused-modules


	var arrow$1 = {
	  name: 'arrow',
	  enabled: true,
	  phase: 'main',
	  fn: arrow,
	  effect: effect$1,
	  requires: ['popperOffsets'],
	  requiresIfExists: ['preventOverflow']
	};

	function getVariation(placement) {
	  return placement.split('-')[1];
	}

	var unsetSides = {
	  top: 'auto',
	  right: 'auto',
	  bottom: 'auto',
	  left: 'auto'
	}; // Round the offsets to the nearest suitable subpixel based on the DPR.
	// Zooming can change the DPR, but it seems to report a value that will
	// cleanly divide the values into the appropriate subpixels.

	function roundOffsetsByDPR(_ref) {
	  var x = _ref.x,
	      y = _ref.y;
	  var win = window;
	  var dpr = win.devicePixelRatio || 1;
	  return {
	    x: round(x * dpr) / dpr || 0,
	    y: round(y * dpr) / dpr || 0
	  };
	}

	function mapToStyles(_ref2) {
	  var _Object$assign2;

	  var popper = _ref2.popper,
	      popperRect = _ref2.popperRect,
	      placement = _ref2.placement,
	      variation = _ref2.variation,
	      offsets = _ref2.offsets,
	      position = _ref2.position,
	      gpuAcceleration = _ref2.gpuAcceleration,
	      adaptive = _ref2.adaptive,
	      roundOffsets = _ref2.roundOffsets,
	      isFixed = _ref2.isFixed;
	  var _offsets$x = offsets.x,
	      x = _offsets$x === void 0 ? 0 : _offsets$x,
	      _offsets$y = offsets.y,
	      y = _offsets$y === void 0 ? 0 : _offsets$y;

	  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref3.x;
	  y = _ref3.y;
	  var hasX = offsets.hasOwnProperty('x');
	  var hasY = offsets.hasOwnProperty('y');
	  var sideX = left;
	  var sideY = top;
	  var win = window;

	  if (adaptive) {
	    var offsetParent = getOffsetParent(popper);
	    var heightProp = 'clientHeight';
	    var widthProp = 'clientWidth';

	    if (offsetParent === getWindow(popper)) {
	      offsetParent = getDocumentElement(popper);

	      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
	        heightProp = 'scrollHeight';
	        widthProp = 'scrollWidth';
	      }
	    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


	    offsetParent = offsetParent;

	    if (placement === top || (placement === left || placement === right) && variation === end) {
	      sideY = bottom;
	      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
	      offsetParent[heightProp];
	      y -= offsetY - popperRect.height;
	      y *= gpuAcceleration ? 1 : -1;
	    }

	    if (placement === left || (placement === top || placement === bottom) && variation === end) {
	      sideX = right;
	      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
	      offsetParent[widthProp];
	      x -= offsetX - popperRect.width;
	      x *= gpuAcceleration ? 1 : -1;
	    }
	  }

	  var commonStyles = Object.assign({
	    position: position
	  }, adaptive && unsetSides);

	  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
	    x: x,
	    y: y
	  }) : {
	    x: x,
	    y: y
	  };

	  x = _ref4.x;
	  y = _ref4.y;

	  if (gpuAcceleration) {
	    var _Object$assign;

	    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	  }

	  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	}

	function computeStyles(_ref5) {
	  var state = _ref5.state,
	      options = _ref5.options;
	  var _options$gpuAccelerat = options.gpuAcceleration,
	      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	      _options$adaptive = options.adaptive,
	      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
	      _options$roundOffsets = options.roundOffsets,
	      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

	  if (process.env.NODE_ENV !== "production") {
	    var transitionProperty = getComputedStyle$1(state.elements.popper).transitionProperty || '';

	    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
	      return transitionProperty.indexOf(property) >= 0;
	    })) {
	      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
	    }
	  }

	  var commonStyles = {
	    placement: getBasePlacement(state.placement),
	    variation: getVariation(state.placement),
	    popper: state.elements.popper,
	    popperRect: state.rects.popper,
	    gpuAcceleration: gpuAcceleration,
	    isFixed: state.options.strategy === 'fixed'
	  };

	  if (state.modifiersData.popperOffsets != null) {
	    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive,
	      roundOffsets: roundOffsets
	    })));
	  }

	  if (state.modifiersData.arrow != null) {
	    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.arrow,
	      position: 'absolute',
	      adaptive: false,
	      roundOffsets: roundOffsets
	    })));
	  }

	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-placement': state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var computeStyles$1 = {
	  name: 'computeStyles',
	  enabled: true,
	  phase: 'beforeWrite',
	  fn: computeStyles,
	  data: {}
	};

	var passive = {
	  passive: true
	};

	function effect(_ref) {
	  var state = _ref.state,
	      instance = _ref.instance,
	      options = _ref.options;
	  var _options$scroll = options.scroll,
	      scroll = _options$scroll === void 0 ? true : _options$scroll,
	      _options$resize = options.resize,
	      resize = _options$resize === void 0 ? true : _options$resize;
	  var window = getWindow(state.elements.popper);
	  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	  if (scroll) {
	    scrollParents.forEach(function (scrollParent) {
	      scrollParent.addEventListener('scroll', instance.update, passive);
	    });
	  }

	  if (resize) {
	    window.addEventListener('resize', instance.update, passive);
	  }

	  return function () {
	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.removeEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.removeEventListener('resize', instance.update, passive);
	    }
	  };
	} // eslint-disable-next-line import/no-unused-modules


	var eventListeners = {
	  name: 'eventListeners',
	  enabled: true,
	  phase: 'write',
	  fn: function fn() {},
	  effect: effect,
	  data: {}
	};

	var hash$1 = {
	  left: 'right',
	  right: 'left',
	  bottom: 'top',
	  top: 'bottom'
	};
	function getOppositePlacement(placement) {
	  return placement.replace(/left|right|bottom|top/g, function (matched) {
	    return hash$1[matched];
	  });
	}

	var hash = {
	  start: 'end',
	  end: 'start'
	};
	function getOppositeVariationPlacement(placement) {
	  return placement.replace(/start|end/g, function (matched) {
	    return hash[matched];
	  });
	}

	function getWindowScroll(node) {
	  var win = getWindow(node);
	  var scrollLeft = win.pageXOffset;
	  var scrollTop = win.pageYOffset;
	  return {
	    scrollLeft: scrollLeft,
	    scrollTop: scrollTop
	  };
	}

	function getWindowScrollBarX(element) {
	  // If <html> has a CSS width greater than the viewport, then this will be
	  // incorrect for RTL.
	  // Popper 1 is broken in this case and never had a bug report so let's assume
	  // it's not an issue. I don't think anyone ever specifies width on <html>
	  // anyway.
	  // Browsers where the left scrollbar doesn't cause an issue report `0` for
	  // this (e.g. Edge 2019, IE11, Safari)
	  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
	}

	function getViewportRect(element) {
	  var win = getWindow(element);
	  var html = getDocumentElement(element);
	  var visualViewport = win.visualViewport;
	  var width = html.clientWidth;
	  var height = html.clientHeight;
	  var x = 0;
	  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
	  // can be obscured underneath it.
	  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
	  // if it isn't open, so if this isn't available, the popper will be detected
	  // to overflow the bottom of the screen too early.

	  if (visualViewport) {
	    width = visualViewport.width;
	    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
	    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
	    // errors due to floating point numbers, so we need to check precision.
	    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
	    // Feature detection fails in mobile emulation mode in Chrome.
	    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
	    // 0.001
	    // Fallback here: "Not Safari" userAgent

	    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
	      x = visualViewport.offsetLeft;
	      y = visualViewport.offsetTop;
	    }
	  }

	  return {
	    width: width,
	    height: height,
	    x: x + getWindowScrollBarX(element),
	    y: y
	  };
	}

	// of the `<html>` and `<body>` rect bounds if horizontally scrollable

	function getDocumentRect(element) {
	  var _element$ownerDocumen;

	  var html = getDocumentElement(element);
	  var winScroll = getWindowScroll(element);
	  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
	  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
	  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
	  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
	  var y = -winScroll.scrollTop;

	  if (getComputedStyle$1(body || html).direction === 'rtl') {
	    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
	  }

	  return {
	    width: width,
	    height: height,
	    x: x,
	    y: y
	  };
	}

	function isScrollParent(element) {
	  // Firefox wants us to check `-x` and `-y` variations as well
	  var _getComputedStyle = getComputedStyle$1(element),
	      overflow = _getComputedStyle.overflow,
	      overflowX = _getComputedStyle.overflowX,
	      overflowY = _getComputedStyle.overflowY;

	  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
	}

	function getScrollParent(node) {
	  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
	    // $FlowFixMe[incompatible-return]: assume body is always available
	    return node.ownerDocument.body;
	  }

	  if (isHTMLElement(node) && isScrollParent(node)) {
	    return node;
	  }

	  return getScrollParent(getParentNode(node));
	}

	/*
	given a DOM element, return the list of all scroll parents, up the list of ancesors
	until we get to the top window object. This list is what we attach scroll listeners
	to, because if any of these parent elements scroll, we'll need to re-calculate the
	reference element's position.
	*/

	function listScrollParents(element, list) {
	  var _element$ownerDocumen;

	  if (list === void 0) {
	    list = [];
	  }

	  var scrollParent = getScrollParent(element);
	  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
	  var win = getWindow(scrollParent);
	  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
	  var updatedList = list.concat(target);
	  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
	  updatedList.concat(listScrollParents(getParentNode(target)));
	}

	function rectToClientRect(rect) {
	  return Object.assign({}, rect, {
	    left: rect.x,
	    top: rect.y,
	    right: rect.x + rect.width,
	    bottom: rect.y + rect.height
	  });
	}

	function getInnerBoundingClientRect(element) {
	  var rect = getBoundingClientRect(element);
	  rect.top = rect.top + element.clientTop;
	  rect.left = rect.left + element.clientLeft;
	  rect.bottom = rect.top + element.clientHeight;
	  rect.right = rect.left + element.clientWidth;
	  rect.width = element.clientWidth;
	  rect.height = element.clientHeight;
	  rect.x = rect.left;
	  rect.y = rect.top;
	  return rect;
	}

	function getClientRectFromMixedType(element, clippingParent) {
	  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement$1(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	} // A "clipping parent" is an overflowable container with the characteristic of
	// clipping (or hiding) overflowing elements with a position different from
	// `initial`


	function getClippingParents(element) {
	  var clippingParents = listScrollParents(getParentNode(element));
	  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
	  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	  if (!isElement$1(clipperElement)) {
	    return [];
	  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


	  return clippingParents.filter(function (clippingParent) {
	    return isElement$1(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
	  });
	} // Gets the maximum area that the element is visible in due to any number of
	// clipping parents


	function getClippingRect(element, boundary, rootBoundary) {
	  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	  var firstClippingParent = clippingParents[0];
	  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	    var rect = getClientRectFromMixedType(element, clippingParent);
	    accRect.top = max(rect.top, accRect.top);
	    accRect.right = min(rect.right, accRect.right);
	    accRect.bottom = min(rect.bottom, accRect.bottom);
	    accRect.left = max(rect.left, accRect.left);
	    return accRect;
	  }, getClientRectFromMixedType(element, firstClippingParent));
	  clippingRect.width = clippingRect.right - clippingRect.left;
	  clippingRect.height = clippingRect.bottom - clippingRect.top;
	  clippingRect.x = clippingRect.left;
	  clippingRect.y = clippingRect.top;
	  return clippingRect;
	}

	function computeOffsets(_ref) {
	  var reference = _ref.reference,
	      element = _ref.element,
	      placement = _ref.placement;
	  var basePlacement = placement ? getBasePlacement(placement) : null;
	  var variation = placement ? getVariation(placement) : null;
	  var commonX = reference.x + reference.width / 2 - element.width / 2;
	  var commonY = reference.y + reference.height / 2 - element.height / 2;
	  var offsets;

	  switch (basePlacement) {
	    case top:
	      offsets = {
	        x: commonX,
	        y: reference.y - element.height
	      };
	      break;

	    case bottom:
	      offsets = {
	        x: commonX,
	        y: reference.y + reference.height
	      };
	      break;

	    case right:
	      offsets = {
	        x: reference.x + reference.width,
	        y: commonY
	      };
	      break;

	    case left:
	      offsets = {
	        x: reference.x - element.width,
	        y: commonY
	      };
	      break;

	    default:
	      offsets = {
	        x: reference.x,
	        y: reference.y
	      };
	  }

	  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	  if (mainAxis != null) {
	    var len = mainAxis === 'y' ? 'height' : 'width';

	    switch (variation) {
	      case start:
	        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
	        break;

	      case end:
	        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
	        break;
	    }
	  }

	  return offsets;
	}

	function detectOverflow(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      _options$placement = _options.placement,
	      placement = _options$placement === void 0 ? state.placement : _options$placement,
	      _options$boundary = _options.boundary,
	      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	      _options$rootBoundary = _options.rootBoundary,
	      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	      _options$elementConte = _options.elementContext,
	      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	      _options$altBoundary = _options.altBoundary,
	      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	      _options$padding = _options.padding,
	      padding = _options$padding === void 0 ? 0 : _options$padding;
	  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	  var altContext = elementContext === popper ? reference : popper;
	  var popperRect = state.rects.popper;
	  var element = state.elements[altBoundary ? altContext : elementContext];
	  var clippingClientRect = getClippingRect(isElement$1(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
	  var referenceClientRect = getBoundingClientRect(state.elements.reference);
	  var popperOffsets = computeOffsets({
	    reference: referenceClientRect,
	    element: popperRect,
	    strategy: 'absolute',
	    placement: placement
	  });
	  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
	  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	  // 0 or negative = within the clipping rect

	  var overflowOffsets = {
	    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	  };
	  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	  if (elementContext === popper && offsetData) {
	    var offset = offsetData[placement];
	    Object.keys(overflowOffsets).forEach(function (key) {
	      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
	      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
	      overflowOffsets[key] += offset[axis] * multiply;
	    });
	  }

	  return overflowOffsets;
	}

	function computeAutoPlacement(state, options) {
	  if (options === void 0) {
	    options = {};
	  }

	  var _options = options,
	      placement = _options.placement,
	      boundary = _options.boundary,
	      rootBoundary = _options.rootBoundary,
	      padding = _options.padding,
	      flipVariations = _options.flipVariations,
	      _options$allowedAutoP = _options.allowedAutoPlacements,
	      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
	  var variation = getVariation(placement);
	  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	    return getVariation(placement) === variation;
	  }) : basePlacements;
	  var allowedPlacements = placements$1.filter(function (placement) {
	    return allowedAutoPlacements.indexOf(placement) >= 0;
	  });

	  if (allowedPlacements.length === 0) {
	    allowedPlacements = placements$1;

	    if (process.env.NODE_ENV !== "production") {
	      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
	    }
	  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


	  var overflows = allowedPlacements.reduce(function (acc, placement) {
	    acc[placement] = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    })[getBasePlacement(placement)];
	    return acc;
	  }, {});
	  return Object.keys(overflows).sort(function (a, b) {
	    return overflows[a] - overflows[b];
	  });
	}

	function getExpandedFallbackPlacements(placement) {
	  if (getBasePlacement(placement) === auto) {
	    return [];
	  }

	  var oppositePlacement = getOppositePlacement(placement);
	  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	}

	function flip(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;

	  if (state.modifiersData[name]._skip) {
	    return;
	  }

	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
	      specifiedFallbackPlacements = options.fallbackPlacements,
	      padding = options.padding,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      _options$flipVariatio = options.flipVariations,
	      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
	      allowedAutoPlacements = options.allowedAutoPlacements;
	  var preferredPlacement = state.options.placement;
	  var basePlacement = getBasePlacement(preferredPlacement);
	  var isBasePlacement = basePlacement === preferredPlacement;
	  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding,
	      flipVariations: flipVariations,
	      allowedAutoPlacements: allowedAutoPlacements
	    }) : placement);
	  }, []);
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var checksMap = new Map();
	  var makeFallbackChecks = true;
	  var firstFittingPlacement = placements[0];

	  for (var i = 0; i < placements.length; i++) {
	    var placement = placements[i];

	    var _basePlacement = getBasePlacement(placement);

	    var isStartVariation = getVariation(placement) === start;
	    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
	    var len = isVertical ? 'width' : 'height';
	    var overflow = detectOverflow(state, {
	      placement: placement,
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      altBoundary: altBoundary,
	      padding: padding
	    });
	    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	    if (referenceRect[len] > popperRect[len]) {
	      mainVariationSide = getOppositePlacement(mainVariationSide);
	    }

	    var altVariationSide = getOppositePlacement(mainVariationSide);
	    var checks = [];

	    if (checkMainAxis) {
	      checks.push(overflow[_basePlacement] <= 0);
	    }

	    if (checkAltAxis) {
	      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
	    }

	    if (checks.every(function (check) {
	      return check;
	    })) {
	      firstFittingPlacement = placement;
	      makeFallbackChecks = false;
	      break;
	    }

	    checksMap.set(placement, checks);
	  }

	  if (makeFallbackChecks) {
	    // `2` may be desired in some cases – research later
	    var numberOfChecks = flipVariations ? 3 : 1;

	    var _loop = function _loop(_i) {
	      var fittingPlacement = placements.find(function (placement) {
	        var checks = checksMap.get(placement);

	        if (checks) {
	          return checks.slice(0, _i).every(function (check) {
	            return check;
	          });
	        }
	      });

	      if (fittingPlacement) {
	        firstFittingPlacement = fittingPlacement;
	        return "break";
	      }
	    };

	    for (var _i = numberOfChecks; _i > 0; _i--) {
	      var _ret = _loop(_i);

	      if (_ret === "break") break;
	    }
	  }

	  if (state.placement !== firstFittingPlacement) {
	    state.modifiersData[name]._skip = true;
	    state.placement = firstFittingPlacement;
	    state.reset = true;
	  }
	} // eslint-disable-next-line import/no-unused-modules


	var flip$1 = {
	  name: 'flip',
	  enabled: true,
	  phase: 'main',
	  fn: flip,
	  requiresIfExists: ['offset'],
	  data: {
	    _skip: false
	  }
	};

	function getSideOffsets(overflow, rect, preventedOffsets) {
	  if (preventedOffsets === void 0) {
	    preventedOffsets = {
	      x: 0,
	      y: 0
	    };
	  }

	  return {
	    top: overflow.top - rect.height - preventedOffsets.y,
	    right: overflow.right - rect.width + preventedOffsets.x,
	    bottom: overflow.bottom - rect.height + preventedOffsets.y,
	    left: overflow.left - rect.width - preventedOffsets.x
	  };
	}

	function isAnySideFullyClipped(overflow) {
	  return [top, right, bottom, left].some(function (side) {
	    return overflow[side] >= 0;
	  });
	}

	function hide(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var preventedOffsets = state.modifiersData.preventOverflow;
	  var referenceOverflow = detectOverflow(state, {
	    elementContext: 'reference'
	  });
	  var popperAltOverflow = detectOverflow(state, {
	    altBoundary: true
	  });
	  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	  state.modifiersData[name] = {
	    referenceClippingOffsets: referenceClippingOffsets,
	    popperEscapeOffsets: popperEscapeOffsets,
	    isReferenceHidden: isReferenceHidden,
	    hasPopperEscaped: hasPopperEscaped
	  };
	  state.attributes.popper = Object.assign({}, state.attributes.popper, {
	    'data-popper-reference-hidden': isReferenceHidden,
	    'data-popper-escaped': hasPopperEscaped
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var hide$1 = {
	  name: 'hide',
	  enabled: true,
	  phase: 'main',
	  requiresIfExists: ['preventOverflow'],
	  fn: hide
	};

	function distanceAndSkiddingToXY(placement, rects, offset) {
	  var basePlacement = getBasePlacement(placement);
	  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

	  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	    placement: placement
	  })) : offset,
	      skidding = _ref[0],
	      distance = _ref[1];

	  skidding = skidding || 0;
	  distance = (distance || 0) * invertDistance;
	  return [left, right].indexOf(basePlacement) >= 0 ? {
	    x: distance,
	    y: skidding
	  } : {
	    x: skidding,
	    y: distance
	  };
	}

	function offset(_ref2) {
	  var state = _ref2.state,
	      options = _ref2.options,
	      name = _ref2.name;
	  var _options$offset = options.offset,
	      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	  var data = placements.reduce(function (acc, placement) {
	    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	    return acc;
	  }, {});
	  var _data$state$placement = data[state.placement],
	      x = _data$state$placement.x,
	      y = _data$state$placement.y;

	  if (state.modifiersData.popperOffsets != null) {
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var offset$1 = {
	  name: 'offset',
	  enabled: true,
	  phase: 'main',
	  requires: ['popperOffsets'],
	  fn: offset
	};

	function popperOffsets(_ref) {
	  var state = _ref.state,
	      name = _ref.name;
	  // Offsets are the actual position the popper needs to have to be
	  // properly positioned near its reference element
	  // This is the most basic placement, and will be adjusted by
	  // the modifiers in the next step
	  state.modifiersData[name] = computeOffsets({
	    reference: state.rects.reference,
	    element: state.rects.popper,
	    strategy: 'absolute',
	    placement: state.placement
	  });
	} // eslint-disable-next-line import/no-unused-modules


	var popperOffsets$1 = {
	  name: 'popperOffsets',
	  enabled: true,
	  phase: 'read',
	  fn: popperOffsets,
	  data: {}
	};

	function getAltAxis(axis) {
	  return axis === 'x' ? 'y' : 'x';
	}

	function preventOverflow(_ref) {
	  var state = _ref.state,
	      options = _ref.options,
	      name = _ref.name;
	  var _options$mainAxis = options.mainAxis,
	      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	      _options$altAxis = options.altAxis,
	      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	      boundary = options.boundary,
	      rootBoundary = options.rootBoundary,
	      altBoundary = options.altBoundary,
	      padding = options.padding,
	      _options$tether = options.tether,
	      tether = _options$tether === void 0 ? true : _options$tether,
	      _options$tetherOffset = options.tetherOffset,
	      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	  var overflow = detectOverflow(state, {
	    boundary: boundary,
	    rootBoundary: rootBoundary,
	    padding: padding,
	    altBoundary: altBoundary
	  });
	  var basePlacement = getBasePlacement(state.placement);
	  var variation = getVariation(state.placement);
	  var isBasePlacement = !variation;
	  var mainAxis = getMainAxisFromPlacement(basePlacement);
	  var altAxis = getAltAxis(mainAxis);
	  var popperOffsets = state.modifiersData.popperOffsets;
	  var referenceRect = state.rects.reference;
	  var popperRect = state.rects.popper;
	  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	    placement: state.placement
	  })) : tetherOffset;
	  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
	    mainAxis: tetherOffsetValue,
	    altAxis: tetherOffsetValue
	  } : Object.assign({
	    mainAxis: 0,
	    altAxis: 0
	  }, tetherOffsetValue);
	  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
	  var data = {
	    x: 0,
	    y: 0
	  };

	  if (!popperOffsets) {
	    return;
	  }

	  if (checkMainAxis) {
	    var _offsetModifierState$;

	    var mainSide = mainAxis === 'y' ? top : left;
	    var altSide = mainAxis === 'y' ? bottom : right;
	    var len = mainAxis === 'y' ? 'height' : 'width';
	    var offset = popperOffsets[mainAxis];
	    var min$1 = offset + overflow[mainSide];
	    var max$1 = offset - overflow[altSide];
	    var additive = tether ? -popperRect[len] / 2 : 0;
	    var minLen = variation === start ? referenceRect[len] : popperRect[len];
	    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	    // outside the reference bounds

	    var arrowElement = state.elements.arrow;
	    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	      width: 0,
	      height: 0
	    };
	    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	    var arrowPaddingMin = arrowPaddingObject[mainSide];
	    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	    // to include its full size in the calculation. If the reference is small
	    // and near the edge of a boundary, the popper can overflow even if the
	    // reference is not overflowing as well (e.g. virtual elements with no
	    // width or height)

	    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
	    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
	    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
	    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
	    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
	    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
	    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
	    var tetherMax = offset + maxOffset - offsetModifierValue;
	    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
	    popperOffsets[mainAxis] = preventedOffset;
	    data[mainAxis] = preventedOffset - offset;
	  }

	  if (checkAltAxis) {
	    var _offsetModifierState$2;

	    var _mainSide = mainAxis === 'x' ? top : left;

	    var _altSide = mainAxis === 'x' ? bottom : right;

	    var _offset = popperOffsets[altAxis];

	    var _len = altAxis === 'y' ? 'height' : 'width';

	    var _min = _offset + overflow[_mainSide];

	    var _max = _offset - overflow[_altSide];

	    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

	    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

	    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

	    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

	    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

	    popperOffsets[altAxis] = _preventedOffset;
	    data[altAxis] = _preventedOffset - _offset;
	  }

	  state.modifiersData[name] = data;
	} // eslint-disable-next-line import/no-unused-modules


	var preventOverflow$1 = {
	  name: 'preventOverflow',
	  enabled: true,
	  phase: 'main',
	  fn: preventOverflow,
	  requiresIfExists: ['offset']
	};

	function getHTMLElementScroll(element) {
	  return {
	    scrollLeft: element.scrollLeft,
	    scrollTop: element.scrollTop
	  };
	}

	function getNodeScroll(node) {
	  if (node === getWindow(node) || !isHTMLElement(node)) {
	    return getWindowScroll(node);
	  } else {
	    return getHTMLElementScroll(node);
	  }
	}

	function isElementScaled(element) {
	  var rect = element.getBoundingClientRect();
	  var scaleX = round(rect.width) / element.offsetWidth || 1;
	  var scaleY = round(rect.height) / element.offsetHeight || 1;
	  return scaleX !== 1 || scaleY !== 1;
	} // Returns the composite rect of an element relative to its offsetParent.
	// Composite means it takes into account transforms as well as layout.


	function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	  if (isFixed === void 0) {
	    isFixed = false;
	  }

	  var isOffsetParentAnElement = isHTMLElement(offsetParent);
	  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
	  var documentElement = getDocumentElement(offsetParent);
	  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
	  var scroll = {
	    scrollLeft: 0,
	    scrollTop: 0
	  };
	  var offsets = {
	    x: 0,
	    y: 0
	  };

	  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
	    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
	    isScrollParent(documentElement)) {
	      scroll = getNodeScroll(offsetParent);
	    }

	    if (isHTMLElement(offsetParent)) {
	      offsets = getBoundingClientRect(offsetParent, true);
	      offsets.x += offsetParent.clientLeft;
	      offsets.y += offsetParent.clientTop;
	    } else if (documentElement) {
	      offsets.x = getWindowScrollBarX(documentElement);
	    }
	  }

	  return {
	    x: rect.left + scroll.scrollLeft - offsets.x,
	    y: rect.top + scroll.scrollTop - offsets.y,
	    width: rect.width,
	    height: rect.height
	  };
	}

	function order(modifiers) {
	  var map = new Map();
	  var visited = new Set();
	  var result = [];
	  modifiers.forEach(function (modifier) {
	    map.set(modifier.name, modifier);
	  }); // On visiting object, check for its dependencies and visit them recursively

	  function sort(modifier) {
	    visited.add(modifier.name);
	    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	    requires.forEach(function (dep) {
	      if (!visited.has(dep)) {
	        var depModifier = map.get(dep);

	        if (depModifier) {
	          sort(depModifier);
	        }
	      }
	    });
	    result.push(modifier);
	  }

	  modifiers.forEach(function (modifier) {
	    if (!visited.has(modifier.name)) {
	      // check for visited object
	      sort(modifier);
	    }
	  });
	  return result;
	}

	function orderModifiers(modifiers) {
	  // order based on dependencies
	  var orderedModifiers = order(modifiers); // order based on phase

	  return modifierPhases.reduce(function (acc, phase) {
	    return acc.concat(orderedModifiers.filter(function (modifier) {
	      return modifier.phase === phase;
	    }));
	  }, []);
	}

	function debounce(fn) {
	  var pending;
	  return function () {
	    if (!pending) {
	      pending = new Promise(function (resolve) {
	        Promise.resolve().then(function () {
	          pending = undefined;
	          resolve(fn());
	        });
	      });
	    }

	    return pending;
	  };
	}

	function format(str) {
	  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }

	  return [].concat(args).reduce(function (p, c) {
	    return p.replace(/%s/, c);
	  }, str);
	}

	var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
	var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
	var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
	function validateModifiers(modifiers) {
	  modifiers.forEach(function (modifier) {
	    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
	    .filter(function (value, index, self) {
	      return self.indexOf(value) === index;
	    }).forEach(function (key) {
	      switch (key) {
	        case 'name':
	          if (typeof modifier.name !== 'string') {
	            console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
	          }

	          break;

	        case 'enabled':
	          if (typeof modifier.enabled !== 'boolean') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
	          }

	          break;

	        case 'phase':
	          if (modifierPhases.indexOf(modifier.phase) < 0) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
	          }

	          break;

	        case 'fn':
	          if (typeof modifier.fn !== 'function') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
	          }

	          break;

	        case 'effect':
	          if (modifier.effect != null && typeof modifier.effect !== 'function') {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
	          }

	          break;

	        case 'requires':
	          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
	          }

	          break;

	        case 'requiresIfExists':
	          if (!Array.isArray(modifier.requiresIfExists)) {
	            console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
	          }

	          break;

	        case 'options':
	        case 'data':
	          break;

	        default:
	          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
	            return "\"" + s + "\"";
	          }).join(', ') + "; but \"" + key + "\" was provided.");
	      }

	      modifier.requires && modifier.requires.forEach(function (requirement) {
	        if (modifiers.find(function (mod) {
	          return mod.name === requirement;
	        }) == null) {
	          console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
	        }
	      });
	    });
	  });
	}

	function uniqueBy(arr, fn) {
	  var identifiers = new Set();
	  return arr.filter(function (item) {
	    var identifier = fn(item);

	    if (!identifiers.has(identifier)) {
	      identifiers.add(identifier);
	      return true;
	    }
	  });
	}

	function mergeByName(modifiers) {
	  var merged = modifiers.reduce(function (merged, current) {
	    var existing = merged[current.name];
	    merged[current.name] = existing ? Object.assign({}, existing, current, {
	      options: Object.assign({}, existing.options, current.options),
	      data: Object.assign({}, existing.data, current.data)
	    }) : current;
	    return merged;
	  }, {}); // IE11 does not support Object.values

	  return Object.keys(merged).map(function (key) {
	    return merged[key];
	  });
	}

	var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
	var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
	var DEFAULT_OPTIONS = {
	  placement: 'bottom',
	  modifiers: [],
	  strategy: 'absolute'
	};

	function areValidElements() {
	  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return !args.some(function (element) {
	    return !(element && typeof element.getBoundingClientRect === 'function');
	  });
	}

	function popperGenerator(generatorOptions) {
	  if (generatorOptions === void 0) {
	    generatorOptions = {};
	  }

	  var _generatorOptions = generatorOptions,
	      _generatorOptions$def = _generatorOptions.defaultModifiers,
	      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	      _generatorOptions$def2 = _generatorOptions.defaultOptions,
	      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	  return function createPopper(reference, popper, options) {
	    if (options === void 0) {
	      options = defaultOptions;
	    }

	    var state = {
	      placement: 'bottom',
	      orderedModifiers: [],
	      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
	      modifiersData: {},
	      elements: {
	        reference: reference,
	        popper: popper
	      },
	      attributes: {},
	      styles: {}
	    };
	    var effectCleanupFns = [];
	    var isDestroyed = false;
	    var instance = {
	      state: state,
	      setOptions: function setOptions(setOptionsAction) {
	        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
	        cleanupModifierEffects();
	        state.options = Object.assign({}, defaultOptions, state.options, options);
	        state.scrollParents = {
	          reference: isElement$1(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
	          popper: listScrollParents(popper)
	        }; // Orders the modifiers based on their dependencies and `phase`
	        // properties

	        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

	        state.orderedModifiers = orderedModifiers.filter(function (m) {
	          return m.enabled;
	        }); // Validate the provided modifiers so that the consumer will get warned
	        // if one of the modifiers is invalid for any reason

	        if (process.env.NODE_ENV !== "production") {
	          var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
	            var name = _ref.name;
	            return name;
	          });
	          validateModifiers(modifiers);

	          if (getBasePlacement(state.options.placement) === auto) {
	            var flipModifier = state.orderedModifiers.find(function (_ref2) {
	              var name = _ref2.name;
	              return name === 'flip';
	            });

	            if (!flipModifier) {
	              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
	            }
	          }

	          var _getComputedStyle = getComputedStyle$1(popper),
	              marginTop = _getComputedStyle.marginTop,
	              marginRight = _getComputedStyle.marginRight,
	              marginBottom = _getComputedStyle.marginBottom,
	              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
	          // cause bugs with positioning, so we'll warn the consumer


	          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
	            return parseFloat(margin);
	          })) {
	            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
	          }
	        }

	        runModifierEffects();
	        return instance.update();
	      },
	      // Sync update – it will always be executed, even if not necessary. This
	      // is useful for low frequency updates where sync behavior simplifies the
	      // logic.
	      // For high frequency updates (e.g. `resize` and `scroll` events), always
	      // prefer the async Popper#update method
	      forceUpdate: function forceUpdate() {
	        if (isDestroyed) {
	          return;
	        }

	        var _state$elements = state.elements,
	            reference = _state$elements.reference,
	            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	        // anymore

	        if (!areValidElements(reference, popper)) {
	          if (process.env.NODE_ENV !== "production") {
	            console.error(INVALID_ELEMENT_ERROR);
	          }

	          return;
	        } // Store the reference and popper rects to be read by modifiers


	        state.rects = {
	          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	          popper: getLayoutRect(popper)
	        }; // Modifiers have the ability to reset the current update cycle. The
	        // most common use case for this is the `flip` modifier changing the
	        // placement, which then needs to re-run all the modifiers, because the
	        // logic was previously ran for the previous placement and is therefore
	        // stale/incorrect

	        state.reset = false;
	        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	        // is filled with the initial data specified by the modifier. This means
	        // it doesn't persist and is fresh on each update.
	        // To ensure persistent data, use `${name}#persistent`

	        state.orderedModifiers.forEach(function (modifier) {
	          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	        });
	        var __debug_loops__ = 0;

	        for (var index = 0; index < state.orderedModifiers.length; index++) {
	          if (process.env.NODE_ENV !== "production") {
	            __debug_loops__ += 1;

	            if (__debug_loops__ > 100) {
	              console.error(INFINITE_LOOP_ERROR);
	              break;
	            }
	          }

	          if (state.reset === true) {
	            state.reset = false;
	            index = -1;
	            continue;
	          }

	          var _state$orderedModifie = state.orderedModifiers[index],
	              fn = _state$orderedModifie.fn,
	              _state$orderedModifie2 = _state$orderedModifie.options,
	              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	              name = _state$orderedModifie.name;

	          if (typeof fn === 'function') {
	            state = fn({
	              state: state,
	              options: _options,
	              name: name,
	              instance: instance
	            }) || state;
	          }
	        }
	      },
	      // Async and optimistically optimized update – it will not be executed if
	      // not necessary (debounced to run at most once-per-tick)
	      update: debounce(function () {
	        return new Promise(function (resolve) {
	          instance.forceUpdate();
	          resolve(state);
	        });
	      }),
	      destroy: function destroy() {
	        cleanupModifierEffects();
	        isDestroyed = true;
	      }
	    };

	    if (!areValidElements(reference, popper)) {
	      if (process.env.NODE_ENV !== "production") {
	        console.error(INVALID_ELEMENT_ERROR);
	      }

	      return instance;
	    }

	    instance.setOptions(options).then(function (state) {
	      if (!isDestroyed && options.onFirstUpdate) {
	        options.onFirstUpdate(state);
	      }
	    }); // Modifiers have the ability to execute arbitrary code before the first
	    // update cycle runs. They will be executed in the same order as the update
	    // cycle. This is useful when a modifier adds some persistent data that
	    // other modifiers need to use, but the modifier is run after the dependent
	    // one.

	    function runModifierEffects() {
	      state.orderedModifiers.forEach(function (_ref3) {
	        var name = _ref3.name,
	            _ref3$options = _ref3.options,
	            options = _ref3$options === void 0 ? {} : _ref3$options,
	            effect = _ref3.effect;

	        if (typeof effect === 'function') {
	          var cleanupFn = effect({
	            state: state,
	            name: name,
	            instance: instance,
	            options: options
	          });

	          var noopFn = function noopFn() {};

	          effectCleanupFns.push(cleanupFn || noopFn);
	        }
	      });
	    }

	    function cleanupModifierEffects() {
	      effectCleanupFns.forEach(function (fn) {
	        return fn();
	      });
	      effectCleanupFns = [];
	    }

	    return instance;
	  };
	}
	var createPopper$2 = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
	var createPopper$1 = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers$1
	}); // eslint-disable-next-line import/no-unused-modules

	var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	var createPopper = /*#__PURE__*/popperGenerator({
	  defaultModifiers: defaultModifiers
	}); // eslint-disable-next-line import/no-unused-modules

	var Popper = /*#__PURE__*/Object.freeze({
		__proto__: null,
		popperGenerator: popperGenerator,
		detectOverflow: detectOverflow,
		createPopperBase: createPopper$2,
		createPopper: createPopper,
		createPopperLite: createPopper$1,
		top: top,
		bottom: bottom,
		right: right,
		left: left,
		auto: auto,
		basePlacements: basePlacements,
		start: start,
		end: end,
		clippingParents: clippingParents,
		viewport: viewport,
		popper: popper,
		reference: reference,
		variationPlacements: variationPlacements,
		placements: placements,
		beforeRead: beforeRead,
		read: read,
		afterRead: afterRead,
		beforeMain: beforeMain,
		main: main,
		afterMain: afterMain,
		beforeWrite: beforeWrite,
		write: write,
		afterWrite: afterWrite,
		modifierPhases: modifierPhases,
		applyStyles: applyStyles$1,
		arrow: arrow$1,
		computeStyles: computeStyles$1,
		eventListeners: eventListeners,
		flip: flip$1,
		hide: hide$1,
		offset: offset$1,
		popperOffsets: popperOffsets$1,
		preventOverflow: preventOverflow$1
	});

	/*!
	  * Bootstrap v5.1.3 (https://getbootstrap.com/)
	  * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
	  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	  */

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): util/index.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const MAX_UID = 1000000;
	const MILLISECONDS_MULTIPLIER = 1000;
	const TRANSITION_END = 'transitionend'; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

	const toType = obj => {
	  if (obj === null || obj === undefined) {
	    return `${obj}`;
	  }

	  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
	};
	/**
	 * --------------------------------------------------------------------------
	 * Public Util Api
	 * --------------------------------------------------------------------------
	 */


	const getUID = prefix => {
	  do {
	    prefix += Math.floor(Math.random() * MAX_UID);
	  } while (document.getElementById(prefix));

	  return prefix;
	};

	const getSelector = element => {
	  let selector = element.getAttribute('data-bs-target');

	  if (!selector || selector === '#') {
	    let hrefAttr = element.getAttribute('href'); // The only valid content that could double as a selector are IDs or classes,
	    // so everything starting with `#` or `.`. If a "real" URL is used as the selector,
	    // `document.querySelector` will rightfully complain it is invalid.
	    // See https://github.com/twbs/bootstrap/issues/32273

	    if (!hrefAttr || !hrefAttr.includes('#') && !hrefAttr.startsWith('.')) {
	      return null;
	    } // Just in case some CMS puts out a full URL with the anchor appended


	    if (hrefAttr.includes('#') && !hrefAttr.startsWith('#')) {
	      hrefAttr = `#${hrefAttr.split('#')[1]}`;
	    }

	    selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : null;
	  }

	  return selector;
	};

	const getSelectorFromElement = element => {
	  const selector = getSelector(element);

	  if (selector) {
	    return document.querySelector(selector) ? selector : null;
	  }

	  return null;
	};

	const getElementFromSelector = element => {
	  const selector = getSelector(element);
	  return selector ? document.querySelector(selector) : null;
	};

	const getTransitionDurationFromElement = element => {
	  if (!element) {
	    return 0;
	  } // Get transition-duration of the element


	  let {
	    transitionDuration,
	    transitionDelay
	  } = window.getComputedStyle(element);
	  const floatTransitionDuration = Number.parseFloat(transitionDuration);
	  const floatTransitionDelay = Number.parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

	  if (!floatTransitionDuration && !floatTransitionDelay) {
	    return 0;
	  } // If multiple durations are defined, take the first


	  transitionDuration = transitionDuration.split(',')[0];
	  transitionDelay = transitionDelay.split(',')[0];
	  return (Number.parseFloat(transitionDuration) + Number.parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
	};

	const triggerTransitionEnd = element => {
	  element.dispatchEvent(new Event(TRANSITION_END));
	};

	const isElement = obj => {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  if (typeof obj.jquery !== 'undefined') {
	    obj = obj[0];
	  }

	  return typeof obj.nodeType !== 'undefined';
	};

	const getElement = obj => {
	  if (isElement(obj)) {
	    // it's a jQuery object or a node element
	    return obj.jquery ? obj[0] : obj;
	  }

	  if (typeof obj === 'string' && obj.length > 0) {
	    return document.querySelector(obj);
	  }

	  return null;
	};

	const typeCheckConfig = (componentName, config, configTypes) => {
	  Object.keys(configTypes).forEach(property => {
	    const expectedTypes = configTypes[property];
	    const value = config[property];
	    const valueType = value && isElement(value) ? 'element' : toType(value);

	    if (!new RegExp(expectedTypes).test(valueType)) {
	      throw new TypeError(`${componentName.toUpperCase()}: Option "${property}" provided type "${valueType}" but expected type "${expectedTypes}".`);
	    }
	  });
	};

	const isVisible = element => {
	  if (!isElement(element) || element.getClientRects().length === 0) {
	    return false;
	  }

	  return getComputedStyle(element).getPropertyValue('visibility') === 'visible';
	};

	const isDisabled = element => {
	  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	    return true;
	  }

	  if (element.classList.contains('disabled')) {
	    return true;
	  }

	  if (typeof element.disabled !== 'undefined') {
	    return element.disabled;
	  }

	  return element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
	};

	const findShadowRoot = element => {
	  if (!document.documentElement.attachShadow) {
	    return null;
	  } // Can find the shadow root otherwise it'll return the document


	  if (typeof element.getRootNode === 'function') {
	    const root = element.getRootNode();
	    return root instanceof ShadowRoot ? root : null;
	  }

	  if (element instanceof ShadowRoot) {
	    return element;
	  } // when we don't find a shadow root


	  if (!element.parentNode) {
	    return null;
	  }

	  return findShadowRoot(element.parentNode);
	};

	const noop = () => {};
	/**
	 * Trick to restart an element's animation
	 *
	 * @param {HTMLElement} element
	 * @return void
	 *
	 * @see https://www.charistheo.io/blog/2021/02/restart-a-css-animation-with-javascript/#restarting-a-css-animation
	 */


	const reflow = element => {
	  // eslint-disable-next-line no-unused-expressions
	  element.offsetHeight;
	};

	const getjQuery = () => {
	  const {
	    jQuery
	  } = window;

	  if (jQuery && !document.body.hasAttribute('data-bs-no-jquery')) {
	    return jQuery;
	  }

	  return null;
	};

	const DOMContentLoadedCallbacks = [];

	const onDOMContentLoaded = callback => {
	  if (document.readyState === 'loading') {
	    // add listener on the first call when the document is in loading state
	    if (!DOMContentLoadedCallbacks.length) {
	      document.addEventListener('DOMContentLoaded', () => {
	        DOMContentLoadedCallbacks.forEach(callback => callback());
	      });
	    }

	    DOMContentLoadedCallbacks.push(callback);
	  } else {
	    callback();
	  }
	};

	const isRTL = () => document.documentElement.dir === 'rtl';

	const defineJQueryPlugin = plugin => {
	  onDOMContentLoaded(() => {
	    const $ = getjQuery();
	    /* istanbul ignore if */

	    if ($) {
	      const name = plugin.NAME;
	      const JQUERY_NO_CONFLICT = $.fn[name];
	      $.fn[name] = plugin.jQueryInterface;
	      $.fn[name].Constructor = plugin;

	      $.fn[name].noConflict = () => {
	        $.fn[name] = JQUERY_NO_CONFLICT;
	        return plugin.jQueryInterface;
	      };
	    }
	  });
	};

	const execute = callback => {
	  if (typeof callback === 'function') {
	    callback();
	  }
	};

	const executeAfterTransition = (callback, transitionElement, waitForTransition = true) => {
	  if (!waitForTransition) {
	    execute(callback);
	    return;
	  }

	  const durationPadding = 5;
	  const emulatedDuration = getTransitionDurationFromElement(transitionElement) + durationPadding;
	  let called = false;

	  const handler = ({
	    target
	  }) => {
	    if (target !== transitionElement) {
	      return;
	    }

	    called = true;
	    transitionElement.removeEventListener(TRANSITION_END, handler);
	    execute(callback);
	  };

	  transitionElement.addEventListener(TRANSITION_END, handler);
	  setTimeout(() => {
	    if (!called) {
	      triggerTransitionEnd(transitionElement);
	    }
	  }, emulatedDuration);
	};
	/**
	 * Return the previous/next element of a list.
	 *
	 * @param {array} list    The list of elements
	 * @param activeElement   The active element
	 * @param shouldGetNext   Choose to get next or previous element
	 * @param isCycleAllowed
	 * @return {Element|elem} The proper element
	 */


	const getNextActiveElement = (list, activeElement, shouldGetNext, isCycleAllowed) => {
	  let index = list.indexOf(activeElement); // if the element does not exist in the list return an element depending on the direction and if cycle is allowed

	  if (index === -1) {
	    return list[!shouldGetNext && isCycleAllowed ? list.length - 1 : 0];
	  }

	  const listLength = list.length;
	  index += shouldGetNext ? 1 : -1;

	  if (isCycleAllowed) {
	    index = (index + listLength) % listLength;
	  }

	  return list[Math.max(0, Math.min(index, listLength - 1))];
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): dom/event-handler.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const namespaceRegex = /[^.]*(?=\..*)\.|.*/;
	const stripNameRegex = /\..*/;
	const stripUidRegex = /::\d+$/;
	const eventRegistry = {}; // Events storage

	let uidEvent = 1;
	const customEvents = {
	  mouseenter: 'mouseover',
	  mouseleave: 'mouseout'
	};
	const customEventsRegex = /^(mouseenter|mouseleave)/i;
	const nativeEvents = new Set(['click', 'dblclick', 'mouseup', 'mousedown', 'contextmenu', 'mousewheel', 'DOMMouseScroll', 'mouseover', 'mouseout', 'mousemove', 'selectstart', 'selectend', 'keydown', 'keypress', 'keyup', 'orientationchange', 'touchstart', 'touchmove', 'touchend', 'touchcancel', 'pointerdown', 'pointermove', 'pointerup', 'pointerleave', 'pointercancel', 'gesturestart', 'gesturechange', 'gestureend', 'focus', 'blur', 'change', 'reset', 'select', 'submit', 'focusin', 'focusout', 'load', 'unload', 'beforeunload', 'resize', 'move', 'DOMContentLoaded', 'readystatechange', 'error', 'abort', 'scroll']);
	/**
	 * ------------------------------------------------------------------------
	 * Private methods
	 * ------------------------------------------------------------------------
	 */

	function getUidEvent(element, uid) {
	  return uid && `${uid}::${uidEvent++}` || element.uidEvent || uidEvent++;
	}

	function getEvent(element) {
	  const uid = getUidEvent(element);
	  element.uidEvent = uid;
	  eventRegistry[uid] = eventRegistry[uid] || {};
	  return eventRegistry[uid];
	}

	function bootstrapHandler(element, fn) {
	  return function handler(event) {
	    event.delegateTarget = element;

	    if (handler.oneOff) {
	      EventHandler.off(element, event.type, fn);
	    }

	    return fn.apply(element, [event]);
	  };
	}

	function bootstrapDelegationHandler(element, selector, fn) {
	  return function handler(event) {
	    const domElements = element.querySelectorAll(selector);

	    for (let {
	      target
	    } = event; target && target !== this; target = target.parentNode) {
	      for (let i = domElements.length; i--;) {
	        if (domElements[i] === target) {
	          event.delegateTarget = target;

	          if (handler.oneOff) {
	            EventHandler.off(element, event.type, selector, fn);
	          }

	          return fn.apply(target, [event]);
	        }
	      }
	    } // To please ESLint


	    return null;
	  };
	}

	function findHandler(events, handler, delegationSelector = null) {
	  const uidEventList = Object.keys(events);

	  for (let i = 0, len = uidEventList.length; i < len; i++) {
	    const event = events[uidEventList[i]];

	    if (event.originalHandler === handler && event.delegationSelector === delegationSelector) {
	      return event;
	    }
	  }

	  return null;
	}

	function normalizeParams(originalTypeEvent, handler, delegationFn) {
	  const delegation = typeof handler === 'string';
	  const originalHandler = delegation ? delegationFn : handler;
	  let typeEvent = getTypeEvent(originalTypeEvent);
	  const isNative = nativeEvents.has(typeEvent);

	  if (!isNative) {
	    typeEvent = originalTypeEvent;
	  }

	  return [delegation, originalHandler, typeEvent];
	}

	function addHandler(element, originalTypeEvent, handler, delegationFn, oneOff) {
	  if (typeof originalTypeEvent !== 'string' || !element) {
	    return;
	  }

	  if (!handler) {
	    handler = delegationFn;
	    delegationFn = null;
	  } // in case of mouseenter or mouseleave wrap the handler within a function that checks for its DOM position
	  // this prevents the handler from being dispatched the same way as mouseover or mouseout does


	  if (customEventsRegex.test(originalTypeEvent)) {
	    const wrapFn = fn => {
	      return function (event) {
	        if (!event.relatedTarget || event.relatedTarget !== event.delegateTarget && !event.delegateTarget.contains(event.relatedTarget)) {
	          return fn.call(this, event);
	        }
	      };
	    };

	    if (delegationFn) {
	      delegationFn = wrapFn(delegationFn);
	    } else {
	      handler = wrapFn(handler);
	    }
	  }

	  const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	  const events = getEvent(element);
	  const handlers = events[typeEvent] || (events[typeEvent] = {});
	  const previousFn = findHandler(handlers, originalHandler, delegation ? handler : null);

	  if (previousFn) {
	    previousFn.oneOff = previousFn.oneOff && oneOff;
	    return;
	  }

	  const uid = getUidEvent(originalHandler, originalTypeEvent.replace(namespaceRegex, ''));
	  const fn = delegation ? bootstrapDelegationHandler(element, handler, delegationFn) : bootstrapHandler(element, handler);
	  fn.delegationSelector = delegation ? handler : null;
	  fn.originalHandler = originalHandler;
	  fn.oneOff = oneOff;
	  fn.uidEvent = uid;
	  handlers[uid] = fn;
	  element.addEventListener(typeEvent, fn, delegation);
	}

	function removeHandler(element, events, typeEvent, handler, delegationSelector) {
	  const fn = findHandler(events[typeEvent], handler, delegationSelector);

	  if (!fn) {
	    return;
	  }

	  element.removeEventListener(typeEvent, fn, Boolean(delegationSelector));
	  delete events[typeEvent][fn.uidEvent];
	}

	function removeNamespacedHandlers(element, events, typeEvent, namespace) {
	  const storeElementEvent = events[typeEvent] || {};
	  Object.keys(storeElementEvent).forEach(handlerKey => {
	    if (handlerKey.includes(namespace)) {
	      const event = storeElementEvent[handlerKey];
	      removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	    }
	  });
	}

	function getTypeEvent(event) {
	  // allow to get the native events from namespaced events ('click.bs.button' --> 'click')
	  event = event.replace(stripNameRegex, '');
	  return customEvents[event] || event;
	}

	const EventHandler = {
	  on(element, event, handler, delegationFn) {
	    addHandler(element, event, handler, delegationFn, false);
	  },

	  one(element, event, handler, delegationFn) {
	    addHandler(element, event, handler, delegationFn, true);
	  },

	  off(element, originalTypeEvent, handler, delegationFn) {
	    if (typeof originalTypeEvent !== 'string' || !element) {
	      return;
	    }

	    const [delegation, originalHandler, typeEvent] = normalizeParams(originalTypeEvent, handler, delegationFn);
	    const inNamespace = typeEvent !== originalTypeEvent;
	    const events = getEvent(element);
	    const isNamespace = originalTypeEvent.startsWith('.');

	    if (typeof originalHandler !== 'undefined') {
	      // Simplest case: handler is passed, remove that listener ONLY.
	      if (!events || !events[typeEvent]) {
	        return;
	      }

	      removeHandler(element, events, typeEvent, originalHandler, delegation ? handler : null);
	      return;
	    }

	    if (isNamespace) {
	      Object.keys(events).forEach(elementEvent => {
	        removeNamespacedHandlers(element, events, elementEvent, originalTypeEvent.slice(1));
	      });
	    }

	    const storeElementEvent = events[typeEvent] || {};
	    Object.keys(storeElementEvent).forEach(keyHandlers => {
	      const handlerKey = keyHandlers.replace(stripUidRegex, '');

	      if (!inNamespace || originalTypeEvent.includes(handlerKey)) {
	        const event = storeElementEvent[keyHandlers];
	        removeHandler(element, events, typeEvent, event.originalHandler, event.delegationSelector);
	      }
	    });
	  },

	  trigger(element, event, args) {
	    if (typeof event !== 'string' || !element) {
	      return null;
	    }

	    const $ = getjQuery();
	    const typeEvent = getTypeEvent(event);
	    const inNamespace = event !== typeEvent;
	    const isNative = nativeEvents.has(typeEvent);
	    let jQueryEvent;
	    let bubbles = true;
	    let nativeDispatch = true;
	    let defaultPrevented = false;
	    let evt = null;

	    if (inNamespace && $) {
	      jQueryEvent = $.Event(event, args);
	      $(element).trigger(jQueryEvent);
	      bubbles = !jQueryEvent.isPropagationStopped();
	      nativeDispatch = !jQueryEvent.isImmediatePropagationStopped();
	      defaultPrevented = jQueryEvent.isDefaultPrevented();
	    }

	    if (isNative) {
	      evt = document.createEvent('HTMLEvents');
	      evt.initEvent(typeEvent, bubbles, true);
	    } else {
	      evt = new CustomEvent(event, {
	        bubbles,
	        cancelable: true
	      });
	    } // merge custom information in our event


	    if (typeof args !== 'undefined') {
	      Object.keys(args).forEach(key => {
	        Object.defineProperty(evt, key, {
	          get() {
	            return args[key];
	          }

	        });
	      });
	    }

	    if (defaultPrevented) {
	      evt.preventDefault();
	    }

	    if (nativeDispatch) {
	      element.dispatchEvent(evt);
	    }

	    if (evt.defaultPrevented && typeof jQueryEvent !== 'undefined') {
	      jQueryEvent.preventDefault();
	    }

	    return evt;
	  }

	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): dom/data.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */
	const elementMap = new Map();
	const Data = {
	  set(element, key, instance) {
	    if (!elementMap.has(element)) {
	      elementMap.set(element, new Map());
	    }

	    const instanceMap = elementMap.get(element); // make it clear we only want one instance per element
	    // can be removed later when multiple key/instances are fine to be used

	    if (!instanceMap.has(key) && instanceMap.size !== 0) {
	      // eslint-disable-next-line no-console
	      console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(instanceMap.keys())[0]}.`);
	      return;
	    }

	    instanceMap.set(key, instance);
	  },

	  get(element, key) {
	    if (elementMap.has(element)) {
	      return elementMap.get(element).get(key) || null;
	    }

	    return null;
	  },

	  remove(element, key) {
	    if (!elementMap.has(element)) {
	      return;
	    }

	    const instanceMap = elementMap.get(element);
	    instanceMap.delete(key); // free up element references if there are no instances left for an element

	    if (instanceMap.size === 0) {
	      elementMap.delete(element);
	    }
	  }

	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): base-component.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const VERSION = '5.1.3';

	class BaseComponent {
	  constructor(element) {
	    element = getElement(element);

	    if (!element) {
	      return;
	    }

	    this._element = element;
	    Data.set(this._element, this.constructor.DATA_KEY, this);
	  }

	  dispose() {
	    Data.remove(this._element, this.constructor.DATA_KEY);
	    EventHandler.off(this._element, this.constructor.EVENT_KEY);
	    Object.getOwnPropertyNames(this).forEach(propertyName => {
	      this[propertyName] = null;
	    });
	  }

	  _queueCallback(callback, element, isAnimated = true) {
	    executeAfterTransition(callback, element, isAnimated);
	  }
	  /** Static */


	  static getInstance(element) {
	    return Data.get(getElement(element), this.DATA_KEY);
	  }

	  static getOrCreateInstance(element, config = {}) {
	    return this.getInstance(element) || new this(element, typeof config === 'object' ? config : null);
	  }

	  static get VERSION() {
	    return VERSION;
	  }

	  static get NAME() {
	    throw new Error('You have to implement the static method "NAME", for each component!');
	  }

	  static get DATA_KEY() {
	    return `bs.${this.NAME}`;
	  }

	  static get EVENT_KEY() {
	    return `.${this.DATA_KEY}`;
	  }

	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): util/component-functions.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	const enableDismissTrigger = (component, method = 'hide') => {
	  const clickEvent = `click.dismiss${component.EVENT_KEY}`;
	  const name = component.NAME;
	  EventHandler.on(document, clickEvent, `[data-bs-dismiss="${name}"]`, function (event) {
	    if (['A', 'AREA'].includes(this.tagName)) {
	      event.preventDefault();
	    }

	    if (isDisabled(this)) {
	      return;
	    }

	    const target = getElementFromSelector(this) || this.closest(`.${name}`);
	    const instance = component.getOrCreateInstance(target); // Method argument is left, for Alert and only, as it doesn't implement the 'hide' method

	    instance[method]();
	  });
	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): alert.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$d = 'alert';
	const DATA_KEY$c = 'bs.alert';
	const EVENT_KEY$c = `.${DATA_KEY$c}`;
	const EVENT_CLOSE = `close${EVENT_KEY$c}`;
	const EVENT_CLOSED = `closed${EVENT_KEY$c}`;
	const CLASS_NAME_FADE$5 = 'fade';
	const CLASS_NAME_SHOW$8 = 'show';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Alert extends BaseComponent {
	  // Getters
	  static get NAME() {
	    return NAME$d;
	  } // Public


	  close() {
	    const closeEvent = EventHandler.trigger(this._element, EVENT_CLOSE);

	    if (closeEvent.defaultPrevented) {
	      return;
	    }

	    this._element.classList.remove(CLASS_NAME_SHOW$8);

	    const isAnimated = this._element.classList.contains(CLASS_NAME_FADE$5);

	    this._queueCallback(() => this._destroyElement(), this._element, isAnimated);
	  } // Private


	  _destroyElement() {
	    this._element.remove();

	    EventHandler.trigger(this._element, EVENT_CLOSED);
	    this.dispose();
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Alert.getOrCreateInstance(this);

	      if (typeof config !== 'string') {
	        return;
	      }

	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError(`No method named "${config}"`);
	      }

	      data[config](this);
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	enableDismissTrigger(Alert, 'close');
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Alert to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Alert);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): button.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$c = 'button';
	const DATA_KEY$b = 'bs.button';
	const EVENT_KEY$b = `.${DATA_KEY$b}`;
	const DATA_API_KEY$7 = '.data-api';
	const CLASS_NAME_ACTIVE$3 = 'active';
	const SELECTOR_DATA_TOGGLE$5 = '[data-bs-toggle="button"]';
	const EVENT_CLICK_DATA_API$6 = `click${EVENT_KEY$b}${DATA_API_KEY$7}`;
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Button extends BaseComponent {
	  // Getters
	  static get NAME() {
	    return NAME$c;
	  } // Public


	  toggle() {
	    // Toggle class and sync the `aria-pressed` attribute with the return value of the `.toggle()` method
	    this._element.setAttribute('aria-pressed', this._element.classList.toggle(CLASS_NAME_ACTIVE$3));
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Button.getOrCreateInstance(this);

	      if (config === 'toggle') {
	        data[config]();
	      }
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$6, SELECTOR_DATA_TOGGLE$5, event => {
	  event.preventDefault();
	  const button = event.target.closest(SELECTOR_DATA_TOGGLE$5);
	  const data = Button.getOrCreateInstance(button);
	  data.toggle();
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Button to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Button);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): dom/manipulator.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	function normalizeData(val) {
	  if (val === 'true') {
	    return true;
	  }

	  if (val === 'false') {
	    return false;
	  }

	  if (val === Number(val).toString()) {
	    return Number(val);
	  }

	  if (val === '' || val === 'null') {
	    return null;
	  }

	  return val;
	}

	function normalizeDataKey(key) {
	  return key.replace(/[A-Z]/g, chr => `-${chr.toLowerCase()}`);
	}

	const Manipulator = {
	  setDataAttribute(element, key, value) {
	    element.setAttribute(`data-bs-${normalizeDataKey(key)}`, value);
	  },

	  removeDataAttribute(element, key) {
	    element.removeAttribute(`data-bs-${normalizeDataKey(key)}`);
	  },

	  getDataAttributes(element) {
	    if (!element) {
	      return {};
	    }

	    const attributes = {};
	    Object.keys(element.dataset).filter(key => key.startsWith('bs')).forEach(key => {
	      let pureKey = key.replace(/^bs/, '');
	      pureKey = pureKey.charAt(0).toLowerCase() + pureKey.slice(1, pureKey.length);
	      attributes[pureKey] = normalizeData(element.dataset[key]);
	    });
	    return attributes;
	  },

	  getDataAttribute(element, key) {
	    return normalizeData(element.getAttribute(`data-bs-${normalizeDataKey(key)}`));
	  },

	  offset(element) {
	    const rect = element.getBoundingClientRect();
	    return {
	      top: rect.top + window.pageYOffset,
	      left: rect.left + window.pageXOffset
	    };
	  },

	  position(element) {
	    return {
	      top: element.offsetTop,
	      left: element.offsetLeft
	    };
	  }

	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): dom/selector-engine.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const NODE_TEXT = 3;
	const SelectorEngine = {
	  find(selector, element = document.documentElement) {
	    return [].concat(...Element.prototype.querySelectorAll.call(element, selector));
	  },

	  findOne(selector, element = document.documentElement) {
	    return Element.prototype.querySelector.call(element, selector);
	  },

	  children(element, selector) {
	    return [].concat(...element.children).filter(child => child.matches(selector));
	  },

	  parents(element, selector) {
	    const parents = [];
	    let ancestor = element.parentNode;

	    while (ancestor && ancestor.nodeType === Node.ELEMENT_NODE && ancestor.nodeType !== NODE_TEXT) {
	      if (ancestor.matches(selector)) {
	        parents.push(ancestor);
	      }

	      ancestor = ancestor.parentNode;
	    }

	    return parents;
	  },

	  prev(element, selector) {
	    let previous = element.previousElementSibling;

	    while (previous) {
	      if (previous.matches(selector)) {
	        return [previous];
	      }

	      previous = previous.previousElementSibling;
	    }

	    return [];
	  },

	  next(element, selector) {
	    let next = element.nextElementSibling;

	    while (next) {
	      if (next.matches(selector)) {
	        return [next];
	      }

	      next = next.nextElementSibling;
	    }

	    return [];
	  },

	  focusableChildren(element) {
	    const focusables = ['a', 'button', 'input', 'textarea', 'select', 'details', '[tabindex]', '[contenteditable="true"]'].map(selector => `${selector}:not([tabindex^="-"])`).join(', ');
	    return this.find(focusables, element).filter(el => !isDisabled(el) && isVisible(el));
	  }

	};

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): carousel.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$b = 'carousel';
	const DATA_KEY$a = 'bs.carousel';
	const EVENT_KEY$a = `.${DATA_KEY$a}`;
	const DATA_API_KEY$6 = '.data-api';
	const ARROW_LEFT_KEY = 'ArrowLeft';
	const ARROW_RIGHT_KEY = 'ArrowRight';
	const TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

	const SWIPE_THRESHOLD = 40;
	const Default$a = {
	  interval: 5000,
	  keyboard: true,
	  slide: false,
	  pause: 'hover',
	  wrap: true,
	  touch: true
	};
	const DefaultType$a = {
	  interval: '(number|boolean)',
	  keyboard: 'boolean',
	  slide: '(boolean|string)',
	  pause: '(string|boolean)',
	  wrap: 'boolean',
	  touch: 'boolean'
	};
	const ORDER_NEXT = 'next';
	const ORDER_PREV = 'prev';
	const DIRECTION_LEFT = 'left';
	const DIRECTION_RIGHT = 'right';
	const KEY_TO_DIRECTION = {
	  [ARROW_LEFT_KEY]: DIRECTION_RIGHT,
	  [ARROW_RIGHT_KEY]: DIRECTION_LEFT
	};
	const EVENT_SLIDE = `slide${EVENT_KEY$a}`;
	const EVENT_SLID = `slid${EVENT_KEY$a}`;
	const EVENT_KEYDOWN = `keydown${EVENT_KEY$a}`;
	const EVENT_MOUSEENTER = `mouseenter${EVENT_KEY$a}`;
	const EVENT_MOUSELEAVE = `mouseleave${EVENT_KEY$a}`;
	const EVENT_TOUCHSTART = `touchstart${EVENT_KEY$a}`;
	const EVENT_TOUCHMOVE = `touchmove${EVENT_KEY$a}`;
	const EVENT_TOUCHEND = `touchend${EVENT_KEY$a}`;
	const EVENT_POINTERDOWN = `pointerdown${EVENT_KEY$a}`;
	const EVENT_POINTERUP = `pointerup${EVENT_KEY$a}`;
	const EVENT_DRAG_START = `dragstart${EVENT_KEY$a}`;
	const EVENT_LOAD_DATA_API$2 = `load${EVENT_KEY$a}${DATA_API_KEY$6}`;
	const EVENT_CLICK_DATA_API$5 = `click${EVENT_KEY$a}${DATA_API_KEY$6}`;
	const CLASS_NAME_CAROUSEL = 'carousel';
	const CLASS_NAME_ACTIVE$2 = 'active';
	const CLASS_NAME_SLIDE = 'slide';
	const CLASS_NAME_END = 'carousel-item-end';
	const CLASS_NAME_START = 'carousel-item-start';
	const CLASS_NAME_NEXT = 'carousel-item-next';
	const CLASS_NAME_PREV = 'carousel-item-prev';
	const CLASS_NAME_POINTER_EVENT = 'pointer-event';
	const SELECTOR_ACTIVE$1 = '.active';
	const SELECTOR_ACTIVE_ITEM = '.active.carousel-item';
	const SELECTOR_ITEM = '.carousel-item';
	const SELECTOR_ITEM_IMG = '.carousel-item img';
	const SELECTOR_NEXT_PREV = '.carousel-item-next, .carousel-item-prev';
	const SELECTOR_INDICATORS = '.carousel-indicators';
	const SELECTOR_INDICATOR = '[data-bs-target]';
	const SELECTOR_DATA_SLIDE = '[data-bs-slide], [data-bs-slide-to]';
	const SELECTOR_DATA_RIDE = '[data-bs-ride="carousel"]';
	const POINTER_TYPE_TOUCH = 'touch';
	const POINTER_TYPE_PEN = 'pen';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Carousel extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._items = null;
	    this._interval = null;
	    this._activeElement = null;
	    this._isPaused = false;
	    this._isSliding = false;
	    this.touchTimeout = null;
	    this.touchStartX = 0;
	    this.touchDeltaX = 0;
	    this._config = this._getConfig(config);
	    this._indicatorsElement = SelectorEngine.findOne(SELECTOR_INDICATORS, this._element);
	    this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
	    this._pointerEvent = Boolean(window.PointerEvent);

	    this._addEventListeners();
	  } // Getters


	  static get Default() {
	    return Default$a;
	  }

	  static get NAME() {
	    return NAME$b;
	  } // Public


	  next() {
	    this._slide(ORDER_NEXT);
	  }

	  nextWhenVisible() {
	    // Don't call next when the page isn't visible
	    // or the carousel or its parent isn't visible
	    if (!document.hidden && isVisible(this._element)) {
	      this.next();
	    }
	  }

	  prev() {
	    this._slide(ORDER_PREV);
	  }

	  pause(event) {
	    if (!event) {
	      this._isPaused = true;
	    }

	    if (SelectorEngine.findOne(SELECTOR_NEXT_PREV, this._element)) {
	      triggerTransitionEnd(this._element);
	      this.cycle(true);
	    }

	    clearInterval(this._interval);
	    this._interval = null;
	  }

	  cycle(event) {
	    if (!event) {
	      this._isPaused = false;
	    }

	    if (this._interval) {
	      clearInterval(this._interval);
	      this._interval = null;
	    }

	    if (this._config && this._config.interval && !this._isPaused) {
	      this._updateInterval();

	      this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
	    }
	  }

	  to(index) {
	    this._activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	    const activeIndex = this._getItemIndex(this._activeElement);

	    if (index > this._items.length - 1 || index < 0) {
	      return;
	    }

	    if (this._isSliding) {
	      EventHandler.one(this._element, EVENT_SLID, () => this.to(index));
	      return;
	    }

	    if (activeIndex === index) {
	      this.pause();
	      this.cycle();
	      return;
	    }

	    const order = index > activeIndex ? ORDER_NEXT : ORDER_PREV;

	    this._slide(order, this._items[index]);
	  } // Private


	  _getConfig(config) {
	    config = { ...Default$a,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' ? config : {})
	    };
	    typeCheckConfig(NAME$b, config, DefaultType$a);
	    return config;
	  }

	  _handleSwipe() {
	    const absDeltax = Math.abs(this.touchDeltaX);

	    if (absDeltax <= SWIPE_THRESHOLD) {
	      return;
	    }

	    const direction = absDeltax / this.touchDeltaX;
	    this.touchDeltaX = 0;

	    if (!direction) {
	      return;
	    }

	    this._slide(direction > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
	  }

	  _addEventListeners() {
	    if (this._config.keyboard) {
	      EventHandler.on(this._element, EVENT_KEYDOWN, event => this._keydown(event));
	    }

	    if (this._config.pause === 'hover') {
	      EventHandler.on(this._element, EVENT_MOUSEENTER, event => this.pause(event));
	      EventHandler.on(this._element, EVENT_MOUSELEAVE, event => this.cycle(event));
	    }

	    if (this._config.touch && this._touchSupported) {
	      this._addTouchEventListeners();
	    }
	  }

	  _addTouchEventListeners() {
	    const hasPointerPenTouch = event => {
	      return this._pointerEvent && (event.pointerType === POINTER_TYPE_PEN || event.pointerType === POINTER_TYPE_TOUCH);
	    };

	    const start = event => {
	      if (hasPointerPenTouch(event)) {
	        this.touchStartX = event.clientX;
	      } else if (!this._pointerEvent) {
	        this.touchStartX = event.touches[0].clientX;
	      }
	    };

	    const move = event => {
	      // ensure swiping with one touch and not pinching
	      this.touchDeltaX = event.touches && event.touches.length > 1 ? 0 : event.touches[0].clientX - this.touchStartX;
	    };

	    const end = event => {
	      if (hasPointerPenTouch(event)) {
	        this.touchDeltaX = event.clientX - this.touchStartX;
	      }

	      this._handleSwipe();

	      if (this._config.pause === 'hover') {
	        // If it's a touch-enabled device, mouseenter/leave are fired as
	        // part of the mouse compatibility events on first tap - the carousel
	        // would stop cycling until user tapped out of it;
	        // here, we listen for touchend, explicitly pause the carousel
	        // (as if it's the second time we tap on it, mouseenter compat event
	        // is NOT fired) and after a timeout (to allow for mouse compatibility
	        // events to fire) we explicitly restart cycling
	        this.pause();

	        if (this.touchTimeout) {
	          clearTimeout(this.touchTimeout);
	        }

	        this.touchTimeout = setTimeout(event => this.cycle(event), TOUCHEVENT_COMPAT_WAIT + this._config.interval);
	      }
	    };

	    SelectorEngine.find(SELECTOR_ITEM_IMG, this._element).forEach(itemImg => {
	      EventHandler.on(itemImg, EVENT_DRAG_START, event => event.preventDefault());
	    });

	    if (this._pointerEvent) {
	      EventHandler.on(this._element, EVENT_POINTERDOWN, event => start(event));
	      EventHandler.on(this._element, EVENT_POINTERUP, event => end(event));

	      this._element.classList.add(CLASS_NAME_POINTER_EVENT);
	    } else {
	      EventHandler.on(this._element, EVENT_TOUCHSTART, event => start(event));
	      EventHandler.on(this._element, EVENT_TOUCHMOVE, event => move(event));
	      EventHandler.on(this._element, EVENT_TOUCHEND, event => end(event));
	    }
	  }

	  _keydown(event) {
	    if (/input|textarea/i.test(event.target.tagName)) {
	      return;
	    }

	    const direction = KEY_TO_DIRECTION[event.key];

	    if (direction) {
	      event.preventDefault();

	      this._slide(direction);
	    }
	  }

	  _getItemIndex(element) {
	    this._items = element && element.parentNode ? SelectorEngine.find(SELECTOR_ITEM, element.parentNode) : [];
	    return this._items.indexOf(element);
	  }

	  _getItemByOrder(order, activeElement) {
	    const isNext = order === ORDER_NEXT;
	    return getNextActiveElement(this._items, activeElement, isNext, this._config.wrap);
	  }

	  _triggerSlideEvent(relatedTarget, eventDirectionName) {
	    const targetIndex = this._getItemIndex(relatedTarget);

	    const fromIndex = this._getItemIndex(SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element));

	    return EventHandler.trigger(this._element, EVENT_SLIDE, {
	      relatedTarget,
	      direction: eventDirectionName,
	      from: fromIndex,
	      to: targetIndex
	    });
	  }

	  _setActiveIndicatorElement(element) {
	    if (this._indicatorsElement) {
	      const activeIndicator = SelectorEngine.findOne(SELECTOR_ACTIVE$1, this._indicatorsElement);
	      activeIndicator.classList.remove(CLASS_NAME_ACTIVE$2);
	      activeIndicator.removeAttribute('aria-current');
	      const indicators = SelectorEngine.find(SELECTOR_INDICATOR, this._indicatorsElement);

	      for (let i = 0; i < indicators.length; i++) {
	        if (Number.parseInt(indicators[i].getAttribute('data-bs-slide-to'), 10) === this._getItemIndex(element)) {
	          indicators[i].classList.add(CLASS_NAME_ACTIVE$2);
	          indicators[i].setAttribute('aria-current', 'true');
	          break;
	        }
	      }
	    }
	  }

	  _updateInterval() {
	    const element = this._activeElement || SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	    if (!element) {
	      return;
	    }

	    const elementInterval = Number.parseInt(element.getAttribute('data-bs-interval'), 10);

	    if (elementInterval) {
	      this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
	      this._config.interval = elementInterval;
	    } else {
	      this._config.interval = this._config.defaultInterval || this._config.interval;
	    }
	  }

	  _slide(directionOrOrder, element) {
	    const order = this._directionToOrder(directionOrOrder);

	    const activeElement = SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM, this._element);

	    const activeElementIndex = this._getItemIndex(activeElement);

	    const nextElement = element || this._getItemByOrder(order, activeElement);

	    const nextElementIndex = this._getItemIndex(nextElement);

	    const isCycling = Boolean(this._interval);
	    const isNext = order === ORDER_NEXT;
	    const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;
	    const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;

	    const eventDirectionName = this._orderToDirection(order);

	    if (nextElement && nextElement.classList.contains(CLASS_NAME_ACTIVE$2)) {
	      this._isSliding = false;
	      return;
	    }

	    if (this._isSliding) {
	      return;
	    }

	    const slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

	    if (slideEvent.defaultPrevented) {
	      return;
	    }

	    if (!activeElement || !nextElement) {
	      // Some weirdness is happening, so we bail
	      return;
	    }

	    this._isSliding = true;

	    if (isCycling) {
	      this.pause();
	    }

	    this._setActiveIndicatorElement(nextElement);

	    this._activeElement = nextElement;

	    const triggerSlidEvent = () => {
	      EventHandler.trigger(this._element, EVENT_SLID, {
	        relatedTarget: nextElement,
	        direction: eventDirectionName,
	        from: activeElementIndex,
	        to: nextElementIndex
	      });
	    };

	    if (this._element.classList.contains(CLASS_NAME_SLIDE)) {
	      nextElement.classList.add(orderClassName);
	      reflow(nextElement);
	      activeElement.classList.add(directionalClassName);
	      nextElement.classList.add(directionalClassName);

	      const completeCallBack = () => {
	        nextElement.classList.remove(directionalClassName, orderClassName);
	        nextElement.classList.add(CLASS_NAME_ACTIVE$2);
	        activeElement.classList.remove(CLASS_NAME_ACTIVE$2, orderClassName, directionalClassName);
	        this._isSliding = false;
	        setTimeout(triggerSlidEvent, 0);
	      };

	      this._queueCallback(completeCallBack, activeElement, true);
	    } else {
	      activeElement.classList.remove(CLASS_NAME_ACTIVE$2);
	      nextElement.classList.add(CLASS_NAME_ACTIVE$2);
	      this._isSliding = false;
	      triggerSlidEvent();
	    }

	    if (isCycling) {
	      this.cycle();
	    }
	  }

	  _directionToOrder(direction) {
	    if (![DIRECTION_RIGHT, DIRECTION_LEFT].includes(direction)) {
	      return direction;
	    }

	    if (isRTL()) {
	      return direction === DIRECTION_LEFT ? ORDER_PREV : ORDER_NEXT;
	    }

	    return direction === DIRECTION_LEFT ? ORDER_NEXT : ORDER_PREV;
	  }

	  _orderToDirection(order) {
	    if (![ORDER_NEXT, ORDER_PREV].includes(order)) {
	      return order;
	    }

	    if (isRTL()) {
	      return order === ORDER_PREV ? DIRECTION_LEFT : DIRECTION_RIGHT;
	    }

	    return order === ORDER_PREV ? DIRECTION_RIGHT : DIRECTION_LEFT;
	  } // Static


	  static carouselInterface(element, config) {
	    const data = Carousel.getOrCreateInstance(element, config);
	    let {
	      _config
	    } = data;

	    if (typeof config === 'object') {
	      _config = { ..._config,
	        ...config
	      };
	    }

	    const action = typeof config === 'string' ? config : _config.slide;

	    if (typeof config === 'number') {
	      data.to(config);
	    } else if (typeof action === 'string') {
	      if (typeof data[action] === 'undefined') {
	        throw new TypeError(`No method named "${action}"`);
	      }

	      data[action]();
	    } else if (_config.interval && _config.ride) {
	      data.pause();
	      data.cycle();
	    }
	  }

	  static jQueryInterface(config) {
	    return this.each(function () {
	      Carousel.carouselInterface(this, config);
	    });
	  }

	  static dataApiClickHandler(event) {
	    const target = getElementFromSelector(this);

	    if (!target || !target.classList.contains(CLASS_NAME_CAROUSEL)) {
	      return;
	    }

	    const config = { ...Manipulator.getDataAttributes(target),
	      ...Manipulator.getDataAttributes(this)
	    };
	    const slideIndex = this.getAttribute('data-bs-slide-to');

	    if (slideIndex) {
	      config.interval = false;
	    }

	    Carousel.carouselInterface(target, config);

	    if (slideIndex) {
	      Carousel.getInstance(target).to(slideIndex);
	    }

	    event.preventDefault();
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$5, SELECTOR_DATA_SLIDE, Carousel.dataApiClickHandler);
	EventHandler.on(window, EVENT_LOAD_DATA_API$2, () => {
	  const carousels = SelectorEngine.find(SELECTOR_DATA_RIDE);

	  for (let i = 0, len = carousels.length; i < len; i++) {
	    Carousel.carouselInterface(carousels[i], Carousel.getInstance(carousels[i]));
	  }
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Carousel to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Carousel);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): collapse.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$a = 'collapse';
	const DATA_KEY$9 = 'bs.collapse';
	const EVENT_KEY$9 = `.${DATA_KEY$9}`;
	const DATA_API_KEY$5 = '.data-api';
	const Default$9 = {
	  toggle: true,
	  parent: null
	};
	const DefaultType$9 = {
	  toggle: 'boolean',
	  parent: '(null|element)'
	};
	const EVENT_SHOW$5 = `show${EVENT_KEY$9}`;
	const EVENT_SHOWN$5 = `shown${EVENT_KEY$9}`;
	const EVENT_HIDE$5 = `hide${EVENT_KEY$9}`;
	const EVENT_HIDDEN$5 = `hidden${EVENT_KEY$9}`;
	const EVENT_CLICK_DATA_API$4 = `click${EVENT_KEY$9}${DATA_API_KEY$5}`;
	const CLASS_NAME_SHOW$7 = 'show';
	const CLASS_NAME_COLLAPSE = 'collapse';
	const CLASS_NAME_COLLAPSING = 'collapsing';
	const CLASS_NAME_COLLAPSED = 'collapsed';
	const CLASS_NAME_DEEPER_CHILDREN = `:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`;
	const CLASS_NAME_HORIZONTAL = 'collapse-horizontal';
	const WIDTH = 'width';
	const HEIGHT = 'height';
	const SELECTOR_ACTIVES = '.collapse.show, .collapse.collapsing';
	const SELECTOR_DATA_TOGGLE$4 = '[data-bs-toggle="collapse"]';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Collapse extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._isTransitioning = false;
	    this._config = this._getConfig(config);
	    this._triggerArray = [];
	    const toggleList = SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);

	    for (let i = 0, len = toggleList.length; i < len; i++) {
	      const elem = toggleList[i];
	      const selector = getSelectorFromElement(elem);
	      const filterElement = SelectorEngine.find(selector).filter(foundElem => foundElem === this._element);

	      if (selector !== null && filterElement.length) {
	        this._selector = selector;

	        this._triggerArray.push(elem);
	      }
	    }

	    this._initializeChildren();

	    if (!this._config.parent) {
	      this._addAriaAndCollapsedClass(this._triggerArray, this._isShown());
	    }

	    if (this._config.toggle) {
	      this.toggle();
	    }
	  } // Getters


	  static get Default() {
	    return Default$9;
	  }

	  static get NAME() {
	    return NAME$a;
	  } // Public


	  toggle() {
	    if (this._isShown()) {
	      this.hide();
	    } else {
	      this.show();
	    }
	  }

	  show() {
	    if (this._isTransitioning || this._isShown()) {
	      return;
	    }

	    let actives = [];
	    let activesData;

	    if (this._config.parent) {
	      const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	      actives = SelectorEngine.find(SELECTOR_ACTIVES, this._config.parent).filter(elem => !children.includes(elem)); // remove children if greater depth
	    }

	    const container = SelectorEngine.findOne(this._selector);

	    if (actives.length) {
	      const tempActiveData = actives.find(elem => container !== elem);
	      activesData = tempActiveData ? Collapse.getInstance(tempActiveData) : null;

	      if (activesData && activesData._isTransitioning) {
	        return;
	      }
	    }

	    const startEvent = EventHandler.trigger(this._element, EVENT_SHOW$5);

	    if (startEvent.defaultPrevented) {
	      return;
	    }

	    actives.forEach(elemActive => {
	      if (container !== elemActive) {
	        Collapse.getOrCreateInstance(elemActive, {
	          toggle: false
	        }).hide();
	      }

	      if (!activesData) {
	        Data.set(elemActive, DATA_KEY$9, null);
	      }
	    });

	    const dimension = this._getDimension();

	    this._element.classList.remove(CLASS_NAME_COLLAPSE);

	    this._element.classList.add(CLASS_NAME_COLLAPSING);

	    this._element.style[dimension] = 0;

	    this._addAriaAndCollapsedClass(this._triggerArray, true);

	    this._isTransitioning = true;

	    const complete = () => {
	      this._isTransitioning = false;

	      this._element.classList.remove(CLASS_NAME_COLLAPSING);

	      this._element.classList.add(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

	      this._element.style[dimension] = '';
	      EventHandler.trigger(this._element, EVENT_SHOWN$5);
	    };

	    const capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	    const scrollSize = `scroll${capitalizedDimension}`;

	    this._queueCallback(complete, this._element, true);

	    this._element.style[dimension] = `${this._element[scrollSize]}px`;
	  }

	  hide() {
	    if (this._isTransitioning || !this._isShown()) {
	      return;
	    }

	    const startEvent = EventHandler.trigger(this._element, EVENT_HIDE$5);

	    if (startEvent.defaultPrevented) {
	      return;
	    }

	    const dimension = this._getDimension();

	    this._element.style[dimension] = `${this._element.getBoundingClientRect()[dimension]}px`;
	    reflow(this._element);

	    this._element.classList.add(CLASS_NAME_COLLAPSING);

	    this._element.classList.remove(CLASS_NAME_COLLAPSE, CLASS_NAME_SHOW$7);

	    const triggerArrayLength = this._triggerArray.length;

	    for (let i = 0; i < triggerArrayLength; i++) {
	      const trigger = this._triggerArray[i];
	      const elem = getElementFromSelector(trigger);

	      if (elem && !this._isShown(elem)) {
	        this._addAriaAndCollapsedClass([trigger], false);
	      }
	    }

	    this._isTransitioning = true;

	    const complete = () => {
	      this._isTransitioning = false;

	      this._element.classList.remove(CLASS_NAME_COLLAPSING);

	      this._element.classList.add(CLASS_NAME_COLLAPSE);

	      EventHandler.trigger(this._element, EVENT_HIDDEN$5);
	    };

	    this._element.style[dimension] = '';

	    this._queueCallback(complete, this._element, true);
	  }

	  _isShown(element = this._element) {
	    return element.classList.contains(CLASS_NAME_SHOW$7);
	  } // Private


	  _getConfig(config) {
	    config = { ...Default$9,
	      ...Manipulator.getDataAttributes(this._element),
	      ...config
	    };
	    config.toggle = Boolean(config.toggle); // Coerce string values

	    config.parent = getElement(config.parent);
	    typeCheckConfig(NAME$a, config, DefaultType$9);
	    return config;
	  }

	  _getDimension() {
	    return this._element.classList.contains(CLASS_NAME_HORIZONTAL) ? WIDTH : HEIGHT;
	  }

	  _initializeChildren() {
	    if (!this._config.parent) {
	      return;
	    }

	    const children = SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN, this._config.parent);
	    SelectorEngine.find(SELECTOR_DATA_TOGGLE$4, this._config.parent).filter(elem => !children.includes(elem)).forEach(element => {
	      const selected = getElementFromSelector(element);

	      if (selected) {
	        this._addAriaAndCollapsedClass([element], this._isShown(selected));
	      }
	    });
	  }

	  _addAriaAndCollapsedClass(triggerArray, isOpen) {
	    if (!triggerArray.length) {
	      return;
	    }

	    triggerArray.forEach(elem => {
	      if (isOpen) {
	        elem.classList.remove(CLASS_NAME_COLLAPSED);
	      } else {
	        elem.classList.add(CLASS_NAME_COLLAPSED);
	      }

	      elem.setAttribute('aria-expanded', isOpen);
	    });
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const _config = {};

	      if (typeof config === 'string' && /show|hide/.test(config)) {
	        _config.toggle = false;
	      }

	      const data = Collapse.getOrCreateInstance(this, _config);

	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      }
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$4, SELECTOR_DATA_TOGGLE$4, function (event) {
	  // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
	  if (event.target.tagName === 'A' || event.delegateTarget && event.delegateTarget.tagName === 'A') {
	    event.preventDefault();
	  }

	  const selector = getSelectorFromElement(this);
	  const selectorElements = SelectorEngine.find(selector);
	  selectorElements.forEach(element => {
	    Collapse.getOrCreateInstance(element, {
	      toggle: false
	    }).toggle();
	  });
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Collapse to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Collapse);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): dropdown.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$9 = 'dropdown';
	const DATA_KEY$8 = 'bs.dropdown';
	const EVENT_KEY$8 = `.${DATA_KEY$8}`;
	const DATA_API_KEY$4 = '.data-api';
	const ESCAPE_KEY$2 = 'Escape';
	const SPACE_KEY = 'Space';
	const TAB_KEY$1 = 'Tab';
	const ARROW_UP_KEY = 'ArrowUp';
	const ARROW_DOWN_KEY = 'ArrowDown';
	const RIGHT_MOUSE_BUTTON = 2; // MouseEvent.button value for the secondary button, usually the right button

	const REGEXP_KEYDOWN = new RegExp(`${ARROW_UP_KEY}|${ARROW_DOWN_KEY}|${ESCAPE_KEY$2}`);
	const EVENT_HIDE$4 = `hide${EVENT_KEY$8}`;
	const EVENT_HIDDEN$4 = `hidden${EVENT_KEY$8}`;
	const EVENT_SHOW$4 = `show${EVENT_KEY$8}`;
	const EVENT_SHOWN$4 = `shown${EVENT_KEY$8}`;
	const EVENT_CLICK_DATA_API$3 = `click${EVENT_KEY$8}${DATA_API_KEY$4}`;
	const EVENT_KEYDOWN_DATA_API = `keydown${EVENT_KEY$8}${DATA_API_KEY$4}`;
	const EVENT_KEYUP_DATA_API = `keyup${EVENT_KEY$8}${DATA_API_KEY$4}`;
	const CLASS_NAME_SHOW$6 = 'show';
	const CLASS_NAME_DROPUP = 'dropup';
	const CLASS_NAME_DROPEND = 'dropend';
	const CLASS_NAME_DROPSTART = 'dropstart';
	const CLASS_NAME_NAVBAR = 'navbar';
	const SELECTOR_DATA_TOGGLE$3 = '[data-bs-toggle="dropdown"]';
	const SELECTOR_MENU = '.dropdown-menu';
	const SELECTOR_NAVBAR_NAV = '.navbar-nav';
	const SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
	const PLACEMENT_TOP = isRTL() ? 'top-end' : 'top-start';
	const PLACEMENT_TOPEND = isRTL() ? 'top-start' : 'top-end';
	const PLACEMENT_BOTTOM = isRTL() ? 'bottom-end' : 'bottom-start';
	const PLACEMENT_BOTTOMEND = isRTL() ? 'bottom-start' : 'bottom-end';
	const PLACEMENT_RIGHT = isRTL() ? 'left-start' : 'right-start';
	const PLACEMENT_LEFT = isRTL() ? 'right-start' : 'left-start';
	const Default$8 = {
	  offset: [0, 2],
	  boundary: 'clippingParents',
	  reference: 'toggle',
	  display: 'dynamic',
	  popperConfig: null,
	  autoClose: true
	};
	const DefaultType$8 = {
	  offset: '(array|string|function)',
	  boundary: '(string|element)',
	  reference: '(string|element|object)',
	  display: 'string',
	  popperConfig: '(null|object|function)',
	  autoClose: '(boolean|string)'
	};
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Dropdown extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._popper = null;
	    this._config = this._getConfig(config);
	    this._menu = this._getMenuElement();
	    this._inNavbar = this._detectNavbar();
	  } // Getters


	  static get Default() {
	    return Default$8;
	  }

	  static get DefaultType() {
	    return DefaultType$8;
	  }

	  static get NAME() {
	    return NAME$9;
	  } // Public


	  toggle() {
	    return this._isShown() ? this.hide() : this.show();
	  }

	  show() {
	    if (isDisabled(this._element) || this._isShown(this._menu)) {
	      return;
	    }

	    const relatedTarget = {
	      relatedTarget: this._element
	    };
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$4, relatedTarget);

	    if (showEvent.defaultPrevented) {
	      return;
	    }

	    const parent = Dropdown.getParentFromElement(this._element); // Totally disable Popper for Dropdowns in Navbar

	    if (this._inNavbar) {
	      Manipulator.setDataAttribute(this._menu, 'popper', 'none');
	    } else {
	      this._createPopper(parent);
	    } // If this is a touch-enabled device we add extra
	    // empty mouseover listeners to the body's immediate children;
	    // only needed because of broken event delegation on iOS
	    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	    if ('ontouchstart' in document.documentElement && !parent.closest(SELECTOR_NAVBAR_NAV)) {
	      [].concat(...document.body.children).forEach(elem => EventHandler.on(elem, 'mouseover', noop));
	    }

	    this._element.focus();

	    this._element.setAttribute('aria-expanded', true);

	    this._menu.classList.add(CLASS_NAME_SHOW$6);

	    this._element.classList.add(CLASS_NAME_SHOW$6);

	    EventHandler.trigger(this._element, EVENT_SHOWN$4, relatedTarget);
	  }

	  hide() {
	    if (isDisabled(this._element) || !this._isShown(this._menu)) {
	      return;
	    }

	    const relatedTarget = {
	      relatedTarget: this._element
	    };

	    this._completeHide(relatedTarget);
	  }

	  dispose() {
	    if (this._popper) {
	      this._popper.destroy();
	    }

	    super.dispose();
	  }

	  update() {
	    this._inNavbar = this._detectNavbar();

	    if (this._popper) {
	      this._popper.update();
	    }
	  } // Private


	  _completeHide(relatedTarget) {
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$4, relatedTarget);

	    if (hideEvent.defaultPrevented) {
	      return;
	    } // If this is a touch-enabled device we remove the extra
	    // empty mouseover listeners we added for iOS support


	    if ('ontouchstart' in document.documentElement) {
	      [].concat(...document.body.children).forEach(elem => EventHandler.off(elem, 'mouseover', noop));
	    }

	    if (this._popper) {
	      this._popper.destroy();
	    }

	    this._menu.classList.remove(CLASS_NAME_SHOW$6);

	    this._element.classList.remove(CLASS_NAME_SHOW$6);

	    this._element.setAttribute('aria-expanded', 'false');

	    Manipulator.removeDataAttribute(this._menu, 'popper');
	    EventHandler.trigger(this._element, EVENT_HIDDEN$4, relatedTarget);
	  }

	  _getConfig(config) {
	    config = { ...this.constructor.Default,
	      ...Manipulator.getDataAttributes(this._element),
	      ...config
	    };
	    typeCheckConfig(NAME$9, config, this.constructor.DefaultType);

	    if (typeof config.reference === 'object' && !isElement(config.reference) && typeof config.reference.getBoundingClientRect !== 'function') {
	      // Popper virtual elements require a getBoundingClientRect method
	      throw new TypeError(`${NAME$9.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
	    }

	    return config;
	  }

	  _createPopper(parent) {
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s dropdowns require Popper (https://popper.js.org)');
	    }

	    let referenceElement = this._element;

	    if (this._config.reference === 'parent') {
	      referenceElement = parent;
	    } else if (isElement(this._config.reference)) {
	      referenceElement = getElement(this._config.reference);
	    } else if (typeof this._config.reference === 'object') {
	      referenceElement = this._config.reference;
	    }

	    const popperConfig = this._getPopperConfig();

	    const isDisplayStatic = popperConfig.modifiers.find(modifier => modifier.name === 'applyStyles' && modifier.enabled === false);
	    this._popper = createPopper(referenceElement, this._menu, popperConfig);

	    if (isDisplayStatic) {
	      Manipulator.setDataAttribute(this._menu, 'popper', 'static');
	    }
	  }

	  _isShown(element = this._element) {
	    return element.classList.contains(CLASS_NAME_SHOW$6);
	  }

	  _getMenuElement() {
	    return SelectorEngine.next(this._element, SELECTOR_MENU)[0];
	  }

	  _getPlacement() {
	    const parentDropdown = this._element.parentNode;

	    if (parentDropdown.classList.contains(CLASS_NAME_DROPEND)) {
	      return PLACEMENT_RIGHT;
	    }

	    if (parentDropdown.classList.contains(CLASS_NAME_DROPSTART)) {
	      return PLACEMENT_LEFT;
	    } // We need to trim the value because custom properties can also include spaces


	    const isEnd = getComputedStyle(this._menu).getPropertyValue('--bs-position').trim() === 'end';

	    if (parentDropdown.classList.contains(CLASS_NAME_DROPUP)) {
	      return isEnd ? PLACEMENT_TOPEND : PLACEMENT_TOP;
	    }

	    return isEnd ? PLACEMENT_BOTTOMEND : PLACEMENT_BOTTOM;
	  }

	  _detectNavbar() {
	    return this._element.closest(`.${CLASS_NAME_NAVBAR}`) !== null;
	  }

	  _getOffset() {
	    const {
	      offset
	    } = this._config;

	    if (typeof offset === 'string') {
	      return offset.split(',').map(val => Number.parseInt(val, 10));
	    }

	    if (typeof offset === 'function') {
	      return popperData => offset(popperData, this._element);
	    }

	    return offset;
	  }

	  _getPopperConfig() {
	    const defaultBsPopperConfig = {
	      placement: this._getPlacement(),
	      modifiers: [{
	        name: 'preventOverflow',
	        options: {
	          boundary: this._config.boundary
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }]
	    }; // Disable Popper if we have a static display

	    if (this._config.display === 'static') {
	      defaultBsPopperConfig.modifiers = [{
	        name: 'applyStyles',
	        enabled: false
	      }];
	    }

	    return { ...defaultBsPopperConfig,
	      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	    };
	  }

	  _selectMenuItem({
	    key,
	    target
	  }) {
	    const items = SelectorEngine.find(SELECTOR_VISIBLE_ITEMS, this._menu).filter(isVisible);

	    if (!items.length) {
	      return;
	    } // if target isn't included in items (e.g. when expanding the dropdown)
	    // allow cycling to get the last item in case key equals ARROW_UP_KEY


	    getNextActiveElement(items, target, key === ARROW_DOWN_KEY, !items.includes(target)).focus();
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Dropdown.getOrCreateInstance(this, config);

	      if (typeof config !== 'string') {
	        return;
	      }

	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }

	      data[config]();
	    });
	  }

	  static clearMenus(event) {
	    if (event && (event.button === RIGHT_MOUSE_BUTTON || event.type === 'keyup' && event.key !== TAB_KEY$1)) {
	      return;
	    }

	    const toggles = SelectorEngine.find(SELECTOR_DATA_TOGGLE$3);

	    for (let i = 0, len = toggles.length; i < len; i++) {
	      const context = Dropdown.getInstance(toggles[i]);

	      if (!context || context._config.autoClose === false) {
	        continue;
	      }

	      if (!context._isShown()) {
	        continue;
	      }

	      const relatedTarget = {
	        relatedTarget: context._element
	      };

	      if (event) {
	        const composedPath = event.composedPath();
	        const isMenuTarget = composedPath.includes(context._menu);

	        if (composedPath.includes(context._element) || context._config.autoClose === 'inside' && !isMenuTarget || context._config.autoClose === 'outside' && isMenuTarget) {
	          continue;
	        } // Tab navigation through the dropdown menu or events from contained inputs shouldn't close the menu


	        if (context._menu.contains(event.target) && (event.type === 'keyup' && event.key === TAB_KEY$1 || /input|select|option|textarea|form/i.test(event.target.tagName))) {
	          continue;
	        }

	        if (event.type === 'click') {
	          relatedTarget.clickEvent = event;
	        }
	      }

	      context._completeHide(relatedTarget);
	    }
	  }

	  static getParentFromElement(element) {
	    return getElementFromSelector(element) || element.parentNode;
	  }

	  static dataApiKeydownHandler(event) {
	    // If not input/textarea:
	    //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
	    // If input/textarea:
	    //  - If space key => not a dropdown command
	    //  - If key is other than escape
	    //    - If key is not up or down => not a dropdown command
	    //    - If trigger inside the menu => not a dropdown command
	    if (/input|textarea/i.test(event.target.tagName) ? event.key === SPACE_KEY || event.key !== ESCAPE_KEY$2 && (event.key !== ARROW_DOWN_KEY && event.key !== ARROW_UP_KEY || event.target.closest(SELECTOR_MENU)) : !REGEXP_KEYDOWN.test(event.key)) {
	      return;
	    }

	    const isActive = this.classList.contains(CLASS_NAME_SHOW$6);

	    if (!isActive && event.key === ESCAPE_KEY$2) {
	      return;
	    }

	    event.preventDefault();
	    event.stopPropagation();

	    if (isDisabled(this)) {
	      return;
	    }

	    const getToggleButton = this.matches(SELECTOR_DATA_TOGGLE$3) ? this : SelectorEngine.prev(this, SELECTOR_DATA_TOGGLE$3)[0];
	    const instance = Dropdown.getOrCreateInstance(getToggleButton);

	    if (event.key === ESCAPE_KEY$2) {
	      instance.hide();
	      return;
	    }

	    if (event.key === ARROW_UP_KEY || event.key === ARROW_DOWN_KEY) {
	      if (!isActive) {
	        instance.show();
	      }

	      instance._selectMenuItem(event);

	      return;
	    }

	    if (!isActive || event.key === SPACE_KEY) {
	      Dropdown.clearMenus();
	    }
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE$3, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown.dataApiKeydownHandler);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_KEYUP_DATA_API, Dropdown.clearMenus);
	EventHandler.on(document, EVENT_CLICK_DATA_API$3, SELECTOR_DATA_TOGGLE$3, function (event) {
	  event.preventDefault();
	  Dropdown.getOrCreateInstance(this).toggle();
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Dropdown to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Dropdown);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): util/scrollBar.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const SELECTOR_FIXED_CONTENT = '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top';
	const SELECTOR_STICKY_CONTENT = '.sticky-top';

	class ScrollBarHelper {
	  constructor() {
	    this._element = document.body;
	  }

	  getWidth() {
	    // https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth#usage_notes
	    const documentWidth = document.documentElement.clientWidth;
	    return Math.abs(window.innerWidth - documentWidth);
	  }

	  hide() {
	    const width = this.getWidth();

	    this._disableOverFlow(); // give padding to element to balance the hidden scrollbar width


	    this._setElementAttributes(this._element, 'paddingRight', calculatedValue => calculatedValue + width); // trick: We adjust positive paddingRight and negative marginRight to sticky-top elements to keep showing fullwidth


	    this._setElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight', calculatedValue => calculatedValue + width);

	    this._setElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight', calculatedValue => calculatedValue - width);
	  }

	  _disableOverFlow() {
	    this._saveInitialAttribute(this._element, 'overflow');

	    this._element.style.overflow = 'hidden';
	  }

	  _setElementAttributes(selector, styleProp, callback) {
	    const scrollbarWidth = this.getWidth();

	    const manipulationCallBack = element => {
	      if (element !== this._element && window.innerWidth > element.clientWidth + scrollbarWidth) {
	        return;
	      }

	      this._saveInitialAttribute(element, styleProp);

	      const calculatedValue = window.getComputedStyle(element)[styleProp];
	      element.style[styleProp] = `${callback(Number.parseFloat(calculatedValue))}px`;
	    };

	    this._applyManipulationCallback(selector, manipulationCallBack);
	  }

	  reset() {
	    this._resetElementAttributes(this._element, 'overflow');

	    this._resetElementAttributes(this._element, 'paddingRight');

	    this._resetElementAttributes(SELECTOR_FIXED_CONTENT, 'paddingRight');

	    this._resetElementAttributes(SELECTOR_STICKY_CONTENT, 'marginRight');
	  }

	  _saveInitialAttribute(element, styleProp) {
	    const actualValue = element.style[styleProp];

	    if (actualValue) {
	      Manipulator.setDataAttribute(element, styleProp, actualValue);
	    }
	  }

	  _resetElementAttributes(selector, styleProp) {
	    const manipulationCallBack = element => {
	      const value = Manipulator.getDataAttribute(element, styleProp);

	      if (typeof value === 'undefined') {
	        element.style.removeProperty(styleProp);
	      } else {
	        Manipulator.removeDataAttribute(element, styleProp);
	        element.style[styleProp] = value;
	      }
	    };

	    this._applyManipulationCallback(selector, manipulationCallBack);
	  }

	  _applyManipulationCallback(selector, callBack) {
	    if (isElement(selector)) {
	      callBack(selector);
	    } else {
	      SelectorEngine.find(selector, this._element).forEach(callBack);
	    }
	  }

	  isOverflowing() {
	    return this.getWidth() > 0;
	  }

	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): util/backdrop.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const Default$7 = {
	  className: 'modal-backdrop',
	  isVisible: true,
	  // if false, we use the backdrop helper without adding any element to the dom
	  isAnimated: false,
	  rootElement: 'body',
	  // give the choice to place backdrop under different elements
	  clickCallback: null
	};
	const DefaultType$7 = {
	  className: 'string',
	  isVisible: 'boolean',
	  isAnimated: 'boolean',
	  rootElement: '(element|string)',
	  clickCallback: '(function|null)'
	};
	const NAME$8 = 'backdrop';
	const CLASS_NAME_FADE$4 = 'fade';
	const CLASS_NAME_SHOW$5 = 'show';
	const EVENT_MOUSEDOWN = `mousedown.bs.${NAME$8}`;

	class Backdrop {
	  constructor(config) {
	    this._config = this._getConfig(config);
	    this._isAppended = false;
	    this._element = null;
	  }

	  show(callback) {
	    if (!this._config.isVisible) {
	      execute(callback);
	      return;
	    }

	    this._append();

	    if (this._config.isAnimated) {
	      reflow(this._getElement());
	    }

	    this._getElement().classList.add(CLASS_NAME_SHOW$5);

	    this._emulateAnimation(() => {
	      execute(callback);
	    });
	  }

	  hide(callback) {
	    if (!this._config.isVisible) {
	      execute(callback);
	      return;
	    }

	    this._getElement().classList.remove(CLASS_NAME_SHOW$5);

	    this._emulateAnimation(() => {
	      this.dispose();
	      execute(callback);
	    });
	  } // Private


	  _getElement() {
	    if (!this._element) {
	      const backdrop = document.createElement('div');
	      backdrop.className = this._config.className;

	      if (this._config.isAnimated) {
	        backdrop.classList.add(CLASS_NAME_FADE$4);
	      }

	      this._element = backdrop;
	    }

	    return this._element;
	  }

	  _getConfig(config) {
	    config = { ...Default$7,
	      ...(typeof config === 'object' ? config : {})
	    }; // use getElement() with the default "body" to get a fresh Element on each instantiation

	    config.rootElement = getElement(config.rootElement);
	    typeCheckConfig(NAME$8, config, DefaultType$7);
	    return config;
	  }

	  _append() {
	    if (this._isAppended) {
	      return;
	    }

	    this._config.rootElement.append(this._getElement());

	    EventHandler.on(this._getElement(), EVENT_MOUSEDOWN, () => {
	      execute(this._config.clickCallback);
	    });
	    this._isAppended = true;
	  }

	  dispose() {
	    if (!this._isAppended) {
	      return;
	    }

	    EventHandler.off(this._element, EVENT_MOUSEDOWN);

	    this._element.remove();

	    this._isAppended = false;
	  }

	  _emulateAnimation(callback) {
	    executeAfterTransition(callback, this._getElement(), this._config.isAnimated);
	  }

	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): util/focustrap.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const Default$6 = {
	  trapElement: null,
	  // The element to trap focus inside of
	  autofocus: true
	};
	const DefaultType$6 = {
	  trapElement: 'element',
	  autofocus: 'boolean'
	};
	const NAME$7 = 'focustrap';
	const DATA_KEY$7 = 'bs.focustrap';
	const EVENT_KEY$7 = `.${DATA_KEY$7}`;
	const EVENT_FOCUSIN$1 = `focusin${EVENT_KEY$7}`;
	const EVENT_KEYDOWN_TAB = `keydown.tab${EVENT_KEY$7}`;
	const TAB_KEY = 'Tab';
	const TAB_NAV_FORWARD = 'forward';
	const TAB_NAV_BACKWARD = 'backward';

	class FocusTrap {
	  constructor(config) {
	    this._config = this._getConfig(config);
	    this._isActive = false;
	    this._lastTabNavDirection = null;
	  }

	  activate() {
	    const {
	      trapElement,
	      autofocus
	    } = this._config;

	    if (this._isActive) {
	      return;
	    }

	    if (autofocus) {
	      trapElement.focus();
	    }

	    EventHandler.off(document, EVENT_KEY$7); // guard against infinite focus loop

	    EventHandler.on(document, EVENT_FOCUSIN$1, event => this._handleFocusin(event));
	    EventHandler.on(document, EVENT_KEYDOWN_TAB, event => this._handleKeydown(event));
	    this._isActive = true;
	  }

	  deactivate() {
	    if (!this._isActive) {
	      return;
	    }

	    this._isActive = false;
	    EventHandler.off(document, EVENT_KEY$7);
	  } // Private


	  _handleFocusin(event) {
	    const {
	      target
	    } = event;
	    const {
	      trapElement
	    } = this._config;

	    if (target === document || target === trapElement || trapElement.contains(target)) {
	      return;
	    }

	    const elements = SelectorEngine.focusableChildren(trapElement);

	    if (elements.length === 0) {
	      trapElement.focus();
	    } else if (this._lastTabNavDirection === TAB_NAV_BACKWARD) {
	      elements[elements.length - 1].focus();
	    } else {
	      elements[0].focus();
	    }
	  }

	  _handleKeydown(event) {
	    if (event.key !== TAB_KEY) {
	      return;
	    }

	    this._lastTabNavDirection = event.shiftKey ? TAB_NAV_BACKWARD : TAB_NAV_FORWARD;
	  }

	  _getConfig(config) {
	    config = { ...Default$6,
	      ...(typeof config === 'object' ? config : {})
	    };
	    typeCheckConfig(NAME$7, config, DefaultType$6);
	    return config;
	  }

	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): modal.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$6 = 'modal';
	const DATA_KEY$6 = 'bs.modal';
	const EVENT_KEY$6 = `.${DATA_KEY$6}`;
	const DATA_API_KEY$3 = '.data-api';
	const ESCAPE_KEY$1 = 'Escape';
	const Default$5 = {
	  backdrop: true,
	  keyboard: true,
	  focus: true
	};
	const DefaultType$5 = {
	  backdrop: '(boolean|string)',
	  keyboard: 'boolean',
	  focus: 'boolean'
	};
	const EVENT_HIDE$3 = `hide${EVENT_KEY$6}`;
	const EVENT_HIDE_PREVENTED = `hidePrevented${EVENT_KEY$6}`;
	const EVENT_HIDDEN$3 = `hidden${EVENT_KEY$6}`;
	const EVENT_SHOW$3 = `show${EVENT_KEY$6}`;
	const EVENT_SHOWN$3 = `shown${EVENT_KEY$6}`;
	const EVENT_RESIZE = `resize${EVENT_KEY$6}`;
	const EVENT_CLICK_DISMISS = `click.dismiss${EVENT_KEY$6}`;
	const EVENT_KEYDOWN_DISMISS$1 = `keydown.dismiss${EVENT_KEY$6}`;
	const EVENT_MOUSEUP_DISMISS = `mouseup.dismiss${EVENT_KEY$6}`;
	const EVENT_MOUSEDOWN_DISMISS = `mousedown.dismiss${EVENT_KEY$6}`;
	const EVENT_CLICK_DATA_API$2 = `click${EVENT_KEY$6}${DATA_API_KEY$3}`;
	const CLASS_NAME_OPEN = 'modal-open';
	const CLASS_NAME_FADE$3 = 'fade';
	const CLASS_NAME_SHOW$4 = 'show';
	const CLASS_NAME_STATIC = 'modal-static';
	const OPEN_SELECTOR$1 = '.modal.show';
	const SELECTOR_DIALOG = '.modal-dialog';
	const SELECTOR_MODAL_BODY = '.modal-body';
	const SELECTOR_DATA_TOGGLE$2 = '[data-bs-toggle="modal"]';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Modal extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._config = this._getConfig(config);
	    this._dialog = SelectorEngine.findOne(SELECTOR_DIALOG, this._element);
	    this._backdrop = this._initializeBackDrop();
	    this._focustrap = this._initializeFocusTrap();
	    this._isShown = false;
	    this._ignoreBackdropClick = false;
	    this._isTransitioning = false;
	    this._scrollBar = new ScrollBarHelper();
	  } // Getters


	  static get Default() {
	    return Default$5;
	  }

	  static get NAME() {
	    return NAME$6;
	  } // Public


	  toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  }

	  show(relatedTarget) {
	    if (this._isShown || this._isTransitioning) {
	      return;
	    }

	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$3, {
	      relatedTarget
	    });

	    if (showEvent.defaultPrevented) {
	      return;
	    }

	    this._isShown = true;

	    if (this._isAnimated()) {
	      this._isTransitioning = true;
	    }

	    this._scrollBar.hide();

	    document.body.classList.add(CLASS_NAME_OPEN);

	    this._adjustDialog();

	    this._setEscapeEvent();

	    this._setResizeEvent();

	    EventHandler.on(this._dialog, EVENT_MOUSEDOWN_DISMISS, () => {
	      EventHandler.one(this._element, EVENT_MOUSEUP_DISMISS, event => {
	        if (event.target === this._element) {
	          this._ignoreBackdropClick = true;
	        }
	      });
	    });

	    this._showBackdrop(() => this._showElement(relatedTarget));
	  }

	  hide() {
	    if (!this._isShown || this._isTransitioning) {
	      return;
	    }

	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$3);

	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    this._isShown = false;

	    const isAnimated = this._isAnimated();

	    if (isAnimated) {
	      this._isTransitioning = true;
	    }

	    this._setEscapeEvent();

	    this._setResizeEvent();

	    this._focustrap.deactivate();

	    this._element.classList.remove(CLASS_NAME_SHOW$4);

	    EventHandler.off(this._element, EVENT_CLICK_DISMISS);
	    EventHandler.off(this._dialog, EVENT_MOUSEDOWN_DISMISS);

	    this._queueCallback(() => this._hideModal(), this._element, isAnimated);
	  }

	  dispose() {
	    [window, this._dialog].forEach(htmlElement => EventHandler.off(htmlElement, EVENT_KEY$6));

	    this._backdrop.dispose();

	    this._focustrap.deactivate();

	    super.dispose();
	  }

	  handleUpdate() {
	    this._adjustDialog();
	  } // Private


	  _initializeBackDrop() {
	    return new Backdrop({
	      isVisible: Boolean(this._config.backdrop),
	      // 'static' option will be translated to true, and booleans will keep their value
	      isAnimated: this._isAnimated()
	    });
	  }

	  _initializeFocusTrap() {
	    return new FocusTrap({
	      trapElement: this._element
	    });
	  }

	  _getConfig(config) {
	    config = { ...Default$5,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' ? config : {})
	    };
	    typeCheckConfig(NAME$6, config, DefaultType$5);
	    return config;
	  }

	  _showElement(relatedTarget) {
	    const isAnimated = this._isAnimated();

	    const modalBody = SelectorEngine.findOne(SELECTOR_MODAL_BODY, this._dialog);

	    if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	      // Don't move modal's DOM position
	      document.body.append(this._element);
	    }

	    this._element.style.display = 'block';

	    this._element.removeAttribute('aria-hidden');

	    this._element.setAttribute('aria-modal', true);

	    this._element.setAttribute('role', 'dialog');

	    this._element.scrollTop = 0;

	    if (modalBody) {
	      modalBody.scrollTop = 0;
	    }

	    if (isAnimated) {
	      reflow(this._element);
	    }

	    this._element.classList.add(CLASS_NAME_SHOW$4);

	    const transitionComplete = () => {
	      if (this._config.focus) {
	        this._focustrap.activate();
	      }

	      this._isTransitioning = false;
	      EventHandler.trigger(this._element, EVENT_SHOWN$3, {
	        relatedTarget
	      });
	    };

	    this._queueCallback(transitionComplete, this._dialog, isAnimated);
	  }

	  _setEscapeEvent() {
	    if (this._isShown) {
	      EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS$1, event => {
	        if (this._config.keyboard && event.key === ESCAPE_KEY$1) {
	          event.preventDefault();
	          this.hide();
	        } else if (!this._config.keyboard && event.key === ESCAPE_KEY$1) {
	          this._triggerBackdropTransition();
	        }
	      });
	    } else {
	      EventHandler.off(this._element, EVENT_KEYDOWN_DISMISS$1);
	    }
	  }

	  _setResizeEvent() {
	    if (this._isShown) {
	      EventHandler.on(window, EVENT_RESIZE, () => this._adjustDialog());
	    } else {
	      EventHandler.off(window, EVENT_RESIZE);
	    }
	  }

	  _hideModal() {
	    this._element.style.display = 'none';

	    this._element.setAttribute('aria-hidden', true);

	    this._element.removeAttribute('aria-modal');

	    this._element.removeAttribute('role');

	    this._isTransitioning = false;

	    this._backdrop.hide(() => {
	      document.body.classList.remove(CLASS_NAME_OPEN);

	      this._resetAdjustments();

	      this._scrollBar.reset();

	      EventHandler.trigger(this._element, EVENT_HIDDEN$3);
	    });
	  }

	  _showBackdrop(callback) {
	    EventHandler.on(this._element, EVENT_CLICK_DISMISS, event => {
	      if (this._ignoreBackdropClick) {
	        this._ignoreBackdropClick = false;
	        return;
	      }

	      if (event.target !== event.currentTarget) {
	        return;
	      }

	      if (this._config.backdrop === true) {
	        this.hide();
	      } else if (this._config.backdrop === 'static') {
	        this._triggerBackdropTransition();
	      }
	    });

	    this._backdrop.show(callback);
	  }

	  _isAnimated() {
	    return this._element.classList.contains(CLASS_NAME_FADE$3);
	  }

	  _triggerBackdropTransition() {
	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE_PREVENTED);

	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    const {
	      classList,
	      scrollHeight,
	      style
	    } = this._element;
	    const isModalOverflowing = scrollHeight > document.documentElement.clientHeight; // return if the following background transition hasn't yet completed

	    if (!isModalOverflowing && style.overflowY === 'hidden' || classList.contains(CLASS_NAME_STATIC)) {
	      return;
	    }

	    if (!isModalOverflowing) {
	      style.overflowY = 'hidden';
	    }

	    classList.add(CLASS_NAME_STATIC);

	    this._queueCallback(() => {
	      classList.remove(CLASS_NAME_STATIC);

	      if (!isModalOverflowing) {
	        this._queueCallback(() => {
	          style.overflowY = '';
	        }, this._dialog);
	      }
	    }, this._dialog);

	    this._element.focus();
	  } // ----------------------------------------------------------------------
	  // the following methods are used to handle overflowing modals
	  // ----------------------------------------------------------------------


	  _adjustDialog() {
	    const isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	    const scrollbarWidth = this._scrollBar.getWidth();

	    const isBodyOverflowing = scrollbarWidth > 0;

	    if (!isBodyOverflowing && isModalOverflowing && !isRTL() || isBodyOverflowing && !isModalOverflowing && isRTL()) {
	      this._element.style.paddingLeft = `${scrollbarWidth}px`;
	    }

	    if (isBodyOverflowing && !isModalOverflowing && !isRTL() || !isBodyOverflowing && isModalOverflowing && isRTL()) {
	      this._element.style.paddingRight = `${scrollbarWidth}px`;
	    }
	  }

	  _resetAdjustments() {
	    this._element.style.paddingLeft = '';
	    this._element.style.paddingRight = '';
	  } // Static


	  static jQueryInterface(config, relatedTarget) {
	    return this.each(function () {
	      const data = Modal.getOrCreateInstance(this, config);

	      if (typeof config !== 'string') {
	        return;
	      }

	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }

	      data[config](relatedTarget);
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$2, SELECTOR_DATA_TOGGLE$2, function (event) {
	  const target = getElementFromSelector(this);

	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }

	  EventHandler.one(target, EVENT_SHOW$3, showEvent => {
	    if (showEvent.defaultPrevented) {
	      // only register focus restorer if modal will actually get shown
	      return;
	    }

	    EventHandler.one(target, EVENT_HIDDEN$3, () => {
	      if (isVisible(this)) {
	        this.focus();
	      }
	    });
	  }); // avoid conflict when clicking moddal toggler while another one is open

	  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR$1);

	  if (allReadyOpen) {
	    Modal.getInstance(allReadyOpen).hide();
	  }

	  const data = Modal.getOrCreateInstance(target);
	  data.toggle(this);
	});
	enableDismissTrigger(Modal);
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Modal to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Modal);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): offcanvas.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$5 = 'offcanvas';
	const DATA_KEY$5 = 'bs.offcanvas';
	const EVENT_KEY$5 = `.${DATA_KEY$5}`;
	const DATA_API_KEY$2 = '.data-api';
	const EVENT_LOAD_DATA_API$1 = `load${EVENT_KEY$5}${DATA_API_KEY$2}`;
	const ESCAPE_KEY = 'Escape';
	const Default$4 = {
	  backdrop: true,
	  keyboard: true,
	  scroll: false
	};
	const DefaultType$4 = {
	  backdrop: 'boolean',
	  keyboard: 'boolean',
	  scroll: 'boolean'
	};
	const CLASS_NAME_SHOW$3 = 'show';
	const CLASS_NAME_BACKDROP = 'offcanvas-backdrop';
	const OPEN_SELECTOR = '.offcanvas.show';
	const EVENT_SHOW$2 = `show${EVENT_KEY$5}`;
	const EVENT_SHOWN$2 = `shown${EVENT_KEY$5}`;
	const EVENT_HIDE$2 = `hide${EVENT_KEY$5}`;
	const EVENT_HIDDEN$2 = `hidden${EVENT_KEY$5}`;
	const EVENT_CLICK_DATA_API$1 = `click${EVENT_KEY$5}${DATA_API_KEY$2}`;
	const EVENT_KEYDOWN_DISMISS = `keydown.dismiss${EVENT_KEY$5}`;
	const SELECTOR_DATA_TOGGLE$1 = '[data-bs-toggle="offcanvas"]';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Offcanvas extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._config = this._getConfig(config);
	    this._isShown = false;
	    this._backdrop = this._initializeBackDrop();
	    this._focustrap = this._initializeFocusTrap();

	    this._addEventListeners();
	  } // Getters


	  static get NAME() {
	    return NAME$5;
	  }

	  static get Default() {
	    return Default$4;
	  } // Public


	  toggle(relatedTarget) {
	    return this._isShown ? this.hide() : this.show(relatedTarget);
	  }

	  show(relatedTarget) {
	    if (this._isShown) {
	      return;
	    }

	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$2, {
	      relatedTarget
	    });

	    if (showEvent.defaultPrevented) {
	      return;
	    }

	    this._isShown = true;
	    this._element.style.visibility = 'visible';

	    this._backdrop.show();

	    if (!this._config.scroll) {
	      new ScrollBarHelper().hide();
	    }

	    this._element.removeAttribute('aria-hidden');

	    this._element.setAttribute('aria-modal', true);

	    this._element.setAttribute('role', 'dialog');

	    this._element.classList.add(CLASS_NAME_SHOW$3);

	    const completeCallBack = () => {
	      if (!this._config.scroll) {
	        this._focustrap.activate();
	      }

	      EventHandler.trigger(this._element, EVENT_SHOWN$2, {
	        relatedTarget
	      });
	    };

	    this._queueCallback(completeCallBack, this._element, true);
	  }

	  hide() {
	    if (!this._isShown) {
	      return;
	    }

	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE$2);

	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    this._focustrap.deactivate();

	    this._element.blur();

	    this._isShown = false;

	    this._element.classList.remove(CLASS_NAME_SHOW$3);

	    this._backdrop.hide();

	    const completeCallback = () => {
	      this._element.setAttribute('aria-hidden', true);

	      this._element.removeAttribute('aria-modal');

	      this._element.removeAttribute('role');

	      this._element.style.visibility = 'hidden';

	      if (!this._config.scroll) {
	        new ScrollBarHelper().reset();
	      }

	      EventHandler.trigger(this._element, EVENT_HIDDEN$2);
	    };

	    this._queueCallback(completeCallback, this._element, true);
	  }

	  dispose() {
	    this._backdrop.dispose();

	    this._focustrap.deactivate();

	    super.dispose();
	  } // Private


	  _getConfig(config) {
	    config = { ...Default$4,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' ? config : {})
	    };
	    typeCheckConfig(NAME$5, config, DefaultType$4);
	    return config;
	  }

	  _initializeBackDrop() {
	    return new Backdrop({
	      className: CLASS_NAME_BACKDROP,
	      isVisible: this._config.backdrop,
	      isAnimated: true,
	      rootElement: this._element.parentNode,
	      clickCallback: () => this.hide()
	    });
	  }

	  _initializeFocusTrap() {
	    return new FocusTrap({
	      trapElement: this._element
	    });
	  }

	  _addEventListeners() {
	    EventHandler.on(this._element, EVENT_KEYDOWN_DISMISS, event => {
	      if (this._config.keyboard && event.key === ESCAPE_KEY) {
	        this.hide();
	      }
	    });
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Offcanvas.getOrCreateInstance(this, config);

	      if (typeof config !== 'string') {
	        return;
	      }

	      if (data[config] === undefined || config.startsWith('_') || config === 'constructor') {
	        throw new TypeError(`No method named "${config}"`);
	      }

	      data[config](this);
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API$1, SELECTOR_DATA_TOGGLE$1, function (event) {
	  const target = getElementFromSelector(this);

	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }

	  if (isDisabled(this)) {
	    return;
	  }

	  EventHandler.one(target, EVENT_HIDDEN$2, () => {
	    // focus on trigger when it is closed
	    if (isVisible(this)) {
	      this.focus();
	    }
	  }); // avoid conflict when clicking a toggler of an offcanvas, while another is open

	  const allReadyOpen = SelectorEngine.findOne(OPEN_SELECTOR);

	  if (allReadyOpen && allReadyOpen !== target) {
	    Offcanvas.getInstance(allReadyOpen).hide();
	  }

	  const data = Offcanvas.getOrCreateInstance(target);
	  data.toggle(this);
	});
	EventHandler.on(window, EVENT_LOAD_DATA_API$1, () => SelectorEngine.find(OPEN_SELECTOR).forEach(el => Offcanvas.getOrCreateInstance(el).show()));
	enableDismissTrigger(Offcanvas);
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 */

	defineJQueryPlugin(Offcanvas);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): util/sanitizer.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	const uriAttributes = new Set(['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href']);
	const ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
	/**
	 * A pattern that recognizes a commonly useful subset of URLs that are safe.
	 *
	 * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	 */

	const SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
	/**
	 * A pattern that matches safe data URLs. Only matches image, video and audio types.
	 *
	 * Shoutout to Angular https://github.com/angular/angular/blob/12.2.x/packages/core/src/sanitization/url_sanitizer.ts
	 */

	const DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;

	const allowedAttribute = (attribute, allowedAttributeList) => {
	  const attributeName = attribute.nodeName.toLowerCase();

	  if (allowedAttributeList.includes(attributeName)) {
	    if (uriAttributes.has(attributeName)) {
	      return Boolean(SAFE_URL_PATTERN.test(attribute.nodeValue) || DATA_URL_PATTERN.test(attribute.nodeValue));
	    }

	    return true;
	  }

	  const regExp = allowedAttributeList.filter(attributeRegex => attributeRegex instanceof RegExp); // Check if a regular expression validates the attribute.

	  for (let i = 0, len = regExp.length; i < len; i++) {
	    if (regExp[i].test(attributeName)) {
	      return true;
	    }
	  }

	  return false;
	};

	const DefaultAllowlist = {
	  // Global attributes allowed on any supplied element below.
	  '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
	  a: ['target', 'href', 'title', 'rel'],
	  area: [],
	  b: [],
	  br: [],
	  col: [],
	  code: [],
	  div: [],
	  em: [],
	  hr: [],
	  h1: [],
	  h2: [],
	  h3: [],
	  h4: [],
	  h5: [],
	  h6: [],
	  i: [],
	  img: ['src', 'srcset', 'alt', 'title', 'width', 'height'],
	  li: [],
	  ol: [],
	  p: [],
	  pre: [],
	  s: [],
	  small: [],
	  span: [],
	  sub: [],
	  sup: [],
	  strong: [],
	  u: [],
	  ul: []
	};
	function sanitizeHtml(unsafeHtml, allowList, sanitizeFn) {
	  if (!unsafeHtml.length) {
	    return unsafeHtml;
	  }

	  if (sanitizeFn && typeof sanitizeFn === 'function') {
	    return sanitizeFn(unsafeHtml);
	  }

	  const domParser = new window.DOMParser();
	  const createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
	  const elements = [].concat(...createdDocument.body.querySelectorAll('*'));

	  for (let i = 0, len = elements.length; i < len; i++) {
	    const element = elements[i];
	    const elementName = element.nodeName.toLowerCase();

	    if (!Object.keys(allowList).includes(elementName)) {
	      element.remove();
	      continue;
	    }

	    const attributeList = [].concat(...element.attributes);
	    const allowedAttributes = [].concat(allowList['*'] || [], allowList[elementName] || []);
	    attributeList.forEach(attribute => {
	      if (!allowedAttribute(attribute, allowedAttributes)) {
	        element.removeAttribute(attribute.nodeName);
	      }
	    });
	  }

	  return createdDocument.body.innerHTML;
	}

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): tooltip.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$4 = 'tooltip';
	const DATA_KEY$4 = 'bs.tooltip';
	const EVENT_KEY$4 = `.${DATA_KEY$4}`;
	const CLASS_PREFIX$1 = 'bs-tooltip';
	const DISALLOWED_ATTRIBUTES = new Set(['sanitize', 'allowList', 'sanitizeFn']);
	const DefaultType$3 = {
	  animation: 'boolean',
	  template: 'string',
	  title: '(string|element|function)',
	  trigger: 'string',
	  delay: '(number|object)',
	  html: 'boolean',
	  selector: '(string|boolean)',
	  placement: '(string|function)',
	  offset: '(array|string|function)',
	  container: '(string|element|boolean)',
	  fallbackPlacements: 'array',
	  boundary: '(string|element)',
	  customClass: '(string|function)',
	  sanitize: 'boolean',
	  sanitizeFn: '(null|function)',
	  allowList: 'object',
	  popperConfig: '(null|object|function)'
	};
	const AttachmentMap = {
	  AUTO: 'auto',
	  TOP: 'top',
	  RIGHT: isRTL() ? 'left' : 'right',
	  BOTTOM: 'bottom',
	  LEFT: isRTL() ? 'right' : 'left'
	};
	const Default$3 = {
	  animation: true,
	  template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div>' + '</div>',
	  trigger: 'hover focus',
	  title: '',
	  delay: 0,
	  html: false,
	  selector: false,
	  placement: 'top',
	  offset: [0, 0],
	  container: false,
	  fallbackPlacements: ['top', 'right', 'bottom', 'left'],
	  boundary: 'clippingParents',
	  customClass: '',
	  sanitize: true,
	  sanitizeFn: null,
	  allowList: DefaultAllowlist,
	  popperConfig: null
	};
	const Event$2 = {
	  HIDE: `hide${EVENT_KEY$4}`,
	  HIDDEN: `hidden${EVENT_KEY$4}`,
	  SHOW: `show${EVENT_KEY$4}`,
	  SHOWN: `shown${EVENT_KEY$4}`,
	  INSERTED: `inserted${EVENT_KEY$4}`,
	  CLICK: `click${EVENT_KEY$4}`,
	  FOCUSIN: `focusin${EVENT_KEY$4}`,
	  FOCUSOUT: `focusout${EVENT_KEY$4}`,
	  MOUSEENTER: `mouseenter${EVENT_KEY$4}`,
	  MOUSELEAVE: `mouseleave${EVENT_KEY$4}`
	};
	const CLASS_NAME_FADE$2 = 'fade';
	const CLASS_NAME_MODAL = 'modal';
	const CLASS_NAME_SHOW$2 = 'show';
	const HOVER_STATE_SHOW = 'show';
	const HOVER_STATE_OUT = 'out';
	const SELECTOR_TOOLTIP_INNER = '.tooltip-inner';
	const SELECTOR_MODAL = `.${CLASS_NAME_MODAL}`;
	const EVENT_MODAL_HIDE = 'hide.bs.modal';
	const TRIGGER_HOVER = 'hover';
	const TRIGGER_FOCUS = 'focus';
	const TRIGGER_CLICK = 'click';
	const TRIGGER_MANUAL = 'manual';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Tooltip extends BaseComponent {
	  constructor(element, config) {
	    if (typeof Popper === 'undefined') {
	      throw new TypeError('Bootstrap\'s tooltips require Popper (https://popper.js.org)');
	    }

	    super(element); // private

	    this._isEnabled = true;
	    this._timeout = 0;
	    this._hoverState = '';
	    this._activeTrigger = {};
	    this._popper = null; // Protected

	    this._config = this._getConfig(config);
	    this.tip = null;

	    this._setListeners();
	  } // Getters


	  static get Default() {
	    return Default$3;
	  }

	  static get NAME() {
	    return NAME$4;
	  }

	  static get Event() {
	    return Event$2;
	  }

	  static get DefaultType() {
	    return DefaultType$3;
	  } // Public


	  enable() {
	    this._isEnabled = true;
	  }

	  disable() {
	    this._isEnabled = false;
	  }

	  toggleEnabled() {
	    this._isEnabled = !this._isEnabled;
	  }

	  toggle(event) {
	    if (!this._isEnabled) {
	      return;
	    }

	    if (event) {
	      const context = this._initializeOnDelegatedTarget(event);

	      context._activeTrigger.click = !context._activeTrigger.click;

	      if (context._isWithActiveTrigger()) {
	        context._enter(null, context);
	      } else {
	        context._leave(null, context);
	      }
	    } else {
	      if (this.getTipElement().classList.contains(CLASS_NAME_SHOW$2)) {
	        this._leave(null, this);

	        return;
	      }

	      this._enter(null, this);
	    }
	  }

	  dispose() {
	    clearTimeout(this._timeout);
	    EventHandler.off(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	    if (this.tip) {
	      this.tip.remove();
	    }

	    this._disposePopper();

	    super.dispose();
	  }

	  show() {
	    if (this._element.style.display === 'none') {
	      throw new Error('Please use show on visible elements');
	    }

	    if (!(this.isWithContent() && this._isEnabled)) {
	      return;
	    }

	    const showEvent = EventHandler.trigger(this._element, this.constructor.Event.SHOW);
	    const shadowRoot = findShadowRoot(this._element);
	    const isInTheDom = shadowRoot === null ? this._element.ownerDocument.documentElement.contains(this._element) : shadowRoot.contains(this._element);

	    if (showEvent.defaultPrevented || !isInTheDom) {
	      return;
	    } // A trick to recreate a tooltip in case a new title is given by using the NOT documented `data-bs-original-title`
	    // This will be removed later in favor of a `setContent` method


	    if (this.constructor.NAME === 'tooltip' && this.tip && this.getTitle() !== this.tip.querySelector(SELECTOR_TOOLTIP_INNER).innerHTML) {
	      this._disposePopper();

	      this.tip.remove();
	      this.tip = null;
	    }

	    const tip = this.getTipElement();
	    const tipId = getUID(this.constructor.NAME);
	    tip.setAttribute('id', tipId);

	    this._element.setAttribute('aria-describedby', tipId);

	    if (this._config.animation) {
	      tip.classList.add(CLASS_NAME_FADE$2);
	    }

	    const placement = typeof this._config.placement === 'function' ? this._config.placement.call(this, tip, this._element) : this._config.placement;

	    const attachment = this._getAttachment(placement);

	    this._addAttachmentClass(attachment);

	    const {
	      container
	    } = this._config;
	    Data.set(tip, this.constructor.DATA_KEY, this);

	    if (!this._element.ownerDocument.documentElement.contains(this.tip)) {
	      container.append(tip);
	      EventHandler.trigger(this._element, this.constructor.Event.INSERTED);
	    }

	    if (this._popper) {
	      this._popper.update();
	    } else {
	      this._popper = createPopper(this._element, tip, this._getPopperConfig(attachment));
	    }

	    tip.classList.add(CLASS_NAME_SHOW$2);

	    const customClass = this._resolvePossibleFunction(this._config.customClass);

	    if (customClass) {
	      tip.classList.add(...customClass.split(' '));
	    } // If this is a touch-enabled device we add extra
	    // empty mouseover listeners to the body's immediate children;
	    // only needed because of broken event delegation on iOS
	    // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


	    if ('ontouchstart' in document.documentElement) {
	      [].concat(...document.body.children).forEach(element => {
	        EventHandler.on(element, 'mouseover', noop);
	      });
	    }

	    const complete = () => {
	      const prevHoverState = this._hoverState;
	      this._hoverState = null;
	      EventHandler.trigger(this._element, this.constructor.Event.SHOWN);

	      if (prevHoverState === HOVER_STATE_OUT) {
	        this._leave(null, this);
	      }
	    };

	    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

	    this._queueCallback(complete, this.tip, isAnimated);
	  }

	  hide() {
	    if (!this._popper) {
	      return;
	    }

	    const tip = this.getTipElement();

	    const complete = () => {
	      if (this._isWithActiveTrigger()) {
	        return;
	      }

	      if (this._hoverState !== HOVER_STATE_SHOW) {
	        tip.remove();
	      }

	      this._cleanTipClass();

	      this._element.removeAttribute('aria-describedby');

	      EventHandler.trigger(this._element, this.constructor.Event.HIDDEN);

	      this._disposePopper();
	    };

	    const hideEvent = EventHandler.trigger(this._element, this.constructor.Event.HIDE);

	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    tip.classList.remove(CLASS_NAME_SHOW$2); // If this is a touch-enabled device we remove the extra
	    // empty mouseover listeners we added for iOS support

	    if ('ontouchstart' in document.documentElement) {
	      [].concat(...document.body.children).forEach(element => EventHandler.off(element, 'mouseover', noop));
	    }

	    this._activeTrigger[TRIGGER_CLICK] = false;
	    this._activeTrigger[TRIGGER_FOCUS] = false;
	    this._activeTrigger[TRIGGER_HOVER] = false;
	    const isAnimated = this.tip.classList.contains(CLASS_NAME_FADE$2);

	    this._queueCallback(complete, this.tip, isAnimated);

	    this._hoverState = '';
	  }

	  update() {
	    if (this._popper !== null) {
	      this._popper.update();
	    }
	  } // Protected


	  isWithContent() {
	    return Boolean(this.getTitle());
	  }

	  getTipElement() {
	    if (this.tip) {
	      return this.tip;
	    }

	    const element = document.createElement('div');
	    element.innerHTML = this._config.template;
	    const tip = element.children[0];
	    this.setContent(tip);
	    tip.classList.remove(CLASS_NAME_FADE$2, CLASS_NAME_SHOW$2);
	    this.tip = tip;
	    return this.tip;
	  }

	  setContent(tip) {
	    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TOOLTIP_INNER);
	  }

	  _sanitizeAndSetContent(template, content, selector) {
	    const templateElement = SelectorEngine.findOne(selector, template);

	    if (!content && templateElement) {
	      templateElement.remove();
	      return;
	    } // we use append for html objects to maintain js events


	    this.setElementContent(templateElement, content);
	  }

	  setElementContent(element, content) {
	    if (element === null) {
	      return;
	    }

	    if (isElement(content)) {
	      content = getElement(content); // content is a DOM node or a jQuery

	      if (this._config.html) {
	        if (content.parentNode !== element) {
	          element.innerHTML = '';
	          element.append(content);
	        }
	      } else {
	        element.textContent = content.textContent;
	      }

	      return;
	    }

	    if (this._config.html) {
	      if (this._config.sanitize) {
	        content = sanitizeHtml(content, this._config.allowList, this._config.sanitizeFn);
	      }

	      element.innerHTML = content;
	    } else {
	      element.textContent = content;
	    }
	  }

	  getTitle() {
	    const title = this._element.getAttribute('data-bs-original-title') || this._config.title;

	    return this._resolvePossibleFunction(title);
	  }

	  updateAttachment(attachment) {
	    if (attachment === 'right') {
	      return 'end';
	    }

	    if (attachment === 'left') {
	      return 'start';
	    }

	    return attachment;
	  } // Private


	  _initializeOnDelegatedTarget(event, context) {
	    return context || this.constructor.getOrCreateInstance(event.delegateTarget, this._getDelegateConfig());
	  }

	  _getOffset() {
	    const {
	      offset
	    } = this._config;

	    if (typeof offset === 'string') {
	      return offset.split(',').map(val => Number.parseInt(val, 10));
	    }

	    if (typeof offset === 'function') {
	      return popperData => offset(popperData, this._element);
	    }

	    return offset;
	  }

	  _resolvePossibleFunction(content) {
	    return typeof content === 'function' ? content.call(this._element) : content;
	  }

	  _getPopperConfig(attachment) {
	    const defaultBsPopperConfig = {
	      placement: attachment,
	      modifiers: [{
	        name: 'flip',
	        options: {
	          fallbackPlacements: this._config.fallbackPlacements
	        }
	      }, {
	        name: 'offset',
	        options: {
	          offset: this._getOffset()
	        }
	      }, {
	        name: 'preventOverflow',
	        options: {
	          boundary: this._config.boundary
	        }
	      }, {
	        name: 'arrow',
	        options: {
	          element: `.${this.constructor.NAME}-arrow`
	        }
	      }, {
	        name: 'onChange',
	        enabled: true,
	        phase: 'afterWrite',
	        fn: data => this._handlePopperPlacementChange(data)
	      }],
	      onFirstUpdate: data => {
	        if (data.options.placement !== data.placement) {
	          this._handlePopperPlacementChange(data);
	        }
	      }
	    };
	    return { ...defaultBsPopperConfig,
	      ...(typeof this._config.popperConfig === 'function' ? this._config.popperConfig(defaultBsPopperConfig) : this._config.popperConfig)
	    };
	  }

	  _addAttachmentClass(attachment) {
	    this.getTipElement().classList.add(`${this._getBasicClassPrefix()}-${this.updateAttachment(attachment)}`);
	  }

	  _getAttachment(placement) {
	    return AttachmentMap[placement.toUpperCase()];
	  }

	  _setListeners() {
	    const triggers = this._config.trigger.split(' ');

	    triggers.forEach(trigger => {
	      if (trigger === 'click') {
	        EventHandler.on(this._element, this.constructor.Event.CLICK, this._config.selector, event => this.toggle(event));
	      } else if (trigger !== TRIGGER_MANUAL) {
	        const eventIn = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSEENTER : this.constructor.Event.FOCUSIN;
	        const eventOut = trigger === TRIGGER_HOVER ? this.constructor.Event.MOUSELEAVE : this.constructor.Event.FOCUSOUT;
	        EventHandler.on(this._element, eventIn, this._config.selector, event => this._enter(event));
	        EventHandler.on(this._element, eventOut, this._config.selector, event => this._leave(event));
	      }
	    });

	    this._hideModalHandler = () => {
	      if (this._element) {
	        this.hide();
	      }
	    };

	    EventHandler.on(this._element.closest(SELECTOR_MODAL), EVENT_MODAL_HIDE, this._hideModalHandler);

	    if (this._config.selector) {
	      this._config = { ...this._config,
	        trigger: 'manual',
	        selector: ''
	      };
	    } else {
	      this._fixTitle();
	    }
	  }

	  _fixTitle() {
	    const title = this._element.getAttribute('title');

	    const originalTitleType = typeof this._element.getAttribute('data-bs-original-title');

	    if (title || originalTitleType !== 'string') {
	      this._element.setAttribute('data-bs-original-title', title || '');

	      if (title && !this._element.getAttribute('aria-label') && !this._element.textContent) {
	        this._element.setAttribute('aria-label', title);
	      }

	      this._element.setAttribute('title', '');
	    }
	  }

	  _enter(event, context) {
	    context = this._initializeOnDelegatedTarget(event, context);

	    if (event) {
	      context._activeTrigger[event.type === 'focusin' ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
	    }

	    if (context.getTipElement().classList.contains(CLASS_NAME_SHOW$2) || context._hoverState === HOVER_STATE_SHOW) {
	      context._hoverState = HOVER_STATE_SHOW;
	      return;
	    }

	    clearTimeout(context._timeout);
	    context._hoverState = HOVER_STATE_SHOW;

	    if (!context._config.delay || !context._config.delay.show) {
	      context.show();
	      return;
	    }

	    context._timeout = setTimeout(() => {
	      if (context._hoverState === HOVER_STATE_SHOW) {
	        context.show();
	      }
	    }, context._config.delay.show);
	  }

	  _leave(event, context) {
	    context = this._initializeOnDelegatedTarget(event, context);

	    if (event) {
	      context._activeTrigger[event.type === 'focusout' ? TRIGGER_FOCUS : TRIGGER_HOVER] = context._element.contains(event.relatedTarget);
	    }

	    if (context._isWithActiveTrigger()) {
	      return;
	    }

	    clearTimeout(context._timeout);
	    context._hoverState = HOVER_STATE_OUT;

	    if (!context._config.delay || !context._config.delay.hide) {
	      context.hide();
	      return;
	    }

	    context._timeout = setTimeout(() => {
	      if (context._hoverState === HOVER_STATE_OUT) {
	        context.hide();
	      }
	    }, context._config.delay.hide);
	  }

	  _isWithActiveTrigger() {
	    for (const trigger in this._activeTrigger) {
	      if (this._activeTrigger[trigger]) {
	        return true;
	      }
	    }

	    return false;
	  }

	  _getConfig(config) {
	    const dataAttributes = Manipulator.getDataAttributes(this._element);
	    Object.keys(dataAttributes).forEach(dataAttr => {
	      if (DISALLOWED_ATTRIBUTES.has(dataAttr)) {
	        delete dataAttributes[dataAttr];
	      }
	    });
	    config = { ...this.constructor.Default,
	      ...dataAttributes,
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    config.container = config.container === false ? document.body : getElement(config.container);

	    if (typeof config.delay === 'number') {
	      config.delay = {
	        show: config.delay,
	        hide: config.delay
	      };
	    }

	    if (typeof config.title === 'number') {
	      config.title = config.title.toString();
	    }

	    if (typeof config.content === 'number') {
	      config.content = config.content.toString();
	    }

	    typeCheckConfig(NAME$4, config, this.constructor.DefaultType);

	    if (config.sanitize) {
	      config.template = sanitizeHtml(config.template, config.allowList, config.sanitizeFn);
	    }

	    return config;
	  }

	  _getDelegateConfig() {
	    const config = {};

	    for (const key in this._config) {
	      if (this.constructor.Default[key] !== this._config[key]) {
	        config[key] = this._config[key];
	      }
	    } // In the future can be replaced with:
	    // const keysWithDifferentValues = Object.entries(this._config).filter(entry => this.constructor.Default[entry[0]] !== this._config[entry[0]])
	    // `Object.fromEntries(keysWithDifferentValues)`


	    return config;
	  }

	  _cleanTipClass() {
	    const tip = this.getTipElement();
	    const basicClassPrefixRegex = new RegExp(`(^|\\s)${this._getBasicClassPrefix()}\\S+`, 'g');
	    const tabClass = tip.getAttribute('class').match(basicClassPrefixRegex);

	    if (tabClass !== null && tabClass.length > 0) {
	      tabClass.map(token => token.trim()).forEach(tClass => tip.classList.remove(tClass));
	    }
	  }

	  _getBasicClassPrefix() {
	    return CLASS_PREFIX$1;
	  }

	  _handlePopperPlacementChange(popperData) {
	    const {
	      state
	    } = popperData;

	    if (!state) {
	      return;
	    }

	    this.tip = state.elements.popper;

	    this._cleanTipClass();

	    this._addAttachmentClass(this._getAttachment(state.placement));
	  }

	  _disposePopper() {
	    if (this._popper) {
	      this._popper.destroy();

	      this._popper = null;
	    }
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Tooltip.getOrCreateInstance(this, config);

	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      }
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Tooltip to jQuery only if jQuery is present
	 */


	defineJQueryPlugin(Tooltip);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): popover.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$3 = 'popover';
	const DATA_KEY$3 = 'bs.popover';
	const EVENT_KEY$3 = `.${DATA_KEY$3}`;
	const CLASS_PREFIX = 'bs-popover';
	const Default$2 = { ...Tooltip.Default,
	  placement: 'right',
	  offset: [0, 8],
	  trigger: 'click',
	  content: '',
	  template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div>' + '</div>'
	};
	const DefaultType$2 = { ...Tooltip.DefaultType,
	  content: '(string|element|function)'
	};
	const Event$1 = {
	  HIDE: `hide${EVENT_KEY$3}`,
	  HIDDEN: `hidden${EVENT_KEY$3}`,
	  SHOW: `show${EVENT_KEY$3}`,
	  SHOWN: `shown${EVENT_KEY$3}`,
	  INSERTED: `inserted${EVENT_KEY$3}`,
	  CLICK: `click${EVENT_KEY$3}`,
	  FOCUSIN: `focusin${EVENT_KEY$3}`,
	  FOCUSOUT: `focusout${EVENT_KEY$3}`,
	  MOUSEENTER: `mouseenter${EVENT_KEY$3}`,
	  MOUSELEAVE: `mouseleave${EVENT_KEY$3}`
	};
	const SELECTOR_TITLE = '.popover-header';
	const SELECTOR_CONTENT = '.popover-body';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Popover extends Tooltip {
	  // Getters
	  static get Default() {
	    return Default$2;
	  }

	  static get NAME() {
	    return NAME$3;
	  }

	  static get Event() {
	    return Event$1;
	  }

	  static get DefaultType() {
	    return DefaultType$2;
	  } // Overrides


	  isWithContent() {
	    return this.getTitle() || this._getContent();
	  }

	  setContent(tip) {
	    this._sanitizeAndSetContent(tip, this.getTitle(), SELECTOR_TITLE);

	    this._sanitizeAndSetContent(tip, this._getContent(), SELECTOR_CONTENT);
	  } // Private


	  _getContent() {
	    return this._resolvePossibleFunction(this._config.content);
	  }

	  _getBasicClassPrefix() {
	    return CLASS_PREFIX;
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Popover.getOrCreateInstance(this, config);

	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      }
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Popover to jQuery only if jQuery is present
	 */


	defineJQueryPlugin(Popover);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): scrollspy.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$2 = 'scrollspy';
	const DATA_KEY$2 = 'bs.scrollspy';
	const EVENT_KEY$2 = `.${DATA_KEY$2}`;
	const DATA_API_KEY$1 = '.data-api';
	const Default$1 = {
	  offset: 10,
	  method: 'auto',
	  target: ''
	};
	const DefaultType$1 = {
	  offset: 'number',
	  method: 'string',
	  target: '(string|element)'
	};
	const EVENT_ACTIVATE = `activate${EVENT_KEY$2}`;
	const EVENT_SCROLL = `scroll${EVENT_KEY$2}`;
	const EVENT_LOAD_DATA_API = `load${EVENT_KEY$2}${DATA_API_KEY$1}`;
	const CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
	const CLASS_NAME_ACTIVE$1 = 'active';
	const SELECTOR_DATA_SPY = '[data-bs-spy="scroll"]';
	const SELECTOR_NAV_LIST_GROUP$1 = '.nav, .list-group';
	const SELECTOR_NAV_LINKS = '.nav-link';
	const SELECTOR_NAV_ITEMS = '.nav-item';
	const SELECTOR_LIST_ITEMS = '.list-group-item';
	const SELECTOR_LINK_ITEMS = `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}, .${CLASS_NAME_DROPDOWN_ITEM}`;
	const SELECTOR_DROPDOWN$1 = '.dropdown';
	const SELECTOR_DROPDOWN_TOGGLE$1 = '.dropdown-toggle';
	const METHOD_OFFSET = 'offset';
	const METHOD_POSITION = 'position';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class ScrollSpy extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._scrollElement = this._element.tagName === 'BODY' ? window : this._element;
	    this._config = this._getConfig(config);
	    this._offsets = [];
	    this._targets = [];
	    this._activeTarget = null;
	    this._scrollHeight = 0;
	    EventHandler.on(this._scrollElement, EVENT_SCROLL, () => this._process());
	    this.refresh();

	    this._process();
	  } // Getters


	  static get Default() {
	    return Default$1;
	  }

	  static get NAME() {
	    return NAME$2;
	  } // Public


	  refresh() {
	    const autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
	    const offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
	    const offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
	    this._offsets = [];
	    this._targets = [];
	    this._scrollHeight = this._getScrollHeight();
	    const targets = SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target);
	    targets.map(element => {
	      const targetSelector = getSelectorFromElement(element);
	      const target = targetSelector ? SelectorEngine.findOne(targetSelector) : null;

	      if (target) {
	        const targetBCR = target.getBoundingClientRect();

	        if (targetBCR.width || targetBCR.height) {
	          return [Manipulator[offsetMethod](target).top + offsetBase, targetSelector];
	        }
	      }

	      return null;
	    }).filter(item => item).sort((a, b) => a[0] - b[0]).forEach(item => {
	      this._offsets.push(item[0]);

	      this._targets.push(item[1]);
	    });
	  }

	  dispose() {
	    EventHandler.off(this._scrollElement, EVENT_KEY$2);
	    super.dispose();
	  } // Private


	  _getConfig(config) {
	    config = { ...Default$1,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    config.target = getElement(config.target) || document.documentElement;
	    typeCheckConfig(NAME$2, config, DefaultType$1);
	    return config;
	  }

	  _getScrollTop() {
	    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
	  }

	  _getScrollHeight() {
	    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	  }

	  _getOffsetHeight() {
	    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
	  }

	  _process() {
	    const scrollTop = this._getScrollTop() + this._config.offset;

	    const scrollHeight = this._getScrollHeight();

	    const maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

	    if (this._scrollHeight !== scrollHeight) {
	      this.refresh();
	    }

	    if (scrollTop >= maxScroll) {
	      const target = this._targets[this._targets.length - 1];

	      if (this._activeTarget !== target) {
	        this._activate(target);
	      }

	      return;
	    }

	    if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
	      this._activeTarget = null;

	      this._clear();

	      return;
	    }

	    for (let i = this._offsets.length; i--;) {
	      const isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

	      if (isActiveTarget) {
	        this._activate(this._targets[i]);
	      }
	    }
	  }

	  _activate(target) {
	    this._activeTarget = target;

	    this._clear();

	    const queries = SELECTOR_LINK_ITEMS.split(',').map(selector => `${selector}[data-bs-target="${target}"],${selector}[href="${target}"]`);
	    const link = SelectorEngine.findOne(queries.join(','), this._config.target);
	    link.classList.add(CLASS_NAME_ACTIVE$1);

	    if (link.classList.contains(CLASS_NAME_DROPDOWN_ITEM)) {
	      SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1, link.closest(SELECTOR_DROPDOWN$1)).classList.add(CLASS_NAME_ACTIVE$1);
	    } else {
	      SelectorEngine.parents(link, SELECTOR_NAV_LIST_GROUP$1).forEach(listGroup => {
	        // Set triggered links parents as active
	        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor
	        SelectorEngine.prev(listGroup, `${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1)); // Handle special case when .nav-link is inside .nav-item

	        SelectorEngine.prev(listGroup, SELECTOR_NAV_ITEMS).forEach(navItem => {
	          SelectorEngine.children(navItem, SELECTOR_NAV_LINKS).forEach(item => item.classList.add(CLASS_NAME_ACTIVE$1));
	        });
	      });
	    }

	    EventHandler.trigger(this._scrollElement, EVENT_ACTIVATE, {
	      relatedTarget: target
	    });
	  }

	  _clear() {
	    SelectorEngine.find(SELECTOR_LINK_ITEMS, this._config.target).filter(node => node.classList.contains(CLASS_NAME_ACTIVE$1)).forEach(node => node.classList.remove(CLASS_NAME_ACTIVE$1));
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = ScrollSpy.getOrCreateInstance(this, config);

	      if (typeof config !== 'string') {
	        return;
	      }

	      if (typeof data[config] === 'undefined') {
	        throw new TypeError(`No method named "${config}"`);
	      }

	      data[config]();
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(window, EVENT_LOAD_DATA_API, () => {
	  SelectorEngine.find(SELECTOR_DATA_SPY).forEach(spy => new ScrollSpy(spy));
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .ScrollSpy to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(ScrollSpy);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): tab.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME$1 = 'tab';
	const DATA_KEY$1 = 'bs.tab';
	const EVENT_KEY$1 = `.${DATA_KEY$1}`;
	const DATA_API_KEY = '.data-api';
	const EVENT_HIDE$1 = `hide${EVENT_KEY$1}`;
	const EVENT_HIDDEN$1 = `hidden${EVENT_KEY$1}`;
	const EVENT_SHOW$1 = `show${EVENT_KEY$1}`;
	const EVENT_SHOWN$1 = `shown${EVENT_KEY$1}`;
	const EVENT_CLICK_DATA_API = `click${EVENT_KEY$1}${DATA_API_KEY}`;
	const CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
	const CLASS_NAME_ACTIVE = 'active';
	const CLASS_NAME_FADE$1 = 'fade';
	const CLASS_NAME_SHOW$1 = 'show';
	const SELECTOR_DROPDOWN = '.dropdown';
	const SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
	const SELECTOR_ACTIVE = '.active';
	const SELECTOR_ACTIVE_UL = ':scope > li > .active';
	const SELECTOR_DATA_TOGGLE = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	const SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
	const SELECTOR_DROPDOWN_ACTIVE_CHILD = ':scope > .dropdown-menu .active';
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Tab extends BaseComponent {
	  // Getters
	  static get NAME() {
	    return NAME$1;
	  } // Public


	  show() {
	    if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
	      return;
	    }

	    let previous;
	    const target = getElementFromSelector(this._element);

	    const listElement = this._element.closest(SELECTOR_NAV_LIST_GROUP);

	    if (listElement) {
	      const itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
	      previous = SelectorEngine.find(itemSelector, listElement);
	      previous = previous[previous.length - 1];
	    }

	    const hideEvent = previous ? EventHandler.trigger(previous, EVENT_HIDE$1, {
	      relatedTarget: this._element
	    }) : null;
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW$1, {
	      relatedTarget: previous
	    });

	    if (showEvent.defaultPrevented || hideEvent !== null && hideEvent.defaultPrevented) {
	      return;
	    }

	    this._activate(this._element, listElement);

	    const complete = () => {
	      EventHandler.trigger(previous, EVENT_HIDDEN$1, {
	        relatedTarget: this._element
	      });
	      EventHandler.trigger(this._element, EVENT_SHOWN$1, {
	        relatedTarget: previous
	      });
	    };

	    if (target) {
	      this._activate(target, target.parentNode, complete);
	    } else {
	      complete();
	    }
	  } // Private


	  _activate(element, container, callback) {
	    const activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? SelectorEngine.find(SELECTOR_ACTIVE_UL, container) : SelectorEngine.children(container, SELECTOR_ACTIVE);
	    const active = activeElements[0];
	    const isTransitioning = callback && active && active.classList.contains(CLASS_NAME_FADE$1);

	    const complete = () => this._transitionComplete(element, active, callback);

	    if (active && isTransitioning) {
	      active.classList.remove(CLASS_NAME_SHOW$1);

	      this._queueCallback(complete, element, true);
	    } else {
	      complete();
	    }
	  }

	  _transitionComplete(element, active, callback) {
	    if (active) {
	      active.classList.remove(CLASS_NAME_ACTIVE);
	      const dropdownChild = SelectorEngine.findOne(SELECTOR_DROPDOWN_ACTIVE_CHILD, active.parentNode);

	      if (dropdownChild) {
	        dropdownChild.classList.remove(CLASS_NAME_ACTIVE);
	      }

	      if (active.getAttribute('role') === 'tab') {
	        active.setAttribute('aria-selected', false);
	      }
	    }

	    element.classList.add(CLASS_NAME_ACTIVE);

	    if (element.getAttribute('role') === 'tab') {
	      element.setAttribute('aria-selected', true);
	    }

	    reflow(element);

	    if (element.classList.contains(CLASS_NAME_FADE$1)) {
	      element.classList.add(CLASS_NAME_SHOW$1);
	    }

	    let parent = element.parentNode;

	    if (parent && parent.nodeName === 'LI') {
	      parent = parent.parentNode;
	    }

	    if (parent && parent.classList.contains(CLASS_NAME_DROPDOWN_MENU)) {
	      const dropdownElement = element.closest(SELECTOR_DROPDOWN);

	      if (dropdownElement) {
	        SelectorEngine.find(SELECTOR_DROPDOWN_TOGGLE, dropdownElement).forEach(dropdown => dropdown.classList.add(CLASS_NAME_ACTIVE));
	      }

	      element.setAttribute('aria-expanded', true);
	    }

	    if (callback) {
	      callback();
	    }
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Tab.getOrCreateInstance(this);

	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config]();
	      }
	    });
	  }

	}
	/**
	 * ------------------------------------------------------------------------
	 * Data Api implementation
	 * ------------------------------------------------------------------------
	 */


	EventHandler.on(document, EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
	  if (['A', 'AREA'].includes(this.tagName)) {
	    event.preventDefault();
	  }

	  if (isDisabled(this)) {
	    return;
	  }

	  const data = Tab.getOrCreateInstance(this);
	  data.show();
	});
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Tab to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Tab);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v5.1.3): toast.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
	 * --------------------------------------------------------------------------
	 */
	/**
	 * ------------------------------------------------------------------------
	 * Constants
	 * ------------------------------------------------------------------------
	 */

	const NAME = 'toast';
	const DATA_KEY = 'bs.toast';
	const EVENT_KEY = `.${DATA_KEY}`;
	const EVENT_MOUSEOVER = `mouseover${EVENT_KEY}`;
	const EVENT_MOUSEOUT = `mouseout${EVENT_KEY}`;
	const EVENT_FOCUSIN = `focusin${EVENT_KEY}`;
	const EVENT_FOCUSOUT = `focusout${EVENT_KEY}`;
	const EVENT_HIDE = `hide${EVENT_KEY}`;
	const EVENT_HIDDEN = `hidden${EVENT_KEY}`;
	const EVENT_SHOW = `show${EVENT_KEY}`;
	const EVENT_SHOWN = `shown${EVENT_KEY}`;
	const CLASS_NAME_FADE = 'fade';
	const CLASS_NAME_HIDE = 'hide'; // @deprecated - kept here only for backwards compatibility

	const CLASS_NAME_SHOW = 'show';
	const CLASS_NAME_SHOWING = 'showing';
	const DefaultType = {
	  animation: 'boolean',
	  autohide: 'boolean',
	  delay: 'number'
	};
	const Default = {
	  animation: true,
	  autohide: true,
	  delay: 5000
	};
	/**
	 * ------------------------------------------------------------------------
	 * Class Definition
	 * ------------------------------------------------------------------------
	 */

	class Toast extends BaseComponent {
	  constructor(element, config) {
	    super(element);
	    this._config = this._getConfig(config);
	    this._timeout = null;
	    this._hasMouseInteraction = false;
	    this._hasKeyboardInteraction = false;

	    this._setListeners();
	  } // Getters


	  static get DefaultType() {
	    return DefaultType;
	  }

	  static get Default() {
	    return Default;
	  }

	  static get NAME() {
	    return NAME;
	  } // Public


	  show() {
	    const showEvent = EventHandler.trigger(this._element, EVENT_SHOW);

	    if (showEvent.defaultPrevented) {
	      return;
	    }

	    this._clearTimeout();

	    if (this._config.animation) {
	      this._element.classList.add(CLASS_NAME_FADE);
	    }

	    const complete = () => {
	      this._element.classList.remove(CLASS_NAME_SHOWING);

	      EventHandler.trigger(this._element, EVENT_SHOWN);

	      this._maybeScheduleHide();
	    };

	    this._element.classList.remove(CLASS_NAME_HIDE); // @deprecated


	    reflow(this._element);

	    this._element.classList.add(CLASS_NAME_SHOW);

	    this._element.classList.add(CLASS_NAME_SHOWING);

	    this._queueCallback(complete, this._element, this._config.animation);
	  }

	  hide() {
	    if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
	      return;
	    }

	    const hideEvent = EventHandler.trigger(this._element, EVENT_HIDE);

	    if (hideEvent.defaultPrevented) {
	      return;
	    }

	    const complete = () => {
	      this._element.classList.add(CLASS_NAME_HIDE); // @deprecated


	      this._element.classList.remove(CLASS_NAME_SHOWING);

	      this._element.classList.remove(CLASS_NAME_SHOW);

	      EventHandler.trigger(this._element, EVENT_HIDDEN);
	    };

	    this._element.classList.add(CLASS_NAME_SHOWING);

	    this._queueCallback(complete, this._element, this._config.animation);
	  }

	  dispose() {
	    this._clearTimeout();

	    if (this._element.classList.contains(CLASS_NAME_SHOW)) {
	      this._element.classList.remove(CLASS_NAME_SHOW);
	    }

	    super.dispose();
	  } // Private


	  _getConfig(config) {
	    config = { ...Default,
	      ...Manipulator.getDataAttributes(this._element),
	      ...(typeof config === 'object' && config ? config : {})
	    };
	    typeCheckConfig(NAME, config, this.constructor.DefaultType);
	    return config;
	  }

	  _maybeScheduleHide() {
	    if (!this._config.autohide) {
	      return;
	    }

	    if (this._hasMouseInteraction || this._hasKeyboardInteraction) {
	      return;
	    }

	    this._timeout = setTimeout(() => {
	      this.hide();
	    }, this._config.delay);
	  }

	  _onInteraction(event, isInteracting) {
	    switch (event.type) {
	      case 'mouseover':
	      case 'mouseout':
	        this._hasMouseInteraction = isInteracting;
	        break;

	      case 'focusin':
	      case 'focusout':
	        this._hasKeyboardInteraction = isInteracting;
	        break;
	    }

	    if (isInteracting) {
	      this._clearTimeout();

	      return;
	    }

	    const nextElement = event.relatedTarget;

	    if (this._element === nextElement || this._element.contains(nextElement)) {
	      return;
	    }

	    this._maybeScheduleHide();
	  }

	  _setListeners() {
	    EventHandler.on(this._element, EVENT_MOUSEOVER, event => this._onInteraction(event, true));
	    EventHandler.on(this._element, EVENT_MOUSEOUT, event => this._onInteraction(event, false));
	    EventHandler.on(this._element, EVENT_FOCUSIN, event => this._onInteraction(event, true));
	    EventHandler.on(this._element, EVENT_FOCUSOUT, event => this._onInteraction(event, false));
	  }

	  _clearTimeout() {
	    clearTimeout(this._timeout);
	    this._timeout = null;
	  } // Static


	  static jQueryInterface(config) {
	    return this.each(function () {
	      const data = Toast.getOrCreateInstance(this, config);

	      if (typeof config === 'string') {
	        if (typeof data[config] === 'undefined') {
	          throw new TypeError(`No method named "${config}"`);
	        }

	        data[config](this);
	      }
	    });
	  }

	}

	enableDismissTrigger(Toast);
	/**
	 * ------------------------------------------------------------------------
	 * jQuery
	 * ------------------------------------------------------------------------
	 * add .Toast to jQuery only if jQuery is present
	 */

	defineJQueryPlugin(Toast);

	var Template = /** @class */ (function () {
	    function Template() {
	    }
	    Template.prototype.modalClose = function (id) {
	        var modalEl = document.getElementById("modal-" + id);
	        var modal = Modal.getInstance(modalEl);
	        modal.dispose();
	    };
	    Template.prototype.createElementFromHTML = function (htmlString) {
	        var div = document.createElement("div");
	        div.innerHTML = htmlString.trim();
	        return div.firstElementChild;
	    };
	    Template.prototype.modal = function (id, title, content, cb, size) {
	        var _this = this;
	        var html = '<div id="modal-' +
	            id +
	            '" class="modal" tabindex="-1"><div class="modal-dialog ' +
	            size +
	            '"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">' +
	            title +
	            '</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' +
	            content +
	            "</div></div></div></div>";
	        document.body.insertAdjacentElement("beforeend", this.createElementFromHTML(html));
	        var modal = new Modal(document.getElementById("modal-" + id), {
	            keyboard: false,
	        });
	        modal.show();
	        var rootElement = document.querySelector("body");
	        rootElement.addEventListener("hidden.bs.modal", function (evt) {
	            var targetElement = evt.target;
	            while (targetElement != null) {
	                if (targetElement.matches("#modal-" + id)) {
	                    _this.modalClose(id);
	                    if (cb !== null && cb != undefined) {
	                        cb();
	                    }
	                }
	                targetElement = targetElement.parentElement;
	            }
	        }, true);
	    };
	    Template.prototype.fbInit = function () {
	        var js, fjs = document.getElementsByTagName("script")[0];
	        if (document.getElementById("facebook-jssdk"))
	            return;
	        js = document.createElement("script");
	        js.id = "facebook-jssdk";
	        js.src =
	            "https://connect.facebook.net/en_US/sdk.js#xfbml=1&autoLogAppEvents=1&version=v2.12&appId=199922540602335";
	        fjs.parentNode.insertBefore(js, fjs);
	    };
	    return Template;
	}());

	var socket = lookup();
	var tpl = new Template();
	$(function () {
	    var loc = window.location.href;
	    if (/login/.test(loc)) {
	        $('.nav-login').siblings().removeClass('active');
	        $('.nav-login').addClass('active');
	    }
	    if (/register/.test(loc)) {
	        $('.nav-register').siblings().removeClass('active');
	        $('.nav-register').addClass('active');
	    }
	});
	$(document).on('click', '#register', function (e) {
	    e.preventDefault();
	    var data = {
	        username: $('input[name=username]').val(),
	        email: $('input[name=email]').val(),
	        password: $('input[name=password]').val()
	    };
	    socket.emit('user-register', data);
	    socket.on('user-register-response', function (result) {
	        var title = '', message = '', redirect = '';
	        if (result.status == 'ok') {
	            title = 'Success!';
	            message = 'You have successfully registered an account and may now login.';
	            redirect = '/user/login/';
	        }
	        else {
	            title = 'Ooops!';
	            message = result.message;
	            redirect = '/user/register/';
	        }
	        tpl.modal('register-response', title, message, function () {
	            window.location.href = window.baseURL + redirect;
	        });
	    });
	});
	$(document).on('click', '#login', function (e) {
	    e.preventDefault();
	    var data = {
	        username: $('input[name=username]').val(),
	        password: $('input[name=password]').val()
	    };
	    socket.emit('user-login', data);
	    socket.on('user-login-response', function (result) {
	        var title = '', message = '', callback = null;
	        if (result.status == 'ok') {
	            title = 'Success!';
	            message = 'You have successfully logged in and will now be taken to the game.';
	            callback = function () {
	                window.location.href = window.baseURL + '/game/?token=' + result.data.token;
	            };
	        }
	        else {
	            title = 'Ooops!';
	            message = result.message;
	            callback = function () {
	                window.location.href = window.baseURL + '/user/login/';
	            };
	        }
	        tpl.modal('login-response', title, message, callback);
	    });
	});
	$(document).ready(function () {
	    tpl.fbInit();
	});

})();
//# sourceMappingURL=site.js.map

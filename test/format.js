// 'use strict';

// require('mocha');
// var util = require('util');
// var assert = require('assert');
// var doctrine = require('doctrine');
// var Comments = require('..');
// var comments;

// var a = [
//   '/**',
//   ' * Foo',
//   ' * @param {String} `alpha`',
//   ' * @param {Object|Array} `arr` Object or array of replacement patterns to associate.',
//   ' *   @property {String|RegExp} [arr] `pattern`',
//   ' *   @property {String|Function} [arr] `replacement`',
//   ' * @param {String} beta',
//   ' *   @property {Array} ^beta.foo This is foo property.',
//   ' *   @property {Array} ^beta.bar This is bar property',
//   ' * @param {String} `omega`',
//   ' *   @option {Array} ^omega.one=foo `a` This is option A.',
//   ' *   @option {Array} ^omega.two=bar `b` This is option B.',
//   ' *   @option {Array} ^omega `c` This is option C',
//   ' * @return {Strings} to allow chaining',
//   ' * @public',
//   ' */',
//   ''
// ].join('\n');

// describe('parseType (formatted)', () => {
//   beforeEach(function() {
//     comments = new Comments({
//       format: {
//         comment: function() {

//         }
//       }
//     });
//   });

//   describe.skip('types', () => {
//     it('should ', () => {

//       var comment = comments.parse(a);
//       var tags = comment[0].tags;
//       console.log(comment);
//     });

//     it('should format a comment with a single type', () => {
//       var res = comments.parse('/** @param {boolean} */', {format: true});
//       assert.deepEqual(res[0].tags[0].types, ['boolean']);
//       // assert.deepEqual(comments.parse('/** @param {Window} */', {format: true}), {
//       //   types: [{
//       //     name: 'Window'
//       //   }]
//       // });
//       // assert.deepEqual(comments.parse('/** @param {number} */', {format: true}), {
//       //   types: [{
//       //     name: 'number'
//       //   }]
//       // });
//       // assert.deepEqual(comments.parse('/** @param {_} */', {format: true}), {
//       //   types: [{
//       //     name: '_'
//       //   }]
//       // });
//       // assert.deepEqual(comments.parse('/** @param {$} */', {format: true}), {
//       //   types: [{
//       //     name: '$'
//       //   }]
//       // });
//     });

//     it('should parse a type with dot-notation', () => {
//       assert.deepEqual(comments.parse('foo.bar'), { types: [ { name: 'foo.bar' } ] });
//       assert.deepEqual(comments.parse('a.b.c'), { types: [ { name: 'a.b.c' } ] });
//     });

//     it('should parse multiple types', () => {
//       assert.deepEqual(comments.parse('boolean|string'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ]
//       });
//     });
//   });

//   describe('parens', () => {
//     it('should parse a type in parens', () => {
//       assert.deepEqual(comments.parse('(boolean)'), { types: [ { name: 'boolean' } ] });
//       assert.deepEqual(comments.parse('(Window)'), { types: [ { name: 'Window' } ] });
//     });

//     it('should parse multiple types in parens', () => {
//       assert.deepEqual(comments.parse('(boolean|string)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ]
//       });

//       assert.deepEqual(comments.parse('(boolean|string|array)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' },
//           { name: 'array' }
//         ]
//       });
//     });
//   });

//   describe('any', () => {
//     it('should set tag.any to true when * is defined', () => {
//       assert.deepEqual(comments.parse('(*)'), { types: [], any: true });
//       assert.deepEqual(comments.parse('*'), { types: [], any: true });
//     });

//     it('should set tag.any to true when tag.name is "all"', () => {
//       assert.deepEqual(comments.parse('(all)'), { types: [], any: true });
//       assert.deepEqual(comments.parse('all'), { types: [], any: true });
//     });

//     it('should set tag.any to true when tag.name is "any"', () => {
//       assert.deepEqual(comments.parse('(any)'), { types: [], any: true });
//       assert.deepEqual(comments.parse('any'), { types: [], any: true });
//     });
//   });

//   describe('unknown', () => {
//     it('should set tag.unknown to true when ? is defined', () => {
//       assert.deepEqual(comments.parse('(?)'), { types: [], unknown: true });
//       assert.deepEqual(comments.parse('?'), { types: [], unknown: true });
//     });

//     it('should set tag.unknown to true when tag.name is "unknown"', () => {
//       assert.deepEqual(comments.parse('(unknown)'), { types: [], unknown: true });
//       assert.deepEqual(comments.parse('unknown'), { types: [], unknown: true });
//     });
//   });

//   describe('variadic', () => {
//     it('should set variadic to "true" when an argument is ...', () => {
//       assert.deepEqual(comments.parse('boolean|string|...'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         variadic: true
//       });

//       assert.deepEqual(comments.parse('(boolean|string)...'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         variadic: true
//       });

//       assert.deepEqual(comments.parse('(boolean|...|string)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         variadic: true
//       });

//       assert.deepEqual(comments.parse('(boolean|string|...)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         variadic: true
//       });
//     });

//     it('should set variadic to "true" when param has ...', () => {
//       assert.deepEqual(comments.parse('boolean...'), {
//         types: [
//           { name: 'boolean' }
//         ],
//         variadic: true
//       });

//       assert.deepEqual(comments.parse('...number'), {
//         types: [
//           { name: 'number' }
//         ],
//         variadic: true
//       });

//       assert.deepEqual(comments.parse('...number|string'), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         variadic: true
//       });
//     });
//   });

//   describe('optional', () => {
//     it('should set optional to "true" when trailing = is defined', () => {
//       assert.deepEqual(comments.parse('boolean|string='), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });

//       assert.deepEqual(comments.parse('(boolean|string=)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });

//       assert.deepEqual(comments.parse('(boolean=|string)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });
//     });

//     it('should set optional to "true" when leading = is defined', () => {
//       assert.deepEqual(comments.parse('boolean|=string'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });

//       assert.deepEqual(comments.parse('(boolean|=string)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });

//       assert.deepEqual(comments.parse('(=boolean|string)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });
//     });

//     it('should work when multiple equals are defined', () => {
//       assert.deepEqual(comments.parse('boolean|=string='), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });

//       assert.deepEqual(comments.parse('(=boolean=|=string)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });

//       assert.deepEqual(comments.parse('(=boolean=|=string=)'), {
//         types: [
//           { name: 'boolean' },
//           { name: 'string' }
//         ],
//         optional: true
//       });
//     });
//   });

//   describe('nullable', () => {
//     it('should parse nullable types', () => {
//       assert.deepEqual(comments.parse('?number'), {
//         types: [
//           { name: 'number' }
//         ],
//         nullable: true
//       });

//       assert.deepEqual(comments.parse('?number|string'), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: true
//       });
//     });

//     it('should parse optional nullable types', () => {
//       assert.deepEqual(comments.parse('?number|string='), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: true,
//         optional: true
//       });

//       assert.deepEqual(comments.parse('?number=|string='), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: true,
//         optional: true
//       });

//       assert.deepEqual(comments.parse('?number=|?string='), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: true,
//         optional: true
//       });
//     });

//     it('should support trailing question marks', () => {
//       assert.deepEqual(comments.parse('number?'), {
//         nullable: true,
//         types: [
//           { name: 'number' }
//         ]
//       });

//       assert.deepEqual(comments.parse('number?|string?'), {
//         nullable: true,
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ]
//       });
//     });
//   });

//   describe('non-nullable', () => {
//     it('should parse non-nullable types', () => {
//       assert.deepEqual(comments.parse('!number'), {
//         types: [
//           { name: 'number' }
//         ],
//         nullable: false
//       });

//       assert.deepEqual(comments.parse('!number|string'), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: false
//       });
//     });

//     it('should parse optional nullable types', () => {
//       assert.deepEqual(comments.parse('!number|string='), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: false,
//         optional: true
//       });

//       assert.deepEqual(comments.parse('!number=|string='), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: false,
//         optional: true
//       });

//       assert.deepEqual(comments.parse('!number=|!string='), {
//         types: [
//           { name: 'number' },
//           { name: 'string' }
//         ],
//         nullable: false,
//         optional: true
//       });
//     });
//   });

//   describe('parameterTypeUnions', () => {
//     it('should parse function union types', () => {
//       assert.deepEqual(comments.parse('function()'), {
//         types: [{
//           parameterTypeUnions: []
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [
//               {name: 'string'}
//             ]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string|array)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [
//               {name: 'string'},
//               {name: 'array'}
//             ]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string|array=)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [
//               {name: 'string'},
//               {name: 'array', optional: true}
//             ]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string|array=)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [
//               {name: 'string'},
//               {name: 'array', optional: true}
//             ]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string|!array)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [
//               {name: 'string'},
//               {name: 'array', nullable: false}
//             ]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(?string=, number=)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [
//               {name: 'string', nullable: true, optional: true}
//             ]
//           }, {
//             types: [
//               {name: 'number', optional: true}
//             ]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string, boolean)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }, {
//             types: [{
//               name: 'boolean'
//             }]
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string, boolean=)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }, {
//             types: [{
//               name: 'boolean',
//               optional: true
//             }]
//           }]
//         }]
//       });
//     });

//     it('should parse union types', () => {
//       assert.deepEqual(comments.parse('string[]'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }],
//           genericTypeName: {
//             name: 'Array'
//           }
//         }]
//       });

//       assert.deepEqual(comments.parse('Array[]'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'Array'
//             }]
//           }],
//           genericTypeName: {
//             name: 'Array'
//           }
//         }]
//       });

//       assert.deepEqual(comments.parse('(String|Array)[]'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'String'
//             }, {
//               name: 'Array'
//             }]
//           }],
//           genericTypeName: {
//             name: 'Array'
//           }
//         }]
//       });
//     });
//   });

//   describe('returnTypeUnion', () => {
//     it('should parse variable return types', () => {
//       assert.deepEqual(comments.parse('function(string|object): number'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             },
//             {
//               name: 'object'
//             }]
//           }],
//           returnTypeUnion: {
//             types: [{
//               name: 'number'
//             }]
//           }
//         }]
//       });

//       let fixture = 'function(string|object, array): number';
//       assert.deepEqual(comments.parse(fixture), doctrine.parseType(fixture));
//       // assert.deepEqual(comments.parse(fixture), catharsis.parse(fixture));
//       assert.deepEqual(comments.parse(fixture), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             },
//             {
//               name: 'object'
//             }]
//           }, {
//             types: [{
//               name: 'array'
//             }]
//           }],
//           returnTypeUnion: {
//             types: [{
//               name: 'number'
//             }]
//           }
//         }]
//       });

//       // assert.deepEqual(comments.parse('function((string|object), array): number'), {
//       //   types: [{
//       //     parameterTypeUnions: [{
//       //       types: [{
//       //         name: 'string'
//       //       },
//       //       {
//       //         name: 'object'
//       //       }]
//       //     }, {
//       //       types: [{
//       //         name: 'array'
//       //       }]
//       //     }],
//       //     returnTypeUnion: {
//       //       types: [{
//       //         name: 'number'
//       //       }]
//       //     }
//       //   }]
//       // });
//     });

//     it('should parse return types', () => {
//       assert.deepEqual(comments.parse('function(string, object): number'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }, {
//             types: [{
//               name: 'object'
//             }]
//           }],
//           returnTypeUnion: {
//             types: [{
//               name: 'number'
//             }]
//           }
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string, object): number|string'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }, {
//             types: [{
//               name: 'object'
//             }]
//           }],
//           returnTypeUnion: {
//             types: [{
//               name: 'number'
//             }, {
//               name: 'string'
//             }]
//           }
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string, object): (number|string)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }, {
//             types: [{
//               name: 'object'
//             }]
//           }],
//           returnTypeUnion: {
//             types: [{
//               name: 'number'
//             }, {
//               name: 'string'
//             }]
//           }
//         }]
//       });

//       assert.deepEqual(comments.parse('function(string, object): (number|string=)'), {
//         types: [{
//           parameterTypeUnions: [{
//             types: [{
//               name: 'string'
//             }]
//           }, {
//             types: [{
//               name: 'object'
//             }]
//           }],
//           returnTypeUnion: {
//             optional: true,
//             types: [{
//               name: 'number'
//             }, {
//               name: 'string'
//             }]
//           }
//         }]
//       });
//     });
//   });

//   describe('entries', () => {
//     it('should parse entries', () => {
//       var expected = {
//         types: [
//           {
//             entries: [
//               {
//                 name: 'stream',
//                 typeUnion: {types: [{name: 'Writable'}, {name: 'Foo'}]}
//               }
//             ]
//           },
//           {name: 'String'},
//           {name: 'Array'}
//         ]
//       };

//       assert.deepEqual(comments.parse('{stream: (Writable|Foo)}|(String|Array)'), expected);
//       assert.deepEqual(comments.parse('({stream: Writable|Foo}|String|Array)'), expected);
//       assert.deepEqual(comments.parse('{stream: (Writable|Foo)}|String|Array'), expected);
//       assert.deepEqual(comments.parse('{stream: Writable|Foo}|String|Array'), expected);

//       assert.deepEqual(comments.parse('{foo: number|bar}'), {
//         types: [{
//           entries: [{
//             name: 'foo',
//             typeUnion: {
//               types: [{
//                 name: 'number'
//               }, {
//                 name: 'bar'
//               }]
//             }
//           }]
//         }]
//       });
//     });

//     it('should parse comma-separated entries', () => {
//       assert.deepEqual(comments.parse('{foo: number, string}'), {
//         types: [{
//           entries: [{
//             name: 'foo',
//             typeUnion: {
//               types: [{
//                 name: 'number'
//               }]
//             }
//           }, {
//             name: 'string',
//             typeUnion: {
//               types: [],
//               all: true
//             }
//           }]
//         }]
//       });

//       assert.deepEqual(comments.parse('{foo: number, string, array}'), {
//         types: [{
//           entries: [{
//             name: 'foo',
//             typeUnion: {
//               types: [{
//                 name: 'number'
//               }]
//             }
//           }, {
//             name: 'string',
//             typeUnion: {
//               types: [],
//               all: true
//             }
//           }, {
//             name: 'array',
//             typeUnion: {
//               types: [],
//               all: true
//             }
//           }]
//         }]
//       });
//     });

//     it.skip('should parse multiple comma-separated entries', () => {
//       assert.deepEqual(doctrine.parseType('{foo: number, bar: string, array}'), {
//         types: [{
//           entries: [{
//             name: 'foo',
//             typeUnion: {
//               types: [{
//                 name: 'number'
//               }]
//             }
//           }, {
//             name: 'bar',
//             typeUnion: {
//               types: [{
//                 name: 'string'
//               }]
//             }
//           }, {
//             name: 'array',
//             typeUnion: {
//               types: [],
//               all: true
//             }
//           }]
//         }]
//       });
//     });
//   });

//   describe('options.jsdoc', () => {
//     describe('all', () => {
//       it('should set tag.all to true when * is defined', () => {
//         assert.deepEqual(comments.parse('(*)', {jsdoc: true}), { types: [], all: true });
//         assert.deepEqual(comments.parse('*', {jsdoc: true}), { types: [], all: true });
//       });

//       it('should set tag.all to true when tag.name is "all"', () => {
//         assert.deepEqual(comments.parse('(all)', {jsdoc: true}), { types: [], all: true });
//         assert.deepEqual(comments.parse('all', {jsdoc: true}), { types: [], all: true });
//       });

//       it('should set tag.all to true when tag.name is "any"', () => {
//         assert.deepEqual(comments.parse('(any)', {jsdoc: true}), { types: [], all: true });
//         assert.deepEqual(comments.parse('any', {jsdoc: true}), { types: [], all: true });
//       });
//     });

//     describe('variable', () => {
//       it('should set variable to "true" when an argument is ...', () => {
//         assert.deepEqual(comments.parse('boolean|string|...', {jsdoc: true}), {
//           types: [
//             { name: 'boolean' },
//             { name: 'string' }
//           ],
//           variable: true
//         });

//         assert.deepEqual(comments.parse('(boolean|string)...', {jsdoc: true}), {
//           types: [
//             { name: 'boolean' },
//             { name: 'string' }
//           ],
//           variable: true
//         });

//         assert.deepEqual(comments.parse('(boolean|...|string)', {jsdoc: true}), {
//           types: [
//             { name: 'boolean' },
//             { name: 'string' }
//           ],
//           variable: true
//         });

//         assert.deepEqual(comments.parse('(boolean|string|...)', {jsdoc: true}), {
//           types: [
//             { name: 'boolean' },
//             { name: 'string' }
//           ],
//           variable: true
//         });
//       });

//       it('should set variable to "true" when an argument has ...', () => {
//         assert.deepEqual(comments.parse('boolean...', {jsdoc: true}), {
//           types: [
//             { name: 'boolean' }
//           ],
//           variable: true
//         });

//         assert.deepEqual(comments.parse('...number', {jsdoc: true}), {
//           types: [
//             { name: 'number' }
//           ],
//           variable: true
//         });

//         assert.deepEqual(comments.parse('...number|string', {jsdoc: true}), {
//           types: [
//             { name: 'number' },
//             { name: 'string' }
//           ],
//           variable: true
//         });
//       });
//     });
//   });

//   describe('errors', () => {
//     it('should throw when a paren is unclosed', () => {
//       assert.throws(function() {
//         comments.parse('(boolean=|string');
//       }, /unclosed paren: \(boolean=\|string/);
//     });
//   });
// });

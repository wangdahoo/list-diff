const { listDiff, applyPatches, SimpleTinker } = require('../dist/list-diff')

const tinker = new SimpleTinker()

const a = ['1', '2', '3', '4', '5']
const b = ['a', 'b', '4', 'c', '2', 'd', 'e']

let patches = listDiff(a, b)
console.log(patches)

// output:
// [ { type: 'DELETE', id: '1' },
//   { type: 'ADD', id: 'a', after: '' },
//   { type: 'ADD', id: 'b', after: 'a' },
//   { type: 'REPOSITION', id: '2', moves: 3 },
//   { type: 'DELETE', id: '3' },
//   { type: 'ADD', id: 'c', after: '4' },
//   { type: 'DELETE', id: '5' },
//   { type: 'ADD', id: 'd', after: '2' },
//   { type: 'ADD', id: 'e', after: 'd' } ]

console.log(applyPatches(a, patches, tinker))

// output:
// [ 'a', 'b', '4', 'c', '2', 'd', 'e' ]

patches = listDiff(b, a)
console.log(patches)

// output:
// [ { type: 'DELETE', id: 'a' },
//   { type: 'ADD', id: '1', after: '' },
//   { type: 'DELETE', id: 'b' },
//   { type: 'REPOSITION', id: '2', moves: -2 },
//   { type: 'ADD', id: '3', after: '2' },
//   { type: 'REPOSITION', id: '4', moves: 1 },
//   { type: 'DELETE', id: 'c' },
//   { type: 'ADD', id: '5', after: '4' },
//   { type: 'DELETE', id: 'd' },
//   { type: 'DELETE', id: 'e' } ]

console.log(applyPatches(b, patches, tinker))

// output:
// ['1', '2', '3', '4', '5']

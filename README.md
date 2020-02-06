# list-diff

> A List-Diff Algorithm. Useful in Dom Diff.

## Installation

```bash
npm i @wangdahoo/list-diff
```

## Usage

```js
const { listDiff, applyPatches } = require('@wangdahoo/list-diff')

const a = ['1', '2', '3', '4', '5']
const b = ['a', 'b', '4', 'c', '2', 'd', 'e']

let patches = listDiff(a, b)
console.log(patches)

// output:
// [ { type: 'DELETE', id: '1' },
//   { type: 'DELETE', id: '3' },
//   { type: 'DELETE', id: '5' },
//   { type: 'REPOSITION', id: '4', after: '' },
//   { type: 'REPOSITION', id: '2', after: '4' },
//   { type: 'ADD', id: 'a', after: '' },
//   { type: 'ADD', id: 'b', after: 'a' },
//   { type: 'ADD', id: 'c', after: '4' },
//   { type: 'ADD', id: 'd', after: '2' },
//   { type: 'ADD', id: 'e', after: 'd' } ]

console.log(applyPatches(a, patches))

// output:
// [ 'a', 'b', '4', 'c', '2', 'd', 'e' ]

patches = listDiff(b, a)
console.log(patches)

// output:
// [ { type: 'DELETE', id: 'a' },
//   { type: 'DELETE', id: 'b' },
//   { type: 'DELETE', id: 'c' },
//   { type: 'DELETE', id: 'd' },
//   { type: 'DELETE', id: 'e' },
//   { type: 'REPOSITION', id: '2', after: '' },
//   { type: 'REPOSITION', id: '4', after: '2' },
//   { type: 'ADD', id: '1', after: '' },
//   { type: 'ADD', id: '3', after: '2' },
//   { type: 'ADD', id: '5', after: '4' } ]

console.log(applyPatches(b, patches))

// output:
// ['1', '2', '3', '4', '5']
```

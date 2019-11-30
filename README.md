# list-diff

> Algorithm to diff two string array.

## Usage

```js
import { listDiff, applyPatches, SimpleTinker } from 'list-diff'

const a = ['1', '2', '3', '4', '5']
const b = ['a', 'b', '4', 'c', '2', 'd', 'e']

const patches = listDiff(a, b)
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

const tinker = new SimpleTinker()
console.log(applyPatches(a, patches, tinker))

// output:
// [ 'a', 'b', '4', 'c', '2', 'd', 'e' ]
```

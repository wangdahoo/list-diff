import 'mocha'
import * as should from 'should'
import { listDiff, Patch, PatchType, Tinker, applyPatches } from '../src/index'

const getCount = (patches: Patch[], type: PatchType) => patches.filter(p => p.type === type).length

class MyTinker implements Tinker {
    applyAdditon (input: string[], patch: Patch): string[] {
        if (patch.type !== PatchType.ADD) return input

        const { id, after } = patch
        if (typeof after !== 'string') {

            let afterIndex = -1
            for (let i = after.length - 1; i > 0; i--) {
                afterIndex = input.indexOf(after[i])
                if (afterIndex > -1) break
            }

            return [...input.slice(0, afterIndex + 1), id, ...input.slice(afterIndex + 1)]
        }

        if (after === '') {
            return [id, ...input]
        }

        const afterIndex = input.indexOf(after)
        return [...input.slice(0, afterIndex + 1), id, ...input.slice(afterIndex + 1)]
    }

    applyDeletion (input: string[], patch: Patch): string[] {
        if (patch.type !== PatchType.DELETE) return input

        const { id } = patch
        const deleteIndex = input.indexOf(id)
        input.splice(deleteIndex, 1)
        return input
    }

    applyRepostion (input: string[], patch: Patch): string[] {
        if (patch.type !== PatchType.REPOSITION) return input

        const { id, moves } = patch
        const fromIndex = input.indexOf(id)
        const toIndex = fromIndex + moves
        input.splice(fromIndex, 1)
        return [...input.slice(0, toIndex), id, ...input.slice(toIndex)]
    }
}

const myTinker = new MyTinker()

describe('list-diff 测试', function () {
    it('用例 - 交换两个元素', function () {
        const a = ['foo', 'bar']
        const b = ['bar', 'foo']
        const patches: Patch[] = listDiff(a, b)

        should(getCount(patches, PatchType.REPOSITION)).be.equal(1)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())
    })

    it('用例 - 反转', function () {
        const a = ['1', '2', '3', '4', '5']
        const b = ['1', '2', '3', '4', '5'].reverse()
        const patches: Patch[] = listDiff(a, b)
        should(patches.length).be.equal(4)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())
    })

    it('用例 - 增加元素', function () {
        let a: string[]
        let b: string[]
        let patches: Patch[]

        a = []
        b = ['2', '3']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.ADD)).be.equal(2)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())

        a = ['2', '3']
        b = ['1', '2', '3', '4', '5']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.ADD)).be.equal(3)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())

        a = ['2', '3', '5', '7']
        b = ['1', '2', '3', '4', '5', '6', '7', '8']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.ADD)).be.equal(4)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())
    })

    it('用例 - 删除元素', function () {
        let a: string[]
        let b: string[]
        let patches: Patch[]

        a = ['1', '2', '3', '4', '5']
        b = []
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(5)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())

        a = ['1', '2', '3', '4', '5']
        b = ['1', '3', '5']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(2)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())

        a = ['1', '2', '3', '4', '5']
        b = ['2', '5']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(3)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())
    })

    it('用例 - 增加、删除元素', function () {
        let a: string[]
        let b: string[]
        let patches: Patch[]

        a = ['1', '2', '3', '4', '5']
        b = ['1', 'a', 'b', '3', '5', 'c']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(2)
        should(getCount(patches, PatchType.ADD)).be.equal(3)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())

        a = ['1', '2', '3', '4', '5']
        b = ['a', 'b', '2', 'c', '4', 'd', 'e']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(3)
        should(getCount(patches, PatchType.ADD)).be.equal(5)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())
    })

    it('用例 - 增加、删除、移动元素', function () {
        let a: string[]
        let b: string[]
        let patches: Patch[]

        a = ['1', '2', '3', '4', '5']
        b = ['3', 'a', 'b', '5', '1', 'c']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(2)
        should(getCount(patches, PatchType.ADD)).be.equal(3)
        should(getCount(patches, PatchType.REPOSITION)).be.equal(2)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())

        a = ['1', '2', '3', '4', '5']
        b = ['a', 'b', '4', 'c', '2', 'd', 'e']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(3)
        should(getCount(patches, PatchType.ADD)).be.equal(5)
        should(getCount(patches, PatchType.REPOSITION)).be.equal(1)
        should(applyPatches(a, patches, myTinker).join()).be.equal(b.join())
    })
})

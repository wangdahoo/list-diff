import 'mocha'
import * as should from 'should'
import { listDiff, Patch, PatchType, SimpleTinker, applyPatches } from '../src/index'

const getCount = (patches: Patch[], type: PatchType) => patches.filter(p => p.type === type).length

const myTinker = new SimpleTinker()

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

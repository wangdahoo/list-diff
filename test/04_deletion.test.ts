import 'mocha'
import * as should from 'should'
import { listDiff, Patch, PatchType, applyPatches } from '../src/index'
import { getCount } from './util'

describe('删除元素测试', function () {
    it('用例 - 删除元素', function () {
        let a: string[]
        let b: string[]
        let patches: Patch[]

        a = ['1', '2', '3', '4', '5']
        b = []
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(5)
        should(applyPatches(a, patches).join()).be.equal(b.join())

        a = ['1', '2', '3', '4', '5']
        b = ['1', '3', '5']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(2)
        should(applyPatches(a, patches).join()).be.equal(b.join())

        a = ['1', '2', '3', '4', '5']
        b = ['2', '5']
        patches = listDiff(a, b)
        should(getCount(patches, PatchType.DELETE)).be.equal(3)
        should(applyPatches(a, patches).join()).be.equal(b.join())
    })
})

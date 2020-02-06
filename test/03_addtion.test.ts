import 'mocha'
import * as should from 'should'
import { listDiff, Patch, PatchType, applyPatches } from '../src/index'
import { getCount } from './util'

describe('增加元素测试', function () {
    it('用例 - 向空数组增加2个元素', function () {
        const a: string[] =  []
        const b: string[] = ['2', '3']
        const patches: Patch[] = listDiff(a, b)

        should(getCount(patches, PatchType.ADD)).be.equal(2)
        should(applyPatches(a, patches).join()).be.equal(b.join())
    })

    it('用例 - 从2个元素以向前向后插入的方式增加到5个元素', function () {
        const a: string[] = ['2', '3']
        const b: string[] = ['1', '2', '3', '4', '5']
        const patches: Patch[] = listDiff(a, b)

        should(getCount(patches, PatchType.ADD)).be.equal(3)
        should(applyPatches(a, patches).join()).be.equal(b.join())
    })

    it('用例 - 从4个元素按随机插入的方式增加到8个元素', function () {
        const a: string[] = ['2', '3', '5', '7']
        const b: string[] =['1', '2', '3', '4', '5', '6', '7', '8']
        const patches: Patch[] = listDiff(a, b)

        should(getCount(patches, PatchType.ADD)).be.equal(4)
        should(applyPatches(a, patches).join()).be.equal(b.join())
    })
})

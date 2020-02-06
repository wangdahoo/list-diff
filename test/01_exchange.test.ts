import 'mocha'
import * as should from 'should'
import { listDiff, Patch, PatchType, applyPatches } from '../src/index'
import { getCount } from './util'

describe('交换测试', function () {
    it('用例 - 交换两个元素', function () {
        const a = ['foo', 'bar']
        const b = ['bar', 'foo']
        const patches: Patch[] = listDiff(a, b)

        // console.log(patches)
        should(getCount(patches, PatchType.REPOSITION)).be.equal(2)
        should(applyPatches(a, patches).join()).be.equal(b.join())
    })
})

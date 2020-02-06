import 'mocha'
import * as should from 'should'
import { listDiff, Patch, applyPatches } from '../src/index'

describe('反转测试', function () {
    it('用例 - 反转', function () {
        const a = ['1', '2', '3', '4', '5']
        const b = ['5', '4', '3', '2', '1']
        const patches: Patch[] = listDiff(a, b)

        // console.log(a)
        // console.log(b)
        // console.log(patches)

        should(patches.length).be.equal(4)
        should(applyPatches(a, patches).join()).be.equal(b.join())
    })
})

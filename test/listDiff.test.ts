import 'mocha'
import * as should from 'should'

import listDiff from '../src/index'
import Patch, { PatchType } from '../src/Patch'

describe('list-diff 测试', function () {
    it('用例 1', function () {
        const a = ['foo', 'bar']
        const b = ['bar', 'foo']
        const patches: Patch[] = listDiff(a, b)

        should(patches.length).be.equal(1)
        should(patches.filter((p: Patch) => p.type === PatchType.REPOSITION).length).be.equal(1)
    })
})

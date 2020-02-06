import { Patch, PatchType } from './types'
import { E, difference, intersection } from './utils'

export const listDiff = (a: string[], b: string[]): Patch[] => {
    let patches: Patch[] = []
    const deleted: E<string>[] = difference(a, b)
    const added: E<string>[] = difference(b, a)
    const inter: E<string>[] = intersection(a, b).reverse()

    // 被删除的元素
    patches = deleted.reduce((patches, { value }) => patches.concat([{
        type: PatchType.DELETE,
        id: value
    }]), patches)

    // 移动的元素
    const calAfterForRepostion = (index: number) => {
        while (index > 0 && a.indexOf(b[index - 1]) === -1) {
            index--
        }

        return index > 0 ? b[index - 1] : ''
    }

    patches = inter.reduce((patches, { value, index }) => patches.concat([{
        type: PatchType.REPOSITION,
        id: value,
        after: calAfterForRepostion(index)
    }]), patches)

    // 新增的元素
    patches = added.reduce((patches, { value, index }) => patches.concat([{
        type: PatchType.ADD,
        id: value,
        after: index > 0 ? b[index - 1] : ''
    }]), patches)

    return patches
}

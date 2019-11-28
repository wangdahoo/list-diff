import Patch, { PatchType } from './Patch'
import { E, difference, uniqBy } from './utils'

const listDiff = (a: string[], b: string[]): Patch[] => {
    const patches: Patch[] = []
    const deleted: E<string>[] = difference(a, b)
    const added: E<string>[] = difference(a, b)
    const repo: string[] = []

    const getMoves = (i: number, j: number): number => {
        const deletedCount = deleted.filter((d: E<string>) => d.index <= j).length
        const addedCount = added.filter((d: E<string>) => d.index <= j).length

        return j - i + deletedCount - addedCount
    }

    /**
     * 基于最小编辑距离算法原理的 list-diff
     * @description
     * 令 a' = a.slice(i)，b' = b.slice(j)
     * 求 a' -> b' 的编辑距离
     * @param a
     * @param i start index of a
     * @param b
     * @param j start index of b
     */
    function _ (a: string[], i: number, b: string[], j: number) {
        if (i === a.length) {
            const _added: string[] = added.map((d: E<string>) => d.value)

            patches.push(
                ...b
                    .slice(j)
                    .filter(id => _added.indexOf(id) > -1)
                    .map(id => ({
                        type: PatchType.ADD,
                        id
                    }))
            )

            return
        }

        if (j === b.length) {
            const _deleted = deleted.map(d => d.value)
            patches.push(
                ...a
                    .slice(i)
                    .filter(id => _deleted.indexOf(id) > -1)
                    .map(id => ({
                        type: PatchType.DELETE,
                        id
                    }))
            )

            return
        }

        // 检查 a' 和 b' 的首个元素是否相同
        if (a[i] !== b[j]) {
            // 检查是否删除了 a[i]
            const aPos = b.indexOf(a[i])
            if (aPos === -1) {
                // 删除了 a[i]
                patches.push({
                    type: PatchType.DELETE,
                    id: a[i]
                })
            }

            // 检查是否增加了 b[j]
            const bPos = a.indexOf(b[j])
            if (bPos === -1) {
                // 增加了 b[j]
                patches.push({
                    type: PatchType.ADD,
                    id: b[j]
                })
            }

            const repoPatches: Patch[] = []

            if (aPos > -1 && repo.indexOf(a[i]) === -1) {
                // 如果 a[i] 没有被删除，则计算其移动的距离
                const moves = getMoves(i, aPos)

                if (moves !== 0) {
                    repoPatches.push({
                        type: PatchType.REPOSITION,
                        id: a[i],
                        moves,
                        step: [i, aPos].sort().join('->')
                    })

                    repo.push(a[i])
                }
            }

            if (bPos > -1 && repo.indexOf(b[j]) === -1) {
                // 如果 b[j] 没有被删除，则计算其移动的距离
                const moves = getMoves(bPos, j)

                if (moves !== 0) {
                    repoPatches.push({
                        type: PatchType.REPOSITION,
                        id: b[j],
                        moves,
                        step: [bPos, j].sort().join('->')
                    })

                    repo.push(b[j])
                }
            }

            patches.push(...uniqBy(repoPatches, 'step'))
        }

        _(a, i + 1, b, j + 1)
    }

    _(a, 0, b, 0)

    return patches
}

export default listDiff

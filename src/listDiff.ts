import { Patch, PatchType, Reposition } from './types'
import { E, difference } from './utils'

export const listDiff = (a: string[], b: string[]): Patch[] => {
    const patches: Patch[] = []
    const deleted: E<string>[] = difference(a, b)
    const added: E<string>[] = difference(b, a)
    const repoHistory: Reposition[] = []

    const getMoves = (i: number, j: number): number => {
        const deletedCount = deleted.filter((d: E<string>) => d.index <= j).length
        const addedCount = added.filter((d: E<string>) => d.index <= j).length
        const removeBeforeCount = repoHistory.filter((r: Reposition) => r.from < i && r.to > j).length
        const insertBeforeCount = repoHistory.filter((r: Reposition) => r.from > j && r.to < i).length

        return j - i + deletedCount - addedCount + removeBeforeCount - insertBeforeCount
    }

    const hasRepositioned = (id: string) => {
        return repoHistory.filter((r: Reposition) => r.id === id).length > 0
    }

    /**
     * 基于最小编辑距离算法原理的 list-diff
     * @description
     * 令 a' = a.slice(0)，b' = b.slice(0)
     * 求 a' -> b' 的编辑距离
     * @param a
     * @param i start index of a
     * @param b
     * @param j start index of b
     */
    function _ (a: string[], i: number, b: string[], j: number) {
        if (i === a.length) {
            const _added: string[] = added.map((d: E<string>) => d.value)

            const tail = b.slice(j)
            const toAdd = tail.filter(id => _added.indexOf(id) > -1)

            patches.push(
                ...toAdd.reduce((patches: Patch[], id: string) => {
                    const index = tail.indexOf(id)

                    const after = index === 0
                        ? (j > 0 ? b[j - 1] : '')
                        : tail[index - 1]

                    return patches.concat([{
                        type: PatchType.ADD,
                        id,
                        after
                    }])
                }, [])
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
        const aHead = a[i]
        const bHead = b[j]

        if (aHead !== bHead) {
            // 检查是否删除了 aHead
            const aHeadPos = b.indexOf(aHead)
            if (aHeadPos === -1) {
                // 删除了 aHead
                patches.push({
                    type: PatchType.DELETE,
                    id: aHead
                })
            }

            // 检查是否增加了 bHead
            const bHeadPos = a.indexOf(bHead)
            if (bHeadPos === -1) {
                // 增加了 bHead
                patches.push({
                    type: PatchType.ADD,
                    id: bHead,
                    after: j > 0 ? b[j - 1] : ''
                })
            }

            const repoPatches: Patch[] = []

            if (aHeadPos > -1) {
                if (!hasRepositioned(aHead)) {
                    const r: Reposition = {
                        id: aHead,
                        from: i,
                        to: aHeadPos
                    }

                    // 如果 aHead 没有被删除，也没有移动过，则计算其移动的距离
                    const moves = getMoves(i, aHeadPos)

                    if (moves !== 0) {
                        repoPatches.push({
                            type: PatchType.REPOSITION,
                            id: aHead,
                            moves
                        })

                        repoHistory.push(r)
                    }
                }
            }

            if (bHeadPos > -1) {
                if (!hasRepositioned(bHead)) {
                    const r: Reposition = {
                        id: bHead,
                        from: bHeadPos,
                        to: j
                    }

                    // 如果 bHead 没有被删除，也没有移动过，则计算其移动的距离
                    const moves = getMoves(bHeadPos, j)

                    if (moves !== 0) {
                        repoPatches.push({
                            type: PatchType.REPOSITION,
                            id: bHead,
                            moves
                        })

                        repoHistory.push(r)
                    }
                }
            }

            patches.push(...repoPatches)
        }

        _(a, i + 1, b, j + 1)
    }

    _(a, 0, b, 0)

    return patches
}

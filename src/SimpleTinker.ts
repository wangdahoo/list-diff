import { Tinker, Patch, PatchType } from './types'

export class SimpleTinker implements Tinker {
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
        return [...input.slice(0, deleteIndex), ...input.slice(deleteIndex + 1)]
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

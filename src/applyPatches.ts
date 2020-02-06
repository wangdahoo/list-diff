import { Patch, PatchType, Tinker } from './types'

export const applyPatches = (input: string[], patches: Patch[], tinker: Tinker = new SimpleTinker()) => {
    let output: string[] = input

    for (let i = 0; i < patches.length; i++) {
        const patch = patches[i]

        switch (patch.type) {
        case PatchType.ADD:
            output = tinker.applyAdditon(output, patch)
            break
        case PatchType.DELETE:
            output = tinker.applyDeletion(output, patch)
            break
        case PatchType.REPOSITION:
            output = tinker.applyRepostion(output, patch)
        }
    }

    return output
}

export class SimpleTinker implements Tinker {
    applyDeletion (input: string[], patch: Patch): string[] {
        if (patch.type !== PatchType.DELETE) return input

        const { id } = patch
        return input.filter(i => i !== id)
    }

    applyRepostion (input: string[], patch: Patch): string[] {
        if (patch.type !== PatchType.REPOSITION) return input

        const { id, after } = patch

        if (after === '') {
            if (input[0] === id) return input
            input = input.filter(i => i !== id)
            return [id, ...input]
        } else {
            const index = input.indexOf(id)
            if (input[index - 1] === after) return input // 该元素前面的元素已经是 after 了

            return input.reduce((output, i) => {
                if (i !== id) {
                    output.push(i)
                    if (i === after) output.push(id)
                }

                return output
            }, [])
        }
    }

    applyAdditon (input: string[], patch: Patch): string[] {
        if (patch.type !== PatchType.ADD) return input

        const { id, after } = patch
        if (after === '') return [id, ...input]
        const index = input.indexOf(after)
        return [...input.slice(0, index + 1), id, ...input.slice(index + 1)]
    }
}

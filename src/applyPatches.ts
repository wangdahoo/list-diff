import { Patch, PatchType, Tinker } from './types'

export const applyPatches = (input: string[], patches: Patch[], tinker: Tinker) => {
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

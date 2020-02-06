import { Patch, PatchType } from '../src/index'

export const getCount = (patches: Patch[], type: PatchType) => patches.filter(p => p.type === type).length

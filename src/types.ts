export enum PatchType {
    ADD = 'ADD',
    DELETE = 'DELETE',
    REPOSITION = 'REPOSITION'
}

export type Patch = {
    type: PatchType,
    id: string,
    moves?: number
}

export type Reposition = {
    id: string,
    from: number,
    to: number
}

export interface Tinker {
    applyAdditon (input: string[], addtionPatch: Patch): string[];
    applyDeletion (input: string[], deletionPatch: Patch): string[];
    applyRepostion (input: string[], repositionpPatch: Patch): string[];
}

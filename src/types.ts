export enum PatchType {
    ADD = 'ADD',
    DELETE = 'DELETE',
    REPOSITION = 'REPOSITION'
}

export type Patch = {
    type: PatchType,
    id: string,
    after?: string
}

export interface Tinker {
    applyDeletion (input: string[], deletionPatch: Patch): string[];
    applyRepostion (input: string[], repositionpPatch: Patch): string[];
    applyAdditon (input: string[], addtionPatch: Patch): string[];
}

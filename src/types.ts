export enum PatchType {
    ADD = 'ADD',
    DELETE = 'DELETE',
    REPOSITION = 'REPOSITION',
    PROPERTIES = 'PROPERTIES'
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

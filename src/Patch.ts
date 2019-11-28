export enum PatchType {
    ADD = 'ADD',
    DELETE = 'DELETE',
    REPOSITION = 'REPOSITION',
    PROPERTIES = 'PROPERTIES'
}

type Patch = {
    type: PatchType,
    id: string,
    moves?: number,
    step?: string
}

export default Patch

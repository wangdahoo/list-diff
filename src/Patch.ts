export enum PatchType {
    ADD = 1,
    DELETE = 2,
    REPOSITION = 3,
    PROPERTIES = 4
}

type Patch = {
    type: PatchType,
    id: string,
    moves?: number,
    step?: string
}

export default Patch

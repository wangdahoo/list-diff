export type E<T> = {
    value: T,
    index: number
}

export const difference = <T> (a: T[], b: T[]): E<T>[] =>
    a.reduce(
        (r: E<T>[], value: T, index: number) =>
            r.concat(
                b.indexOf(value) === -1
                    ? [{
                        value,
                        index
                    }] : []
            ),
        []
    )

export const uniqBy = <T> (arr: T[], f: string): T[] => {
    const r = []
    const m: any = {}

    for (let i = 0; i < arr.length; i++) {
        const a: any = arr[i]
        const k = a[f]

        if (m[k] !== 1) {
            m[k] = 1
            r.push(a)
        }
    }

    return r
}

export const pick = (source: any, fileds: string[]) =>
    fileds.reduce(
        (result: any, field: string) => ({
            ...result,
            ...(source[field] ? { [field]: source[field] } : {})
        }),
        {}
    )

export const omit = (source: any, fields: string[]) =>
    pick(
        source,
        Object.keys(source).filter(k => fields.indexOf(k) === -1)
    )

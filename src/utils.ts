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

export const intersection = <T> (a: T[], b: T[]): E<T>[] =>
    a.reduce(
        (r: E<T>[], value: T, index: number) => {
            const bIndex = b.indexOf(value)

            return r.concat(
                bIndex > -1 && bIndex != index
                    ? [{
                        value,
                        index: bIndex
                    }] : []
            )
        },
        []
    )

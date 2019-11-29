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

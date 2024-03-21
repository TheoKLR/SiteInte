interface data {
    value: number
}

export const toArray = (json: any[]) => {
    let result: number[] = []
    json.map((i: data) => result.push(i.value))
    return result
}

export const toId = (json: any) => {
    return json.value
}
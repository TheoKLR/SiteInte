interface obj {
    id: number
}

export const toIdArray = (objs: any[]) => {
    return objs.map((i: obj) => i.id)
}

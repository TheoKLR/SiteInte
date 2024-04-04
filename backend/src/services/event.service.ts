import { eventSchema, Event } from "../schemas/event.schema"
import { db } from "../database/db"
import { eq } from 'drizzle-orm'

export const createEvent = async (name: string) => {
    const newEvent: Event = { name, state: false }
    await db.insert(eventSchema).values(newEvent)
}

export const startEvent = async (id: number) => {
    await db.update(eventSchema)
        .set({ state: true })
        .where(eq(eventSchema.id, id))
}

export const finishEvent = async (id: number) => {
    await db.update(eventSchema)
        .set({ state: false })
        .where(eq(eventSchema.id, id))
}

export const activeEvents = async () => {
    return await db.select()
        .from(eventSchema)
        .where(eq(eventSchema.state, true))

}

export const inactiveEvents = async () => {
    return await db.select()
        .from(eventSchema)
        .where(eq(eventSchema.state, false))
}
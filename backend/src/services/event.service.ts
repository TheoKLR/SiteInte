import { eventSchema, Event } from "../schemas/event.schema"
import { db } from "../database/db"
import { eq } from 'drizzle-orm'
export const createEvent = async (name: string) => {
    const newEvent: Event = { name, state: false };
    try {
        await db.insert(eventSchema).values(newEvent);
    } catch (error) {
        throw new Error("Failed to create event. Please try again later.");
    }
}

export const startEvent = async (id: number) => {
    try {
        await db.update(eventSchema)
            .set({ state: true })
            .where(eq(eventSchema.id, id));
    } catch (error) {
        throw new Error("Failed to start event. Please try again later.");
    }
}

export const finishEvent = async (id: number) => {
    try {
        await db.update(eventSchema)
            .set({ state: false })
            .where(eq(eventSchema.id, id));
    } catch (error) {
        throw new Error("Failed to finish event. Please try again later.");
    }
}

export const activeEvents = async () => {
    try {
        return await db.select()
            .from(eventSchema)
            .where(eq(eventSchema.state, true));
    } catch (error) {
        throw new Error("Failed to fetch active events. Please try again later.");
    }
}

export const inactiveEvents = async () => {
    try {
        return await db.select()
            .from(eventSchema)
            .where(eq(eventSchema.state, false));
    } catch (error) {
        throw new Error("Failed to fetch inactive events. Please try again later.");
    }
}

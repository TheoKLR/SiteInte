import { db } from "./db"
import { eventSchema } from "../schemas/event.schema"

export const init = async () => {
    try {
        await db.insert(eventSchema).values({name: "PreInscription", state: false})
        await db.insert(eventSchema).values({name: "ShotgunCE", state: false})
        await db.insert(eventSchema).values({name: "ShotgunPerm", state: false})
        await db.insert(eventSchema).values({name: "Barbecue", state: false})
    } catch {
        console.log("event already implemented")
    }
}

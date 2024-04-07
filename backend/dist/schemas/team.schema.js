"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const faction_schema_1 = require("./faction.schema");
exports.teamSchema = (0, pg_core_1.pgTable)('team', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    isOfficial: (0, pg_core_1.boolean)('isOfficial').notNull(),
    timeCode: (0, pg_core_1.timestamp)('timeCode'),
    name: (0, pg_core_1.text)('team_name').notNull().unique(),
    faction: (0, pg_core_1.integer)('city_id').references(() => faction_schema_1.factionSchema.id)
});
//# sourceMappingURL=team.schema.js.map
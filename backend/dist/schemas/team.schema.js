"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const faction_schema_1 = require("./faction.schema");
exports.teamSchema = (0, pg_core_1.pgTable)('team', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('team_name').notNull(),
    faction: (0, pg_core_1.integer)('city_id').references(() => faction_schema_1.factionSchema.id)
});
//# sourceMappingURL=team.schema.js.map
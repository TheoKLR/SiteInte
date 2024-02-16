"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factionSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.factionSchema = (0, pg_core_1.pgTable)('faction', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('team_name').notNull(),
    points: (0, pg_core_1.integer)('points').notNull()
});
//# sourceMappingURL=faction.schema.js.map
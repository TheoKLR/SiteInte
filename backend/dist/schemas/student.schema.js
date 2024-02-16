"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentSchema = exports.role = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const team_schema_1 = require("./team.schema");
exports.role = (0, pg_core_1.pgEnum)('role', ['admin1', 'admin2']);
exports.studentSchema = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    first_name: (0, pg_core_1.text)("first_name").notNull(),
    last_name: (0, pg_core_1.text)("last_name").notNull(),
    email: (0, pg_core_1.text)("email").notNull(),
    password: (0, pg_core_1.text)("password"),
    role: (0, exports.role)('role'),
    team: (0, pg_core_1.integer)('team').references(() => team_schema_1.teamSchema.id)
});
//# sourceMappingURL=student.schema.js.map
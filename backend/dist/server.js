"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const student_routes_1 = __importDefault(require("./routes/student.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const faction_routes_1 = __importDefault(require("./routes/faction.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/student', student_routes_1.default);
app.use('/team', team_routes_1.default);
app.use('/faction', faction_routes_1.default);
app.listen(8000, () => {
    console.log(`Server is running...`);
});
//# sourceMappingURL=server.js.map
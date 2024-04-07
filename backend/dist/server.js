"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const faction_routes_1 = __importDefault(require("./routes/faction.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const role_routes_1 = require("./routes/role.routes");
const event_routes_1 = __importDefault(require("./routes/event.routes"));
const permissions_1 = require("./middlewares/permissions");
const init_1 = require("./database/init");
async function startServer() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: '*' }));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use('/auth', auth_routes_1.default);
    app.use(permissions_1.isTokenValid);
    app.use('/user', user_routes_1.default);
    app.use('/team', team_routes_1.default);
    app.use('/faction', faction_routes_1.default);
    app.use('/role', role_routes_1.roleRouter);
    app.use('/event', event_routes_1.default);
    app.use('/wish', role_routes_1.wishRouter);
    await (0, init_1.init)();
    app.listen(8000, () => {
        console.log(`Server is running...`);
    });
}
startServer().catch(err => {
    console.error('Error starting server:', err);
});
//# sourceMappingURL=server.js.map
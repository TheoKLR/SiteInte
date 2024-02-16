"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchingError = exports.serviceError = void 0;
const response_1 = require("./response");
const serviceError = (res, error) => {
    console.error('Error:', error);
    res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, "bad request"));
};
exports.serviceError = serviceError;
const fetchingError = (res, msg) => {
    res.status(response_1.Code.BAD_REQUEST).json(new response_1.HttpResponse(response_1.Code.BAD_REQUEST, msg));
};
exports.fetchingError = fetchingError;
//# sourceMappingURL=error.js.map
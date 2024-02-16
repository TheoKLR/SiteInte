"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.Code = void 0;
var Code;
(function (Code) {
    Code[Code["OK"] = 200] = "OK";
    Code[Code["NOT_FOUND"] = 404] = "NOT_FOUND";
    Code[Code["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    Code[Code["CREATED"] = 201] = "CREATED";
    Code[Code["ISE"] = 500] = "ISE";
})(Code || (exports.Code = Code = {}));
class HttpResponse {
    statusCode;
    message;
    data;
    timeStamp;
    httpStatus;
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.timeStamp = new Date().toLocaleString();
        this.statusCode = statusCode;
        this.httpStatus = this.getStatus();
        this.message = message;
        this.data = data;
    }
    getStatus() {
        switch (this.statusCode) {
            case Code.OK:
                return 'OK';
            case Code.NOT_FOUND:
                return 'NOT_FOUND';
            case Code.BAD_REQUEST:
                return 'BAD_REQUEST';
            case Code.CREATED:
                return 'CREATED';
            case Code.ISE:
                return 'INTERNAL_SERVER_ERROR';
        }
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=response.js.map
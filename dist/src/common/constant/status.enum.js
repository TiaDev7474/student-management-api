"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStatus = void 0;
var AppStatus;
(function (AppStatus) {
    AppStatus[AppStatus["created"] = 201] = "created";
    AppStatus[AppStatus["updated"] = 201] = "updated";
    AppStatus[AppStatus["not_found"] = 404] = "not_found";
    AppStatus[AppStatus["success"] = 200] = "success";
    AppStatus[AppStatus["failed"] = 500] = "failed";
})(AppStatus || (exports.AppStatus = AppStatus = {}));

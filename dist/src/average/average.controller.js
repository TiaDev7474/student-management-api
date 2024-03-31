"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const average_service_1 = require("./average.service");
const averageController = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield average_service_1.averageService.getAll();
        return res.status(data.status).json(data);
    }),
    getMinMaxAverage: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield average_service_1.averageService.getMinMaxAverage();
        return res.status(data.status).json(data);
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { average_id } = req.params;
        const updatedAverage = req.body;
        const data = yield average_service_1.averageService.update(updatedAverage, average_id);
        return res.status(data.status).json(data);
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { average_id } = req.params;
        const data = yield average_service_1.averageService.delete(average_id);
        return res.status(data.status).json(data);
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const average = req.body;
        const data = yield average_service_1.averageService.create(average);
        return res.status(data.status).json(data);
    }),
};
exports.default = averageController;

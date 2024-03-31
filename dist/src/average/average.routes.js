"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const average_controller_1 = __importDefault(require("./average.controller"));
const averageRoutes = require('express').Router();
averageRoutes.get('/averages', average_controller_1.default.getAll);
averageRoutes.get('/averages/min-max', average_controller_1.default.getMinMaxAverage);
averageRoutes.delete('/averages/:average_id', average_controller_1.default.delete);
averageRoutes.post('/averages', average_controller_1.default.create);
averageRoutes.put('/averages/:average_id', average_controller_1.default.update);
exports.default = averageRoutes;

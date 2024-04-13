"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_controller_1 = __importDefault(require("./student.controller"));
const studentRoutes = require('express').Router();
studentRoutes.get('/students', student_controller_1.default.getAll);
studentRoutes.delete('/students/:id', student_controller_1.default.delete);
studentRoutes.post('/students', student_controller_1.default.create);
studentRoutes.put('/students/:id', student_controller_1.default.update);
exports.default = studentRoutes;

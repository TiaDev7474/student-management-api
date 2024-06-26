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
const student_service_1 = require("./student.service");
const studentController = {
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { limit = 5, page = 0 } = req.query;
        const data = yield student_service_1.studentService.getAll(parseInt(String(limit)), parseInt(String(page)));
        return res.status(data.status).json(data);
    }),
    delete: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield student_service_1.studentService.delete(id);
        return res.status(data.status).json(data);
    }),
    create: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const student = req.body;
        const data = yield student_service_1.studentService.create(student);
        return res.status(data.status).json(data);
    }),
    update: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const student = req.body;
        console.log(student);
        const { id } = req.params;
        const data = yield student_service_1.studentService.update(student, id);
        return res.status(data.status).json(data);
    }),
};
exports.default = studentController;

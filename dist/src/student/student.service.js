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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const status_enum_1 = require("../common/constant/status.enum");
const uuid_1 = require("uuid");
const prisma_client_1 = __importDefault(require("../../prisma/prisma_client"));
class StudentService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.prisma = prismaClient;
    }
    getAll(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const students = yield this.prisma.student.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        average: true
                    }
                });
                const totalStudents = yield this.prisma.student.count();
                const totalPages = Math.ceil(totalStudents / limit);
                return {
                    status: status_enum_1.AppStatus.success,
                    data: students,
                    meta: {
                        totalPages: totalPages
                    }
                };
            }
            catch (e) {
                return {
                    status: status_enum_1.AppStatus.failed,
                    message: e.toString()
                };
            }
        });
    }
    create(studentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStudent = yield this.prisma.student.create({
                    data: {
                        id: (0, uuid_1.v4)(),
                        firstname: studentDto.firstname,
                        lastname: studentDto.lastname,
                    }
                });
                return {
                    status: status_enum_1.AppStatus.created,
                    data: newStudent
                };
            }
            catch (e) {
                return {
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
    update(studentDto, student_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newStudent = yield this.prisma.student.update({
                    where: {
                        id: student_id
                    },
                    data: {
                        firstname: studentDto.firstname,
                        lastname: studentDto.lastname,
                    }
                });
                return {
                    status: status_enum_1.AppStatus.updated,
                    data: newStudent
                };
            }
            catch (e) {
                return {
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
    delete(student_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.prisma.student.delete({
                    where: {
                        id: student_id
                    }
                });
                return {
                    status: status_enum_1.AppStatus.updated,
                };
            }
            catch (e) {
                return {
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
}
exports.studentService = new StudentService(prisma_client_1.default);

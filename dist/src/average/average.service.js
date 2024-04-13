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
exports.averageService = void 0;
const uuid_1 = require("uuid");
const status_enum_1 = require("../common/constant/status.enum");
const prisma_client_1 = __importDefault(require("../../prisma/prisma_client"));
class AverageService {
    constructor(prismaClient) {
        this.prismaClient = prismaClient;
        this.prisma = prismaClient;
    }
    create(averageDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('here', averageDto.student);
                const average = yield this.prisma.average.create({
                    data: {
                        id: (0, uuid_1.v4)(),
                        average: averageDto.average,
                        student: { connect: { id: averageDto.student } },
                    }
                });
                return {
                    data: average,
                    status: status_enum_1.AppStatus.created
                };
            }
            catch (e) {
                console.log(e.message);
                return {
                    data: null,
                    message: e.message,
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
    update(averageDto, averageId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const average = yield this.prisma.average.update({
                    where: {
                        id: averageId
                    },
                    data: { average: averageDto.average, }
                });
                return {
                    data: average,
                    status: status_enum_1.AppStatus.updated
                };
            }
            catch (e) {
                console.log(e.message);
                return {
                    data: null,
                    message: e.message,
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
    delete(average_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const average = yield this.prisma.average.delete({
                    where: {
                        id: average_id
                    }
                });
                return {
                    data: average,
                    status: status_enum_1.AppStatus.updated
                };
            }
            catch (e) {
                return {
                    data: null,
                    message: `Error deleting averages with id: ${average_id}`,
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
    getAll(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studentWithAverages = yield this.prisma.student.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    include: {
                        average: true
                    }
                });
                const averageCount = yield this.prisma.student.count();
                const totalPages = Math.ceil(averageCount / limit);
                return {
                    data: studentWithAverages,
                    status: status_enum_1.AppStatus.updated,
                    meta: {
                        totalPages: totalPages
                    }
                };
            }
            catch (e) {
                return {
                    data: null,
                    message: 'Error fetching averages',
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
    getMinMaxAverage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const minMaxAverages = yield this.prisma.average.aggregate({
                    _count: true,
                    _max: {
                        average: true,
                    },
                    _min: { average: true }
                });
                return {
                    data: minMaxAverages,
                    status: status_enum_1.AppStatus.success,
                    message: ""
                };
            }
            catch (error) {
                return {
                    data: null,
                    message: 'Error fetching min and max averages',
                    status: status_enum_1.AppStatus.failed,
                };
            }
        });
    }
}
exports.averageService = new AverageService(prisma_client_1.default);

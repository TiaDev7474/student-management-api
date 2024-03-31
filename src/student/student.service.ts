import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import {ApiResponse} from "../common/types/definitions";
import {AppStatus} from "../common/constant/status.enum";
import {v4 as uuidv4} from 'uuid';
import {IStudent , IStudentDto , IStudents} from "./types/definition";
import prismaClient from "../../prisma/prisma_client";



class StudentService {
    private prisma: PrismaClient;

    constructor(readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient
    }

    public async getAll(): Promise<ApiResponse<IStudent[]>> {
        try{
            const students = await this.prisma.student.findMany();
            return {
                status: AppStatus.success,
                data: students
            }
        } catch (e: any) {
            return {
                status: AppStatus.failed,
                message: e.toString()
            }
        }

    }

    public async create(studentDto: IStudentDto): Promise<ApiResponse<IStudent>> {
        try{
            const newStudent = await this.prisma.student.create({
                data: {
                    id: uuidv4(),
                    firstname: studentDto.firstname,
                    lastname: studentDto.lastname,
                }
            })
            return {
                status: AppStatus.created ,
                data: newStudent
            }
        } catch (e) {
            return {
                status: AppStatus.failed ,
            }
        }


    }
    // @ts-ignore
    public update(studentDto: IStudentDto, student_id: string): Promise<ApiRespons<IStudent>>{

    }
    public async delete(student_id: string): Promise<ApiResponse<any>> {

        try {
            await this.prisma.student.delete({
                where: {
                    id: student_id
                }
            })
            return {
                status: AppStatus.updated ,
            }
        } catch (e) {
            return {
                status: AppStatus.failed ,
            }
        }
    }
}

export const studentService = new StudentService(prismaClient)

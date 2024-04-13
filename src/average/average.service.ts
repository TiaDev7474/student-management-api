import {PrismaClient} from "prisma/prisma-client/scripts/default-index";
import {v4 as uuidv4} from 'uuid';
import {AppStatus} from "../common/constant/status.enum";
import {ApiResponse} from "../common/types/definitions";
import prismaClient from "../../prisma/prisma_client";

interface IAverageDto {
    average: number,
    student: string
}
interface IUpdateAverageDto {
    average: number,
}

interface IAverage {

}
class AverageService {
    private prisma: PrismaClient;

    constructor(readonly prismaClient: PrismaClient) {
        this.prisma = prismaClient
    }
    public async create(averageDto: IAverageDto): Promise<ApiResponse<any>> {
        try{
             console.log('here', averageDto.student);
             const average = await  this.prisma.average.create({
                     data: {
                         id: uuidv4() ,
                         average: averageDto.average ,
                         student: {connect: {id: averageDto.student}} ,
                     }
                 }
             )
            return {
                data: average,
                status: AppStatus.created
            }
        }catch (e: any) {
            console.log(e.message)
            return {
                data: null,
                message: e.message,
                status: AppStatus.failed,
            };
        }

    }
    public async update(averageDto: IUpdateAverageDto, averageId: string): Promise<ApiResponse<any>> {
        try{
            const average = await  this.prisma.average.update({
                where: {
                    id: averageId
                } ,
                data: { average: averageDto.average,}
            })
            return {
                data: average,
                status: AppStatus.updated
            }
        }catch (e: any) {
            console.log(e.message)
            return {
                data: null,
                message: e.message,
                status: AppStatus.failed,
            };
        }

    }
    public  async  delete(average_id: string): Promise<ApiResponse<IAverage>>  {
        try{
            const average = await this.prisma.average.delete({
                where: {
                    id: average_id
                }
            })
            return {
                data: average,
                status: AppStatus.updated
            }
        }catch (e) {
            return {
                data: null,
                message: `Error deleting averages with id: ${average_id}`,
                status: AppStatus.failed,
            };
        }

    }
    public  async getAll(limit: number, page: number): Promise<ApiResponse<IAverage[]>>{
        try{
            const  studentWithAverages = await this.prisma.student.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    average: true
                }
            });
            const averageCount = await this.prisma.student.count();
            const totalPages = Math.ceil(averageCount / limit);
            return {
                data: studentWithAverages,
                status: AppStatus.updated,
                meta: {
                    totalPages: totalPages
                }
            }
        } catch (e) {
            return {
                data: null,
                message: 'Error fetching averages',
                status: AppStatus.failed,
            };
        }

    }
    public  async getMinMaxAverage(): Promise<ApiResponse<{_min: IAverage, _max: IAverage,_count: number} | null>>{
        try {
            const minMaxAverages = await  this.prisma.average.aggregate({
                _count: true,
                _max: {
                    average: true,
                },
                _min: {average: true}
            })
            return {
                data: minMaxAverages,
                status: AppStatus.success,
                message: ""
            };
        } catch (error) {
            return {
                data: null,
                message: 'Error fetching min and max averages',
                status: AppStatus.failed,
            };
        }
    }




}

export const averageService = new AverageService(prismaClient)

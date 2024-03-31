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
            const average = await this.prisma.average.create({
                data: {
                    id: uuidv4(),
                    average: averageDto.average ,
                    student: {
                        connect: {
                            id: averageDto.student
                        }
                    }
                }
            })
            return {
                data: average,
                status: AppStatus.created
            }
        }catch (e) {
            return {
                data: null,
                message: `Error creating averages`,
                status: AppStatus.failed,
            };
        }

    }
    public async update(averageDto: IUpdateAverageDto, average_id : string): Promise<ApiResponse<IAverage>> {
        try{
            const average = await this.prisma.average.update({
                data: {
                    average: averageDto.average
                } ,
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
                message: `Error updating averages with id: ${average_id}`,
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
    public  async getAll(): Promise<ApiResponse<IAverage[]>>{
        try{
            const averages = await  this.prisma.average.findMany({
                include: {
                    student: true
                }
            })
            return {
                data: averages,
                status: AppStatus.updated
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

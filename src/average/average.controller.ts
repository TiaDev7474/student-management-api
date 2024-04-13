import {NextFunction , Request , Response} from "express";
import {averageService} from "./average.service";


const averageController = {
    getAll: async (req: Request, res:Response, next: NextFunction) => {
        const { limit = 5,page=1 } = req.query;
        const data = await  averageService.getAll(parseInt(String(limit)), parseInt(String(page)));
        return res.status(data.status).json(data)
    },
    getMinMaxAverage: async (req: Request, res:Response, next: NextFunction) => {
        const data = await  averageService.getMinMaxAverage();
        return res.status(data.status).json(data)
    },
    update: async (req: Request, res: Response, next: NextFunction) =>{
        const { average_id } = req.params;
        const updatedAverage = req.body;
        const data = await  averageService.update(updatedAverage, average_id);
       return res.status(data.status).json(data)
    },

    delete: async (req: Request, res:Response, next: NextFunction) => {
        const {average_id} = req.params
        const data = await  averageService.delete(average_id);
        return res.status(data.status).json(data)
    },
    create: async (req: Request, res:Response, next: NextFunction) => {
        const average = req.body;
        const data = await  averageService.create(average);
        return res.status(data.status).json(data)
    },

}
export  default averageController;


import {Request, Response, NextFunction} from 'express';
import {studentService} from "./student.service";


const studentController = {
   getAll: async (req: Request, res:Response, next: NextFunction) => {
       const { limit = 5,page=0 } = req.query;
       const data = await  studentService.getAll(parseInt(String(limit)), parseInt(String(page)));
       return res.status(data.status).json(data)
   },

    delete: async (req: Request, res:Response, next: NextFunction) => {
        const {id} = req.params
        const data = await  studentService.delete(id);
        return res.status(data.status).json(data)
    },
    create: async (req: Request, res:Response, next: NextFunction) => {
        const student = req.body;
        const data = await  studentService.create(student);
        return res.status(data.status).json(data)
    },
    update: async (req: Request, res:Response, next: NextFunction) => {
        const student = req.body;
        console.log(student);
        const {id} = req.params;
        const data = await  studentService.update(student,id );
        return res.status(data.status).json(data)
    },
}
export  default studentController;

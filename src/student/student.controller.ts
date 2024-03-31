
import {Request, Response, NextFunction} from 'express';
import {studentService} from "./student.service";


const studentController = {
   getAll: async (req: Request, res:Response, next: NextFunction) => {
       const data = await  studentService.getAll();
       return res.status(data.status).json(data)
   },

    delete: async (req: Request, res:Response, next: NextFunction) => {
        const {student_id} = req.params
        const data = await  studentService.delete(student_id);
        return res.status(data.status).json(data)
    },
    create: async (req: Request, res:Response, next: NextFunction) => {
        const student = req.body;
        const data = await  studentService.create(student);
        return res.status(data.status).json(data)
    },
}
export  default studentController;

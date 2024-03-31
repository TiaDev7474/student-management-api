
import studentController from './student.controller'
const studentRoutes = require('express').Router();

studentRoutes.get('/students', studentController.getAll);
studentRoutes.delete('/students/:id', studentController.delete)
studentRoutes.post('/students', studentController.create)

export default studentRoutes

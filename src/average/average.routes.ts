import averageController from "./average.controller";


const averageRoutes = require('express').Router();

averageRoutes.get('/averages', averageController.getAll);
averageRoutes.get('/averages/min-max', averageController.getMinMaxAverage);
averageRoutes.delete('/averages/:average_id', averageController.delete);
averageRoutes.post('/averages', averageController.create);
averageRoutes.put('/averages/:average_id', averageController.update);

export default averageRoutes

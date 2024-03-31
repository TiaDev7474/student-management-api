import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import {connect} from "./config/database";
import studentRoutes from "./student/student.routes";
import cors from "cors";
import averageRoutes from "./average/average.routes";

dotenv.config();

//database
connect().then(() => console.log("database connected"));

//app
const app: Express = express();
const port = process.env.PORT;

//middleware
app.use(cors({
    origin:["http://localhost:3000"],
    methods:['GET','POST','PUT','DELETE'],
}));
app.use(express.urlencoded());
app.use(express.json());

//routes
app.use('/api',studentRoutes);
app.use('/api', averageRoutes);
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to student management api');
})

app.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`);
})

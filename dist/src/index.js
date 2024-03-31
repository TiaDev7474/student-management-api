"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const student_routes_1 = __importDefault(require("./student/student.routes"));
const cors_1 = __importDefault(require("cors"));
const average_routes_1 = __importDefault(require("./average/average.routes"));
dotenv_1.default.config();
//database
(0, database_1.connect)().then(() => console.log("database connected"));
//app
const app = (0, express_1.default)();
const port = process.env.PORT;
//middleware
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
//routes
app.use('/api', student_routes_1.default);
app.use('/api', average_routes_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to student management api');
});
app.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`);
});

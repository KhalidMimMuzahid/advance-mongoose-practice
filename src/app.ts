import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.router';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/students', studentRoutes);



 


// this is for testing perpose  it starts from here 
const getAController = (req: Request, res: Response) => {
  const a = 10;
  // res.send('Hello World!')
  res.send(a);
};
app.get('/', getAController);
// this is for testing perpase  it ends from here 

export default app;

// two types of industry level software design pattern are available
// 1) MVC  (models views controllers)  rarely used now a days
//2) Modular
// for js,     schema --> Model --> DB Query
// for ts, interface --> Schema --> Model --> DB Query

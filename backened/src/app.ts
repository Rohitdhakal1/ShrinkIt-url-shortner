import express from "express";
import type {Application, Request, Response } from "express";
import cors from "cors";
import urlRouter from './routes/url';
import indexroute from './routes/index';

const app:Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/url',urlRouter);
app.use('/',indexroute); // we need baseurl/code

app.get("/", (req: Request, res: Response) => {
  res.send('hello mr')
});


export default app;

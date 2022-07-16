import express, { Express } from 'express';
import dotenv from 'dotenv';
import RoutePaths from "./controller"
import bodyParser from 'body-parser';
import cors from 'cors'

dotenv.config();

const server: Express = express();
const port = process.env.PORT;

server.use(cors());
server.use(bodyParser.json());
server.use(RoutePaths);


server.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
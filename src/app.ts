import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";

import connect from "./utils/connect";
import logger from './utils/logger'
import routes from './routes'


const port = config.get<number>("port");

const app = express();

app.use(express.json())


console.log(port);


app.listen(port, async () => {
  logger.info(`App is running at localhost:${port}`)
  console.log('running');
  await connect()
  routes(app)
});

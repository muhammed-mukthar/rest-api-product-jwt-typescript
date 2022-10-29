import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import config from "config";
import connect from "./utils/connect";


const port = config.get<number>("port");

const app = express();


console.log(port);


app.listen(port, async () => {
  console.log('running');
  await connect()
});

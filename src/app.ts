import express from "express";
import cors from "cors";
import "dotenv/config";
import { router } from "./routes";
import { createConnection } from "./database/data-source";

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

export { app };
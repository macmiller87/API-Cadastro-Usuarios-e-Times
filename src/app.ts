import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "@utils/container/index";
import cors from "cors";
import { router } from "@routes/index";
import { createConnection } from "@database/data-source";
import { AppError } from "@utils/errors/AppError";

createConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    })
});

export { app };
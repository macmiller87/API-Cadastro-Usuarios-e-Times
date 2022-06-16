import { Request, Response, Router } from "express";
import CreateUsersController from "../modules/CreateUsers/useCase/index";

const createUsersRoute = Router();

createUsersRoute.post("/", (request: Request, response: Response) => {
    return CreateUsersController().handle(request, response);
});

export { createUsersRoute };
import { Router } from "express";
import { CreateUsersController } from "@modules/CreateUsers/useCase/CreateUser/CreateUsersController";

const createUsersRoute = Router();

const createUsers = new CreateUsersController();

createUsersRoute.post("/", createUsers.handle);

export { createUsersRoute };
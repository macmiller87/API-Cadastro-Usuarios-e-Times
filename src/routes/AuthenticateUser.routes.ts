import { Router } from "express";
import { AuthenticateUserController } from "@modules/CreateUsers/useCase/AuthenticateUser/AuthenticateUserController";

const AuthenticateUserRoute = Router();

const authenticateUserController = new AuthenticateUserController();

AuthenticateUserRoute.post("/", authenticateUserController.handle);

export { AuthenticateUserRoute };
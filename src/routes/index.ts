import { Router } from "express";
import { createUsersRoute } from "./CreateUsers.routes";
import { AuthenticateUserRoute } from "./AuthenticateUser.routes";

const router = Router();

router.use("/createUser", createUsersRoute);

router.use("/sessions", AuthenticateUserRoute);

export { router };
import { Router } from "express";
import { createUsersRoute } from "./CreateUsers.routes";

const router = Router();

router.use("/createUser", createUsersRoute);

export { router };
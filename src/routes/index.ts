import { Router } from "express";
import { listUserRoute, UsersRoute } from "./Users.routes";
import { AuthenticateUserRoute } from "./AuthenticateUser.routes";
import { createUserTeamsRoute } from "./CreateUserTeams.routes";

const router = Router();

router.use("/createUser", UsersRoute);
router.use("/profile", listUserRoute);
router.use("/sessions", AuthenticateUserRoute);

router.use("/createUserTeams/:user_id", createUserTeamsRoute);

export { router };
import { Router } from "express";
import { listUserRoute, UsersRoute } from "./Users.routes";
import { AuthenticateUserRoute } from "./AuthenticateUser.routes";

const router = Router();

router.use("/createUser", UsersRoute);
router.use("/profile", listUserRoute);
router.use("/sessions", AuthenticateUserRoute);

export { router };
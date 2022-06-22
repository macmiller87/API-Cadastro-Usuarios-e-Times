import { UsersRepository } from "@modules/CreateUsers/repositories/UsersRepository";
import { ListUserAndTeamsController } from "./ListUserAndTeamsController";
import { ListUserAndTeamsUseCse } from "./ListUserAndTeamsUseCase";

export default (): ListUserAndTeamsController => {

    const usersRepository = new UsersRepository();
    const listUserAndTeamsUseCase = new ListUserAndTeamsUseCse(usersRepository);
    const listUserAndTeamsController = new ListUserAndTeamsController(listUserAndTeamsUseCase);

    return listUserAndTeamsController;
};
import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUsersController } from "./CreateUsersController";
import { CreateUsersUseCase } from "./CreateUsersUseCse";

export default (): CreateUsersController => {

    const usersRepository = new UsersRepository();
    const createUsersUseCase = new CreateUsersUseCase(usersRepository);
    const createUsersController = new CreateUsersController(createUsersUseCase);

    return createUsersController;

}; 
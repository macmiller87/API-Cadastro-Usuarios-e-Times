import { AppError } from "@utils/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";

@injectable()
class DeleteUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute(user_id: string): Promise<void> {

        const userId = await this.usersRepository.findByUserId(user_id);

        if(!userId) {
            throw new AppError("User Not Found!", 404);
        }

        await this.usersRepository.deleteUser(user_id);
    };

};

export { DeleteUserUseCase }; 
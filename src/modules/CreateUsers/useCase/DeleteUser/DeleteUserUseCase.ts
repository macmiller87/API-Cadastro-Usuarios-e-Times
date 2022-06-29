import { AppError } from "@utils/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";

@injectable()
class DeleteUserUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute(user_id: string): Promise<void> {

        try {
            await this.usersRepository.findByUserId(user_id);

            await this.usersRepository.deleteUser(user_id);

        }catch(error) {
            throw new AppError("User Not Found!", 404);
        }
    };

};

export { DeleteUserUseCase }; 
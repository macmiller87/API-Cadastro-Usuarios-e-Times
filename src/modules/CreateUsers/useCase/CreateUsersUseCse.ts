import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";


class CreateUsersUseCase {

    constructor(private usersRepository: IUsersRepository) {}

    async execute({ username, userAvatar, email }: ICreateUsersDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByUsername(username);

        if(!userAlreadyExists) {
            throw new Error("User Already Exists!");
        }

        await this.usersRepository.create({
            username,
            userAvatar,
            email
        });
    };
};

export { CreateUsersUseCase };
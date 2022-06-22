import { AppError } from "@utils/errors/AppError";
import { ICreateUsersDTO } from "@modules/CreateUsers/dtos/ICreateUsersDTO";
import { Users } from "@modules/CreateUsers/entities/Users";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateUsersUseCase {

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute({ username, userAvatar, email, password }: ICreateUsersDTO): Promise<Users> {
        const userAlreadyExists = await this.usersRepository.findByUsername(username);

        if(userAlreadyExists) {
            throw new AppError("User Already Exists!", 404);
        }

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            username,
            userAvatar,
            email,
            password: passwordHash
        });

        return user;
    };
};

export { CreateUsersUseCase };
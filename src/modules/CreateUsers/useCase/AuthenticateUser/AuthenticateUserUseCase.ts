import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";
import { ICreateUsersTokenDTO } from "@modules/CreateUsers/dtos/ICreateUsersTokenDTO";
import { AppError } from "@utils/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/authConfig";
import { inject, injectable } from "tsyringe";
import { IUsersTokenRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersTokenRepository";

interface IRequest {
    email: string;
    password: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository") private usersRepository: IUsersRepository,
        @inject("UsersTokenRepository") private usersTokenRepository: IUsersTokenRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<ICreateUsersTokenDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError("Email or password incorrect!", 404);  
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError("Email or password incorrect!", 401);    
        }

        const { secret_token, expiresIn } = authConfig.jwt;

        const token = sign({ user }, secret_token, {
            subject: user.user_id,
            expiresIn
        });

        await this.usersTokenRepository.create({
            user_id: user.user_id
        });

        return {
            user: {
                user_id: user.user_id,
                username: user.username,
                email: user.email
            },
            token
        };
    };
    
}; 

export { AuthenticateUserUseCase };
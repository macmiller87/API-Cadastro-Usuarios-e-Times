import { ICreateUsersDTO } from "@modules/CreateUsers/dtos/ICreateUsersDTO";
import { Users } from "@modules/CreateUsers/entities/Users";

interface IUsersRepository {
    create({ username, userAvatar, email, password }: ICreateUsersDTO): Promise<Users>;
    findByUsername(username: string): Promise<Users>;
    findByUserId(user_id: string): Promise<Users>;
    findByEmail(email: string): Promise<Users>;
    ListUsers(): Promise<Users[]>;
}

export { IUsersRepository };
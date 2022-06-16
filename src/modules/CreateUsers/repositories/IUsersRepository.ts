import { ICreateUsersDTO } from "../dtos/ICreateUsersDTO";
import { Users } from "../entities/Users";

interface IUsersRepository {
    create(data: ICreateUsersDTO): Promise<void>;
    findByUsername(email: string): Promise<Users>;
}

export { IUsersRepository };
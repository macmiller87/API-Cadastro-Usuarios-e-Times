import { inject, injectable } from "tsyringe";
import { AppError } from "@utils/errors/AppError";
import { Teams } from "@modules/CreateUserTeams/entities/Teams";
import { ICreateUserTeamsDTO } from "@modules/CreateUserTeams/dtos/ICreateUserTeamDTO";
import { IUsersTeamsRepository } from "@modules/CreateUserTeams/repositories/InplementationsRepository/IUsersTeamsRepository";
import { IUsersRepository } from "@modules/CreateUsers/repositories/InplementationsRepository/IUsersRepository";

@injectable()
class  CreateUserTeamsUseCase {

    constructor(
        @inject("TeamsRepository") private teamsRepository: IUsersTeamsRepository,
        @inject("UsersRepository") private usersRepository: IUsersRepository,
    ) {};

    async execute({ teamName, city, country, user_id }: ICreateUserTeamsDTO): Promise<Teams> {
        const user  = await this.usersRepository.findByUserId(user_id);
        const teamAlreadyExists = await this.teamsRepository.findByTeamName(teamName);

        if(teamAlreadyExists) {
            throw new AppError("Team Already Exists!", 400);     
        }

        const team = await this.teamsRepository.create({
            teamName,
            city,
            country,
            user_id: user.user_id
        });

        return team;
    };
    
};

export { CreateUserTeamsUseCase };
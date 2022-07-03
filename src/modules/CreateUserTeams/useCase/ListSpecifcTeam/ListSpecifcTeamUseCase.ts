import { inject, injectable } from "tsyringe";
import { AppError } from "@utils/errors/AppError";
import { Teams } from "@modules/CreateUserTeams/entities/Teams";
import { IUsersTeamsRepository } from "@modules/CreateUserTeams/repositories/InplementationsRepository/IUsersTeamsRepository";

@injectable()
class ListSpecificTeamUseCase {

    constructor(@inject("TeamsRepository") private teamsRepository: IUsersTeamsRepository) {};

    async execute(team_id: string): Promise<Teams[]> {
        
        const getTeam = await this.teamsRepository.listSpecifTeam(team_id);

        if(!getTeam.length) {
            throw new AppError("Team Not Found!", 404);
        }

        return getTeam;
    };

};

export { ListSpecificTeamUseCase };
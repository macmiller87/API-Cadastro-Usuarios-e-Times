import { inject, injectable } from "tsyringe";
import { AppError } from "@utils/errors/AppError";
import { Teams } from "@modules/CreateUserTeams/entities/Teams";
import { IUsersTeamsRepository } from "@modules/CreateUserTeams/repositories/InplementationsRepository/IUsersTeamsRepository";

@injectable()
class ListSpecificTeamUseCase {

    constructor(@inject("TeamsRepository") private teamsRepository: IUsersTeamsRepository) {};

    async execute(team_id: string): Promise<Teams[]> {

        try {
            const getTeam = await this.teamsRepository.listSpecifTeam(team_id);

            return getTeam;

        }catch(error) {
            throw new AppError("Team Not Found!", 404);
        }
    };

};

export { ListSpecificTeamUseCase };
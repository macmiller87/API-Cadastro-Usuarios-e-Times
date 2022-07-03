import { inject, injectable } from "tsyringe";
import { AppError } from "@utils/errors/AppError";
import { IUsersTeamsRepository } from "@modules/CreateUserTeams/repositories/InplementationsRepository/IUsersTeamsRepository";

@injectable()
class DeleteSpecifcTeamUseCase {

    constructor(@inject("TeamsRepository") private teamsRepository: IUsersTeamsRepository) {}

    async execute(team_id: string): Promise<void> {

        const teamId = await this.teamsRepository.findByTeamId(team_id);

        if(!teamId) {
            throw new AppError("Team Not Found!", 404);
        }

        await this.teamsRepository.deleteTeam(team_id);           
    };

};

export { DeleteSpecifcTeamUseCase };
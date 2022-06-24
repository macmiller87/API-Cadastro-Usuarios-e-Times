import { AppDataSource } from "@database/data-source";
import { Repository } from "typeorm";
import { ICreateUserTeamsDTO } from "@modules/CreateUserTeams/dtos/ICreateUserTeamDTO";
import { Teams } from "@modules/CreateUserTeams/entities/Teams";
import { IUsersTeamsRepository } from "./InplementationsRepository/IUsersTeamsRepository";

class TeamsRepository implements IUsersTeamsRepository {

    private teamsRepository: Repository<Teams>;

    constructor() {
        this.teamsRepository = AppDataSource.getRepository(Teams);
    }

    async create({ teamName, city, country, user_id }: ICreateUserTeamsDTO): Promise<Teams> {

        const usersTeams = this.teamsRepository.create({
            teamName,
            city,
            country,
            user_id
        });

        await this.teamsRepository.save(usersTeams);

        return usersTeams;
    };

    async findByTeamName(teamName: string): Promise<Teams> {
        const teams = await this.teamsRepository.findOneBy({ teamName });
        return teams;
    };

    async listSpecifTeam(team_id: string): Promise<Teams[]> {
        const teams = await this.teamsRepository.find({
            where: {
                team_id: team_id
            }
        });
        return teams;
    };

};

export { TeamsRepository };
import { ICreateUserTeamsDTO } from "@modules/CreateUserTeams/dtos/ICreateUserTeamDTO";
import { Teams } from "@modules/CreateUserTeams/entities/Teams";

interface IUsersTeamsRepository {
    create(data: ICreateUserTeamsDTO): Promise<Teams>;
    findByTeamName(teamName: string): Promise<Teams>;
    findByTeamId(team_id: string): Promise<Teams>;
    deleteTeam(team_id:string): Promise<void>;
    listSpecifTeam(team_id: string): Promise<Teams[]>;
};

export { IUsersTeamsRepository };
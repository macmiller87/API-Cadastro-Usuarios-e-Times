import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificTeamUseCase } from "./ListSpecifcTeamUseCase";

class ListSpecifcTeamController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { team_id } = request.body;

        const listSpecificTeamUseCase = container.resolve(ListSpecificTeamUseCase);

        const getTeam = await listSpecificTeamUseCase.execute(team_id);

        return response.json(getTeam);
    };

};

export { ListSpecifcTeamController };
import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserTeamsUseCase } from "./ListUserTeamsUseCase";

class ListUserTeamsController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.query;

        const listUserTeamsUseCase = container.resolve(ListUserTeamsUseCase);

        const userTeams = await listUserTeamsUseCase.execute(user_id as string);

        return response.json(userTeams);
    };
    
};

export { ListUserTeamsController };
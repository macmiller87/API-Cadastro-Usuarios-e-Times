import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserTeamsUseCase } from "./CreateUserTeamsUseCase";

class CreateUserTeamsController {

    async handle(request: Request, response: Response) {

        const { user_id } = request.user;
        const { teamName, city, country } = request.body;

        const createUserTeamsUseCase = container.resolve(CreateUserTeamsUseCase);

        const userTeams = await createUserTeamsUseCase.execute({
            teamName,
            city,
            country,
            user_id
        });

        return response.status(201).json(userTeams);
    };
    
};

export { CreateUserTeamsController };

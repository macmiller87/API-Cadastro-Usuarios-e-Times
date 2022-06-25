import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteSpecifcTeamUseCase } from "./DeleteSpecifcTeamUseCase";

class DeletSpecifcTeamController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { team_id } = request.body;

        const deleteSpecifcTeamUseCase = container.resolve(DeleteSpecifcTeamUseCase);

        await deleteSpecifcTeamUseCase.execute(team_id);

        return response.status(200).json({ message: "Team Delete with sucess!" });
    };

};

export { DeletSpecifcTeamController };
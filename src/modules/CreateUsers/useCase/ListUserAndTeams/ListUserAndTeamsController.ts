import { Request, Response } from "express";
import { ListUserAndTeamsUseCse } from "./ListUserAndTeamsUseCase";

class ListUserAndTeamsController {

    constructor(private listUserAndTeamsUseCase: ListUserAndTeamsUseCse) {}

    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.params;

        const user = await this.listUserAndTeamsUseCase.execute(user_id);

        return response.json(user);
    }
};

export { ListUserAndTeamsController };
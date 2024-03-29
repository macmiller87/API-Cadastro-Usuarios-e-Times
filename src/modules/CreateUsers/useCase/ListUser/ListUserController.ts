import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserUseCase } from "./ListUserUseCase";

class ListUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { user_id } = request.query;

        const listUserUseCase = container.resolve(ListUserUseCase);

        const getUser = await listUserUseCase.execute(user_id as string);

        return response.json(getUser);
    };

};

export { ListUserController };
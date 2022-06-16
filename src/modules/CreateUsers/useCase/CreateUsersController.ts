import { Request, Response } from "express";
import { CreateUsersUseCase } from "./CreateUsersUseCase";

class CreateUsersController {

    constructor(private createUsersUseCase: CreateUsersUseCase) {}

    async handle(requet: Request, response: Response): Promise<Response> {

        const { username, userAvatar, email } = requet.body; 

        await this.createUsersUseCase.execute({
            username,
            userAvatar,
            email,
        });

        return response.status(201).send();
    };
};

export { CreateUsersController };
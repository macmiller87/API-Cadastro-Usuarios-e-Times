import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUsersUseCase } from "./CreateUsersUseCase";

class CreateUsersController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { username, userAvatar, email, password } = request.body; 

        const createUserUseCase = container.resolve(CreateUsersUseCase);

        const createUser = await createUserUseCase.execute({
            username,
            userAvatar,
            email,
            password
        });

        return response.status(201).json(createUser);
    };
    
};

export { CreateUsersController };
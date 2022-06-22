import { NextFunction, Request } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";
import authConfig from "@config/authConfig";

interface IPayload {
    sub: string;
}

export async function EnsureUserAuthenticate(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError("JWT token is missing!",  401);
    }

    const [, token] = authHeader.split(" "); 

    try {

        const { sub: user_id } = verify(token, authConfig.jwt.secret_token) as IPayload;

        request.user ={
            user_id: user_id
        }

        next();
        
    }catch {
        throw new AppError("Invalid token!", 401);   
    }
};
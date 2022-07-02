import request from "supertest";
import { DataSource } from "typeorm";
import { app } from "../../../../app";
import { createConnection } from "@database/data-source";

let connection: DataSource;

describe("Delete User Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.destroy();
    });

    it("Should be able to delete a User, if (user_id and token) is correct", async () => {
        await request(app).post("/createUser").send({
            username: "Leona Figueroa",
            userAvatar: "Figueroa",
            email: "nief@tub.ar",
            password: "2424"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "nief@tub.ar",
            password: "2424"
        });

        const { token } = userAuthenticate.body

        const deleteUser = await request(app).delete("/deleteUser").query({
            user_id: userAuthenticate.body.user.user_id

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(deleteUser.body).toStrictEqual({ message: "User Delete with sucess!" });
        expect(deleteUser.status).toBe(200);
    });

    it("Should not be able to delete a User, if (user_id) is incorrect ", async () => {
        await request(app).post("/createUser").send({
            username: "Lillie Carson",
            userAvatar: "Carson",
            email: "ju@pa.ke",
            password: "6677"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "ju@pa.ke",
            password: "6677"
        });

        const { token } = userAuthenticate.body

        const deleteUser = await request(app).delete("/deleteUser").query({
            user_id: userAuthenticate.body.user

        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(deleteUser.body).toStrictEqual({ message: "User Not Found!" });
        expect(deleteUser.status).toBe(404);
    });

    it("Should not be able to delete a User, if the User does not have a (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Lillie Carson",
            userAvatar: "Carson",
            email: "ju@pa.ke",
            password: "6677"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "ju@pa.ke",
            password: "6677"
        });

        const deleteUser = await request(app).delete("/deleteUser").query({
            user_id: userAuthenticate.body.user.user_id
        });

        expect(deleteUser.body).toStrictEqual({ message: "JWT token is missing!" });
        expect(deleteUser.status).toBe(401);
    });

    it("Should not be able to delete a User, if the User does not have a valid (Token)", async () => {
        await request(app).post("/createUser").send({
            username: "Lillie Carson",
            userAvatar: "Carson",
            email: "ju@pa.ke",
            password: "6677"
        });

        const userAuthenticate = await request(app).post("/sessions").send({
            email: "ju@pa.ke",
            password: "6677"
        });

        const { FakeToken } = userAuthenticate.body;

        const deleteUser = await request(app).delete("/deleteUser").query({
            user_id: userAuthenticate.body.user.user_id

        }).set({
            Authorization: `Bearer ${FakeToken}`
        });

        expect(deleteUser.body).toStrictEqual({ message: "Invalid token!" });
        expect(deleteUser.status).toBe(409);
    });

});
import { createUser, getUserByEmail } from "../db/users";
import express from "express";

export const addUser = async (req: express.Request, res: express.Response) => {
    try {
        const { fUserId, email } = req.body;

        if (!fUserId || !email ) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(400);
        }

        const user = await createUser({
            fUserId,
            email,
        })

        return res.status(200).json(user).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
 };

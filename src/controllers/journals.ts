import { createJournal } from "../db/journals";
import { getUserByEmail } from "../db/users";
import express from "express";

export const addJournal = async (req: express.Request, res: express.Response) => {
    try {
        const { content, email } = req.body;

        if (!email || !content ) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);
        if (!user) {
            return res.sendStatus(400);
        }

        const journal = await createJournal({
            content,
            author: user?.id,
        })

        return res.status(200).json(journal).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
 };

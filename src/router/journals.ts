import express from "express";

import { addJournal } from "../controllers/journals";

export default (router: express.Router) => {
    router.post("/journals/add", addJournal);
};

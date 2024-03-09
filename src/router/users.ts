import { addUser } from "../controllers/users";
import express from "express";

export default (router: express.Router) => {
    router.post("/users/add", addUser);
};

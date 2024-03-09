import express from "express";
import users from "./users";
import journals from "./journals";


const router = express.Router();

export default (): express.Router => {
    users(router);
    journals(router);
    
    return router;
};

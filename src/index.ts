import express from "express";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import cron from "node-cron";
import { randomlyShareJournals } from "./helpers";

require("dotenv").config();

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on port 8080")
})

cron.schedule("0 9 * * *", async () => {
    console.log("CRON_TRIGGERED");
    await randomlyShareJournals();
})

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.use('/', router());

import { Server } from "server";
import app from "./app";

const port = process.env.PORT || 8000;

const server = new Server(app);

server.run(port);

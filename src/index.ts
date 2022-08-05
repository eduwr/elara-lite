import express from "express";
import dotenv from "dotenv";
import { Server } from "./server/server";
import { client } from "./database/connection";

dotenv.config();

const port = process.env.PORT;

const server = new Server(express);

server.run(port);

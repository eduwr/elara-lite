import express from "express";
import dotenv from "dotenv";
import { Server } from "./server/server";

dotenv.config();

const server = new Server(express());

server.create();

/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from "dotenv";
import http, { Server } from "http";
import app from "./app.js";
import { prisma } from "./config/db.js";

dotenv.config();

let server: Server;
const PORT = process.env.PORT || 3000;

async function connectDB() {
  try {
    await prisma.$connect();
    console.log("Database connected successfull!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectDB();
    server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  console.warn(`Received ${signal}. Shutting down gracefully...`);
  if (server) {
    server.close(async (_err: any) => {
      console.log("Closed out remaining connections.");
      try {
        console.log("Disconnecting from database...");
        await prisma.$disconnect();
      } catch (err) {
        console.error("Error during database disconnection:", err);
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

function handleProcessEvents() {
  process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  process.on("uncaughtException", (error) => {
    console.error("💥 Uncaught Exception:", error);
    gracefulShutdown("uncaughtException");
  });

  process.on("unhandledRejection", (reason) => {
    console.error("💥 Unhandled Rejection:", reason);
    gracefulShutdown("unhandledRejection");
  });
}

async function init() {
  await startServer();
  await handleProcessEvents();
}

init();

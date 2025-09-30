import dotenv from "dotenv";
import http, { Server } from "http";
import app from "./app";
import { prisma } from "./config/db";

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

startServer();

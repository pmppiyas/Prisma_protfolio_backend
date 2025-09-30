import compression from "compression";
import cors from "cors";
import express, { Application, NextFunction } from "express";

const app: Application = express();

app.use(cors());
app.use(compression());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use((req, res, _next: NextFunction) => {
  res.status(404).send({
    succuss: false,
    message: "Route not found",
  });
});

export default app;
